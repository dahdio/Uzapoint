import 'package:flutter/material.dart';

import '../theme/uzapoint_colors.dart';

enum UBadgeVariant { neutral, success, warning, destructive, info }

class UBadge extends StatelessWidget {
  const UBadge({
    super.key,
    required this.label,
    this.variant = UBadgeVariant.neutral,
  });

  final String label;
  final UBadgeVariant variant;

  @override
  Widget build(BuildContext context) {
    final colors = UzapointColors.of(context);
    final radii = UzapointRadii.of(context);

    final (bg, fg) = switch (variant) {
      UBadgeVariant.neutral => (colors.secondary, colors.secondaryForeground),
      UBadgeVariant.success => (colors.success.withValues(alpha: 0.12), colors.success),
      UBadgeVariant.warning => (colors.warning.withValues(alpha: 0.12), colors.warning),
      UBadgeVariant.destructive =>
        (colors.destructive.withValues(alpha: 0.12), colors.destructive),
      UBadgeVariant.info => (colors.info.withValues(alpha: 0.12), colors.info),
    };

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: radii.smRadius,
      ),
      child: Text(
        label,
        style: Theme.of(context).textTheme.labelSmall?.copyWith(
              color: fg,
              fontWeight: FontWeight.w600,
            ),
      ),
    );
  }
}
