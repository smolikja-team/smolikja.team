import 'package:flutter/material.dart';
import 'package:portfolio_web/features/logo_video_player/logo_video_player.dart';
import 'package:url_launcher/url_launcher.dart';

/// Main page of the application
class MainPage extends StatelessWidget {
  const MainPage({super.key});

  @override
  Widget build(BuildContext context) {
    return const Material(
      color: Colors.black,
      child: Center(child: VideoContainer()),
    );
  }
}

/// A widget that displays the logo video player with overlaid text and links
class VideoContainer extends StatelessWidget {
  const VideoContainer({super.key});

  /// Opens a URL in the browser
  Future<void> _launchUrl(String url) async {
    final uri = Uri.parse(url);
    if (!await launchUrl(uri)) {
      throw Exception('Could not launch $url');
    }
  }

  /// Opens email client with pre-filled recipient
  Future<void> _launchEmail(String email) async {
    final uri = Uri.parse('mailto:$email');
    if (!await launchUrl(uri)) {
      throw Exception('Could not launch email client for $email');
    }
  }

  @override
  Widget build(BuildContext context) {
    // Video URL
    const videoUrl = 'https://smolikja.team/assets/portfolio-web/team-logo.mp4';

    return Stack(
      fit: StackFit.loose,
      alignment: Alignment.bottomCenter,
      children: [
        // Video player
        const Padding(
          padding: EdgeInsets.all(32.0),
          child: LogoVideoPlayer(
            videoUrl: videoUrl,
            fit: BoxFit.contain,
            preloadBufferMs: 350,
          ),
        ),

        // Email link
        MouseRegion(
          cursor: SystemMouseCursors.click,
          child: GestureDetector(
            onTap: () => _launchEmail('smolikja@protonmail.com'),
            child: const Padding(
              padding: EdgeInsets.all(8.0),
              child: Text(
                'smolikja@protonmail.com',
                style: TextStyle(
                  color: Color(0xff38fe27),
                  fontSize: 14,
                  decoration: TextDecoration.underline,
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }
}
