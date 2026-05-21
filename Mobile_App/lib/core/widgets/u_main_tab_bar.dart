import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';

import '../theme/uzapoint_colors.dart';
import 'glass/uglass_surface.dart';

class UMainTabBar extends StatelessWidget {
  const UMainTabBar({
    super.key,
    required this.currentIndex,
    required this.onTap,
  });

  final int currentIndex;
  final ValueChanged<int> onTap;

  static const _items = [
    (icon: LucideIcons.layoutDashboard, label: 'Home'),
    (icon: LucideIcons.shoppingCart, label: 'POS'),
    (icon: LucideIcons.package, label: 'Stock'),
    (icon: LucideIcons.menu, label: 'More'),
  ];

  @override
  Widget build(BuildContext context) {
    final colors = UzapointColors.of(context);
    final spacing = UzapointSpacing.of(context);
    final bottom = MediaQuery.paddingOf(context).bottom;

    return Padding(
      padding: EdgeInsets.fromLTRB(spacing.md, 0, spacing.md, bottom + spacing.sm),
      child: UGlassSurface(
        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 8),
        child: Row(
          children: List.generate(_items.length, (index) {
            final item = _items[index];
            final selected = currentIndex == index;
            final isPos = index == 1;

            return Expanded(
              child: _TabItem(
                icon: item.icon,
                label: item.label,
                selected: selected,
                emphasized: isPos,
                onTap: () => onTap(index),
                colors: colors,
              ),
            );
          }),
        ),
      ),
    );
  }
}

class _TabItem extends StatelessWidget {
  const _TabItem({
    required this.icon,
    required this.label,
    required this.selected,
    required this.emphasized,
    required this.onTap,
    required this.colors,
  });

  final IconData icon;
  final String label;
  final bool selected;
  final bool emphasized;
  final VoidCallback onTap;
  final UzapointColors colors;

  @override
  Widget build(BuildContext context) {
    final radii = UzapointRadii.of(context);

    final bg = emphasized && selected
        ? colors.primary
        : selected
            ? colors.secondary
            : Colors.transparent;
    final fg = emphasized && selected
        ? colors.primaryForeground
        : selected
            ? colors.foreground
            : colors.mutedForeground;

    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: onTap,
        borderRadius: radii.mdRadius,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          curve: Curves.easeOutCubic,
          padding: EdgeInsets.symmetric(
            vertical: emphasized ? 10 : 8,
            horizontal: 4,
          ),
          decoration: BoxDecoration(
            color: bg,
            borderRadius: radii.mdRadius,
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(
                icon,
                size: emphasized ? 24 : 22,
                color: fg,
              ),
              const SizedBox(height: 4),
              Text(
                label,
                style: Theme.of(context).textTheme.labelSmall?.copyWith(
                      color: fg,
                      fontWeight: selected ? FontWeight.w600 : FontWeight.w500,
                      fontSize: emphasized && selected ? 11 : 10,
                    ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
