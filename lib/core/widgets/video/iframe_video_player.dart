import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:portfolio_web/core/utils/web_interop.dart';

/// A video player that uses an iframe to display video content.
///
/// This approach is extremely reliable for web platforms as it uses
/// the browser's native video capabilities through an iframe.
class IframeVideoPlayer extends StatefulWidget {
  /// Creates an IframeVideoPlayer widget.
  ///
  /// [videoUrl] is the URL of the video to play.
  /// [width] and [height] are optional constraints for the video player.
  const IframeVideoPlayer({
    super.key,
    required this.videoUrl,
    this.width,
    this.height,
  });

  /// The URL of the video to play.
  final String videoUrl;

  /// Optional width constraint for the video player.
  final double? width;

  /// Optional height constraint for the video player.
  final double? height;

  @override
  State<IframeVideoPlayer> createState() => _IframeVideoPlayerState();
}

class _IframeVideoPlayerState extends State<IframeVideoPlayer> {
  late String _viewType;
  dynamic _iframeElement;
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    if (kIsWeb) {
      _initializeIframe();
    }
  }

  void _initializeIframe() {
    // Create a unique ID for the iframe
    _viewType = 'iframe-video-player-${DateTime.now().millisecondsSinceEpoch}';

    // Create the iframe element using our safe web interop utility
    _iframeElement = createIframeElement(
      src: widget.videoUrl,
      allowFullscreen: true,
      allow: 'autoplay; loop; encrypted-media',
    );

    if (_iframeElement != null) {
      // Set styles
      setElementStyle(
        _iframeElement,
        border: 'none',
        width: '100%',
        height: '100%',
      );

      // Add event listener using our safe web interop utility
      addEventListenerToElement(_iframeElement, 'load', () {
        if (mounted) {
          setState(() {
            _isLoading = false;
          });
        }
      });

      // Register the view factory using our safe web interop utility
      registerViewFactory(_viewType, (int viewId) => _iframeElement);
    }

    // Mark as loaded after a timeout as fallback
    Future.delayed(const Duration(seconds: 2), () {
      if (mounted && _isLoading) {
        setState(() {
          _isLoading = false;
        });
      }
    });
  }

  @override
  void didUpdateWidget(IframeVideoPlayer oldWidget) {
    super.didUpdateWidget(oldWidget);

    if (!kIsWeb || _iframeElement == null) return;

    // Update iframe src if videoUrl changed
    if (oldWidget.videoUrl != widget.videoUrl) {
      setState(() {
        _isLoading = true;
      });

      // Create a new iframe element with the updated URL
      _iframeElement = createIframeElement(
        src: widget.videoUrl,
        allowFullscreen: true,
        allow: 'autoplay; loop; encrypted-media',
      );

      if (_iframeElement != null) {
        // Set styles
        setElementStyle(
          _iframeElement,
          border: 'none',
          width: '100%',
          height: '100%',
        );

        // Add event listener
        addEventListenerToElement(_iframeElement, 'load', () {
          if (mounted) {
            setState(() {
              _isLoading = false;
            });
          }
        });

        // Register the view factory
        registerViewFactory(_viewType, (int viewId) => _iframeElement);
      }

      // Mark as loaded after a timeout as fallback
      Future.delayed(const Duration(seconds: 2), () {
        if (mounted && _isLoading) {
          setState(() {
            _isLoading = false;
          });
        }
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    if (!kIsWeb) {
      return const Center(
        child: Text('IframeVideoPlayer is only supported on web platform'),
      );
    }

    return Stack(
      alignment: Alignment.center,
      children: [
        SizedBox(
          width: widget.width,
          height: widget.height,
          child: HtmlElementView(viewType: _viewType),
        ),
        if (_isLoading) const CircularProgressIndicator(),
      ],
    );
  }
}
