import 'package:comic_mobile/components/space/spacing_column.dart';
import 'package:flutter/material.dart';

class Section extends StatelessWidget {
  const Section({
    super.key,
    required this.title,
    required this.children,
    this.padding = const EdgeInsets.symmetric(horizontal: 14),
  });

  final String title;
  final List<Widget> children;
  final EdgeInsetsGeometry padding;

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      child: SpacingColumn(
        spacing: 12,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 14),
            child: Text(
              title,
              style: const TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.w500,
              ),
            ),
          ),
          Padding(
            padding: padding,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: children,
            ),
          ),
        ],
      ),
    );
  }
}
