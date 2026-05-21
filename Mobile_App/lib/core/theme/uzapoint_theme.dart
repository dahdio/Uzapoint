import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_fonts/google_fonts.dart';

import 'token_models.dart';
import 'uzapoint_colors.dart';

class UzapointTheme {
  static ThemeData build({
    required UzapointTokens tokens,
    required Brightness brightness,
  }) {
    final isDark = brightness == Brightness.dark;
    final palette = isDark ? tokens.dark : tokens.light;
    final semantic = isDark ? tokens.semanticDark : tokens.semanticLight;
    final chartHex = isDark ? tokens.chartDark : tokens.chartLight;

    final colors = UzapointColors.fromTokens(
      palette: palette,
      semantic: semantic,
      chartHex: chartHex,
    );
    final radii = UzapointRadii.fromTokens(tokens.radius);
    final spacing = UzapointSpacing.fromTokens(tokens.spacing);

    final textTheme = _textTheme(colors);

    return ThemeData(
      useMaterial3: true,
      brightness: brightness,
      scaffoldBackgroundColor: colors.background,
      canvasColor: colors.background,
      colorScheme: ColorScheme(
        brightness: brightness,
        primary: colors.primary,
        onPrimary: colors.primaryForeground,
        secondary: colors.secondary,
        onSecondary: colors.secondaryForeground,
        surface: colors.card,
        onSurface: colors.cardForeground,
        error: colors.destructive,
        onError: colors.destructiveForeground,
      ),
      dividerColor: colors.border,
      textTheme: textTheme,
      appBarTheme: AppBarTheme(
        elevation: 0,
        scrolledUnderElevation: 0,
        backgroundColor: Colors.transparent,
        foregroundColor: colors.foreground,
        systemOverlayStyle: isDark
            ? SystemUiOverlayStyle.light
            : SystemUiOverlayStyle.dark,
        titleTextStyle: textTheme.titleMedium,
      ),
      cardTheme: CardThemeData(
        color: colors.card,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: radii.baseRadius,
          side: BorderSide(color: colors.border),
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: colors.background,
        contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
        border: OutlineInputBorder(
          borderRadius: radii.baseRadius,
          borderSide: BorderSide(color: colors.input),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: radii.baseRadius,
          borderSide: BorderSide(color: colors.input),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: radii.baseRadius,
          borderSide: BorderSide(color: colors.ring, width: 1.5),
        ),
        hintStyle: textTheme.bodyMedium?.copyWith(color: colors.mutedForeground),
      ),
      switchTheme: SwitchThemeData(
        thumbColor: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.selected)) {
            return colors.primaryForeground;
          }
          return colors.mutedForeground;
        }),
        trackColor: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.selected)) {
            return colors.primary;
          }
          return colors.muted;
        }),
      ),
      snackBarTheme: SnackBarThemeData(
        backgroundColor: colors.foreground,
        contentTextStyle: textTheme.bodyMedium?.copyWith(
          color: colors.background,
        ),
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: radii.baseRadius),
      ),
      extensions: [colors, radii, spacing],
    );
  }

  static TextTheme _textTheme(UzapointColors colors) {
    final base = GoogleFonts.interTextTheme();
    return base.copyWith(
      displayLarge: base.displayLarge?.copyWith(
        fontSize: 28,
        fontWeight: FontWeight.w700,
        color: colors.foreground,
        height: 1.2,
      ),
      titleLarge: base.titleLarge?.copyWith(
        fontSize: 22,
        fontWeight: FontWeight.w600,
        color: colors.foreground,
        height: 1.25,
      ),
      titleMedium: base.titleMedium?.copyWith(
        fontSize: 17,
        fontWeight: FontWeight.w600,
        color: colors.foreground,
        height: 1.3,
      ),
      bodyLarge: base.bodyLarge?.copyWith(
        fontSize: 16,
        fontWeight: FontWeight.w400,
        color: colors.foreground,
        height: 1.5,
      ),
      bodyMedium: base.bodyMedium?.copyWith(
        fontSize: 15,
        fontWeight: FontWeight.w400,
        color: colors.foreground,
        height: 1.45,
      ),
      labelLarge: base.labelLarge?.copyWith(
        fontSize: 14,
        fontWeight: FontWeight.w500,
        color: colors.foreground,
      ),
      labelSmall: base.labelSmall?.copyWith(
        fontSize: 12,
        fontWeight: FontWeight.w500,
        color: colors.mutedForeground,
      ),
    );
  }
}
