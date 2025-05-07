// This file contains the web-specific implementation of web interop functions.
// It is only imported on web platforms.

// ignore: avoid_web_libraries_in_flutter, deprecated_member_use
import 'dart:js' as js;

import 'package:js/js.dart';
import 'package:web/web.dart' as web;

/// Register a view factory for web platform.
void registerViewFactoryImpl(String viewType, Function viewFactory) {
  try {
    // Try to access the Flutter platform view registry directly
    final dynamic flutterViewRegistry =
        js.context['_flutter']?['loader']?['didCreateEngineInitializer'];

    if (flutterViewRegistry != null) {
      // Use the Flutter engine's registry
      final dynamic registry =
          js.context['flutter_inappwebview']?['PlatformViewRegistryImpl'] ??
          js.context['flutter_inappwebview_web']?['PlatformViewRegistryImpl'] ??
          js.context['flutterCanvasKit']?['platformViewRegistry'];

      if (registry != null) {
        registry.callMethod('registerViewFactory', [
          viewType,
          allowInterop((int viewId) => viewFactory(viewId)),
        ]);
        return;
      }
    }

    // Fallback to our custom implementation
    js.context.callMethod('registerViewFactory', [
      viewType,
      allowInterop((int viewId) => viewFactory(viewId)),
    ]);
  } catch (e) {
    // Use console.error instead of print
    js.context['console'].callMethod('error', [
      'Error registering view factory: $e',
    ]);

    // Try one more approach as a last resort
    try {
      js.context.callMethod('eval', [
        "window.flutter_inappwebview.PlatformViewRegistryImpl.registerViewFactory('$viewType', function(viewId) { return arguments[0](viewId); })",
      ]);
    } catch (e) {
      js.context['console'].callMethod('error', [
        'Final fallback for registering view factory failed: $e',
      ]);
    }
  }
}

/// Add an event listener to a web element.
void addEventListenerToElementImpl(
  dynamic element,
  String eventType,
  Function callback,
) {
  try {
    // Try to use the native addEventListener if available
    if (element != null) {
      // Check if element has addEventListener method directly
      try {
        element.callMethod('addEventListener', [
          'test',
          js.allowInterop(() {}),
          false,
        ]);
        element.callMethod('removeEventListener', [
          'test',
          js.allowInterop(() {}),
          false,
        ]);
        element.callMethod('addEventListener', [
          eventType,
          allowInterop((_) => callback()),
        ]);
        return;
      } catch (_) {
        // If direct method call fails, try our custom implementation
      }
    }

    // Fallback to our custom implementation
    js.context.callMethod('addEventListenerToElement', [
      element,
      eventType,
      allowInterop((_) => callback()),
    ]);
  } catch (e) {
    js.context['console'].callMethod('error', [
      'Error adding event listener: $e',
    ]);
  }
}

/// Create a video element for web platform.
web.HTMLVideoElement createVideoElementImpl({
  required String src,
  bool autoplay = true,
  bool loop = true,
  bool muted = false,
  bool controls = false,
}) {
  final videoElement =
      web.document.createElement('video') as web.HTMLVideoElement
        ..src = src
        ..autoplay = autoplay
        ..loop = loop
        ..muted = muted
        ..controls = controls;

  return videoElement;
}

/// Create an iframe element for web platform.
web.HTMLIFrameElement createIframeElementImpl({
  required String src,
  bool allowFullscreen = true,
  String allow = 'autoplay; loop; encrypted-media',
}) {
  final iframeElement =
      web.document.createElement('iframe') as web.HTMLIFrameElement
        ..src = src
        ..allow = allow;

  if (allowFullscreen) {
    iframeElement.setAttribute('allowfullscreen', 'true');
  }

  return iframeElement;
}

/// Set style properties on a web element.
void setElementStyleImpl(
  dynamic element, {
  String? border,
  String? width,
  String? height,
  String? objectFit,
}) {
  try {
    // Try to set style properties directly
    if (element != null) {
      try {
        final style = element['style'];
        if (style != null) {
          if (border != null) style['border'] = border;
          if (width != null) style['width'] = width;
          if (height != null) style['height'] = height;
          if (objectFit != null) style['objectFit'] = objectFit;
          return;
        }
      } catch (_) {
        // If direct property access fails, try our custom implementation
      }
    }

    // Fallback to our custom implementation
    js.context.callMethod('setElementStyle', [
      element,
      border,
      width,
      height,
      objectFit,
    ]);
  } catch (e) {
    js.context['console'].callMethod('error', [
      'Error setting element style: $e',
    ]);
  }
}
