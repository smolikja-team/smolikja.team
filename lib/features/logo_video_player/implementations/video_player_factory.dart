// Always use web implementation for this web-only app
import 'package:portfolio_web/features/logo_video_player/implementations/video_player_interface.dart';
import 'package:portfolio_web/features/logo_video_player/implementations/web/web_video_player_impl.dart';

/// Factory for creating the VideoPlayerInterface implementation.
/// Since this is a web-only app, we always use the web implementation.
class VideoPlayerFactory {
  /// Creates a new instance of VideoPlayerInterface.
  ///
  /// Returns a web implementation optimized for all browsers including mobile Safari.
  static VideoPlayerInterface create() {
    return createVideoPlayerImpl();
  }
}
