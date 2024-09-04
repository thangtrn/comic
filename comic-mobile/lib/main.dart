import 'package:comic_mobile/constants/app_theme.dart';
import 'package:comic_mobile/routes/app_router.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

void main() {
  SystemChrome.setSystemUIOverlayStyle(const SystemUiOverlayStyle(
    statusBarColor: Colors.transparent,
  ));
  runApp(App());
}

class App extends StatelessWidget {
  App({super.key});

  final _appRouter = AppRouter();

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: 'Comic app',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.theme,
      routerConfig: _appRouter.config(),
    );
  }
}
