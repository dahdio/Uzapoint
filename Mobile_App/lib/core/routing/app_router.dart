import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../features/analytics/analytics_screen.dart';
import '../../features/auth/login_screen.dart';
import '../../features/auth/signup_screen.dart';
import '../../features/auth/welcome_screen.dart';
import '../../features/dashboard/dashboard_screen.dart';
import '../../features/inventory/inventory_screen.dart';
import '../../features/more/more_screen.dart';
import '../../features/onboarding/onboarding_screen.dart';
import '../../features/pos/barcode_scanner_screen.dart';
import '../../features/pos/cart_screen.dart';
import '../../features/pos/checkout_screen.dart';
import '../../features/pos/pos_screen.dart';
import '../../features/pos/receipt_screen.dart';
import '../../features/pos/sync_queue_screen.dart';
import '../../features/reports/reports_screen.dart';
import '../../features/settings/settings_hub_screen.dart';
import '../../features/shell/main_shell.dart';
import '../../features/splash/splash_screen.dart';

final rootNavigatorKey = GlobalKey<NavigatorState>();
final shellNavigatorKey = GlobalKey<NavigatorState>();

GoRouter createAppRouter() {
  return GoRouter(
    navigatorKey: rootNavigatorKey,
    initialLocation: '/splash',
    routes: [
      GoRoute(
        path: '/splash',
        builder: (context, state) => const SplashScreen(),
      ),
      GoRoute(
        path: '/welcome',
        builder: (context, state) => const WelcomeScreen(),
      ),
      GoRoute(
        path: '/login',
        builder: (context, state) => const LoginScreen(),
      ),
      GoRoute(
        path: '/signup',
        builder: (context, state) => const SignUpScreen(),
      ),
      GoRoute(
        path: '/onboarding',
        builder: (context, state) => const OnboardingScreen(),
      ),
      StatefulShellRoute.indexedStack(
        builder: (context, state, navigationShell) {
          return MainShell(navigationShell: navigationShell);
        },
        branches: [
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: '/home',
                builder: (context, state) => const DashboardScreen(),
              ),
            ],
          ),
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: '/pos',
                builder: (context, state) => const PosScreen(),
                routes: [
                  GoRoute(
                    path: 'cart',
                    parentNavigatorKey: rootNavigatorKey,
                    builder: (context, state) => const CartScreen(),
                  ),
                  GoRoute(
                    path: 'checkout',
                    parentNavigatorKey: rootNavigatorKey,
                    builder: (context, state) => const CheckoutScreen(),
                  ),
                  GoRoute(
                    path: 'receipt',
                    parentNavigatorKey: rootNavigatorKey,
                    builder: (context, state) {
                      final extra = state.extra as Map<String, dynamic>?;
                      return ReceiptScreen(
                        total: extra?['total'] as double? ?? 0,
                        method: extra?['method'] as String? ?? 'Cash',
                        saleId: extra?['saleId'] as String?,
                        synced: extra?['synced'] as bool? ?? true,
                      );
                    },
                  ),
                  GoRoute(
                    path: 'scanner',
                    parentNavigatorKey: rootNavigatorKey,
                    builder: (context, state) => const BarcodeScannerScreen(),
                  ),
                  GoRoute(
                    path: 'sync-queue',
                    parentNavigatorKey: rootNavigatorKey,
                    builder: (context, state) => const SyncQueueScreen(),
                  ),
                ],
              ),
            ],
          ),
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: '/inventory',
                builder: (context, state) => const InventoryScreen(),
              ),
            ],
          ),
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: '/more',
                builder: (context, state) => const MoreScreen(),
                routes: [
                  GoRoute(
                    path: 'settings',
                    parentNavigatorKey: rootNavigatorKey,
                    builder: (context, state) => const SettingsHubScreen(),
                  ),
                  GoRoute(
                    path: 'analytics',
                    parentNavigatorKey: rootNavigatorKey,
                    builder: (context, state) => const AnalyticsScreen(),
                  ),
                  GoRoute(
                    path: 'reports',
                    parentNavigatorKey: rootNavigatorKey,
                    builder: (context, state) => const ReportsScreen(),
                  ),
                ],
              ),
            ],
          ),
        ],
      ),
    ],
  );
}
