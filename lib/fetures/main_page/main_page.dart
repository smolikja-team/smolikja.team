import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:portfolio_web/core/widgets/video/looping_video_player.dart';
import 'package:portfolio_web/core/widgets/video/seamless_video_player.dart';

class MainPage extends StatelessWidget {
  const MainPage({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(body: Center(child: VideoContainer()));
  }
}

/// A widget that displays the appropriate video player based on the platform.
class VideoContainer extends StatelessWidget {
  const VideoContainer({super.key});

  @override
  Widget build(BuildContext context) {
    // Use the direct URL to the video
    const videoUrl = 'https://smolikja.team/assets/portfolio-web/team-logo.mp4';

    // Use different video players based on platform
    if (kIsWeb) {
      return const SeamlessVideoPlayer(
        videoUrl: videoUrl,
        // width: 400,
        // height: 300,
        fit: BoxFit.cover,
        preloadBufferMs: 500, // Předběžné načtení 500ms před koncem videa
      );
    } else {
      return const LoopingVideoPlayer(
        videoUrl: videoUrl,
        width: 400,
        height: 300,
        fit: BoxFit.contain,
      );
    }
  }
}
