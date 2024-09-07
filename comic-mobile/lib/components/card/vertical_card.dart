import 'dart:math';
import 'package:comic_mobile/components/app_image.dart';
import 'package:comic_mobile/components/scale_tap.dart';
import 'package:comic_mobile/components/space/spacing_column.dart';
import 'package:comic_mobile/constants/app_colors.dart';
import 'package:flutter/material.dart';

class VerticalCard extends StatefulWidget {
  const VerticalCard({super.key});

  @override
  State<VerticalCard> createState() => _VerticalCardState();
}

class _VerticalCardState extends State<VerticalCard> {
  final int intValue = 1 + Random().nextInt(2);

  @override
  Widget build(BuildContext context) {
    return ScaleTap(
      onTap: () {},
      child: SpacingColumn(
        spacing: 6,
        children: [
          // AspectRatio(
          //   aspectRatio: 3 / 4,
          //   child: ClipRRect(
          //     borderRadius: BorderRadius.circular(8),
          //     child: Image.asset(
          //       'assets/images/thumbnail-$intValue.jpg',
          //       fit: BoxFit.cover,
          //     ),
          //   ),
          // ),
          const AppImage(
            borderRadius: 8,
            url:
                'https://www.netabooks.vn/Data/Sites/1/Product/34220/doraemon-truyen-ngan-tap-7.jpg',
          ),
          Text(
            intValue % 2 == 0
                ? "Tận Thế Người Trần"
                : "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            maxLines: 2,
            style: const TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.w500,
              height: 1.1,
              overflow: TextOverflow.ellipsis,
            ),
          ),
          const Text(
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            maxLines: 1,
            style: TextStyle(
              fontSize: 12,
              color: AppColors.subtext,
              overflow: TextOverflow.ellipsis,
              fontWeight: FontWeight.w300,
            ),
          )
        ],
      ),
    );
  }
}
