import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../core/theme/uzapoint_colors.dart';

class SettingsHubScreen extends StatelessWidget {
  const SettingsHubScreen({super.key});

  Future<void> _logout(BuildContext context) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool('uzapoint_logged_in', false);
    if (context.mounted) context.go('/welcome');
  }

  @override
  Widget build(BuildContext context) {
    final spacing = UzapointSpacing.of(context);

    // Explicit definition of settings items configuration matrices
    final settingsOptions = [
      _SettingItem(label: 'Business information', icon: LucideIcons.store, onTap: () {}),
      _SettingItem(label: 'Payment methods', icon: LucideIcons.wallet, onTap: () {}),
      _SettingItem(label: 'Notifications', icon: LucideIcons.bell, onTap: () {}),
      _SettingItem(label: 'Account', icon: LucideIcons.user, onTap: () {}),
    ];

    return Scaffold(
      backgroundColor: const Color(0xFFF9FAFB),
      body: SafeArea(
        bottom: false,
        child: ListView(
          padding: EdgeInsets.fromLTRB(spacing.md, spacing.md, spacing.md, 120),
          children: [
            // 1. TOP NAVIGATION ROW WITH NOTIFICATION ACTION
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    GestureDetector(
                      onTap: () => context.pop(),
                      child: Container(
                        width: 40,
                        height: 40,
                        decoration: BoxDecoration(
                          color: Colors.white,
                          shape: BoxShape.circle,
                          border: Border.all(color: Colors.black, width: 1.5),
                        ),
                        child: const Center(
                          child: Icon(LucideIcons.arrowLeft, color: Colors.black, size: 18),
                        ),
                      ),
                    ),
                    const SizedBox(width: 12),
                    const Text(
                      'Settings',
                      style: TextStyle(
                        color: Colors.black,
                        fontSize: 22,
                        fontWeight: FontWeight.bold,
                        letterSpacing: -0.5,
                      ),
                    ),
                  ],
                ),
                // Top Right Notification Button
                GestureDetector(
                  onTap: () {},
                  child: Container(
                    width: 40,
                    height: 40,
                    decoration: BoxDecoration(
                      color: Colors.white,
                      shape: BoxShape.circle,
                      border: Border.all(color: Colors.black, width: 1.5),
                    ),
                    child: const Center(
                      child: Icon(LucideIcons.bell, color: Colors.black, size: 18),
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 24),

            // 2. CORE SETTINGS SECTION PANELS CONTAINER
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: Colors.black, width: 1.5),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'General Account Settings',
                    style: TextStyle(
                      fontSize: 15,
                      fontWeight: FontWeight.w900,
                      color: Colors.black,
                    ),
                  ),
                  const SizedBox(height: 16),
                  ...settingsOptions.asMap().entries.map((entry) {
                    final index = entry.key;
                    final item = entry.value;
                    final isLast = index == settingsOptions.length - 1;

                    return Container(
                      margin: EdgeInsets.only(bottom: isLast ? 0 : 12),
                      child: InkWell(
                        onTap: item.onTap,
                        borderRadius: BorderRadius.circular(12),
                        child: Container(
                          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                          decoration: BoxDecoration(
                            color: const Color(0xFFF9FAFB),
                            borderRadius: BorderRadius.circular(12),
                            border: Border.all(color: Colors.black, width: 1.2),
                          ),
                          child: Row(
                            children: [
                              // Nested Round-Cornered Icon Block
                              Container(
                                padding: const EdgeInsets.all(6),
                                decoration: BoxDecoration(
                                  color: Colors.white,
                                  borderRadius: BorderRadius.circular(8),
                                  border: Border.all(color: Colors.black, width: 1.2),
                                ),
                                child: Icon(item.icon, size: 16, color: Colors.black),
                              ),
                              const SizedBox(width: 14),
                              // Setting Title
                              Expanded(
                                child: Text(
                                  item.label,
                                  style: const TextStyle(
                                    fontSize: 14,
                                    fontWeight: FontWeight.bold,
                                    color: Colors.black,
                                  ),
                                ),
                              ),
                              // Trailing Navigation Indicator Chevron
                              const Icon(
                                LucideIcons.chevronRight,
                                size: 16,
                                color: Colors.black,
                              ),
                            ],
                          ),
                        ),
                      ),
                    );
                  }),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // 3. STANDALONE DESTRUCTIVE LOGOUT ACTION BOX
            InkWell(
              onTap: () => _logout(context),
              borderRadius: BorderRadius.circular(16),
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                decoration: BoxDecoration(
                  color: const Color(0xFFFEE2E2), // Soft error red background
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: const Color(0xFFDC2626), width: 1.5),
                ),
                child: Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(6),
                      decoration: const BoxDecoration(
                        color: Colors.white,
                        shape: BoxShape.circle,
                      ),
                      child: const Icon(LucideIcons.logOut, size: 16, color: Color(0xFFDC2626)),
                    ),
                    const SizedBox(width: 14),
                    const Expanded(
                      child: Text(
                        'Log out of account',
                        style: TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.w900,
                          color: Color(0xFF991B1B),
                        ),
                      ),
                    ),
                    const Icon(
                      LucideIcons.chevronRight,
                      size: 16,
                      color: Color(0xFFDC2626),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

/// Private helper configuration profile model
class _SettingItem {
  final String label;
  final IconData icon;
  final VoidCallback onTap;

  const _SettingItem({
    required this.label,
    required this.icon,
    required this.onTap,
  });
}