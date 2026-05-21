import 'dart:convert';

import 'package:flutter/services.dart';

class UzapointTokens {
  const UzapointTokens({
    required this.radius,
    required this.spacing,
    required this.motion,
    required this.light,
    required this.dark,
    required this.chartLight,
    required this.chartDark,
    required this.semanticLight,
    required this.semanticDark,
  });

  final TokenRadius radius;
  final TokenSpacing spacing;
  final TokenMotion motion;
  final TokenPalette light;
  final TokenPalette dark;
  final List<String> chartLight;
  final List<String> chartDark;
  final TokenSemantic semanticLight;
  final TokenSemantic semanticDark;

  static Future<UzapointTokens> load() async {
    final raw = await rootBundle.loadString('assets/uzapoint_tokens.json');
    final json = jsonDecode(raw) as Map<String, dynamic>;
    return UzapointTokens.fromJson(json);
  }

  factory UzapointTokens.fromJson(Map<String, dynamic> json) {
    final chart = json['chart'] as Map<String, dynamic>;
    final semantic = json['semantic'] as Map<String, dynamic>;
    return UzapointTokens(
      radius: TokenRadius.fromJson(json['radius'] as Map<String, dynamic>),
      spacing: TokenSpacing.fromJson(json['spacing'] as Map<String, dynamic>),
      motion: TokenMotion.fromJson(json['motion'] as Map<String, dynamic>),
      light: TokenPalette.fromJson(json['light'] as Map<String, dynamic>),
      dark: TokenPalette.fromJson(json['dark'] as Map<String, dynamic>),
      chartLight: List<String>.from(chart['light'] as List),
      chartDark: List<String>.from(chart['dark'] as List),
      semanticLight:
          TokenSemantic.fromJson(semantic['light'] as Map<String, dynamic>),
      semanticDark:
          TokenSemantic.fromJson(semantic['dark'] as Map<String, dynamic>),
    );
  }
}

class TokenRadius {
  const TokenRadius({
    required this.base,
    required this.sm,
    required this.md,
    required this.lg,
    required this.xl,
    required this.logo,
  });

  final double base;
  final double sm;
  final double md;
  final double lg;
  final double xl;
  final double logo;

  factory TokenRadius.fromJson(Map<String, dynamic> json) => TokenRadius(
        base: (json['base'] as num).toDouble(),
        sm: (json['sm'] as num).toDouble(),
        md: (json['md'] as num).toDouble(),
        lg: (json['lg'] as num).toDouble(),
        xl: (json['xl'] as num).toDouble(),
        logo: (json['logo'] as num).toDouble(),
      );
}

class TokenSpacing {
  const TokenSpacing({
    required this.xs,
    required this.sm,
    required this.md,
    required this.lg,
    required this.xl,
    required this.touchMin,
    required this.touchPos,
  });

  final double xs;
  final double sm;
  final double md;
  final double lg;
  final double xl;
  final double touchMin;
  final double touchPos;

  factory TokenSpacing.fromJson(Map<String, dynamic> json) => TokenSpacing(
        xs: (json['xs'] as num).toDouble(),
        sm: (json['sm'] as num).toDouble(),
        md: (json['md'] as num).toDouble(),
        lg: (json['lg'] as num).toDouble(),
        xl: (json['xl'] as num).toDouble(),
        touchMin: (json['touchMin'] as num).toDouble(),
        touchPos: (json['touchPos'] as num).toDouble(),
      );
}

class TokenMotion {
  const TokenMotion({
    required this.fastMs,
    required this.normalMs,
    required this.slowMs,
  });

  final int fastMs;
  final int normalMs;
  final int slowMs;

  factory TokenMotion.fromJson(Map<String, dynamic> json) => TokenMotion(
        fastMs: json['fastMs'] as int,
        normalMs: json['normalMs'] as int,
        slowMs: json['slowMs'] as int,
      );
}

class TokenPalette {
  const TokenPalette({
    required this.background,
    required this.foreground,
    required this.card,
    required this.cardForeground,
    required this.primary,
    required this.primaryForeground,
    required this.secondary,
    required this.secondaryForeground,
    required this.muted,
    required this.mutedForeground,
    required this.accent,
    required this.accentForeground,
    required this.destructive,
    required this.destructiveForeground,
    required this.border,
    required this.input,
    required this.ring,
    required this.glassBackground,
    required this.glassOpacity,
    required this.glassBlur,
  });

  final String background;
  final String foreground;
  final String card;
  final String cardForeground;
  final String primary;
  final String primaryForeground;
  final String secondary;
  final String secondaryForeground;
  final String muted;
  final String mutedForeground;
  final String accent;
  final String accentForeground;
  final String destructive;
  final String destructiveForeground;
  final String border;
  final String input;
  final String ring;
  final String glassBackground;
  final double glassOpacity;
  final double glassBlur;

  factory TokenPalette.fromJson(Map<String, dynamic> json) => TokenPalette(
        background: json['background'] as String,
        foreground: json['foreground'] as String,
        card: json['card'] as String,
        cardForeground: json['cardForeground'] as String,
        primary: json['primary'] as String,
        primaryForeground: json['primaryForeground'] as String,
        secondary: json['secondary'] as String,
        secondaryForeground: json['secondaryForeground'] as String,
        muted: json['muted'] as String,
        mutedForeground: json['mutedForeground'] as String,
        accent: json['accent'] as String,
        accentForeground: json['accentForeground'] as String,
        destructive: json['destructive'] as String,
        destructiveForeground: json['destructiveForeground'] as String,
        border: json['border'] as String,
        input: json['input'] as String,
        ring: json['ring'] as String,
        glassBackground: json['glassBackground'] as String,
        glassOpacity: (json['glassOpacity'] as num).toDouble(),
        glassBlur: (json['glassBlur'] as num).toDouble(),
      );
}

class TokenSemantic {
  const TokenSemantic({
    required this.success,
    required this.warning,
    required this.info,
  });

  final String success;
  final String warning;
  final String info;

  factory TokenSemantic.fromJson(Map<String, dynamic> json) => TokenSemantic(
        success: json['success'] as String,
        warning: json['warning'] as String,
        info: json['info'] as String,
      );
}
