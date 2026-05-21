import 'package:flutter/material.dart';

import '../theme/uzapoint_colors.dart';

/// Solid card for metrics, checkout, receipts — not glass.
class UCard extends StatelessWidget {
  const UCard({
    super.key,
    required this.child,
    this.padding,
    this.onTap,
  });

  final Widget child;
  final EdgeInsetsGeometry? padding;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final colors = UzapointColors.of(context);
    final radii = UzapointRadii.of(context);
    final spacing = UzapointSpacing.of(context);

    final content = Padding(
      padding: padding ?? EdgeInsets.all(spacing.md),
      child: child,
    );

    final decoration = BoxDecoration(
      color: colors.card,
      borderRadius: radii.baseRadius,
      border: Border.all(color: colors.border),
      boxShadow: [
        BoxShadow(
          color: colors.foreground.withValues(alpha: 0.04),
          blurRadius: 8,
          offset: const Offset(0, 2),
        ),
      ],
    );

    if (onTap != null) {
      return Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: onTap,
          borderRadius: radii.baseRadius,
          child: Ink(
            decoration: decoration,
            child: content,
          ),
        ),
      );
    }

    return DecoratedBox(
      decoration: decoration,
      child: content,
    );
  }
}
