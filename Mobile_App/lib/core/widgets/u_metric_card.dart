import 'package:flutter/material.dart';

import '../theme/uzapoint_colors.dart';
import 'u_card.dart';

class UMetricCard extends StatelessWidget {
  const UMetricCard({
    super.key,
    required this.title,
    required this.value,
    required this.change,
    this.changePositive = true,
  });

  final String title;
  final String value;
  final String change;
  final bool changePositive;

  @override
  Widget build(BuildContext context) {
    final colors = UzapointColors.of(context);
    final spacing = UzapointSpacing.of(context);

    return UCard(
      padding: EdgeInsets.all(spacing.md),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: Theme.of(context).textTheme.labelSmall,
          ),
          SizedBox(height: spacing.sm),
          Text(
            value,
            style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  fontFeatures: const [FontFeature.tabularFigures()],
                ),
          ),
          SizedBox(height: spacing.xs),
          Text(
            change,
            style: Theme.of(context).textTheme.labelSmall?.copyWith(
                  color: changePositive ? colors.success : colors.destructive,
                ),
          ),
        ],
      ),
    );
  }
}
