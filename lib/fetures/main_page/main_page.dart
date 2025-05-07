import 'package:flutter/material.dart';
import 'package:portfolio_web/core/widgets/video/iframe_video_player.dart';

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
    // Use a direct HTML file with the video embedded
    const iframeUrl = '/assets/team_logo_video.html';

    return const IframeVideoPlayer(videoUrl: iframeUrl);
  }
}
