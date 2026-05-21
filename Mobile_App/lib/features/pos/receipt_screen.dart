import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:go_router/go_router.dart';
import 'package:lucide_icons/lucide_icons.dart';

import '../../core/theme/uzapoint_colors.dart';

class ReceiptScreen extends StatelessWidget {
  const ReceiptScreen({
    super.key,
    required this.total,
    required this.method,
    this.saleId,
    this.synced = true,
  });

  final double total;
  final String method;
  final String? saleId;
  final bool synced;

  @override
  Widget build(BuildContext context) {
    final spacing = UzapointSpacing.of(context);
    final printableReceiptId = saleId != null
        ? saleId!.substring(0, 8).toUpperCase()
        : DateTime.now().millisecondsSinceEpoch.toString().substring(7);

    return Scaffold(
      backgroundColor: const Color(0xFFF9FAFB),
      body: SafeArea(
        child: Padding(
          padding: EdgeInsets.all(spacing.md),
          child: Column(
            children: [
              const Spacer(),
              Container(
                width: 68,
                height: 68,
                decoration: BoxDecoration(
                  color: const Color(0xFFD1FAE5),
                  shape: BoxShape.circle,
                  border: Border.all(color: Colors.black, width: 1.5),
                ),
                child: const Center(
                  child: Icon(LucideIcons.check, color: Color(0xFF059669), size: 32),
                ),
              ),
              const SizedBox(height: 16),
              const Text(
                'Transaction Complete',
                style: TextStyle(color: Colors.black, fontSize: 22, fontWeight: FontWeight.w900),
              ),

              if (!synced) ...[
                const SizedBox(height: 10),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(
                    color: const Color(0xFFFEF3C7),
                    borderRadius: BorderRadius.circular(6),
                    border: Border.all(color: Colors.black, width: 1.2),
                  ),
                  child: const Text('PENDING SYNC', style: TextStyle(fontSize: 10, fontWeight: FontWeight.w900)),
                ),
              ],

              const SizedBox(height: 28),
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: Colors.black, width: 1.5),
                ),
                child: Column(
                  children: [
                    const Text('UZAPOINT BUSINESS', style: TextStyle(fontWeight: FontWeight.w900)),
                    const Padding(
                      padding: EdgeInsets.symmetric(vertical: 16),
                      child: Divider(color: Colors.black, thickness: 1.2),
                    ),
                    Text('KES ${total.toStringAsFixed(0)}', style: const TextStyle(fontSize: 32, fontWeight: FontWeight.w900)),
                    const Padding(
                      padding: EdgeInsets.symmetric(vertical: 16),
                      child: Divider(color: Colors.black, thickness: 1.2),
                    ),
                    _ReceiptRow(label: 'Payment Method', value: method.toUpperCase()),
                    const SizedBox(height: 10),
                    _ReceiptRow(label: 'Receipt ID', value: '#$printableReceiptId'),
                  ],
                ),
              ),
              const Spacer(),
              GestureDetector(
                onTap: () { // FIXED: Changed from onPressed to onTap
                  HapticFeedback.mediumImpact();
                  context.go('/pos');
                },
                child: Container(
                  height: 52,
                  decoration: BoxDecoration(color: Colors.black, borderRadius: BorderRadius.circular(12)),
                  child: const Center(child: Text('Initialize New Sale', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold))),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _ReceiptRow extends StatelessWidget {
  const _ReceiptRow({required this.label, required this.value});
  final String label;
  final String value;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(label, style: const TextStyle(color: Color(0xFF6B7280))),
        Text(value, style: const TextStyle(fontWeight: FontWeight.bold)),
      ],
    );
  }
}