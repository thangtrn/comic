import 'package:comic_mobile/components/app_image.dart';
import 'package:comic_mobile/components/space/spacing_column.dart';
import 'package:comic_mobile/components/space/spacing_row.dart';
import 'package:comic_mobile/constants/app_colors.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class HorizontalCard extends StatelessWidget {
  const HorizontalCard({super.key, this.height = 100});
  final double height;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      splashFactory: InkSparkle.splashFactory,
      onTap: () {},
      child: Container(
        height: height,
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
        child: SpacingRow(
          spacing: 10,
          children: [
            const AppImage(
              url:
                  'https://vnw-img-cdn.popsww.com/api/v2/containers/file2/cms_thumbnails/bundle_size_d_c-8b9561b44939-1701764900292-O427I0Jx.png',
            ),
            Expanded(
              child: SpacingColumn(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  SpacingColumn(
                    spacing: 4,
                    children: [
                      const Text(
                        "One punch main",
                        maxLines: 1,
                        style: TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.w500,
                          height: 1.1,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                      _smallText(
                          'Onepunch-Man là một Manga thể loại siêu anh hùng với đặc trưng phồng tôm'
                          ' đấm phát chết luôn… Lol!!! Nhân vật chính trong Onepunch-man là Saitama.',
                          maxLines: 2),
                    ],
                  ), // need break 2 line
                  SpacingRow(
                    spacing: 6,
                    children: [
                      _smallIconText(icon: CupertinoIcons.eye, text: '1M'),
                      _smallIconText(icon: Icons.favorite, text: '1M'),
                      _smallIconText(
                          icon: CupertinoIcons.list_bullet, text: '35'),
                    ],
                  )
                ],
              ),
            )
          ],
        ),
      ),
    );
  }

  Widget _smallText(String text, {int? maxLines}) {
    return Text(
      text,
      maxLines: maxLines,
      overflow: maxLines != null ? TextOverflow.ellipsis : null,
      style: const TextStyle(
        fontSize: 12,
        color: AppColors.subtext,
        height: 1.1,
        fontWeight: FontWeight.w300,
      ),
    );
  }

  Widget _smallIconText({required IconData icon, required String text}) {
    return SpacingRow(
      spacing: 2,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Icon(
          icon,
          size: 14,
          color: AppColors.subtext,
        ),
        _smallText(text)
      ],
    );
  }
}
