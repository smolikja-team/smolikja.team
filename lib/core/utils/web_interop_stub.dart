// This file contains stub implementations of web interop functions
// for non-web platforms. These functions do nothing and are only used
// to satisfy the compiler.

/// Stub implementation of registerViewFactory for non-web platforms.
void registerViewFactoryImpl(String viewType, Function viewFactory) {
  // Do nothing on non-web platforms
}

/// Stub implementation of addEventListenerToElement for non-web platforms.
void addEventListenerToElementImpl(
  dynamic element,
  String eventType,
  Function callback,
) {
  // Do nothing on non-web platforms
}

/// Stub implementation of createVideoElement for non-web platforms.
dynamic createVideoElementImpl({
  required String src,
  bool autoplay = true,
  bool loop = true,
  bool muted = false,
  bool controls = false,
}) {
  // Return null on non-web platforms
  return null;
}

/// Stub implementation of createIframeElement for non-web platforms.
dynamic createIframeElementImpl({
  required String src,
  bool allowFullscreen = true,
  String allow = 'autoplay; loop; encrypted-media',
}) {
  // Return null on non-web platforms
  return null;
}

/// Stub implementation of setElementStyle for non-web platforms.
void setElementStyleImpl(
  dynamic element, {
  String? border,
  String? width,
  String? height,
  String? objectFit,
}) {
  // Do nothing on non-web platforms
}
