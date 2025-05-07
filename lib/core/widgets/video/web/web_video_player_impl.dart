// This file contains web-specific implementation
// It should only be imported conditionally

import 'dart:html' as html;
import 'dart:ui' as ui;

import 'package:flutter/material.dart';
import 'package:portfolio_web/core/widgets/video/video_player_interface.dart';

/// Web implementation of the VideoPlayerInterface.
class WebVideoPlayerImpl implements VideoPlayerInterface {
  final Map<String, html.VideoElement> _videoElements = {};
  final Map<String, html.DivElement> _containerElements = {};
  final Map<String, List<VoidCallback>> _canPlayCallbacks = {};
  final Map<String, List<VoidCallback>> _metadataCallbacks = {};
  final Map<String, List<void Function(String)>> _errorCallbacks = {};

  @override
  String createVideoElement(String url) {
    final id =
        'video-${DateTime.now().millisecondsSinceEpoch}-${_videoElements.length}';

    final videoElement =
        html.VideoElement()
          ..src = url
          ..autoplay = false
          ..loop = false
          ..muted = true
          ..controls = false
          ..preload = 'auto'
          ..style.border = 'none'
          ..style.width = '100%'
          ..style.height = '100%'
          ..style.position = 'absolute'
          ..style.top = '0'
          ..style.left = '0';

    _videoElements[id] = videoElement;

    // Set up event listeners
    videoElement.onCanPlay.listen((_) {
      if (_canPlayCallbacks.containsKey(id)) {
        for (final callback in _canPlayCallbacks[id]!) {
          callback();
        }
      }
    });

    videoElement.onLoadedMetadata.listen((_) {
      if (_metadataCallbacks.containsKey(id)) {
        for (final callback in _metadataCallbacks[id]!) {
          callback();
        }
      }
    });

    videoElement.onError.listen((_) {
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
      return element.currentTime.toDouble();
    }
    return 0.0;
  }

  @override
  double getVideoDuration(String elementId) {
    final element = _videoElements[elementId];
    if (element != null && element.duration.isFinite && element.duration > 0) {
      return element.duration.toDouble();
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
        ..load()
        ..remove();
      _videoElements.remove(elementId);
      _canPlayCallbacks.remove(elementId);
      _metadataCallbacks.remove(elementId);
      _errorCallbacks.remove(elementId);
    }
  }

  @override
  void setVideoStyle(
    String elementId, {
    BoxFit? fit,
    double? width,
    double? height,
    String? transition,
    double? opacity,
  }) {
    final element = _videoElements[elementId];
    if (element != null) {
      if (fit != null) {
        switch (fit) {
          case BoxFit.contain:
            element.style.objectFit = 'contain';
            break;
          case BoxFit.cover:
            element.style.objectFit = 'cover';
            break;
          case BoxFit.fill:
            element.style.objectFit = 'fill';
            break;
          case BoxFit.fitWidth:
          case BoxFit.fitHeight:
            element.style.objectFit = 'contain';
            break;
          case BoxFit.none:
            element.style.objectFit = 'none';
            break;
          case BoxFit.scaleDown:
            element.style.objectFit = 'scale-down';
            break;
        }
      }

      if (width != null) {
        element.style.width = '${width}px';
      }

      if (height != null) {
        element.style.height = '${height}px';
      }

      if (transition != null) {
        element.style.transition = transition;
      }

      if (opacity != null) {
        element.style.opacity = opacity.toString();
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
  void onVideoError(
    String elementId,
    void Function(String errorMessage) callback,
  ) {
    if (!_errorCallbacks.containsKey(elementId)) {
      _errorCallbacks[elementId] = [];
    }
    _errorCallbacks[elementId]!.add(callback);
  }

  @override
  String createContainerElement() {
    final id =
        'container-${DateTime.now().millisecondsSinceEpoch}-${_containerElements.length}';

    final containerElement =
        html.DivElement()
          ..style.position = 'relative'
          ..style.width = '100%'
          ..style.height = '100%'
          ..style.overflow = 'hidden';

    _containerElements[id] = containerElement;

    return id;
  }

  @override
  void addVideoToContainer(String containerId, String videoId) {
    final container = _containerElements[containerId];
    final video = _videoElements[videoId];

    if (container != null && video != null) {
      container.append(video);
    }
  }

  @override
  void clearContainer(String containerId) {
    final container = _containerElements[containerId];
    if (container != null) {
      container.innerHtml = '';
    }
  }

  @override
  String registerViewFactory(String containerId) {
    final viewType = 'video-view-${DateTime.now().millisecondsSinceEpoch}';
    final container = _containerElements[containerId];

    if (container != null) {
      // Register the view factory
      // ignore: undefined_prefixed_name
      ui.platformViewRegistry.registerViewFactory(
        viewType,
        (int viewId) => container,
      );
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
