import 'package:flutter_test/flutter_test.dart';
import 'package:portfolio_web/features/logo_video_player/implementations/video_player_factory.dart';
import 'package:portfolio_web/features/logo_video_player/implementations/video_player_interface.dart';

void main() {
  test('VideoPlayerFactory creates an implementation', () {
    // Create an implementation using the factory
    final implementation = VideoPlayerFactory.create();
    
    // Verify that an implementation was created
    expect(implementation, isA<VideoPlayerInterface>());
    
    // In a test environment, we expect the stub implementation
    // which should report that it's not supported
    expect(implementation.isSupported, isFalse);
  });
}
