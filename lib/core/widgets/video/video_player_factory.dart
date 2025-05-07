// Import the appropriate implementation based on the platform
import 'package:portfolio_web/core/widgets/video/stub/stub_video_player_impl.dart'
    if (dart.library.html) 'package:portfolio_web/core/widgets/video/web/web_video_player_impl.dart';
import 'package:portfolio_web/core/widgets/video/video_player_interface.dart';

/// Factory for creating the appropriate VideoPlayerInterface implementation
/// based on the current platform.
class VideoPlayerFactory {
  /// Creates a new instance of VideoPlayerInterface.
  ///
  /// Returns a web implementation on web platforms and a stub implementation
  /// on other platforms.
  static VideoPlayerInterface create() {
    // The conditional import will automatically use the correct implementation
    return createVideoPlayerImpl();
  }
}
