import 'package:flutter/material.dart';
import 'package:portfolio_web/features/logo_video_player/widgets/seamless_video_player.dart';

/// A widget that displays a logo video in a seamless loop.
/// 
/// This is the main entry point for the logo video player feature.
class LogoVideoPlayer extends StatelessWidget {
  /// Creates a LogoVideoPlayer widget.
  /// 
  /// The [videoUrl] parameter is required and specifies the URL of the video to play.
  /// The [width] and [height] parameters are optional and specify the dimensions of the player.
  /// The [fit] parameter specifies how the video should be inscribed into the space.
  /// The [preloadBufferMs] parameter specifies how many milliseconds before the end of the video
  /// the next instance should be prepared.
  const LogoVideoPlayer({
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

  @override
  Widget build(BuildContext context) {
    return SeamlessVideoPlayer(
      videoUrl: videoUrl,
      width: width,
      height: height,
      fit: fit,
      preloadBufferMs: preloadBufferMs,
    );
  }
}
