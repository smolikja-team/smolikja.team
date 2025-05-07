// This file contains JavaScript functions for video interop

// Register a view factory for Flutter web
window.registerViewFactory = function(viewType, viewFactory) {
  // Access the Flutter platform view registry
  const platformViewRegistry = window.flutter_inappwebview?.PlatformViewRegistryImpl || 
                              window.flutter_inappwebview_web?.PlatformViewRegistryImpl || 
                              window._flutter?.loader?.didCreateEngineInitializer?.().then((initializer) => {
                                return initializer.initializeEngine().then((appRunner) => {
                                  return appRunner.runApp();
                                });
                              }) ||
                              window.flutterCanvasKit?.platformViewRegistry;
  
  if (platformViewRegistry && platformViewRegistry.registerViewFactory) {
    platformViewRegistry.registerViewFactory(viewType, viewFactory);
  } else {
    console.error('Flutter platform view registry not found');
  }
};

// Add an event listener to an element
window.addEventListenerToElement = function(element, eventType, callback) {
  if (element && typeof element.addEventListener === 'function') {
    element.addEventListener(eventType, callback);
  } else {
    console.error('Cannot add event listener to element', element);
  }
};

// Set style properties on an element
window.setElementStyle = function(element, border, width, height, objectFit) {
  if (element && element.style) {
    if (border) element.style.border = border;
    if (width) element.style.width = width;
    if (height) element.style.height = height;
    if (objectFit) element.style.objectFit = objectFit;
  } else {
    console.error('Cannot set style on element', element);
  }
};
