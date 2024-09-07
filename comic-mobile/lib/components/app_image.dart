import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';

class AppImage extends StatelessWidget {
  final String url;
  final double aspectRatio;
  final double borderRadius;

  const AppImage({
    super.key,
    required this.url,
    this.aspectRatio = 3 / 4,
    this.borderRadius = 4.0,
  });

  @override
  Widget build(BuildContext context) {
    return AspectRatio(
      aspectRatio: aspectRatio,
      child: ClipRRect(
        borderRadius: BorderRadius.circular(borderRadius),
        child: CachedNetworkImage(
          imageUrl: url,
          fit: BoxFit.cover,
          progressIndicatorBuilder: (context, url, downloadProgress) {
            return Center(
              child: LinearProgressIndicator(value: downloadProgress.progress),
            );
          },
          errorWidget: (context, url, error) => const Icon(Icons.error),
        ),
      ),
    );
  }
}
