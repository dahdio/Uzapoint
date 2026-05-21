import 'package:flutter/material.dart';

import '../theme/uzapoint_colors.dart';

class UCollapsingHeader extends StatelessWidget {
  const UCollapsingHeader({
    super.key,
    required this.title,
    this.description,
    this.actions,
  });

  final String title;
  final String? description;
  final List<Widget>? actions;

  @override
  Widget build(BuildContext context) {
    final colors = UzapointColors.of(context);
    final spacing = UzapointSpacing.of(context);

    return SliverAppBar(
      expandedHeight: description != null ? 112 : 96,
      pinned: true,
      stretch: true,
      backgroundColor: colors.background.withValues(alpha: 0.85),
      surfaceTintColor: Colors.transparent,
      actions: actions,
      flexibleSpace: FlexibleSpaceBar(
        titlePadding: EdgeInsets.only(
          left: spacing.md,
          bottom: spacing.md,
          right: spacing.md,
        ),
        title: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              title,
              style: Theme.of(context).textTheme.titleLarge,
            ),
            if (description != null)
              Text(
                description!,
                style: Theme.of(context).textTheme.labelSmall,
              ),
          ],
        ),
        centerTitle: false,
      ),
    );
  }
}
