import 'dart:async';

import 'package:flutter/material.dart';
import 'package:portfolio_web/features/logo_video_player/implementations/video_player_factory.dart';
import 'package:portfolio_web/features/logo_video_player/implementations/video_player_interface.dart';

/// A video player with seamless looping capabilities.
///
/// This player implements advanced buffering techniques to ensure smooth looping
/// by preloading the next video instance before the current one ends.
class SeamlessVideoPlayer extends StatefulWidget {
  /// Creates a SeamlessVideoPlayer widget.
  ///
  /// [videoUrl] is the URL of the video to play.
  /// [width] and [height] are optional constraints for the video player.
  /// [fit] determines how the video should be inscribed into the space.
  /// [preloadBufferMs] is the time in milliseconds before the end of the video when the next instance should be prepared.
  const SeamlessVideoPlayer({
    super.key,
    required this.videoUrl,
    this.width,
    this.height,
    this.fit = BoxFit.contain,
    this.preloadBufferMs = 500,
  });

  /// The URL of the video to play.
  final String videoUrl;

  /// Optional width constraint for the video player.
  final double? width;

  /// Optional height constraint for the video player.
  final double? height;

  /// How the video should be inscribed into the space.
  final BoxFit fit;

  /// Time in milliseconds before the end of the video when the next instance should be prepared.
  final int preloadBufferMs;

  /// Time in milliseconds before the end of the video when the next instance should start playing.
  static const int overlapPlayMs = 80;

  @override
  State<SeamlessVideoPlayer> createState() => _SeamlessVideoPlayerState();
}

class _SeamlessVideoPlayerState extends State<SeamlessVideoPlayer> {
  late final VideoPlayerInterface _videoPlayer;
  String? _containerId;
  String? _primaryVideoId;
  String? _nextVideoId;
  String? _viewType;
  bool _isInitialized = false;
  bool _hasError = false;
  String _errorMessage = '';
  Timer? _checkPositionTimer;
  bool _isSwitchingVideos = false;
  double _videoDuration = 0;

  @override
  void initState() {
    super.initState();
    _videoPlayer = VideoPlayerFactory.create();

    if (_videoPlayer.isSupported) {
      _initializeVideoElements();
    } else {
      setState(() {
        _hasError = true;
        _errorMessage = 'Video playback is not supported on this platform';
      });
    }
  }

  void _initializeVideoElements() {
    try {
      // Create a container element
      _containerId = _videoPlayer.createContainerElement();

      // Create the primary video element
      _primaryVideoId = _videoPlayer.createVideoElement(widget.videoUrl);

      // Add the primary video to the container
      _videoPlayer
        ..addVideoToContainer(_containerId!, _primaryVideoId!)
        // Set up the video style
        ..setVideoStyle(
          _primaryVideoId!,
          fit: widget.fit,
          transition: 'opacity 100ms ease-in-out',
        )
        // Make the video visible
        ..setVideoVisibility(_primaryVideoId!, true)
        // Register callbacks
        ..onVideoCanPlay(_primaryVideoId!, () {
          if (mounted && !_isInitialized) {
            setState(() {
              _isInitialized = true;
            });
          }
          _startPositionTimer();
        })
        ..onVideoMetadataLoaded(_primaryVideoId!, () {
          _videoDuration = _videoPlayer.getVideoDuration(_primaryVideoId!);
        })
        ..onVideoError(_primaryVideoId!, (errorMessage) {
          if (mounted) {
            setState(() {
              _hasError = true;
              _errorMessage = errorMessage;
            });
          }
        });

      // Register the view factory
      _viewType = _videoPlayer.registerViewFactory(_containerId!);

      // Start playing the video
      _videoPlayer.playVideo(_primaryVideoId!);

      // Fallback initialization
      Future.delayed(const Duration(seconds: 2), () {
        if (mounted && !_isInitialized && !_hasError) {
          setState(() {
            _isInitialized = true;
          });
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

  void _startPositionTimer() {
    _checkPositionTimer?.cancel();
    _checkPositionTimer = Timer.periodic(
      const Duration(milliseconds: 50),
      (_) => _checkVideoPosition(),
    );
  }

  void _checkVideoPosition() {
    if (!mounted ||
        _isSwitchingVideos ||
        _primaryVideoId == null ||
        _videoPlayer.isVideoPaused(_primaryVideoId!)) {
      return;
    }

    // If we don't know the duration yet, try to get it
    if (_videoDuration <= 0) {
      _videoDuration = _videoPlayer.getVideoDuration(_primaryVideoId!);
      return;
    }

    // Calculate time left in the video
    final currentTime = _videoPlayer.getVideoTime(_primaryVideoId!);
    final timeLeft = _videoDuration - currentTime;

    // Calculate when we need to prepare the next video
    final prepareTime =
        widget.preloadBufferMs / 1000 +
        (SeamlessVideoPlayer.overlapPlayMs / 1000);

    // If we're within the buffer time of the end, prepare the next video
    if (timeLeft <= prepareTime && _nextVideoId == null) {
      _prepareNextVideo();
    }
  }

  void _prepareNextVideo() {
    if (_isSwitchingVideos || _nextVideoId != null || _containerId == null) {
      return;
    }

    try {
      // Create the next video element
      _nextVideoId = _videoPlayer.createVideoElement(widget.videoUrl);

      // Add it to the container
      _videoPlayer
        ..addVideoToContainer(_containerId!, _nextVideoId!)
        // Set up the video style
        ..setVideoStyle(
          _nextVideoId!,
          fit: widget.fit,
          transition: 'opacity 100ms ease-in-out',
          opacity: 0,
        )
        // Force preloading
        ..setVideoTime(_nextVideoId!, 0.1)
        // Register callbacks
        ..onVideoCanPlay(_nextVideoId!, _scheduleVideoSwitch)
        ..onVideoMetadataLoaded(_nextVideoId!, _scheduleVideoSwitch)
        ..onVideoError(_nextVideoId!, (errorMessage) {
          if (mounted) {
            setState(() {
              _hasError = true;
              _errorMessage = errorMessage;
            });
          }
        });

      // Fallback
      Future.delayed(const Duration(milliseconds: 50), () {
        if (_nextVideoId != null && !_isSwitchingVideos) {
          _scheduleVideoSwitch();
        }
      });
    } catch (e) {
      debugPrint('Error preparing next video: $e');
      _nextVideoId = null;
    }
  }

  void _scheduleVideoSwitch() {
    if (_isSwitchingVideos || _nextVideoId == null || _primaryVideoId == null) {
      return;
    }

    // Calculate when to switch videos
    final currentTime = _videoPlayer.getVideoTime(_primaryVideoId!);
    final timeLeft = _videoDuration - currentTime;
    final overlapTime = timeLeft - (SeamlessVideoPlayer.overlapPlayMs / 1000);

    // If we're very close to the end or should already be overlapping, switch immediately
    if (overlapTime <= 0) {
      _switchToNextVideo();
    } else {
      // Otherwise, schedule the switch with the overlap
      Future.delayed(Duration(milliseconds: (overlapTime * 1000).round()), () {
        if (mounted && !_isSwitchingVideos && _nextVideoId != null) {
          _switchToNextVideo();
        }
      });
    }
  }

  void _switchToNextVideo() {
    if (_isSwitchingVideos || _nextVideoId == null || _primaryVideoId == null) {
      return;
    }

    _isSwitchingVideos = true;

    try {
      // Start playing the next video
      _videoPlayer
        ..setVideoTime(_nextVideoId!, 0)
        ..playVideo(_nextVideoId!)
        ..setVideoVisibility(_nextVideoId!, true);

      // Store reference to old video
      final oldVideoId = _primaryVideoId;

      // Start fading out the old video
      _videoPlayer.setVideoStyle(oldVideoId!, opacity: 0.9);

      // Switch references
      _primaryVideoId = _nextVideoId;
      _nextVideoId = null;

      // Complete the fade-out and remove the old video
      Future.delayed(const Duration(milliseconds: 100), () {
        try {
          _videoPlayer.setVideoStyle(oldVideoId, opacity: 0);

          Future.delayed(const Duration(milliseconds: 100), () {
            try {
              _videoPlayer.removeVideoElement(oldVideoId);
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

    // If the URL changed, reinitialize everything
    if (oldWidget.videoUrl != widget.videoUrl) {
      _disposeVideoElements();
      _initializeVideoElements();
    }
  }

  void _disposeVideoElements() {
    _checkPositionTimer?.cancel();
    _checkPositionTimer = null;

    if (_primaryVideoId != null) {
      _videoPlayer.removeVideoElement(_primaryVideoId!);
      _primaryVideoId = null;
    }

    if (_nextVideoId != null) {
      _videoPlayer.removeVideoElement(_nextVideoId!);
      _nextVideoId = null;
    }

    if (_containerId != null) {
      _videoPlayer.clearContainer(_containerId!);
    }
  }

  @override
  void dispose() {
    _disposeVideoElements();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (!_videoPlayer.isSupported) {
      return const Center(
        child: Text('Video playback is not supported on this platform'),
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
            Text(_errorMessage, style: Theme.of(context).textTheme.bodyMedium),
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

    if (!_isInitialized || _viewType == null) {
      return const Center(child: CircularProgressIndicator());
    }

    return SizedBox(
      width: widget.width,
      height: widget.height,
      child: HtmlElementView(viewType: _viewType!),
    );
  }
}
