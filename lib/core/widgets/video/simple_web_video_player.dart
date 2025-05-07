import 'dart:html' as html;
// Import platformViewRegistry from ui_web instead of ui
import 'dart:ui_web' as ui_web;

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

/// A simple video player for web that uses the HTML video element directly.
///
/// This widget is optimized for web platform and provides a reliable way to
/// play videos in a loop without using the video_player package.
class SimpleWebVideoPlayer extends StatefulWidget {
  /// Creates a SimpleWebVideoPlayer widget.
  ///
  /// [videoUrl] is the URL of the video to play.
  /// [width] and [height] are optional constraints for the video player.
  /// [fit] determines how the video should be inscribed into the space (defaults to BoxFit.contain).
  /// [autoplay] determines whether the video should autoplay (defaults to true).
  /// [loop] determines whether the video should loop (defaults to true).
  /// [muted] determines whether the video should be muted (defaults to false).
  const SimpleWebVideoPlayer({
    super.key,
    required this.videoUrl,
    this.width,
    this.height,
    this.fit = BoxFit.contain,
    this.autoplay = true,
    this.loop = true,
    this.muted = false,
  });

  /// The URL of the video to play.
  final String videoUrl;

  /// Optional width constraint for the video player.
  final double? width;

  /// Optional height constraint for the video player.
  final double? height;

  /// How the video should be fitted within the container.
  final BoxFit fit;

  /// Whether to autoplay the video.
  final bool autoplay;

  /// Whether to loop the video.
  final bool loop;

  /// Whether to mute the video.
  final bool muted;

  @override
  State<SimpleWebVideoPlayer> createState() => _SimpleWebVideoPlayerState();
}

class _SimpleWebVideoPlayerState extends State<SimpleWebVideoPlayer> {
  late String _viewType;
  html.VideoElement? _videoElement;
  bool _isInitialized = false;

  @override
  void initState() {
    super.initState();
    if (kIsWeb) {
      _initializeVideoElement();
    }
  }

  void _initializeVideoElement() {
    // Create a unique ID for the video element
    _viewType =
        'simple-web-video-player-${DateTime.now().millisecondsSinceEpoch}';

    // Create the video element
    _videoElement =
        html.VideoElement()
          ..src = widget.videoUrl
          ..autoplay = widget.autoplay
          ..loop = widget.loop
          ..muted = widget.muted
          ..controls = false
          ..style.border = 'none'
          ..style.width = '100%'
          ..style.height = '100%';

    // Set object-fit based on BoxFit
    switch (widget.fit) {
      case BoxFit.contain:
        _videoElement!.style.objectFit = 'contain';
        break;
      case BoxFit.cover:
        _videoElement!.style.objectFit = 'cover';
        break;
      case BoxFit.fill:
        _videoElement!.style.objectFit = 'fill';
        break;
      case BoxFit.fitWidth:
        _videoElement!.style.objectFit = 'contain';
        break;
      case BoxFit.fitHeight:
        _videoElement!.style.objectFit = 'contain';
        break;
      case BoxFit.none:
        _videoElement!.style.objectFit = 'none';
        break;
      case BoxFit.scaleDown:
        _videoElement!.style.objectFit = 'scale-down';
        break;
    }

    // Add event listeners
    _videoElement!.onCanPlay.listen((event) {
      if (mounted && !_isInitialized) {
        setState(() {
          _isInitialized = true;
        });
      }
    });

    _videoElement!.onError.listen((event) {
      debugPrint('Video error: ${_videoElement!.error?.message}');
    });

    // Register the view factory
    ui_web.platformViewRegistry.registerViewFactory(
      _viewType,
      (int viewId) => _videoElement!,
    );
  }

  @override
  void didUpdateWidget(SimpleWebVideoPlayer oldWidget) {
    super.didUpdateWidget(oldWidget);

    if (!kIsWeb || _videoElement == null) return;

    // Update video properties if they changed
    if (oldWidget.videoUrl != widget.videoUrl) {
      _videoElement!.src = widget.videoUrl;
    }

    if (oldWidget.autoplay != widget.autoplay) {
      _videoElement!.autoplay = widget.autoplay;
    }

    if (oldWidget.loop != widget.loop) {
      _videoElement!.loop = widget.loop;
    }

    if (oldWidget.muted != widget.muted) {
      _videoElement!.muted = widget.muted;
    }
  }

  @override
  void dispose() {
    if (kIsWeb && _videoElement != null) {
      // Clean up the video element
      _videoElement!.pause();
      _videoElement!.removeAttribute('src');
      _videoElement!.load();
      _videoElement = null;
    }
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (!kIsWeb) {
      return const Center(
        child: Text('SimpleWebVideoPlayer is only supported on web platform'),
      );
    }

    if (!_isInitialized) {
      return const Center(child: CircularProgressIndicator());
    }

    return SizedBox(
      width: widget.width,
      height: widget.height,
      child: HtmlElementView(viewType: _viewType),
    );
  }
}
