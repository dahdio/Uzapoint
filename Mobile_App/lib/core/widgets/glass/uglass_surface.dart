import 'dart:ui';

import 'package:flutter/material.dart';

import '../../theme/uzapoint_colors.dart';

/// Liquid Glass–inspired surface. Use for chrome (nav, sheets), not POS totals.
class UGlassSurface extends StatelessWidget {
  const UGlassSurface({
    super.key,
    required this.child,
    this.borderRadius,
    this.padding,
    this.margin,
    this.opacity,
    this.blur,
  });

  final Widget child;
  final BorderRadius? borderRadius;
  final EdgeInsetsGeometry? padding;
  final EdgeInsetsGeometry? margin;
  final double? opacity;
  final double? blur;

  @override
  Widget build(BuildContext context) {
    final colors = UzapointColors.of(context);
    final radii = UzapointRadii.of(context);
    final radius = borderRadius ?? radii.xlRadius;
    final effectiveOpacity = opacity ?? colors.glassOpacity;
    final effectiveBlur = blur ?? colors.glassBlur;

    return Container(
      margin: margin,
      decoration: BoxDecoration(
        borderRadius: radius,
        border: Border.all(
          color: colors.border.withValues(alpha: 0.6),
        ),
      ),
      clipBehavior: Clip.antiAlias,
      child: BackdropFilter(
        filter: ImageFilter.blur(
          sigmaX: effectiveBlur,
          sigmaY: effectiveBlur,
        ),
        child: Container(
          padding: padding,
          decoration: BoxDecoration(
            borderRadius: radius,
            color: colors.glassBackground.withValues(alpha: effectiveOpacity),
          ),
          child: child,
        ),
      ),
    );
  }
}
