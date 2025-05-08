import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:portfolio_web/features/logo_video_player/logo_video_player.dart';
import 'package:url_launcher/url_launcher.dart';

/// Main page of the application
class MainPage extends StatelessWidget {
  const MainPage({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      backgroundColor: Colors.black,
      body: Center(child: VideoContainer()),
    );
  }
}

/// A widget that displays the logo video player with overlaid text and links
class VideoContainer extends StatefulWidget {
  const VideoContainer({super.key});

  @override
  State<VideoContainer> createState() => _VideoContainerState();
}

class _VideoContainerState extends State<VideoContainer> {
  bool _showCopiedMessage = false;

  /// Opens a URL in the browser
  Future<void> _launchUrl(String url) async {
    final uri = Uri.parse(url);
    if (!await launchUrl(uri)) {
      throw Exception('Could not launch $url');
    }
  }

  /// Copies the email address to clipboard
  void _copyEmailToClipboard(String email) {
    Clipboard.setData(ClipboardData(text: email));

    // Show visual feedback
    setState(() {
      _showCopiedMessage = true;
    });

    // Hide the message after 2 seconds
    Future.delayed(const Duration(seconds: 2), () {
      if (mounted) {
        setState(() {
          _showCopiedMessage = false;
        });
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    String getVideoQuality() {
      final width = View.of(context).physicalSize.width;

      if (width >= 1440) {
        return '2160p';
      } else if (width >= 1024) {
        return '1080p';
      } else if (width >= 600) {
        return '720p';
      } else {
        return '480p';
      }
    }

    // Video URL
    final videoUrl =
        'https://smolikja.team/assets/portfolio-web/team-logo-${getVideoQuality()}.mp4';

    return Stack(
      fit: StackFit.loose,
      alignment: Alignment.bottomCenter,
      children: [
        // Video player
        LogoVideoPlayer(
          videoUrl: videoUrl,
          fit: BoxFit.contain,
          preloadBufferMs: 350,
        ),

        // Email link with copy feedback
        Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            // Copied message (only visible when _showCopiedMessage is true)
            if (_showCopiedMessage)
              Container(
                padding: const EdgeInsets.symmetric(
                  horizontal: 16,
                  vertical: 8,
                ),
                margin: const EdgeInsets.only(bottom: 8),
                decoration: BoxDecoration(
                  color: Colors.black.withAlpha(179), // 0.7 opacity (179/255)
                  borderRadius: BorderRadius.circular(4),
                ),
                child: const Text(
                  'Email address copied to clipboard',
                  style: TextStyle(color: Colors.white, fontSize: 14),
                ),
              ),

            // Email link
            MouseRegion(
              cursor: SystemMouseCursors.click,
              child: GestureDetector(
                onTap: () => _launchUrl('https://github.com/smolikja-team/'),
                child: const Padding(
                  padding: EdgeInsets.symmetric(horizontal: 8.0),
                  child: Text(
                    'follow on github',
                    style: TextStyle(
                      color: Color(0xff38fe27),
                      fontSize: 14,
                      decoration: TextDecoration.underline,
                    ),
                  ),
                ),
              ),
            ),

            // Email link
            MouseRegion(
              cursor: SystemMouseCursors.click,
              child: GestureDetector(
                onTap: () => _copyEmailToClipboard('smolikja@protonmail.com'),
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
        ),
      ],
    );
  }
}
