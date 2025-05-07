// ignore: avoid_web_libraries_in_flutter, deprecated_member_use
import 'dart:html' as html;
// ignore: avoid_web_libraries_in_flutter
import 'dart:ui' as ui;

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

/// A direct web video player that uses HTML video element without any abstractions.
///
/// This is a simple implementation that works reliably on web platforms.
class DirectWebVideoPlayer extends StatefulWidget {
  /// Creates a DirectWebVideoPlayer widget.
  ///
  /// [videoUrl] is the URL of the video to play.
  /// [width] and [height] are optional constraints for the video player.
  /// [fit] determines how the video should be inscribed into the space (defaults to BoxFit.contain).
  const DirectWebVideoPlayer({
    super.key,
    required this.videoUrl,
    this.width,
    this.height,
    this.fit = BoxFit.contain,
  });

  /// The URL of the video to play.
  final String videoUrl;

  /// Optional width constraint for the video player.
  final double? width;

  /// Optional height constraint for the video player.
  final double? height;

  /// Optional BoxFit for how the video should be inscribed into the space.
  final BoxFit fit;

  @override
  State<DirectWebVideoPlayer> createState() => _DirectWebVideoPlayerState();
}

class _DirectWebVideoPlayerState extends State<DirectWebVideoPlayer> {
  late String _viewType;
  late html.VideoElement _videoElement;
  bool _isInitialized = false;
  bool _hasError = false;
  String _errorMessage = '';

  @override
  void initState() {
    super.initState();
    if (kIsWeb) {
      _initializeVideoElement();
    }
  }

  void _initializeVideoElement() {
    try {
      // Create a unique ID for the video element
      _viewType =
          'direct-web-video-player-${DateTime.now().millisecondsSinceEpoch}';

      // Create the video element
      _videoElement =
          html.VideoElement()
            ..src = widget.videoUrl
            ..autoplay = true
            ..loop = true
            ..muted = true
            ..controls = false
            ..style.border = 'none'
            ..style.width = '100%'
            ..style.height = '100%';

      // Set object-fit based on BoxFit
      switch (widget.fit) {
        case BoxFit.contain:
          _videoElement.style.objectFit = 'contain';
          break;
        case BoxFit.cover:
          _videoElement.style.objectFit = 'cover';
          break;
        case BoxFit.fill:
          _videoElement.style.objectFit = 'fill';
          break;
        case BoxFit.fitWidth:
        case BoxFit.fitHeight:
          _videoElement.style.objectFit = 'contain';
          break;
        case BoxFit.none:
          _videoElement.style.objectFit = 'none';
          break;
        case BoxFit.scaleDown:
          _videoElement.style.objectFit = 'scale-down';
          break;
      }

      // Add event listeners
      _videoElement.onCanPlay.listen((event) {
        if (mounted && !_isInitialized) {
          setState(() {
            _isInitialized = true;
          });
        }
      });

      _videoElement.onError.listen((event) {
        final error = _videoElement.error;
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
      });

      // Register the view factory
      // ignore: undefined_prefixed_name
      ui.platformViewRegistry.registerViewFactory(
        _viewType,
        (int viewId) => _videoElement,
      );

      // Start playing the video
      _videoElement.play();

      // Mark as initialized after a timeout as fallback
      Future.delayed(const Duration(seconds: 2), () {
        if (mounted && !_isInitialized && !_hasError) {
          setState(() {
            _isInitialized = true;
          });
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

  @override
  void didUpdateWidget(DirectWebVideoPlayer oldWidget) {
    super.didUpdateWidget(oldWidget);

    if (!kIsWeb) return;

    // If the URL changed, update the video source
    if (oldWidget.videoUrl != widget.videoUrl) {
      _videoElement.src = widget.videoUrl;
      _videoElement.play();
    }
  }

  @override
  void dispose() {
    if (kIsWeb) {
      // Clean up the video element
      _videoElement
        ..pause()
        ..removeAttribute('src')
        ..load();
    }
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (!kIsWeb) {
      return const Center(
        child: Text('DirectWebVideoPlayer is only supported on web platform'),
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
                _initializeVideoElement();
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
