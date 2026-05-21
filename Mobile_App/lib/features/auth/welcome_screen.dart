import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:lucide_icons/lucide_icons.dart';

import '../../core/theme/uzapoint_colors.dart';

class WelcomeScreen extends StatelessWidget {
  const WelcomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final colors = UzapointColors.of(context);
    final spacing = UzapointSpacing.of(context);
    final screenSize = MediaQuery.sizeOf(context);

    return Scaffold(
      backgroundColor: Colors.white, // Matches the clean, bright look of the design
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // --- Top Section: Entrepreneur / Shop Illustration ---
          Stack(
            children: [
              Container(
                height: screenSize.height * 0.46,
                width: double.infinity,
                decoration: const BoxDecoration(
                  image: DecorationImage(
                    // Replace with your local asset depicting an East African shop entrepreneur
                    image: AssetImage('assets/images/shop_entrepreneur.png'), 
                    fit: BoxFit.cover,
                  ),
                ),
              ),
              // Optional: Subtle white gradient overlay at the bottom of the image to blend smoothly
              Positioned(
                bottom: 0,
                left: 0,
                right: 0,
                child: Container(
                  height: 40,
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter,
                      colors: [
                        Colors.white.withOpacity(0.0),
                        Colors.white,
                      ],
                    ),
                  ),
                ),
              ),
            ],
          ),

          // --- Bottom Section: Tailored Uzapoint Content ---
          Expanded(
            child: Padding(
              padding: EdgeInsets.symmetric(
                horizontal: spacing.lg,
                vertical: spacing.md,
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Spacer(),

                  // Pill Badge Tag
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                    decoration: BoxDecoration(
                      color: const Color(0xFFF5F5F7), // Soft neutral background line
                      borderRadius: BorderRadius.circular(20),
                      border: Border.all(color: Colors.black12, width: 0.5),
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Icon(
                          LucideIcons.store, 
                          size: 14, 
                          color: colors.primary,
                        ),
                        const SizedBox(width: 6),
                        Text(
                          'Now available across East Africa',
                          style: Theme.of(context).textTheme.bodySmall?.copyWith(
                                fontWeight: FontWeight.bold,
                                color: Colors.black87,
                              ),
                        ),
                      ],
                    ),
                  ),

                  const SizedBox(height: 16),

                  // Catchy Headline
                  Text(
                    'The Complete Platform\nTo Run Your Business',
                    style: Theme.of(context).textTheme.displayLarge?.copyWith(
                          fontWeight: FontWeight.w800,
                          fontSize: 32,
                          color: const Color(0xFF1A1A1A),
                          height: 1.2,
                        ),
                  ),

                  const SizedBox(height: 12),

                  // Copy Deck Subtitle
                  Text(
                    'Manage sales, inventory, payments, and analytics from one powerful dashboard. Built for SMEs that move fast.',
                    style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                          color: colors.mutedForeground,
                          height: 1.45,
                        ),
                  ),

                  const Spacer(flex: 2),

                  // --- Navigation & Action Row ---
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      // Onboarding Page Indicators (Dots)
                      Row(
                        children: [
                          Container(
                            width: 24,
                            height: 6,
                            decoration: BoxDecoration(
                              color: const Color(0xFF1A1A1A), // Active dark capsule
                              borderRadius: BorderRadius.circular(3),
                            ),
                          ),
                          const SizedBox(width: 6),
                          Container(
                            width: 6,
                            height: 6,
                            decoration: const BoxDecoration(
                              color: Colors.black26, // Inactive dot
                              shape: BoxShape.circle,
                            ),
                          ),
                          const SizedBox(width: 6),
                          Container(
                            width: 6,
                            height: 6,
                            decoration: const BoxDecoration(
                              color: Colors.black26, // Inactive dot
                              shape: BoxShape.circle,
                            ),
                          ),
                        ],
                      ),

                      // Premium Action Pill Button
                      ElevatedButton(
                        onPressed: () => context.push('/login'), 
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFF1A1A1A), // Matching dark slate
                          foregroundColor: Colors.white,
                          padding: const EdgeInsets.symmetric(
                            horizontal: 24,
                            vertical: 16,
                          ),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(30),
                          ),
                          elevation: 0,
                        ),
                        child: const Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Text(
                              'Get Started',
                              style: TextStyle(
                                fontWeight: FontWeight.bold,
                                fontSize: 16,
                              ),
                            ),
                            SizedBox(width: 6),
                            Icon(LucideIcons.rocket, size: 16),
                          ],
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}