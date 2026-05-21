import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'token_models.dart';
import 'uzapoint_theme.dart';

class ThemeController extends ChangeNotifier {
  ThemeController();

  static const _key = 'uzapoint_theme_mode';

  UzapointTokens? tokens;
  ThemeMode themeMode = ThemeMode.system;
  bool isReady = false;

  Future<void> init() async {
    tokens = await UzapointTokens.load();
    final prefs = await SharedPreferences.getInstance();
    final stored = prefs.getString(_key);
    themeMode = switch (stored) {
      'light' => ThemeMode.light,
      'dark' => ThemeMode.dark,
      _ => ThemeMode.system,
    };
    isReady = true;
    notifyListeners();
  }

  Future<void> setThemeMode(ThemeMode mode) async {
    themeMode = mode;
    notifyListeners();
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(
      _key,
      switch (mode) {
        ThemeMode.light => 'light',
        ThemeMode.dark => 'dark',
        ThemeMode.system => 'system',
      },
    );
  }

  ThemeData themeFor(Brightness brightness) {
    return UzapointTheme.build(tokens: tokens!, brightness: brightness);
  }
}
