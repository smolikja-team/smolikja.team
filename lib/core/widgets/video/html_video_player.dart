import 'dart:html' as html;
import 'dart:ui' as ui;

import 'package:flutter/material.dart';

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
  late html.VideoElement _videoElement;
  late String _viewType;

  @override
  void initState() {
    super.initState();
    // Create a unique ID for the video element
    _viewType = 'html-video-player-${DateTime.now().millisecondsSinceEpoch}';

    // Create the video element
    _videoElement =
        html.VideoElement()
          ..src = widget.videoUrl
          ..autoplay = widget.autoplay
          ..loop = widget.loop
          ..muted = widget.muted
          ..style.border = 'none'
          ..style.width = '100%'
          ..style.height = '100%'
          ..style.objectFit = 'contain';

    // Register the view factory
    // ignore: undefined_prefixed_name
    ui.platformViewRegistry.registerViewFactory(
      _viewType,
      (int viewId) => _videoElement,
    );
  }

  @override
  void didUpdateWidget(HtmlVideoPlayer oldWidget) {
    super.didUpdateWidget(oldWidget);

    // Update video properties if they changed
    if (oldWidget.videoUrl != widget.videoUrl) {
      _videoElement.src = widget.videoUrl;
    }

    if (oldWidget.autoplay != widget.autoplay) {
      _videoElement.autoplay = widget.autoplay;
    }

    if (oldWidget.loop != widget.loop) {
      _videoElement.loop = widget.loop;
    }

    if (oldWidget.muted != widget.muted) {
      _videoElement.muted = widget.muted;
    }
  }

  @override
  void dispose() {
    // Clean up the video element
    _videoElement
      ..pause()
      ..removeAttribute('src')
      ..load();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: widget.width,
      height: widget.height,
      child: HtmlElementView(viewType: _viewType),
    );
  }
}
