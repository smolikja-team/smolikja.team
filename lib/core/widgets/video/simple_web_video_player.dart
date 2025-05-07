import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:portfolio_web/core/utils/web_interop.dart';

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
  dynamic _videoElement;
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

    // Create the video element using our safe web interop utility
    _videoElement = createVideoElement(
      src: widget.videoUrl,
      autoplay: widget.autoplay,
      loop: widget.loop,
      muted: widget.muted,
      controls: false,
    );

    if (_videoElement != null) {
      // Set styles
      setElementStyle(
        _videoElement,
        border: 'none',
        width: '100%',
        height: '100%',
      );

      // Set object-fit based on BoxFit
      String objectFit;
      switch (widget.fit) {
        case BoxFit.contain:
          objectFit = 'contain';
          break;
        case BoxFit.cover:
          objectFit = 'cover';
          break;
        case BoxFit.fill:
          objectFit = 'fill';
          break;
        case BoxFit.fitWidth:
        case BoxFit.fitHeight:
          objectFit = 'contain';
          break;
        case BoxFit.none:
          objectFit = 'none';
          break;
        case BoxFit.scaleDown:
          objectFit = 'scale-down';
          break;
      }

      setElementStyle(_videoElement, objectFit: objectFit);

      // Add event listener using our safe web interop utility
      addEventListenerToElement(_videoElement, 'canplay', () {
        if (mounted && !_isInitialized) {
          setState(() {
            _isInitialized = true;
          });
        }
      });

      // Register the view factory using our safe web interop utility
      registerViewFactory(_viewType, (int viewId) => _videoElement);
    }

    // Mark as initialized after a timeout as fallback
    Future.delayed(const Duration(seconds: 1), () {
      if (mounted && !_isInitialized) {
        setState(() {
          _isInitialized = true;
        });
      }
    });
  }

  @override
  void didUpdateWidget(SimpleWebVideoPlayer oldWidget) {
    super.didUpdateWidget(oldWidget);

    if (!kIsWeb || _videoElement == null) return;

    // If any properties changed, recreate the video element
    if (oldWidget.videoUrl != widget.videoUrl ||
        oldWidget.autoplay != widget.autoplay ||
        oldWidget.loop != widget.loop ||
        oldWidget.muted != widget.muted) {
      // Create a new video element with updated properties
      _videoElement = createVideoElement(
        src: widget.videoUrl,
        autoplay: widget.autoplay,
        loop: widget.loop,
        muted: widget.muted,
        controls: false,
      );

      if (_videoElement != null) {
        // Set styles
        setElementStyle(
          _videoElement,
          border: 'none',
          width: '100%',
          height: '100%',
        );

        // Set object-fit based on BoxFit
        String objectFit;
        switch (widget.fit) {
          case BoxFit.contain:
            objectFit = 'contain';
            break;
          case BoxFit.cover:
            objectFit = 'cover';
            break;
          case BoxFit.fill:
            objectFit = 'fill';
            break;
          case BoxFit.fitWidth:
          case BoxFit.fitHeight:
            objectFit = 'contain';
            break;
          case BoxFit.none:
            objectFit = 'none';
            break;
          case BoxFit.scaleDown:
            objectFit = 'scale-down';
            break;
        }

        setElementStyle(_videoElement, objectFit: objectFit);

        // Register the view factory using our safe web interop utility
        registerViewFactory(_viewType, (int viewId) => _videoElement);

        // Force a rebuild
        setState(() {});
      }
    }
  }

  @override
  void dispose() {
    _videoElement = null;
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
