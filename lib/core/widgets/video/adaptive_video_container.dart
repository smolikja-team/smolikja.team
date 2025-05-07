import 'package:flutter/material.dart';
import 'package:portfolio_web/core/widgets/video/platform_video_player.dart';

/// A responsive container for video content that adapts to available space.
///
/// This widget provides a convenient way to display video content with
/// appropriate sizing based on the available space in the parent container.
/// It uses PlatformVideoPlayer which automatically selects the best video
/// player implementation for the current platform.
class AdaptiveVideoContainer extends StatelessWidget {
  /// Creates an AdaptiveVideoContainer.
  ///
  /// [videoUrl] is the URL of the video to display.
  /// [maxWidth] and [maxHeight] define the maximum dimensions (defaults to 800 and 600).
  /// [minWidth] and [minHeight] define the minimum dimensions (defaults to 200 and 150).
  /// [fit] determines how the video should be inscribed into the space (defaults to BoxFit.contain).
  const AdaptiveVideoContainer({
    super.key,
    required this.videoUrl,
    this.maxWidth = 800,
    this.maxHeight = 600,
    this.minWidth = 200,
    this.minHeight = 150,
    this.fit = BoxFit.contain,
  });

  /// The URL of the video to display.
  final String videoUrl;

  /// Maximum width the video should take.
  final double maxWidth;

  /// Maximum height the video should take.
  final double maxHeight;

  /// Minimum width the video should take.
  final double minWidth;

  /// Minimum height the video should take.
  final double minHeight;

  /// How the video should be fitted within the container.
  final BoxFit fit;

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        // Calculate appropriate dimensions based on available space
        final availableWidth = constraints.maxWidth;
        final availableHeight = constraints.maxHeight;

        // Determine the width to use
        var width = maxWidth;
        if (availableWidth < maxWidth) {
          width = availableWidth > minWidth ? availableWidth : minWidth;
        }

        // Determine the height to use
        var height = maxHeight;
        if (availableHeight < maxHeight) {
          height = availableHeight > minHeight ? availableHeight : minHeight;
        }

        // Maintain aspect ratio if needed
        final aspectRatio = maxWidth / maxHeight;
        if (width / height > aspectRatio) {
          width = height * aspectRatio;
        } else if (width / height < aspectRatio) {
          height = width / aspectRatio;
        }

        return SizedBox(
          width: width,
          height: height,
          child: PlatformVideoPlayer(videoUrl: videoUrl, fit: fit),
        );
      },
    );
  }
}
