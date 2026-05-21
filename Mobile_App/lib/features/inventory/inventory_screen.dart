import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../core/theme/uzapoint_colors.dart';
import '../../data/mock_catalog.dart';

class InventoryScreen extends StatefulWidget {
  const InventoryScreen({super.key});

  @override
  State<InventoryScreen> createState() => _InventoryScreenState();
}

class _InventoryScreenState extends State<InventoryScreen> {
  String _query = '';

  @override
  Widget build(BuildContext context) {
    final spacing = UzapointSpacing.of(context);

    final items = mockProducts.where((p) {
      final q = _query.toLowerCase();
      return q.isEmpty ||
          p.name.toLowerCase().contains(q) ||
          p.sku.toLowerCase().contains(q);
    }).toList();

    return Scaffold(
      backgroundColor: const Color(0xFFF9FAFB),
      body: SafeArea(
        bottom: false,
        child: Column(
          children: [
            // 1. TOP BAR ROW (With Action Round Circle Icons)
            Padding(
              padding: EdgeInsets.fromLTRB(spacing.md, spacing.md, spacing.md, spacing.sm),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text(
                    'Inventory',
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
                      // Circular Plus Button
                      GestureDetector(
                        onTap: () {
                          // Add item functionality
                        },
                        child: Container(
                          width: 42,
                          height: 42,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            color: Colors.white,
                            border: Border.all(color: Colors.black, width: 1.5),
                          ),
                          child: const Center(
                            child: Icon(LucideIcons.plus, color: Colors.black, size: 18),
                          ),
                        ),
                      ),
                      const SizedBox(width: 8),
                      // Circular Notification Bell Button
                      GestureDetector(
                        onTap: () {
                          // Notification functionality
                        },
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

            // 2. CLEAN SINGLE SEARCH BAR
            Padding(
              padding: EdgeInsets.fromLTRB(spacing.md, spacing.sm, spacing.md, spacing.sm),
              child: Container(
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: Colors.black, width: 1.5),
                ),
                child: TextField(
                  onChanged: (v) => setState(() => _query = v),
                  style: const TextStyle(color: Colors.black, fontSize: 14, fontWeight: FontWeight.w500),
                  decoration: const InputDecoration(
                    isDense: true,
                    filled: false,
                    hintText: 'Search SKU, Name...',
                    hintStyle: TextStyle(color: Color(0xFF9CA3AF), fontSize: 14),
                    prefixIcon: Icon(LucideIcons.search, size: 18, color: Colors.black),
                    border: InputBorder.none,
                    enabledBorder: InputBorder.none,
                    focusedBorder: InputBorder.none,
                    contentPadding: EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                  ),
                ),
              ),
            ),

            SizedBox(height: spacing.sm),

            // 3. INVENTORY LIST VIEW
            Expanded(
              child: ListView.builder(
                padding: EdgeInsets.fromLTRB(spacing.md, spacing.sm, spacing.md, 120),
                itemCount: items.length,
                itemBuilder: (context, index) {
                  final p = items[index];
                  return Container(
                    margin: const EdgeInsets.only(bottom: 12),
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: Colors.black, width: 1.5),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                p.name,
                                style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w900, color: Colors.black),
                              ),
                              const SizedBox(height: 4),
                              Text(
                                '${p.sku} • ${p.category}',
                                style: const TextStyle(fontSize: 12, color: Color(0xFF6B7280), fontWeight: FontWeight.w500),
                              ),
                            ],
                          ),
                        ),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.end,
                          children: [
                            Text(
                              'KES ${p.price.toStringAsFixed(0)}',
                              style: const TextStyle(
                                fontSize: 14,
                                fontWeight: FontWeight.w900,
                                color: Colors.black,
                                fontFeatures: [FontFeature.tabularFigures()],
                              ),
                            ),
                            const SizedBox(height: 6),
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                              decoration: BoxDecoration(
                                color: p.stock < 10 ? const Color(0xFFFEF2F2) : const Color(0xFFF3F4F6),
                                borderRadius: BorderRadius.circular(6),
                                border: Border.all(color: p.stock < 10 ? const Color(0xFFEF4444) : Colors.black, width: 1.0),
                              ),
                              child: Text(
                                '${p.stock} in stock',
                                style: TextStyle(fontSize: 10, fontWeight: FontWeight.w800, color: p.stock < 10 ? const Color(0xFFEF4444) : Colors.black),
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        backgroundColor: Colors.black,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
          side: const BorderSide(color: Colors.white, width: 2),
        ),
        child: const Icon(LucideIcons.plus, color: Colors.white),
      ),
    );
  }
}