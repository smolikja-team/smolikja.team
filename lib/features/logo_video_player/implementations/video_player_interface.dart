import 'package:flutter/material.dart';

/// Interface for video player implementations.
/// This allows us to create platform-specific implementations
/// without directly importing platform-specific libraries.
abstract class VideoPlayerInterface {
  /// Creates a video element with the given URL.
  /// Returns a unique identifier for the created element.
  String createVideoElement(String url);
  
  /// Sets the video element to be visible or hidden.
  void setVideoVisibility(String elementId, bool visible);
  
  /// Plays the video with the given element ID.
  void playVideo(String elementId);
  
  /// Pauses the video with the given element ID.
  void pauseVideo(String elementId);
  
  /// Sets the current time of the video.
  void setVideoTime(String elementId, double time);
  
  /// Gets the current time of the video.
  double getVideoTime(String elementId);
  
  /// Gets the duration of the video.
  double getVideoDuration(String elementId);
  
  /// Checks if the video is paused.
  bool isVideoPaused(String elementId);
  
  /// Removes the video element from the DOM.
  void removeVideoElement(String elementId);
  
  /// Sets the style of the video element.
  void setVideoStyle(String elementId, {
    BoxFit? fit,
    double? width,
    double? height,
    String? transition,
    double? opacity,
  });
  
  /// Registers a callback to be called when the video can play.
  void onVideoCanPlay(String elementId, VoidCallback callback);
  
  /// Registers a callback to be called when the video metadata is loaded.
  void onVideoMetadataLoaded(String elementId, VoidCallback callback);
  
  /// Registers a callback to be called when the video has an error.
  void onVideoError(String elementId, void Function(String errorMessage) callback);
  
  /// Creates a container element to hold multiple video elements.
  /// Returns a unique identifier for the created container.
  String createContainerElement();
  
  /// Adds a video element to a container element.
  void addVideoToContainer(String containerId, String videoId);
  
  /// Clears all elements from a container.
  void clearContainer(String containerId);
  
  /// Registers a Flutter widget to display the container element.
  /// Returns a unique view type identifier for use with HtmlElementView.
  String registerViewFactory(String containerId);
  
  /// Checks if the current platform is supported by this implementation.
  bool get isSupported;
}
