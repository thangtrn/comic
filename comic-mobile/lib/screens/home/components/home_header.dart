import 'package:comic_mobile/constants/app_colors.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class HomeHeader extends StatelessWidget {
  const HomeHeader({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      padding: const EdgeInsets.symmetric(horizontal: 12),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          const Text(
            'Đề xuất',
            style: TextStyle(
                color: AppColors.text,
                fontSize: 26,
                fontWeight: FontWeight.w500),
          ),
          Row(
            children: [
              _iconButton(CupertinoIcons.bell, onTap: _onSearchPressed),
              const SizedBox(width: 4),
              _iconButton(CupertinoIcons.search, onTap: _onSearchPressed),
            ],
          )
        ],
      ),
    );
  }

  void _onSearchPressed() {}

  Widget _iconButton(IconData icon, {VoidCallback? onTap}) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(20),
      child: SizedBox(
        height: 40,
        width: 40,
        child: Icon(
          icon,
          size: 26,
        ),
      ),
    );
  }
}