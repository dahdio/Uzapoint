import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:go_router/go_router.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:provider/provider.dart';

import '../../core/theme/uzapoint_colors.dart';
import '../../models/pending_sale.dart';
import '../../state/cart_notifier.dart';
import '../../state/sync_queue_notifier.dart';

class CheckoutScreen extends StatefulWidget {
  const CheckoutScreen({super.key});

  @override
  State<CheckoutScreen> createState() => _CheckoutScreenState();
}

class _CheckoutScreenState extends State<CheckoutScreen> {
  String? _selectedMethod = 'Cash';
  bool _processing = false;

  Future<void> _pay(String method) async {
    setState(() {
      _processing = true;
    });
    HapticFeedback.mediumImpact();

    final cart = context.read<CartNotifier>();
    final sync = context.read<SyncQueueNotifier>();

    final lines = cart.lines.toList();
    final total = cart.subtotal;

    final sale = await sync.enqueueFromCart(
      paymentMethod: method,
      cartLines: lines,
    );

    cart.clear();
    if (!mounted) return;
    setState(() => _processing = false);

    final synced = sale.status == PendingSaleStatus.synced;
    if (!synced && mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(
            sync.isOnline
                ? 'Sale saved — will retry sync'
                : 'Offline — sale queued for sync',
          ),
        ),
      );
    }

    context.go(
      '/pos/receipt',
      extra: {
        'total': total,
        'method': method,
        'saleId': sale.id,
        'synced': synced,
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final spacing = UzapointSpacing.of(context);
    final cart = context.watch<CartNotifier>();

    return Scaffold(
      backgroundColor: const Color(0xFFF9FAFB),
      body: SafeArea(
        child: Stack(
          children: [
            Column(
              children: [
                // 1. TOP BAR CUSTOM CONTAINER ROW
                Padding(
                  padding: EdgeInsets.fromLTRB(spacing.md, spacing.md, spacing.md, spacing.sm),
                  child: Row(
                    children: [
                      WidgetToClick(
                        onTap: _processing ? null : () => context.pop(),
                        child: Container(
                          width: 40,
                          height: 40,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            color: _processing ? const Color(0xFFE5E7EB) : Colors.white,
                            border: Border.all(color: Colors.black, width: 1.5),
                          ),
                          child: const Center(
                            child: Icon(LucideIcons.arrowLeft, color: Colors.black, size: 18),
                          ),
                        ),
                      ),
                      const SizedBox(width: 12),
                      const Text(
                        'Checkout Order',
                        style: TextStyle(
                          color: Colors.black,
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                          letterSpacing: -0.5,
                        ),
                      ),
                    ],
                  ),
                ),

                // 2. MAIN CONTAINER BODY SCROLL VIEW
                Expanded(
                  child: ListView(
                    padding: EdgeInsets.symmetric(horizontal: spacing.md, vertical: spacing.sm),
                    children: [
                      // BRUTAL SUMMARY BLOCK
                      Container(
                        padding: const EdgeInsets.all(16),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(14),
                          border: Border.all(color: Colors.black, width: 1.5),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text(
                              'Order Summary',
                              style: TextStyle(
                                color: Colors.black,
                                fontSize: 14,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            const SizedBox(height: 12),
                            ...cart.lines.map(
                                  (l) => Padding(
                                padding: const EdgeInsets.only(bottom: 10),
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  children: [
                                    Expanded(
                                      child: Text(
                                        '${l.quantity} × ${l.product.name}',
                                        maxLines: 1,
                                        overflow: TextOverflow.ellipsis,
                                        style: const TextStyle(
                                          color: Color(0xFF4B5563),
                                          fontSize: 13,
                                          fontWeight: FontWeight.w500,
                                        ),
                                      ),
                                    ),
                                    Text(
                                      'KES ${l.lineTotal.toStringAsFixed(0)}',
                                      style: const TextStyle(
                                        color: Colors.black,
                                        fontSize: 13,
                                        fontWeight: FontWeight.bold,
                                        fontFeatures: [FontFeature.tabularFigures()],
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                            const Padding(
                              padding: EdgeInsets.symmetric(vertical: 6),
                              // FIXED: Changed parameter from 'strokeWidth' to 'thickness'
                              child: Divider(color: Colors.black, thickness: 1.2),
                            ),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                const Text(
                                  'Total Payable',
                                  style: TextStyle(
                                    color: Colors.black,
                                    fontSize: 14,
                                    fontWeight: FontWeight.w800,
                                  ),
                                ),
                                Text(
                                  'KES ${cart.subtotal.toStringAsFixed(0)}',
                                  style: const TextStyle(
                                    color: Colors.black,
                                    fontSize: 18,
                                    fontWeight: FontWeight.w900,
                                    fontFeatures: [FontFeature.tabularFigures()],
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 24),

                      // PAYMENT METHODS SELECTION TRACK
                      const Text(
                        'Select Payment Method',
                        style: TextStyle(
                          color: Colors.black,
                          fontSize: 14,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(height: 12),

                      _MethodTile(
                        icon: LucideIcons.banknote,
                        label: 'Cash',
                        isSelected: _selectedMethod == 'Cash',
                        onTap: () => setState(() => _selectedMethod = 'Cash'),
                      ),
                      const SizedBox(height: 10),
                      _MethodTile(
                        icon: LucideIcons.smartphone,
                        label: 'M-Pesa',
                        isSelected: _selectedMethod == 'M-Pesa',
                        onTap: () => setState(() => _selectedMethod = 'M-Pesa'),
                      ),
                      const SizedBox(height: 10),
                      _MethodTile(
                        icon: LucideIcons.creditCard,
                        label: 'Card Terminal',
                        isSelected: _selectedMethod == 'Card',
                        onTap: () => setState(() => _selectedMethod = 'Card'),
                      ),
                    ],
                  ),
                ),

                // 3. STICKY SUBMIT FOOTER BAR
                Container(
                  padding: EdgeInsets.fromLTRB(spacing.md, 16, spacing.md, 24),
                  decoration: const BoxDecoration(
                    color: Colors.white,
                    border: Border(
                      top: BorderSide(color: Colors.black, width: 1.5),
                    ),
                  ),
                  child: WidgetToClick(
                    onTap: _processing || _selectedMethod == null
                        ? null
                        : () => _pay(_selectedMethod!),
                    child: Container(
                      height: 52,
                      decoration: BoxDecoration(
                        color: Colors.black,
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: const Center(
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text(
                              'Complete Transaction',
                              style: TextStyle(
                                color: Colors.white,
                                fontSize: 15,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            SizedBox(width: 8),
                            Icon(LucideIcons.check, color: Colors.white, size: 16),
                          ],
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            ),

            // 4. EMBEDDED LOADER LAYER
            if (_processing)
              Positioned.fill(
                child: Container(
                  color: Colors.black.withValues(alpha: 0.4),
                  child: Center(
                    child: Container(
                      width: 220,
                      padding: const EdgeInsets.all(24),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(color: Colors.black, width: 2.0),
                      ),
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          const SizedBox(
                            width: 28,
                            height: 28,
                            child: CircularProgressIndicator(
                              color: Colors.black,
                            ),
                          ),
                          const SizedBox(height: 16),
                          Text(
                            'Processing $_selectedMethod...',
                            textAlign: TextAlign.center,
                            style: const TextStyle(
                              color: Colors.black,
                              fontSize: 13,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }
}

class _MethodTile extends StatelessWidget {
  const _MethodTile({
    required this.icon,
    required this.label,
    required this.isSelected,
    required this.onTap,
  });

  final IconData icon;
  final String label;
  final bool isSelected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(12),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
        decoration: BoxDecoration(
          color: isSelected ? const Color(0xFFF3F4F6) : Colors.white,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: Colors.black,
            width: isSelected ? 2.0 : 1.2,
          ),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Row(
              children: [
                Icon(icon, color: Colors.black, size: 18),
                const SizedBox(width: 14),
                Text(
                  label,
                  style: const TextStyle(
                    color: Colors.black,
                    fontSize: 14,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
            Container(
              width: 18,
              height: 18,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: isSelected ? Colors.black : Colors.white,
                border: Border.all(color: Colors.black, width: 1.5),
              ),
              child: isSelected
                  ? const Center(
                child: Icon(LucideIcons.check, color: Colors.white, size: 10),
              )
                  : null,
            ),
          ],
        ),
      ),
    );
  }
}

/// Helper aliased widget mapping back cleanly to clear touch targets
class WidgetToClick extends StatelessWidget {
  const WidgetToClick({super.key, required this.child, required this.onTap});
  final Widget child;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      behavior: HitTestBehavior.opaque,
      child: child,
    );
  }
}