import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../core/theme/uzapoint_colors.dart';
import '../../core/widgets/u_primary_button.dart';

class OnboardingScreen extends StatefulWidget {
  const OnboardingScreen({super.key});

  @override
  State<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  String? _selected;
  bool _loading = false;

  static const _categories = [
    (
    id: 'retail',
    label: 'Retail / General Shop',
    subtitle: 'Supermarkets, mini-marts, convenience stores',
    icon: LucideIcons.shoppingBag
    ),
    (
    id: 'food',
    label: 'Food & Beverage',
    subtitle: 'Restaurants, cafes, food vendors, bars',
    icon: LucideIcons.utensils
    ),
    (
    id: 'pharmacy',
    label: 'Pharmacy / Health',
    subtitle: 'Pharmacies, clinics, health & wellness stores',
    icon: LucideIcons.pill
    ),
    (
    id: 'electronics',
    label: 'Electronics & Tech',
    subtitle: 'Phone shops, computer stores, accessories',
    icon: LucideIcons.laptop
    ),
    (
    id: 'fashion',
    label: 'Fashion & Apparel',
    subtitle: 'Clothing, shoes, accessories, tailoring',
    icon: LucideIcons.shirt
    ),
    (
    id: 'services',
    label: 'Services',
    subtitle: 'Salons, repair shops, laundry, agencies',
    icon: LucideIcons.wrench
    ),
    (
    id: 'beauty',
    label: 'Beauty & Cosmetics',
    subtitle: 'Beauty stores, cosmetics, skincare products',
    icon: LucideIcons.flower2
    ),
    (
    id: 'education',
    label: 'Education & Stationery',
    subtitle: 'Bookshops, school supplies, training centers',
    icon: LucideIcons.bookOpen
    ),
    (
    id: 'automotive',
    label: 'Automotive',
    subtitle: 'Spare parts, car wash, garages, fuel stations',
    icon: LucideIcons.car
    ),
    (
    id: 'other',
    label: 'Other Business',
    subtitle: 'Any other type of business not listed above',
    icon: LucideIcons.store
    ),
  ];

  Future<void> _continue() async {
    if (_selected == null) return;
    setState(() => _loading = true);
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('uzapoint_business_category', _selected!);
    await prefs.setBool('uzapoint_onboarded', true);
    await prefs.setBool('uzapoint_logged_in', true);
    await Future<void>.delayed(const Duration(milliseconds: 600));
    if (!mounted) return;
    setState(() => _loading = false);
    context.go('/home');
  }

  @override
  Widget build(BuildContext context) {
    final colors = UzapointColors.of(context);
    final spacing = UzapointSpacing.of(context);

    return Scaffold(
      backgroundColor: const Color(0xFFF9FAFB), // Modern light canvas color background
      appBar: AppBar(
        backgroundColor: const Color(0xFFF9FAFB),
        elevation: 0,
        scrolledUnderElevation: 0,
        leadingWidth: 64,
        leading: Padding(
          padding: const EdgeInsets.only(left: 16, top: 8, bottom: 8),
          child: GestureDetector(
            behavior: HitTestBehavior.opaque,
            onTap: () {
              if (context.canPop()) {
                context.pop();
              } else {
                context.go('/login');
              }
            },
            child: Container(
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
        ),
      ),
      body: SafeArea(
        child: Theme(
          // Forcing matching button specifications across all operational themes locally
          data: Theme.of(context).copyWith(
            primaryColor: Colors.black,
            elevatedButtonTheme: ElevatedButtonThemeData(
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.white,
                foregroundColor: Colors.black,
                side: const BorderSide(color: Colors.black, width: 1.5),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              ),
            ),
            filledButtonTheme: FilledButtonThemeData(
              style: FilledButton.styleFrom(
                backgroundColor: Colors.white,
                foregroundColor: Colors.black,
                side: const BorderSide(color: Colors.black, width: 1.5),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              ),
            ),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Padding(
                padding: EdgeInsets.symmetric(horizontal: spacing.md, vertical: spacing.sm),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'What type of business\ndo you run?',
                      style: TextStyle(
                        fontSize: 26,
                        fontWeight: FontWeight.w900,
                        color: Colors.black,
                        letterSpacing: -0.5,
                        height: 1.2,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'This helps us customize your UzaPoint experience. You can change this later in settings.',
                      style: TextStyle(
                        fontSize: 14,
                        color: colors.mutedForeground,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 12),
              Expanded(
                child: ListView.separated(
                  padding: EdgeInsets.symmetric(horizontal: spacing.md, vertical: spacing.xs),
                  itemCount: _categories.length,
                  physics: const BouncingScrollPhysics(),
                  separatorBuilder: (_, __) => const SizedBox(height: 12),
                  itemBuilder: (context, index) {
                    final cat = _categories[index];
                    final isSelected = _selected == cat.id;

                    return GestureDetector(
                      onTap: () => setState(() => _selected = cat.id),
                      child: AnimatedContainer(
                        duration: const Duration(milliseconds: 150),
                        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(12), // Matching the crisp system geometry radius
                          border: Border.all(
                            color: isSelected ? Colors.black : Colors.black.withOpacity(0.12),
                            width: isSelected ? 2.0 : 1.5,
                          ),
                        ),
                        child: Row(
                          children: [
                            AnimatedContainer(
                              duration: const Duration(milliseconds: 150),
                              width: 44,
                              height: 44,
                              decoration: BoxDecoration(
                                color: isSelected ? Colors.black : const Color(0xFFF3F4F6),
                                borderRadius: BorderRadius.circular(8),
                              ),
                              child: Icon(
                                cat.icon,
                                size: 20,
                                color: isSelected ? Colors.white : Colors.black,
                              ),
                            ),
                            const SizedBox(width: 14),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  Text(
                                    cat.label,
                                    style: TextStyle(
                                      fontSize: 15,
                                      fontWeight: isSelected ? FontWeight.w900 : FontWeight.w700,
                                      color: Colors.black,
                                    ),
                                  ),
                                  const SizedBox(height: 2),
                                  Text(
                                    cat.subtitle,
                                    style: const TextStyle(
                                      fontSize: 12,
                                      color: Color(0xFF6B7280),
                                      fontWeight: FontWeight.w500,
                                      height: 1.2,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            const SizedBox(width: 8),
                            // CUSTOM HIGH-CONTRAST SELECTION INDICATOR
                            Container(
                              width: 20,
                              height: 20,
                              decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                color: isSelected ? Colors.black : Colors.white,
                                border: Border.all(
                                  color: Colors.black,
                                  width: 1.5,
                                ),
                              ),
                              child: isSelected
                                  ? const Icon(LucideIcons.check, size: 12, color: Colors.white)
                                  : null,
                            ),
                          ],
                        ),
                      ),
                    );
                  },
                ),
              ),
              Padding(
                padding: EdgeInsets.all(spacing.md),
                child: SizedBox(
                  width: double.infinity,
                  height: 48,
                  child: UPrimaryButton(
                    label: 'Continue to Dashboard',
                    isLoading: _loading,
                    onPressed: _selected == null ? null : _continue,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}