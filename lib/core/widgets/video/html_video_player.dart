import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:portfolio_web/core/utils/web_interop.dart';

/// A video player that uses HTML video element for web platform.
///
/// This is an alternative implementation that can be used when the video_player
/// package doesn't work properly on web platform.
class HtmlVideoPlayer extends StatefulWidget {
  /// Creates an HtmlVideoPlayer widget.
  ///
  /// [videoUrl] is the URL of the video to play.
  /// [width] and [height] are optional constraints for the video player.
  /// [loop] determines whether the video should loop (defaults to true).
  /// [autoplay] determines whether the video should autoplay (defaults to true).
  /// [muted] determines whether the video should be muted (defaults to false).
  const HtmlVideoPlayer({
    super.key,
    required this.videoUrl,
    this.width,
    this.height,
    this.loop = true,
    this.autoplay = true,
    this.muted = false,
  });

  /// The URL of the video to play.
  final String videoUrl;

  /// Optional width constraint for the video player.
  final double? width;

  /// Optional height constraint for the video player.
  final double? height;

  /// Whether to loop the video.
  final bool loop;

  /// Whether to autoplay the video.
  final bool autoplay;

  /// Whether to mute the video.
  final bool muted;

  @override
  State<HtmlVideoPlayer> createState() => _HtmlVideoPlayerState();
}

class _HtmlVideoPlayerState extends State<HtmlVideoPlayer> {
  dynamic _videoElement;
  late String _viewType;

  @override
  void initState() {
    super.initState();
    if (!kIsWeb) return;

    // Create a unique ID for the video element
    _viewType = 'html-video-player-${DateTime.now().millisecondsSinceEpoch}';

    // Create the video element using our safe web interop utility
    _videoElement = createVideoElement(
      src: widget.videoUrl,
      autoplay: widget.autoplay,
      loop: widget.loop,
      muted: widget.muted,
      controls: false,
    );

    // Set styles
    setElementStyle(
      _videoElement,
      border: 'none',
      width: '100%',
      height: '100%',
      objectFit: 'contain',
    );

    // Register the view factory using our safe web interop utility
    registerViewFactory(_viewType, (int viewId) => _videoElement);
  }

  @override
  void didUpdateWidget(HtmlVideoPlayer oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (!kIsWeb || _videoElement == null) return;

    // If the URL changed, recreate the video element
    if (oldWidget.videoUrl != widget.videoUrl) {
      // Create a new video element with updated properties
      _videoElement = createVideoElement(
        src: widget.videoUrl,
        autoplay: widget.autoplay,
        loop: widget.loop,
        muted: widget.muted,
        controls: false,
      );

      // Update styles
      setElementStyle(
        _videoElement,
        border: 'none',
        width: '100%',
        height: '100%',
        objectFit: 'contain',
      );

      // Re-register the view factory
      registerViewFactory(_viewType, (int viewId) => _videoElement);

      // Force a rebuild
      setState(() {});
    } else {
      // Update other properties if they changed
      if (oldWidget.autoplay != widget.autoplay ||
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
        child: Text('HtmlVideoPlayer is only supported on web platform'),
      );
    }

    return SizedBox(
      width: widget.width,
      height: widget.height,
      child: HtmlElementView(viewType: _viewType),
    );
  }
}
