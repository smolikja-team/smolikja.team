// This file provides a safe way to use web-specific functionality
// with proper conditional imports to avoid issues on non-web platforms.

import 'package:flutter/foundation.dart';

// Conditional imports based on platform
import 'package:portfolio_web/core/utils/web_interop_web.dart'
    if (dart.library.io) 'package:portfolio_web/core/utils/web_interop_stub.dart';

/// Register a view factory for web platform.
///
/// This is a safe wrapper around the platform-specific implementation.
/// On non-web platforms, this is a no-op.
void registerViewFactory(String viewType, Function viewFactory) {
  if (kIsWeb) {
    registerViewFactoryImpl(viewType, viewFactory);
  }
}

/// Add an event listener to a web element.
///
/// This is a safe wrapper around the platform-specific implementation.
/// On non-web platforms, this is a no-op.
void addEventListenerToElement(
  dynamic element,
  String eventType,
  Function callback,
) {
  if (kIsWeb) {
    addEventListenerToElementImpl(element, eventType, callback);
  }
}

/// Create a video element for web platform.
///
/// This is a safe wrapper around the platform-specific implementation.
/// On non-web platforms, this returns null.
dynamic createVideoElement({
  required String src,
  bool autoplay = true,
  bool loop = true,
  bool muted = false,
  bool controls = false,
}) {
  if (kIsWeb) {
    return createVideoElementImpl(
      src: src,
      autoplay: autoplay,
      loop: loop,
      muted: muted,
      controls: controls,
    );
  }
  return null;
}

/// Create an iframe element for web platform.
///
/// This is a safe wrapper around the platform-specific implementation.
/// On non-web platforms, this returns null.
dynamic createIframeElement({
  required String src,
  bool allowFullscreen = true,
  String allow = 'autoplay; loop; encrypted-media',
}) {
  if (kIsWeb) {
    return createIframeElementImpl(
      src: src,
      allowFullscreen: allowFullscreen,
      allow: allow,
    );
  }
  return null;
}

/// Set style properties on a web element.
///
/// This is a safe wrapper around the platform-specific implementation.
/// On non-web platforms, this is a no-op.
void setElementStyle(
  dynamic element, {
  String? border,
  String? width,
  String? height,
  String? objectFit,
}) {
  if (kIsWeb && element != null) {
    setElementStyleImpl(
      element,
      border: border,
      width: width,
      height: height,
      objectFit: objectFit,
    );
  }
}
