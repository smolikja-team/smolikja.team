import 'package:go_router/go_router.dart';
import 'package:portfolio_web/core/navigation/error_page.dart';
import 'package:portfolio_web/core/navigation/routes/routes.dart';
import 'package:portfolio_web/core/navigation/routes/routes_builder.dart';

final router = GoRouter(
  initialLocation: Routes.mainPage.fullPath,
  routes: <RouteBase>[Routes.mainPage.getRoute()],
  errorBuilder:
      (context, state) => ErrorPage(
        error: 'Page not found: ${state.uri.path}',
        stack: StackTrace.current,
      ),
);
