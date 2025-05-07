import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:portfolio_web/features/logo_video_player/widgets/seamless_video_player.dart';

void main() {
  testWidgets('SeamlessVideoPlayer can be instantiated', (WidgetTester tester) async {
    const widget = SeamlessVideoPlayer(
      videoUrl: 'https://example.com/video.mp4',
    );
    
    // Verify widget properties
    expect(widget.videoUrl, 'https://example.com/video.mp4');
    expect(widget.fit, BoxFit.contain);
    expect(widget.preloadBufferMs, 500);
    
    // Build the widget in the test environment
    await tester.pumpWidget(
      const MaterialApp(
        home: Scaffold(
          body: widget,
        ),
      ),
    );
    
    // The widget should build without errors
    expect(find.byType(SeamlessVideoPlayer), findsOneWidget);
  });
  
  testWidgets('SeamlessVideoPlayer with custom parameters', (WidgetTester tester) async {
    const widget = SeamlessVideoPlayer(
      videoUrl: 'https://example.com/video.mp4',
      width: 400,
      height: 300,
      fit: BoxFit.cover,
      preloadBufferMs: 300,
    );
    
    // Verify custom parameters
    expect(widget.videoUrl, 'https://example.com/video.mp4');
    expect(widget.width, 400);
    expect(widget.height, 300);
    expect(widget.fit, BoxFit.cover);
    expect(widget.preloadBufferMs, 300);
    
    // Build the widget in the test environment
    await tester.pumpWidget(
      const MaterialApp(
        home: Scaffold(
          body: widget,
        ),
      ),
    );
    
    // The widget should build without errors
    expect(find.byType(SeamlessVideoPlayer), findsOneWidget);
  });
}
