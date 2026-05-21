import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../core/theme/uzapoint_colors.dart';
import '../../core/widgets/u_primary_button.dart';
import '../../core/widgets/u_text_field.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _email = TextEditingController();
  final _password = TextEditingController();
  bool _obscure = true;
  bool _loading = false;
  bool _rememberMe = false;

  @override
  void dispose() {
    _email.dispose();
    _password.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    setState(() => _loading = true);
    await Future<void>.delayed(const Duration(milliseconds: 800));
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool('uzapoint_logged_in', true);
    if (!mounted) return;
    setState(() => _loading = false);
    final onboarded = prefs.getBool('uzapoint_onboarded') ?? false;
    context.go(onboarded ? '/home' : '/onboarding');
  }

  @override
  Widget build(BuildContext context) {
    final spacing = UzapointSpacing.of(context);

    return Scaffold(
      backgroundColor: const Color(0xFFF9FAFB),
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
              // FIXED: Checks if a route exists to pop safely. If history was cleared, routes back directly.
              if (context.canPop()) {
                context.pop();
              } else {
                context.go('/signup'); // Fallback path if stack was reset
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
        child: LayoutBuilder(
          builder: (context, constraints) {
            return SingleChildScrollView(
              padding: EdgeInsets.symmetric(horizontal: spacing.md),
              child: ConstrainedBox(
                constraints: BoxConstraints(minHeight: constraints.maxHeight),
                child: IntrinsicHeight(
                  child: Theme(
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
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const SizedBox(height: 16),

                        // SCREEN HEADER IDENTIFIER
                        const Text(
                          'Welcome Back',
                          style: TextStyle(
                            fontSize: 24,
                            fontWeight: FontWeight.w900,
                            color: Colors.black,
                            letterSpacing: -0.5,
                          ),
                        ),
                        const SizedBox(height: 6),
                        const Text(
                          'Sign in to continue to UzaPoint',
                          style: TextStyle(
                            fontSize: 14,
                            color: Colors.black,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        const SizedBox(height: 32),

                        // EMAIL ENTRY FORM LAYER
                        const Text(
                          'Email',
                          style: TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.w800,
                            color: Colors.black,
                          ),
                        ),
                        const SizedBox(height: 8),
                        UTextField(
                          controller: _email,
                          hint: 'Enter your email',
                          prefixIcon: const Icon(LucideIcons.mail, size: 18, color: Colors.black),
                          keyboardType: TextInputType.emailAddress,
                        ),
                        const SizedBox(height: 20),

                        // PASSWORD ENTRY FORM LAYER
                        const Text(
                          'Password',
                          style: TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.w800,
                            color: Colors.black,
                          ),
                        ),
                        const SizedBox(height: 8),
                        UTextField(
                          controller: _password,
                          hint: 'Enter your password',
                          prefixIcon: const Icon(LucideIcons.lock, size: 18, color: Colors.black),
                          obscureText: _obscure,
                          suffix: UPasswordSuffix(
                            obscured: _obscure,
                            onToggle: () => setState(() => _obscure = !_obscure),
                          ),
                        ),
                        const SizedBox(height: 16),

                        // REMEMBER ME & FORGOT PASSWORD ACTIONS CONTROL ROW
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            GestureDetector(
                              onTap: () => setState(() => _rememberMe = !_rememberMe),
                              behavior: HitTestBehavior.opaque,
                              child: Row(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  Container(
                                    width: 20,
                                    height: 20,
                                    decoration: BoxDecoration(
                                      color: _rememberMe ? Colors.black : Colors.white,
                                      borderRadius: BorderRadius.circular(6),
                                      border: Border.all(color: Colors.black, width: 1.5),
                                    ),
                                    child: _rememberMe
                                        ? const Icon(LucideIcons.check, size: 12, color: Colors.white)
                                        : null,
                                  ),
                                  const SizedBox(width: 10),
                                  const Text(
                                    'Remember Me',
                                    style: TextStyle(
                                      color: Colors.black,
                                      fontSize: 14,
                                      fontWeight: FontWeight.w700,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            GestureDetector(
                              onTap: () {},
                              child: const Text(
                                'Forgot Password?',
                                style: TextStyle(
                                  fontWeight: FontWeight.w800,
                                  fontSize: 14,
                                  color: Colors.black,
                                ),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 32),

                        // MAIN SUBMIT TRANSACTION BLOCK
                        SizedBox(
                          width: double.infinity,
                          height: 48,
                          child: UPrimaryButton(
                            label: 'Log In',
                            isLoading: _loading,
                            onPressed: _submit,
                          ),
                        ),
                        const SizedBox(height: 28),

                        // DIVIDER INTERSECT ACCENT LINE
                        const Row(
                          children: [
                            Expanded(child: Divider(color: Colors.black, thickness: 1.5)),
                            Padding(
                              padding: EdgeInsets.symmetric(horizontal: 16),
                              child: Text(
                                'Or',
                                style: TextStyle(
                                  color: Colors.black,
                                  fontWeight: FontWeight.bold,
                                  fontSize: 14,
                                ),
                              ),
                            ),
                            Expanded(child: Divider(color: Colors.black, thickness: 1.5)),
                          ],
                        ),
                        const SizedBox(height: 28),

                        // CUSTOM SOVEREIGN SOCIAL OAUTH ACTIONS
                        _buildSocialButton(
                          label: 'Sign in with Google',
                          imageAsset: 'assets/images/google_logo.png',
                          onTap: () {},
                        ),
                        const SizedBox(height: 12),
                        _buildSocialButton(
                          label: 'Sign in with Apple',
                          imageAsset: 'assets/images/apple_logo.png',
                          onTap: () {},
                        ),

                        const Spacer(),
                        const SizedBox(height: 32),

                        // NAVIGATION ROUTER FOOTER INTERACTION LABEL
                        Center(
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              const Text(
                                "Don't have an account? ",
                                style: TextStyle(
                                  color: Colors.black,
                                  fontSize: 14,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                              GestureDetector(
                                onTap: () => context.go('/signup'),
                                child: const Text(
                                  'Sign up',
                                  style: TextStyle(
                                    fontWeight: FontWeight.w900,
                                    color: Colors.black,
                                    fontSize: 14,
                                    decoration: TextDecoration.underline,
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(height: 16),
                      ],
                    ),
                  ),
                ),
              ),
            );
          },
        ),
      ),
    );
  }

  Widget _buildSocialButton({
    required String label,
    required String imageAsset,
    required VoidCallback onTap,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: double.infinity,
        height: 48,
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: Colors.black, width: 1.5),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Image.asset(
              imageAsset,
              width: 20,
              height: 20,
              fit: BoxFit.contain,
              errorBuilder: (context, error, stackTrace) => const Icon(
                LucideIcons.user,
                size: 20,
                color: Colors.black,
              ),
            ),
            const SizedBox(width: 12),
            Text(
              label,
              style: const TextStyle(
                fontWeight: FontWeight.w800,
                fontSize: 14,
                color: Colors.black,
              ),
            ),
          ],
        ),
      ),
    );
  }
}