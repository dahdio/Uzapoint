import 'package:flutter/material.dart';

import 'color_utils.dart';
import 'token_models.dart';

@immutable
class UzapointColors extends ThemeExtension<UzapointColors> {
  const UzapointColors({
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
    required this.success,
    required this.warning,
    required this.info,
    required this.charts,
  });

  final Color background;
  final Color foreground;
  final Color card;
  final Color cardForeground;
  final Color primary;
  final Color primaryForeground;
  final Color secondary;
  final Color secondaryForeground;
  final Color muted;
  final Color mutedForeground;
  final Color accent;
  final Color accentForeground;
  final Color destructive;
  final Color destructiveForeground;
  final Color border;
  final Color input;
  final Color ring;
  final Color glassBackground;
  final double glassOpacity;
  final double glassBlur;
  final Color success;
  final Color warning;
  final Color info;
  final List<Color> charts;

  factory UzapointColors.fromTokens({
    required TokenPalette palette,
    required TokenSemantic semantic,
    required List<String> chartHex,
  }) {
    return UzapointColors(
      background: colorFromHex(palette.background),
      foreground: colorFromHex(palette.foreground),
      card: colorFromHex(palette.card),
      cardForeground: colorFromHex(palette.cardForeground),
      primary: colorFromHex(palette.primary),
      primaryForeground: colorFromHex(palette.primaryForeground),
      secondary: colorFromHex(palette.secondary),
      secondaryForeground: colorFromHex(palette.secondaryForeground),
      muted: colorFromHex(palette.muted),
      mutedForeground: colorFromHex(palette.mutedForeground),
      accent: colorFromHex(palette.accent),
      accentForeground: colorFromHex(palette.accentForeground),
      destructive: colorFromHex(palette.destructive),
      destructiveForeground: colorFromHex(palette.destructiveForeground),
      border: colorFromHex(palette.border),
      input: colorFromHex(palette.input),
      ring: colorFromHex(palette.ring),
      glassBackground: colorFromHex(palette.glassBackground),
      glassOpacity: palette.glassOpacity,
      glassBlur: palette.glassBlur,
      success: colorFromHex(semantic.success),
      warning: colorFromHex(semantic.warning),
      info: colorFromHex(semantic.info),
      charts: chartHex.map(colorFromHex).toList(),
    );
  }

  @override
  UzapointColors copyWith({
    Color? background,
    Color? foreground,
    Color? card,
    Color? cardForeground,
    Color? primary,
    Color? primaryForeground,
    Color? secondary,
    Color? secondaryForeground,
    Color? muted,
    Color? mutedForeground,
    Color? accent,
    Color? accentForeground,
    Color? destructive,
    Color? destructiveForeground,
    Color? border,
    Color? input,
    Color? ring,
    Color? glassBackground,
    double? glassOpacity,
    double? glassBlur,
    Color? success,
    Color? warning,
    Color? info,
    List<Color>? charts,
  }) {
    return UzapointColors(
      background: background ?? this.background,
      foreground: foreground ?? this.foreground,
      card: card ?? this.card,
      cardForeground: cardForeground ?? this.cardForeground,
      primary: primary ?? this.primary,
      primaryForeground: primaryForeground ?? this.primaryForeground,
      secondary: secondary ?? this.secondary,
      secondaryForeground: secondaryForeground ?? this.secondaryForeground,
      muted: muted ?? this.muted,
      mutedForeground: mutedForeground ?? this.mutedForeground,
      accent: accent ?? this.accent,
      accentForeground: accentForeground ?? this.accentForeground,
      destructive: destructive ?? this.destructive,
      destructiveForeground:
          destructiveForeground ?? this.destructiveForeground,
      border: border ?? this.border,
      input: input ?? this.input,
      ring: ring ?? this.ring,
      glassBackground: glassBackground ?? this.glassBackground,
      glassOpacity: glassOpacity ?? this.glassOpacity,
      glassBlur: glassBlur ?? this.glassBlur,
      success: success ?? this.success,
      warning: warning ?? this.warning,
      info: info ?? this.info,
      charts: charts ?? this.charts,
    );
  }

  @override
  UzapointColors lerp(ThemeExtension<UzapointColors>? other, double t) {
    if (other is! UzapointColors) return this;
    return UzapointColors(
      background: Color.lerp(background, other.background, t)!,
      foreground: Color.lerp(foreground, other.foreground, t)!,
      card: Color.lerp(card, other.card, t)!,
      cardForeground: Color.lerp(cardForeground, other.cardForeground, t)!,
      primary: Color.lerp(primary, other.primary, t)!,
      primaryForeground:
          Color.lerp(primaryForeground, other.primaryForeground, t)!,
      secondary: Color.lerp(secondary, other.secondary, t)!,
      secondaryForeground:
          Color.lerp(secondaryForeground, other.secondaryForeground, t)!,
      muted: Color.lerp(muted, other.muted, t)!,
      mutedForeground: Color.lerp(mutedForeground, other.mutedForeground, t)!,
      accent: Color.lerp(accent, other.accent, t)!,
      accentForeground:
          Color.lerp(accentForeground, other.accentForeground, t)!,
      destructive: Color.lerp(destructive, other.destructive, t)!,
      destructiveForeground:
          Color.lerp(destructiveForeground, other.destructiveForeground, t)!,
      border: Color.lerp(border, other.border, t)!,
      input: Color.lerp(input, other.input, t)!,
      ring: Color.lerp(ring, other.ring, t)!,
      glassBackground: Color.lerp(glassBackground, other.glassBackground, t)!,
      glassOpacity: glassOpacity + (other.glassOpacity - glassOpacity) * t,
      glassBlur: glassBlur + (other.glassBlur - glassBlur) * t,
      success: Color.lerp(success, other.success, t)!,
      warning: Color.lerp(warning, other.warning, t)!,
      info: Color.lerp(info, other.info, t)!,
      charts: List.generate(
        charts.length,
        (i) => Color.lerp(charts[i], other.charts[i], t)!,
      ),
    );
  }

  static UzapointColors of(BuildContext context) {
    return Theme.of(context).extension<UzapointColors>()!;
  }
}

@immutable
class UzapointRadii extends ThemeExtension<UzapointRadii> {
  const UzapointRadii({
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

  BorderRadius get baseRadius => BorderRadius.circular(base);
  BorderRadius get smRadius => BorderRadius.circular(sm);
  BorderRadius get mdRadius => BorderRadius.circular(md);
  BorderRadius get lgRadius => BorderRadius.circular(lg);
  BorderRadius get xlRadius => BorderRadius.circular(xl);

  factory UzapointRadii.fromTokens(TokenRadius radius) => UzapointRadii(
        base: radius.base,
        sm: radius.sm,
        md: radius.md,
        lg: radius.lg,
        xl: radius.xl,
        logo: radius.logo,
      );

  @override
  UzapointRadii copyWith({
    double? base,
    double? sm,
    double? md,
    double? lg,
    double? xl,
    double? logo,
  }) {
    return UzapointRadii(
      base: base ?? this.base,
      sm: sm ?? this.sm,
      md: md ?? this.md,
      lg: lg ?? this.lg,
      xl: xl ?? this.xl,
      logo: logo ?? this.logo,
    );
  }

  @override
  UzapointRadii lerp(ThemeExtension<UzapointRadii>? other, double t) {
    if (other is! UzapointRadii) return this;
    return UzapointRadii(
      base: base + (other.base - base) * t,
      sm: sm + (other.sm - sm) * t,
      md: md + (other.md - md) * t,
      lg: lg + (other.lg - lg) * t,
      xl: xl + (other.xl - xl) * t,
      logo: logo + (other.logo - logo) * t,
    );
  }

  static UzapointRadii of(BuildContext context) {
    return Theme.of(context).extension<UzapointRadii>()!;
  }
}

@immutable
class UzapointSpacing extends ThemeExtension<UzapointSpacing> {
  const UzapointSpacing({
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

  factory UzapointSpacing.fromTokens(TokenSpacing spacing) => UzapointSpacing(
        xs: spacing.xs,
        sm: spacing.sm,
        md: spacing.md,
        lg: spacing.lg,
        xl: spacing.xl,
        touchMin: spacing.touchMin,
        touchPos: spacing.touchPos,
      );

  @override
  UzapointSpacing copyWith({
    double? xs,
    double? sm,
    double? md,
    double? lg,
    double? xl,
    double? touchMin,
    double? touchPos,
  }) {
    return UzapointSpacing(
      xs: xs ?? this.xs,
      sm: sm ?? this.sm,
      md: md ?? this.md,
      lg: lg ?? this.lg,
      xl: xl ?? this.xl,
      touchMin: touchMin ?? this.touchMin,
      touchPos: touchPos ?? this.touchPos,
    );
  }

  @override
  UzapointSpacing lerp(ThemeExtension<UzapointSpacing>? other, double t) {
    if (other is! UzapointSpacing) return this;
    return UzapointSpacing(
      xs: xs + (other.xs - xs) * t,
      sm: sm + (other.sm - sm) * t,
      md: md + (other.md - md) * t,
      lg: lg + (other.lg - lg) * t,
      xl: xl + (other.xl - xl) * t,
      touchMin: touchMin + (other.touchMin - touchMin) * t,
      touchPos: touchPos + (other.touchPos - touchPos) * t,
    );
  }

  static UzapointSpacing of(BuildContext context) {
    return Theme.of(context).extension<UzapointSpacing>()!;
  }
}
