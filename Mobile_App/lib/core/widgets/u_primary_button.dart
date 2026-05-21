import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../theme/uzapoint_colors.dart';

class UPrimaryButton extends StatelessWidget {
  const UPrimaryButton({
    super.key,
    required this.label,
    required this.onPressed,
    this.isLoading = false,
    this.icon,
    this.minHeight,
  });

  final String label;
  final VoidCallback? onPressed;
  final bool isLoading;
  final IconData? icon;
  final double? minHeight;

  @override
  Widget build(BuildContext context) {
    final colors = UzapointColors.of(context);
    final radii = UzapointRadii.of(context);
    final spacing = UzapointSpacing.of(context);
    final height = minHeight ?? spacing.touchMin;

    return SizedBox(
      width: double.infinity,
      height: height,
      child: FilledButton(
        onPressed: isLoading
            ? null
            : () {
                HapticFeedback.lightImpact();
                onPressed?.call();
              },
        style: FilledButton.styleFrom(
          backgroundColor: colors.primary,
          foregroundColor: colors.primaryForeground,
          disabledBackgroundColor: colors.muted,
          disabledForegroundColor: colors.mutedForeground,
          elevation: 0,
          shape: RoundedRectangleBorder(borderRadius: radii.baseRadius),
        ),
        child: isLoading
            ? SizedBox(
                width: 22,
                height: 22,
                child: CircularProgressIndicator(
                  strokeWidth: 2,
                  color: colors.primaryForeground,
                ),
              )
            : Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  if (icon != null) ...[
                    Icon(icon, size: 20),
                    const SizedBox(width: 8),
                  ],
                  Text(
                    label,
                    style: Theme.of(context).textTheme.labelLarge?.copyWith(
                          color: colors.primaryForeground,
                          fontWeight: FontWeight.w600,
                        ),
                  ),
                ],
              ),
      ),
    );
  }
}
