import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:portfolio_web/core/navigation/routes/routes.dart';
import 'package:portfolio_web/features/main_page/main_page.dart';

extension RoutesBuilder on Routes {
  /// Get GoRoute for the Route
  GoRoute getRoute() {
    switch (this) {
      case Routes.mainPage:
        return _mainPage;
    }
  }

  // MARK: - Main Page
  static final GoRoute _mainPage = GoRoute(
    name: Routes.mainPage.name,
    path: Routes.mainPage.path,
    builder: (BuildContext context, GoRouterState state) => const MainPage(),
  );
}
