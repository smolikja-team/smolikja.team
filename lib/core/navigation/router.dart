import 'package:go_router/go_router.dart';
import 'package:portfolio_web/core/navigation/routes/routes.dart';
import 'package:portfolio_web/core/navigation/routes/routes_builder.dart';

final router = GoRouter(
  initialLocation: Routes.mainPage.fullPath,
  routes: <RouteBase>[Routes.mainPage.getRoute()],
  // TODO: Add error page
  // errorBuilder:
  //     (context, state) =>
  //         ErrorPage(error: 'Page was not found.', stack: StackTrace.current),
);
