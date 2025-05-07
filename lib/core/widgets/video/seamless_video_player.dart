import 'dart:async';
// ignore: avoid_web_libraries_in_flutter, deprecated_member_use
import 'dart:html' as html;
// ignore: avoid_web_libraries_in_flutter
import 'dart:ui' as ui;

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

/// A seamless video player that uses HTML video elements without any abstractions.
///
/// This player implements advanced buffering techniques to ensure smooth looping
/// by preloading the next video instance before the current one ends.
class SeamlessVideoPlayer extends StatefulWidget {
  /// Creates a SeamlessVideoPlayer widget.
  ///
  /// [videoUrl] is the URL of the video to play.
  /// [width] and [height] are optional constraints for the video player.
  /// [fit] determines how the video should be inscribed into the space (defaults to BoxFit.contain).
  /// [preloadBufferMs] is the time in milliseconds before the end of the video when the next instance should be prepared.
  const SeamlessVideoPlayer({
    super.key,
    required this.videoUrl,
    this.width,
    this.height,
    this.fit = BoxFit.contain,
    this.preloadBufferMs = 300,
  });

  /// The URL of the video to play.
  final String videoUrl;

  /// Optional width constraint for the video player.
  final double? width;

  /// Optional height constraint for the video player.
  final double? height;

  /// Optional BoxFit for how the video should be inscribed into the space.
  final BoxFit fit;

  /// Time in milliseconds before the end of the video when the next instance should be prepared.
  final int preloadBufferMs;

  /// Time in milliseconds before the end of the video when the next instance should start playing.
  /// This creates an overlap between videos for smoother transitions.
  /// Lower value = less overlap (new video starts closer to the end of the current video)
  static const int overlapPlayMs = 80;

  @override
  State<SeamlessVideoPlayer> createState() => _SeamlessVideoPlayerState();
}

class _SeamlessVideoPlayerState extends State<SeamlessVideoPlayer> {
  late String _viewType;
  late html.DivElement _containerElement;
  late html.VideoElement _primaryVideoElement;
  html.VideoElement? _nextVideoElement;
  bool _isInitialized = false;
  bool _hasError = false;
  String _errorMessage = '';
  Timer? _checkPositionTimer;
  bool _isSwitchingVideos = false;

  // Store the duration once we know it
  double _videoDuration = 0;

  @override
  void initState() {
    super.initState();
    if (kIsWeb) {
      _initializeVideoElements();
    }
  }

  void _initializeVideoElements() {
    try {
      // Create a unique ID for the container element
      _viewType =
          'seamless-video-player-${DateTime.now().millisecondsSinceEpoch}';

      // Create a container div to hold both videos
      _containerElement =
          html.DivElement()
            ..style.position = 'relative'
            ..style.width = '100%'
            ..style.height = '100%'
            ..style.overflow = 'hidden';

      // Create the primary video element
      _primaryVideoElement = _createVideoElement(widget.videoUrl, true);
      _containerElement.append(_primaryVideoElement);

      // Add event listeners to primary video
      _primaryVideoElement.onCanPlay.listen((event) {
        if (mounted && !_isInitialized) {
          setState(() {
            _isInitialized = true;
          });
        }

        // Start the timer to check position
        _startPositionTimer();
      });

      // Use loadedmetadata event to get the duration, which is more reliable
      _primaryVideoElement.onLoadedMetadata.listen((event) {
        if (_primaryVideoElement.duration.isFinite &&
            _primaryVideoElement.duration > 0) {
          _videoDuration = _primaryVideoElement.duration.toDouble();
        }
      });

      _primaryVideoElement.onError.listen(_handleVideoError);

      // Register the view factory
      // ignore: undefined_prefixed_name
      ui.platformViewRegistry.registerViewFactory(
        _viewType,
        (int viewId) => _containerElement,
      );

      // Start playing the primary video
      _primaryVideoElement.play();

      // Mark as initialized after a timeout as fallback
      Future.delayed(const Duration(seconds: 2), () {
        if (mounted && !_isInitialized && !_hasError) {
          setState(() {
            _isInitialized = true;
          });

          // Start the timer to check position even if we don't get the canplay event
          _startPositionTimer();
        }
      });
    } catch (e) {
      if (mounted) {
        setState(() {
          _hasError = true;
          _errorMessage = 'Error initializing video: $e';
        });
      }
    }
  }

  html.VideoElement _createVideoElement(String url, bool visible) {
    final videoElement =
        html.VideoElement()
          ..src = url
          ..autoplay =
              visible // Only autoplay the visible video
          ..loop =
              false // We'll handle looping manually
          ..muted = true
          ..controls = false
          ..preload =
              'auto' // Ensure video is fully preloaded
          ..style.border = 'none'
          ..style.width = '100%'
          ..style.height = '100%'
          ..style.position = 'absolute'
          ..style.top = '0'
          ..style.left = '0'
          // Add smooth transition for opacity (faster transition)
          ..style.transition = 'opacity 100ms ease-in-out';

    // Set visibility
    videoElement.style.opacity = visible ? '1' : '0';

    // Set object-fit based on BoxFit
    switch (widget.fit) {
      case BoxFit.contain:
        videoElement.style.objectFit = 'contain';
        break;
      case BoxFit.cover:
        videoElement.style.objectFit = 'cover';
        break;
      case BoxFit.fill:
        videoElement.style.objectFit = 'fill';
        break;
      case BoxFit.fitWidth:
      case BoxFit.fitHeight:
        videoElement.style.objectFit = 'contain';
        break;
      case BoxFit.none:
        videoElement.style.objectFit = 'none';
        break;
      case BoxFit.scaleDown:
        videoElement.style.objectFit = 'scale-down';
        break;
    }

    return videoElement;
  }

  void _handleVideoError(html.Event event) {
    final videoElement = event.target as html.VideoElement;
    final error = videoElement.error;
    var errorMessage = 'Unknown error';

    if (error != null) {
      switch (error.code) {
        case 1:
          errorMessage = 'The video loading was aborted';
          break;
        case 2:
          errorMessage = 'Network error while loading video';
          break;
        case 3:
          errorMessage = 'Error decoding video';
          break;
        case 4:
          errorMessage = 'Video format not supported';
          break;
      }
    }

    if (mounted) {
      setState(() {
        _hasError = true;
        _errorMessage = errorMessage;
      });
    }
  }

  void _startPositionTimer() {
    // Cancel any existing timer
    _checkPositionTimer?.cancel();

    // Create a new timer that checks the video position every 50ms
    _checkPositionTimer = Timer.periodic(const Duration(milliseconds: 50), (
      timer,
    ) {
      _checkVideoPosition();
    });
  }

  void _checkVideoPosition() {
    if (!mounted || _isSwitchingVideos || _primaryVideoElement.paused) return;

    // If we don't know the duration yet, try to get it
    if (_videoDuration <= 0) {
      _videoDuration = _primaryVideoElement.duration.toDouble();
      return;
    }

    // Calculate time left in the video
    final currentTime = _primaryVideoElement.currentTime;
    final timeLeft = _videoDuration - currentTime;

    // Calculate when we need to prepare the next video
    // We need to prepare it earlier than the preloadBufferMs to account for the overlap
    final prepareTime =
        widget.preloadBufferMs / 1000 +
        (SeamlessVideoPlayer.overlapPlayMs / 1000);

    // If we're within the buffer time of the end, prepare the next video
    if (timeLeft <= prepareTime && _nextVideoElement == null) {
      _prepareNextVideo();
    }
  }

  void _prepareNextVideo() {
    if (_isSwitchingVideos || _nextVideoElement != null) return;

    try {
      // Create the next video element
      _nextVideoElement = _createVideoElement(widget.videoUrl, false);
      _containerElement.append(_nextVideoElement!);

      // Set additional preload attributes to ensure video is ready
      _nextVideoElement!.preload = 'auto';

      // Force preloading by setting currentTime to a small value
      _nextVideoElement!.currentTime = 0.1;

      // Preload the video
      _nextVideoElement!.load();

      // Add event listener for when it's ready
      _nextVideoElement!.onCanPlay.listen((event) {
        // When the next video is ready, schedule the switch
        _scheduleVideoSwitch();
      });

      // Also listen for loadeddata event which might fire earlier
      _nextVideoElement!.onLoadedData.listen((event) {
        if (_nextVideoElement != null && !_isSwitchingVideos) {
          _scheduleVideoSwitch();
        }
      });

      // Add error listener
      _nextVideoElement!.onError.listen(_handleVideoError);

      // Fallback in case no events fire
      Future.delayed(const Duration(milliseconds: 50), () {
        if (_nextVideoElement != null && !_isSwitchingVideos) {
          _scheduleVideoSwitch();
        }
      });
    } catch (e) {
      debugPrint('Error preparing next video: $e');
      _nextVideoElement = null;
    }
  }

  void _scheduleVideoSwitch() {
    if (_isSwitchingVideos || _nextVideoElement == null) return;

    // Calculate when to switch videos
    final currentTime = _primaryVideoElement.currentTime;
    final timeLeft = _videoDuration - currentTime;

    // Calculate overlap time (when to start the next video)
    final overlapTime = timeLeft - (SeamlessVideoPlayer.overlapPlayMs / 1000);

    // If we're very close to the end or should already be overlapping, switch immediately
    if (overlapTime <= 0) {
      _switchToNextVideo();
    } else {
      // Otherwise, schedule the switch with the overlap
      Future.delayed(Duration(milliseconds: (overlapTime * 1000).round()), () {
        if (mounted && !_isSwitchingVideos && _nextVideoElement != null) {
          _switchToNextVideo();
        }
      });
    }
  }

  void _switchToNextVideo() {
    if (_isSwitchingVideos || _nextVideoElement == null) return;

    _isSwitchingVideos = true;

    try {
      // Start playing the next video
      _nextVideoElement!.currentTime = 0;
      _nextVideoElement!.play();

      // Make the next video visible with a fade-in effect
      _nextVideoElement!.style.opacity = '1';

      // Store reference to old video
      final oldVideo = _primaryVideoElement;

      // Start fading out the old video
      oldVideo.style.opacity = '0.9';

      // Switch references
      _primaryVideoElement = _nextVideoElement!;
      _nextVideoElement = null;

      // Complete the fade-out and remove the old video after the transition
      Future.delayed(const Duration(milliseconds: 100), () {
        try {
          // Completely hide the old video
          oldVideo.style.opacity = '0';

          // Remove it after the fade completes
          Future.delayed(const Duration(milliseconds: 100), () {
            try {
              oldVideo
                ..pause()
                ..remove();
            } catch (e) {
              debugPrint('Error removing old video: $e');
            }

            _isSwitchingVideos = false;
          });
        } catch (e) {
          debugPrint('Error fading out old video: $e');
          _isSwitchingVideos = false;
        }
      });
    } catch (e) {
      debugPrint('Error switching videos: $e');
      _isSwitchingVideos = false;
    }
  }

  @override
  void didUpdateWidget(SeamlessVideoPlayer oldWidget) {
    super.didUpdateWidget(oldWidget);

    if (!kIsWeb) return;

    // If the URL changed, reinitialize everything
    if (oldWidget.videoUrl != widget.videoUrl) {
      _disposeVideoElements();
      _initializeVideoElements();
    }
  }

  void _disposeVideoElements() {
    _checkPositionTimer?.cancel();
    _checkPositionTimer = null;

    // Clean up primary video element
    _primaryVideoElement
      ..pause()
      ..removeAttribute('src')
      ..load()
      ..remove();

    // Clean up next video element if it exists
    if (_nextVideoElement != null) {
      _nextVideoElement!
        ..pause()
        ..removeAttribute('src')
        ..load()
        ..remove();
      _nextVideoElement = null;
    }

    // Clear container
    _containerElement.innerHtml = '';
  }

  @override
  void dispose() {
    if (kIsWeb) {
      _disposeVideoElements();
    }
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (!kIsWeb) {
      return const Center(
        child: Text('SeamlessVideoPlayer is only supported on web platform'),
      );
    }

    if (_hasError) {
      return Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Icon(Icons.error_outline, color: Colors.red, size: 48),
            const SizedBox(height: 16),
            Text(
              'Error loading video',
              style: Theme.of(
                context,
              ).textTheme.titleMedium?.copyWith(color: Colors.red),
            ),
            const SizedBox(height: 8),
            Text(
              _errorMessage,
              style: Theme.of(context).textTheme.bodyMedium,
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: () {
                setState(() {
                  _hasError = false;
                  _isInitialized = false;
                });
                _disposeVideoElements();
                _initializeVideoElements();
              },
              child: const Text('Retry'),
            ),
          ],
        ),
      );
    }

    if (!_isInitialized) {
      return Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const CircularProgressIndicator(),
            const SizedBox(height: 16),
            Text(
              'Loading video...',
              style: Theme.of(context).textTheme.bodyMedium,
            ),
          ],
        ),
      );
    }

    return SizedBox(
      width: widget.width,
      height: widget.height,
      child: HtmlElementView(viewType: _viewType),
    );
  }
}
