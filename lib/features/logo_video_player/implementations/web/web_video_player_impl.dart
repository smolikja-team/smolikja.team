import 'dart:async';

import 'package:flutter/material.dart';
import 'package:portfolio_web/features/logo_video_player/implementations/video_player_interface.dart';
import 'package:web/web.dart';

/// Web implementation of the VideoPlayerInterface using modern web package.
class WebVideoPlayerImpl implements VideoPlayerInterface {
  final Map<String, HTMLVideoElement> _videoElements = {};
  final Map<String, HTMLDivElement> _containerElements = {};
  final Map<String, List<VoidCallback>> _canPlayCallbacks = {};
  final Map<String, List<VoidCallback>> _metadataCallbacks = {};
  final Map<String, List<void Function(String)>> _errorCallbacks = {};

  @override
  String createVideoElement(String url) {
    final id = 'video-${DateTime.now().millisecondsSinceEpoch}-${_videoElements.length}';
    
    // Create video element with cascade notation
    final videoElement = document.createElement('video') as HTMLVideoElement
      ..src = url
      ..autoplay = false
      ..loop = false
      ..muted = true
      ..controls = false
      ..preload = 'auto';
    
    // Set styles with cascade notation
    videoElement.style
      ..border = 'none'
      ..width = '100%'
      ..height = '100%'
      ..position = 'absolute'
      ..top = '0'
      ..left = '0';
    
    _videoElements[id] = videoElement;
    
    // Set up manual event handling
    void handleCanPlay() {
      if (_canPlayCallbacks.containsKey(id)) {
        for (final callback in _canPlayCallbacks[id]!) {
          callback();
        }
      }
    }
    
    void handleMetadata() {
      if (_metadataCallbacks.containsKey(id)) {
        for (final callback in _metadataCallbacks[id]!) {
          callback();
        }
      }
    }
    
    void handleError() {
      if (_errorCallbacks.containsKey(id)) {
        var errorMessage = 'Unknown error';
        final error = videoElement.error;
        if (error != null) {
          switch (error.code) {
            case 1:
              errorMessage = 'The video loading was aborted';
              break;
            case 2:
              errorMessage = 'Network error while loading video';
              break;
            case 3:
              errorMessage = 'Error decoding video';
              break;
            case 4:
              errorMessage = 'Video format not supported';
              break;
          }
        }

        for (final callback in _errorCallbacks[id]!) {
          callback(errorMessage);
        }
      }
    }
    
    // Manually set up event monitoring
    Future.delayed(Duration.zero, () {
      // Check if the video is ready
      if (videoElement.readyState >= 3) { // HAVE_FUTURE_DATA or better
        handleCanPlay();
        handleMetadata();
      }
      
      // Set up a periodic timer to check video state
      Timer.periodic(const Duration(milliseconds: 100), (timer) {
        if (!_videoElements.containsKey(id)) {
          timer.cancel();
          return;
        }
        
        // Check for canplay
        if (videoElement.readyState >= 3) {
          handleCanPlay();
        }
        
        // Check for metadata
        if (videoElement.readyState >= 1) {
          handleMetadata();
        }
        
        // Check for errors
        if (videoElement.error != null) {
          handleError();
          timer.cancel();
        }
      });
    });
    
    return id;
  }

  @override
  void setVideoVisibility(String elementId, bool visible) {
    final element = _videoElements[elementId];
    if (element != null) {
      element.style.opacity = visible ? '1' : '0';
    }
  }

  @override
  void playVideo(String elementId) {
    final element = _videoElements[elementId];
    if (element != null) {
      element.play();
    }
  }

  @override
  void pauseVideo(String elementId) {
    final element = _videoElements[elementId];
    if (element != null) {
      element.pause();
    }
  }

  @override
  void setVideoTime(String elementId, double time) {
    final element = _videoElements[elementId];
    if (element != null) {
      element.currentTime = time;
    }
  }

  @override
  double getVideoTime(String elementId) {
    final element = _videoElements[elementId];
    if (element != null) {
      return element.currentTime;
    }
    return 0.0;
  }

  @override
  double getVideoDuration(String elementId) {
    final element = _videoElements[elementId];
    if (element != null && element.duration.isFinite && element.duration > 0) {
      return element.duration;
    }
    return 0.0;
  }

  @override
  bool isVideoPaused(String elementId) {
    final element = _videoElements[elementId];
    if (element != null) {
      return element.paused;
    }
    return true;
  }

  @override
  void removeVideoElement(String elementId) {
    final element = _videoElements[elementId];
    if (element != null) {
      element
        ..pause()
        ..removeAttribute('src')
        ..load();
        
      if (element.parentNode != null) {
        element.parentNode!.removeChild(element);
      }
      
      _videoElements.remove(elementId);
      _canPlayCallbacks.remove(elementId);
      _metadataCallbacks.remove(elementId);
      _errorCallbacks.remove(elementId);
    }
  }

  @override
  void setVideoStyle(String elementId, {
    BoxFit? fit,
    double? width,
    double? height,
    String? transition,
    double? opacity,
  }) {
    final element = _videoElements[elementId];
    if (element != null) {
      final style = element.style;
      
      if (fit != null) {
        switch (fit) {
          case BoxFit.contain:
            style.objectFit = 'contain';
            break;
          case BoxFit.cover:
            style.objectFit = 'cover';
            break;
          case BoxFit.fill:
            style.objectFit = 'fill';
            break;
          case BoxFit.fitWidth:
          case BoxFit.fitHeight:
            style.objectFit = 'contain';
            break;
          case BoxFit.none:
            style.objectFit = 'none';
            break;
          case BoxFit.scaleDown:
            style.objectFit = 'scale-down';
            break;
        }
      }
      
      if (width != null) {
        style.width = '${width}px';
      }
      
      if (height != null) {
        style.height = '${height}px';
      }
      
      if (transition != null) {
        style.transition = transition;
      }
      
      if (opacity != null) {
        style.opacity = opacity.toString();
      }
    }
  }

  @override
  void onVideoCanPlay(String elementId, VoidCallback callback) {
    if (!_canPlayCallbacks.containsKey(elementId)) {
      _canPlayCallbacks[elementId] = [];
    }
    _canPlayCallbacks[elementId]!.add(callback);
  }

  @override
  void onVideoMetadataLoaded(String elementId, VoidCallback callback) {
    if (!_metadataCallbacks.containsKey(elementId)) {
      _metadataCallbacks[elementId] = [];
    }
    _metadataCallbacks[elementId]!.add(callback);
  }

  @override
  void onVideoError(String elementId, void Function(String errorMessage) callback) {
    if (!_errorCallbacks.containsKey(elementId)) {
      _errorCallbacks[elementId] = [];
    }
    _errorCallbacks[elementId]!.add(callback);
  }

  @override
  String createContainerElement() {
    final id = 'container-${DateTime.now().millisecondsSinceEpoch}-${_containerElements.length}';
    
    final containerElement = document.createElement('div') as HTMLDivElement;
    
    containerElement.style
      ..position = 'relative'
      ..width = '100%'
      ..height = '100%'
      ..overflow = 'hidden';
    
    _containerElements[id] = containerElement;
    
    return id;
  }

  @override
  void addVideoToContainer(String containerId, String videoId) {
    final container = _containerElements[containerId];
    final video = _videoElements[videoId];
    
    if (container != null && video != null) {
      container.appendChild(video);
    }
  }

  @override
  void clearContainer(String containerId) {
    final container = _containerElements[containerId];
    if (container != null) {
      while (container.firstChild != null) {
        container.removeChild(container.firstChild!);
      }
    }
  }

  @override
  String registerViewFactory(String containerId) {
    final viewType = 'video-view-${DateTime.now().millisecondsSinceEpoch}';
    final container = _containerElements[containerId];
    
    if (container != null) {
      // Register the view factory using a direct DOM approach
      try {
        // Create a unique ID for the container
        final uniqueId = 'flutter-view-$viewType';
        container.id = uniqueId;

        // Add the container to the document body
        document.body?.appendChild(container);
        
        // Log success
        debugPrint('Successfully registered view with ID: $uniqueId');
      } catch (e) {
        debugPrint('Error registering view factory: $e');
        // Fallback to direct DOM manipulation if registration fails
        document.body?.appendChild(container);
      }
    }
    
    return viewType;
  }

  @override
  bool get isSupported => true;
}

/// Creates a new instance of WebVideoPlayerImpl.
VideoPlayerInterface createVideoPlayerImpl() {
  return WebVideoPlayerImpl();
}
