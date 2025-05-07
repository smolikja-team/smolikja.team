import 'dart:html' as html;
import 'dart:ui_web' as ui_web;

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

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
  html.IFrameElement? _iframeElement;
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
    
    // Create the iframe element
    _iframeElement = html.IFrameElement()
      ..src = widget.videoUrl
      ..style.border = 'none'
      ..style.width = '100%'
      ..style.height = '100%'
      ..allow = 'autoplay; loop; encrypted-media'
      ..allowFullscreen = true;
    
    // Add event listeners
    _iframeElement!.onLoad.listen((event) {
      if (mounted) {
        setState(() {
          _isLoading = false;
        });
      }
    });
    
    // Register the view factory
    ui_web.platformViewRegistry.registerViewFactory(
      _viewType,
      (int viewId) => _iframeElement!,
    );
  }
  
  @override
  void didUpdateWidget(IframeVideoPlayer oldWidget) {
    super.didUpdateWidget(oldWidget);
    
    if (!kIsWeb || _iframeElement == null) return;
    
    // Update iframe src if videoUrl changed
    if (oldWidget.videoUrl != widget.videoUrl) {
      _iframeElement!.src = widget.videoUrl;
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
        if (_isLoading)
          const CircularProgressIndicator(),
      ],
    );
  }
}
