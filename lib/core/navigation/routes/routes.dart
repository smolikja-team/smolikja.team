abstract class RoutesInterface {
  /// Path of the route
  String get path;

  /// Full path of the route
  /// This is the path that will be used to navigate to the route
  String get fullPath;
}

enum Routes implements RoutesInterface {
  mainPage('/');

  const Routes(this.path);

  @override
  final String path;

  @override
  String get fullPath => path;
}
