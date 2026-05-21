import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:go_router/go_router.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../core/widgets/glass/uglass_surface.dart';
import '../../core/widgets/u_logo.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    _bootstrap();
  }

  Future<void> _bootstrap() async {
    await Future<void>.delayed(const Duration(milliseconds: 1400));
    if (!mounted) return;
    final prefs = await SharedPreferences.getInstance();
    final loggedIn = prefs.getBool('uzapoint_logged_in') ?? false;
    final onboarded = prefs.getBool('uzapoint_onboarded') ?? false;
    if (!mounted) return;

    if (!loggedIn) {
      context.go('/welcome');
    } else if (!onboarded) {
      context.go('/onboarding');
    } else {
      context.go('/home');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: UGlassSurface(
          padding: const EdgeInsets.all(28),
          child: const ULogo(size: 56)
              .animate()
              .fadeIn(duration: 400.ms)
              .scale(
                begin: const Offset(0.9, 0.9),
                end: const Offset(1, 1),
                curve: Curves.easeOutCubic,
              ),
        ),
      ),
    );
  }
}
