import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:portfolio_web/core/widgets/video/adaptive_video_container.dart';
import 'package:portfolio_web/core/widgets/video/looping_video_player.dart';
import 'package:portfolio_web/core/widgets/video/platform_video_player.dart';

void main() {
  // Note: We can't fully test video playback in widget tests
  // as VideoPlayerController requires actual platform channels

  test('AdaptiveVideoContainer can be instantiated', () {
    // Simple test to verify the widget can be created
    const widget = AdaptiveVideoContainer(
      videoUrl: 'https://smolikja.team/assets/portfolio-web/team-logo.mp4',
    );

    // Verify widget is created
    expect(widget, isNotNull);
    expect(
      widget.videoUrl,
      'https://smolikja.team/assets/portfolio-web/team-logo.mp4',
    );
    expect(widget.maxWidth, 800);
    expect(widget.maxHeight, 600);
    expect(widget.minWidth, 200);
    expect(widget.minHeight, 150);
    expect(widget.fit, BoxFit.contain);
  });

  test('LoopingVideoPlayer can be instantiated', () {
    // Simple test to verify the widget can be created
    const widget = LoopingVideoPlayer(
      videoUrl: 'https://smolikja.team/assets/portfolio-web/team-logo.mp4',
    );

    // Verify widget is created
    expect(widget, isNotNull);
    expect(
      widget.videoUrl,
      'https://smolikja.team/assets/portfolio-web/team-logo.mp4',
    );
    expect(widget.fit, BoxFit.contain);
  });

  test('PlatformVideoPlayer can be instantiated', () {
    // Simple test to verify the widget can be created
    const widget = PlatformVideoPlayer(
      videoUrl: 'https://smolikja.team/assets/portfolio-web/team-logo.mp4',
    );

    // Verify widget is created
    expect(widget, isNotNull);
    expect(
      widget.videoUrl,
      'https://smolikja.team/assets/portfolio-web/team-logo.mp4',
    );
    expect(widget.fit, BoxFit.contain);
  });
}
