import 'package:flutter/material.dart';
import 'package:portfolio_web/features/logo_video_player/implementations/video_player_interface.dart';

/// Stub implementation of the VideoPlayerInterface for non-web platforms.
/// This implementation does nothing and is used as a fallback.
class StubVideoPlayerImpl implements VideoPlayerInterface {
  @override
  String createVideoElement(String url) {
    return 'stub-video';
  }

  @override
  void setVideoVisibility(String elementId, bool visible) {
    // Do nothing
  }

  @override
  void playVideo(String elementId) {
    // Do nothing
  }

  @override
  void pauseVideo(String elementId) {
    // Do nothing
  }

  @override
  void setVideoTime(String elementId, double time) {
    // Do nothing
  }

  @override
  double getVideoTime(String elementId) {
    return 0.0;
  }

  @override
  double getVideoDuration(String elementId) {
    return 0.0;
  }

  @override
  bool isVideoPaused(String elementId) {
    return true;
  }

  @override
  void removeVideoElement(String elementId) {
    // Do nothing
  }

  @override
  void setVideoStyle(String elementId, {
    BoxFit? fit,
    double? width,
    double? height,
    String? transition,
    double? opacity,
  }) {
    // Do nothing
  }

  @override
  void onVideoCanPlay(String elementId, VoidCallback callback) {
    // Do nothing
  }

  @override
  void onVideoMetadataLoaded(String elementId, VoidCallback callback) {
    // Do nothing
  }

  @override
  void onVideoError(String elementId, void Function(String errorMessage) callback) {
    // Do nothing
  }

  @override
  String createContainerElement() {
    return 'stub-container';
  }

  @override
  void addVideoToContainer(String containerId, String videoId) {
    // Do nothing
  }

  @override
  void clearContainer(String containerId) {
    // Do nothing
  }

  @override
  String registerViewFactory(String containerId) {
    return 'stub-view-type';
  }

  @override
  bool get isSupported => false;
}

/// Creates a new instance of StubVideoPlayerImpl.
VideoPlayerInterface createVideoPlayerImpl() {
  return StubVideoPlayerImpl();
}
