import 'package:flutter/material.dart';

import 'package:portfolio_web/core/styles/colors/app_colors_dart.dart';
import 'package:portfolio_web/core/styles/colors/app_colors_light.dart';
import 'package:portfolio_web/core/styles/colors/app_colors_scheme.dart';

class AppColors implements AppColorsScheme {
  factory AppColors() {
    return _appColors;
  }
  AppColors._internal();
  static final AppColors _appColors = AppColors._internal();

  AppColorsScheme _currentScheme = AppColorsLight();

  // This method is never called in the app yet
  void setTheme(ThemeMode themeMode) {
    _currentScheme =
        themeMode == ThemeMode.dark ? AppColorsDark() : AppColorsLight();
  }

  @override
  Color get primary => _currentScheme.primary;

  @override
  Color get secondary => _currentScheme.secondary;

  @override
  Color get onPrimary => _currentScheme.onPrimary;

  @override
  Color get onSecondary => _currentScheme.onSecondary;
}
