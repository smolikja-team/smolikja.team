import 'package:flutter/material.dart';
import 'package:portfolio_web/l10n/extension.dart';

class MainPage extends StatelessWidget {
  const MainPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Placeholder(child: Center(child: Text(context.l10n.hello_world)));
  }
}
