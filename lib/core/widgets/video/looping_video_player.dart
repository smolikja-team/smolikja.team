import 'dart:async';

import 'package:flutter/material.dart';
import 'package:video_player/video_player.dart';

/// A widget that plays a video in an endless loop with seamless transitions.
///
/// This widget optimizes video looping by preloading the next video instance
/// before the current one ends to create a seamless transition.
class LoopingVideoPlayer extends StatefulWidget {
  /// Creates a LoopingVideoPlayer widget.
  ///
  /// [videoUrl] is the URL of the video to play in a loop.
  /// [width] and [height] are optional constraints for the video player.
  /// [fit] determines how the video should be inscribed into the space (defaults to BoxFit.contain).
  const LoopingVideoPlayer({
    super.key,
    required this.videoUrl,
    this.width,
    this.height,
    this.fit = BoxFit.contain,
  });

  /// The URL of the video to play.
  final String videoUrl;

  /// Optional width constraint for the video player.
  final double? width;

  /// Optional height constraint for the video player.
  final double? height;

  /// Optional BoxFit for how the video should be inscribed into the space.
  final BoxFit fit;

  @override
  State<LoopingVideoPlayer> createState() => _LoopingVideoPlayerState();
}

class _LoopingVideoPlayerState extends State<LoopingVideoPlayer> {
  /// Primary video controller
  late VideoPlayerController _controller;

  /// Secondary video controller for seamless transition
  VideoPlayerController? _nextController;

  /// Timer to track when to prepare the next video instance
  Timer? _loopTimer;

  /// Flag to track if we're in the process of switching controllers
  bool _isSwitchingControllers = false;

  @override
  void initState() {
    super.initState();
    _initializeControllers();
  }

  @override
  void didUpdateWidget(LoopingVideoPlayer oldWidget) {
    super.didUpdateWidget(oldWidget);

    // If the video URL changed, reinitialize the controllers
    if (oldWidget.videoUrl != widget.videoUrl) {
      _disposeControllers();
      _initializeControllers();
    }
  }

  /// Initialize the primary video controller and start playback
  Future<void> _initializeControllers() async {
    try {
      // Use networkUrl instead of deprecated network constructor
      _controller =
          VideoPlayerController.networkUrl(
              Uri.parse(widget.videoUrl),
              videoPlayerOptions: VideoPlayerOptions(mixWithOthers: true),
            )
            ..addListener(_checkForEndOfVideo)
            // Set looping directly on the controller as a fallback
            ..setLooping(true);

      // Initialize the controller
      await _controller.initialize();

      // Set volume to ensure audio is playing
      await _controller.setVolume(1.0);

      // Start playing the video
      await _controller.play();

      if (mounted) {
        setState(() {});
      }

      // Debug info in development only
      debugPrint('Video initialized: ${_controller.value.isInitialized}');
      debugPrint('Video playing: ${_controller.value.isPlaying}');
      debugPrint('Video duration: ${_controller.value.duration}');
    } catch (e) {
      debugPrint('Error initializing video controller: $e');
      // If there's an error, we'll show an error message in the build method
      if (mounted) {
        setState(() {});
      }
    }
  }

  /// Check if the video is nearing its end to prepare the next instance
  void _checkForEndOfVideo() {
    if (_isSwitchingControllers || _nextController != null) {
      return;
    }

    // If we're within 500ms of the end, prepare the next video
    final duration = _controller.value.duration;
    final position = _controller.value.position;
    final timeLeft = duration - position;

    if (timeLeft.inMilliseconds < 500 && timeLeft.inMilliseconds > 0) {
      _prepareNextVideo();
    }
  }

  /// Prepare the next video instance for seamless transition
  Future<void> _prepareNextVideo() async {
    try {
      _nextController = VideoPlayerController.networkUrl(
        Uri.parse(widget.videoUrl),
        videoPlayerOptions: VideoPlayerOptions(mixWithOthers: true),
      );

      await _nextController!.initialize();

      // Schedule the switch to the next controller
      _loopTimer = Timer(
        const Duration(milliseconds: 100),
        _switchToNextController,
      );
    } catch (e) {
      debugPrint('Error preparing next video: $e');
      _nextController = null;

      // If preparing the next video fails, just loop the current one
      if (_controller.value.isInitialized && !_controller.value.isLooping) {
        await _controller.setLooping(true);
      }
    }
  }

  /// Switch from the current controller to the next one
  Future<void> _switchToNextController() async {
    if (!mounted || _nextController == null) return;

    _isSwitchingControllers = true;

    // Dispose the old controller
    final oldController = _controller;

    // Switch to the next controller
    _controller = _nextController!;
    _nextController = null;

    // Start playing the new controller
    await _controller.play();

    // Add listener to the new controller
    _controller.addListener(_checkForEndOfVideo);

    // Update the UI
    if (mounted) {
      setState(() {});
    }

    // Dispose the old controller after the switch
    await oldController.dispose();

    _isSwitchingControllers = false;
  }

  @override
  void dispose() {
    _disposeControllers();
    super.dispose();
  }

  /// Clean up all controllers and timers
  void _disposeControllers() {
    _loopTimer?.cancel();
    _controller
      ..removeListener(_checkForEndOfVideo)
      ..dispose();
    _nextController?.dispose();
  }

  @override
  Widget build(BuildContext context) {
    // Show loading indicator while initializing
    if (!_controller.value.isInitialized) {
      return Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const CircularProgressIndicator(),
            const SizedBox(height: 16),
            Text(
              'Loading video...',
              style: Theme.of(context).textTheme.bodyMedium,
            ),
          ],
        ),
      );
    }

    // Check if there was an error with the video
    if (_controller.value.hasError) {
      return Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Icon(Icons.error_outline, color: Colors.red, size: 48),
            const SizedBox(height: 16),
            Text(
              'Error loading video',
              style: Theme.of(
                context,
              ).textTheme.titleMedium?.copyWith(color: Colors.red),
            ),
            const SizedBox(height: 8),
            Text(
              'Please check your internet connection',
              style: Theme.of(context).textTheme.bodyMedium,
            ),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: () {
                // Retry loading the video
                _disposeControllers();
                _initializeControllers();
                setState(() {});
              },
              child: const Text('Retry'),
            ),
          ],
        ),
      );
    }

    // Video is initialized and ready to play
    return SizedBox(
      width: widget.width,
      height: widget.height,
      child: FittedBox(
        fit: widget.fit,
        child: SizedBox(
          width: _controller.value.size.width,
          height: _controller.value.size.height,
          child: VideoPlayer(_controller),
        ),
      ),
    );
  }
}
