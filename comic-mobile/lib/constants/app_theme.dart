import 'package:comic_mobile/constants/app_colors.dart';
import 'package:flutter/material.dart';

class AppTheme {
  static final theme = ThemeData(
    useMaterial3: false,
    fontFamily: 'Roboto',
    brightness: Brightness.dark,
    scaffoldBackgroundColor: AppColors.background,
    bottomNavigationBarTheme: const BottomNavigationBarThemeData(
      backgroundColor: AppColors.background,
      unselectedItemColor: AppColors.subtext,
      selectedItemColor: AppColors.primary,
    ),
  );
}
