import 'package:flutter/material.dart';
import 'package:portfolio_web/features/logo_video_player/logo_video_player.dart';

/// Main page of the application
class MainPage extends StatelessWidget {
  const MainPage({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(body: Center(child: VideoContainer()));
  }
}

/// A widget that displays the logo video player
class VideoContainer extends StatelessWidget {
  const VideoContainer({super.key});

  @override
  Widget build(BuildContext context) {
    // Video URL
    const videoUrl = 'https://smolikja.team/assets/portfolio-web/team-logo.mp4';

    return const LogoVideoPlayer(
      videoUrl: videoUrl,
      fit: BoxFit.contain,
      preloadBufferMs: 500,
    );
  }
}
