import 'dart:ui';

import 'package:portfolio_web/core/styles/colors/app_colors_scheme.dart';

class AppColorsDark extends AppColorsScheme {
  @override
  Color get primary => const Color.fromARGB(255, 163, 81, 164);

  @override
  Color get secondary => const Color.fromARGB(255, 144, 212, 245);

  @override
  Color get onPrimary => const Color.fromARGB(255, 255, 255, 255);

  @override
  Color get onSecondary => const Color.fromARGB(255, 0, 0, 0);
}
