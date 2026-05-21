import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:provider/provider.dart';

import '../../core/theme/theme_controller.dart';
import '../../core/theme/uzapoint_colors.dart';
import '../../core/widgets/u_badge.dart';
import '../../core/widgets/u_card.dart';
import '../../core/widgets/u_list_tile.dart';
import '../../core/widgets/u_logo.dart';
import '../../state/sync_queue_notifier.dart';

class MoreScreen extends StatelessWidget {
  const MoreScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final spacing = UzapointSpacing.of(context);
    final themeController = context.watch<ThemeController>();
    final sync = context.watch<SyncQueueNotifier>();

    // Helper builder to wrap individual menu list tiles cleanly in modern rounded rectangles
    Widget buildModernMenuItem({required Widget child}) {
      return Container(
        margin: const EdgeInsets.only(bottom: 12),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: Colors.black, width: 1.5),
        ),
        clipBehavior: Clip.antiAlias,
        child: UCard(
          padding: EdgeInsets.zero,
          child: child,
        ),
      );
    }

    return Scaffold(
      backgroundColor: const Color(0xFFF9FAFB),
      body: SafeArea(
        bottom: false,
        child: Column(
          children: [
            // 1. TOP BAR ROW (Clean layout, notification bell action only)
            Padding(
              padding: EdgeInsets.fromLTRB(spacing.md, spacing.md, spacing.md, spacing.sm),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text(
                    'More',
                    style: TextStyle(
                      color: Colors.black,
                      fontSize: 22,
                      fontWeight: FontWeight.bold,
                      letterSpacing: -0.5,
                    ),
                  ),
                  Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      // Circular Notification Bell Button
                      GestureDetector(
                        onTap: () {},
                        child: Container(
                          width: 42,
                          height: 42,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            color: Colors.white,
                            border: Border.all(color: Colors.black, width: 1.5),
                          ),
                          child: const Center(
                            child: Icon(LucideIcons.bell, color: Colors.black, size: 18),
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),

            // 2. MODERN MENU SCROLLABLE LIST
            Expanded(
              child: ListView(
                padding: EdgeInsets.fromLTRB(spacing.md, spacing.sm, spacing.md, 120),
                children: [
                  // Store Profile Header Card Block
                  Container(
                    margin: const EdgeInsets.only(bottom: 24),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: Colors.black, width: 1.5),
                    ),
                    clipBehavior: Clip.antiAlias,
                    child: UCard(
                      child: Row(
                        children: [
                          const ULogo(size: 44),
                          SizedBox(width: spacing.md),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Text(
                                  'Uzapoint Demo Store',
                                  style: TextStyle(
                                    fontSize: 16,
                                    fontWeight: FontWeight.w900,
                                    color: Colors.black,
                                  ),
                                ),
                                const SizedBox(height: 2),
                                Text(
                                  'John Doe · Admin',
                                  style: TextStyle(
                                    fontSize: 12,
                                    color: const Color(0xFF6B7280),
                                    fontWeight: FontWeight.w500,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),

                  // Individual Core Utility Items (Each completely separated)
                  buildModernMenuItem(
                    child: UListTile(
                      leading: const Icon(LucideIcons.creditCard, color: Colors.black),
                      title: 'Payments',
                      onTap: () {},
                    ),
                  ),
                  buildModernMenuItem(
                    child: UListTile(
                      leading: const Icon(LucideIcons.barChart3, color: Colors.black),
                      title: 'Analytics',
                      onTap: () => context.push('/more/analytics'),
                    ),
                  ),
                  buildModernMenuItem(
                    child: UListTile(
                      leading: const Icon(LucideIcons.fileText, color: Colors.black),
                      title: 'Reports',
                      onTap: () => context.push('/more/reports'),
                    ),
                  ),
                  buildModernMenuItem(
                    child: UListTile(
                      leading: const Icon(LucideIcons.uploadCloud, color: Colors.black),
                      title: 'Sync queue',
                      trailing: sync.pendingCount > 0
                          ? UBadge(
                        label: '${sync.pendingCount}',
                        variant: UBadgeVariant.warning,
                      )
                          : null,
                      onTap: () => context.push('/pos/sync-queue'),
                    ),
                  ),
                  buildModernMenuItem(
                    child: const UListTile(
                      leading: Icon(LucideIcons.users, color: Colors.black),
                      title: 'Resellers',
                    ),
                  ),

                  const SizedBox(height: 12),

                  // Settings & Appearance Utility Items (Separated)
                  buildModernMenuItem(
                    child: UListTile(
                      leading: const Icon(LucideIcons.settings, color: Colors.black),
                      title: 'Settings',
                      onTap: () => context.push('/more/settings'),
                    ),
                  ),
                  buildModernMenuItem(
                    child: UListTile(
                      leading: const Icon(LucideIcons.moon, color: Colors.black),
                      title: 'Appearance',
                      trailing: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                        decoration: BoxDecoration(
                          color: const Color(0xFFF3F4F6),
                          borderRadius: BorderRadius.circular(8),
                          border: Border.all(color: Colors.black, width: 1.2),
                        ),
                        child: DropdownButton<ThemeMode>(
                          value: themeController.themeMode,
                          underline: const SizedBox.shrink(),
                          isDense: true,
                          icon: const Padding(
                            padding: EdgeInsets.only(left: 4),
                            child: Icon(LucideIcons.chevronDown, color: Colors.black, size: 14),
                          ),
                          style: const TextStyle(
                            color: Colors.black,
                            fontSize: 12,
                            fontWeight: FontWeight.w800,
                          ),
                          dropdownColor: Colors.white,
                          borderRadius: BorderRadius.circular(8),
                          items: const [
                            DropdownMenuItem(
                              value: ThemeMode.system,
                              child: Text('System'),
                            ),
                            DropdownMenuItem(
                              value: ThemeMode.light,
                              child: Text('Light'),
                            ),
                            DropdownMenuItem(
                              value: ThemeMode.dark,
                              child: Text('Dark'),
                            ),
                          ],
                          onChanged: (mode) {
                            if (mode != null) themeController.setThemeMode(mode);
                          },
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}