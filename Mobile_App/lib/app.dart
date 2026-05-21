import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import 'core/routing/app_router.dart';
import 'core/theme/theme_controller.dart';
import 'state/cart_notifier.dart';
import 'state/sync_queue_notifier.dart';

class UzapointApp extends StatefulWidget {
  const UzapointApp({super.key});

  @override
  State<UzapointApp> createState() => _UzapointAppState();
}

class _UzapointAppState extends State<UzapointApp> {
  late final ThemeController _themeController;
  late final SyncQueueNotifier _syncQueue;
  late final GoRouter _router;

  @override
  void initState() {
    super.initState();
    _themeController = ThemeController()..init();
    _syncQueue = SyncQueueNotifier()..init();
    _router = createAppRouter();
  }

  @override
  void dispose() {
    _themeController.dispose();
    _syncQueue.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider.value(value: _themeController),
        ChangeNotifierProvider.value(value: _syncQueue),
        ChangeNotifierProvider(create: (_) => CartNotifier()),
      ],
      child: Consumer<ThemeController>(
        builder: (context, theme, _) {
          if (!theme.isReady) {
            return const MaterialApp(
              home: Scaffold(
                body: Center(child: CircularProgressIndicator()),
              ),
            );
          }

          return MaterialApp.router(
            title: 'Uzapoint',
            debugShowCheckedModeBanner: false,
            themeMode: theme.themeMode,
            theme: theme.themeFor(Brightness.light),
            darkTheme: theme.themeFor(Brightness.dark),
            routerConfig: _router,
          );
        },
      ),
    );
  }
}
