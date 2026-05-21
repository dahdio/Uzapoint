import 'package:flutter/material.dart';

import '../theme/uzapoint_colors.dart';

class USecondaryButton extends StatelessWidget {
  const USecondaryButton({
    super.key,
    required this.label,
    required this.onPressed,
    this.icon,
  });

  final String label;
  final VoidCallback? onPressed;
  final IconData? icon;

  @override
  Widget build(BuildContext context) {
    final colors = UzapointColors.of(context);
    final radii = UzapointRadii.of(context);
    final spacing = UzapointSpacing.of(context);

    return SizedBox(
      width: double.infinity,
      height: spacing.touchMin,
      child: OutlinedButton(
        onPressed: onPressed,
        style: OutlinedButton.styleFrom(
          foregroundColor: colors.foreground,
          side: BorderSide(color: colors.border),
          shape: RoundedRectangleBorder(borderRadius: radii.baseRadius),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            if (icon != null) ...[
              Icon(icon, size: 20),
              const SizedBox(width: 8),
            ],
            Text(
              label,
              style: Theme.of(context).textTheme.labelLarge?.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
            ),
          ],
        ),
      ),
    );
  }
}
