import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:provider/provider.dart';

import '../../core/theme/uzapoint_colors.dart';
import '../../models/pending_sale.dart';
import '../../state/sync_queue_notifier.dart';

class SyncQueueScreen extends StatelessWidget {
  const SyncQueueScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final sync = context.watch<SyncQueueNotifier>();
    final spacing = UzapointSpacing.of(context);

    final active = sync.queue.where((s) => s.status != PendingSaleStatus.synced).toList();
    final synced = sync.queue.where((s) => s.status == PendingSaleStatus.synced).toList();

    return Scaffold(
      backgroundColor: const Color(0xFFF9FAFB),
      body: SafeArea(
        child: Column(
          children: [
            // 1. NEO-BRUTALIST TOP BAR ROW
            Padding(
              padding: EdgeInsets.fromLTRB(spacing.md, spacing.md, spacing.md, spacing.sm),
              child: Row(
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
                            shape: BoxShape.circle,
                            color: Colors.white,
                            border: Border.all(color: Colors.black, width: 1.5),
                          ),
                          child: const Center(
                            child: Icon(LucideIcons.arrowLeft, color: Colors.black, size: 18),
                          ),
                        ),
                      ),
                      const SizedBox(width: 12),
                      const Text(
                        'Sync Queue',
                        style: TextStyle(
                          color: Colors.black,
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                          letterSpacing: -0.5,
                        ),
                      ),
                    ],
                  ),
                  if (sync.pendingCount > 0 && sync.isOnline)
                    GestureDetector(
                      onTap: sync.isSyncing ? null : () => sync.syncAll(),
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                        decoration: BoxDecoration(
                          color: sync.isSyncing ? const Color(0xFFE5E7EB) : Colors.black,
                          borderRadius: BorderRadius.circular(10),
                          border: Border.all(color: Colors.black, width: 1.2),
                        ),
                        child: Text(
                          sync.isSyncing ? 'Syncing...' : 'Sync All',
                          style: TextStyle(
                            color: sync.isSyncing ? const Color(0xFF9CA3AF) : Colors.white,
                            fontSize: 12,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ),
                ],
              ),
            ),

            // 2. MAIN CONTAINER QUEUE LIST CONTENT
            Expanded(
              child: sync.queue.isEmpty
                  ? const Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(LucideIcons.cloudLightning, size: 48, color: Color(0xFF9CA3AF)),
                    SizedBox(height: 12),
                    Text(
                      'Queue is completely empty',
                      style: TextStyle(
                        color: Color(0xFF6B7280),
                        fontSize: 15,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
              )
                  : ListView(
                padding: EdgeInsets.symmetric(horizontal: spacing.md, vertical: spacing.sm),
                children: [
                  // Dynamic Connectivity Alert Card
                  Container(
                    padding: const EdgeInsets.all(14),
                    decoration: BoxDecoration(
                      color: sync.isOnline ? const Color(0xFFECFDF5) : const Color(0xFFFFF7ED),
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: Colors.black, width: 1.5),
                    ),
                    child: Row(
                      children: [
                        Icon(
                          sync.isOnline ? LucideIcons.wifi : LucideIcons.wifiOff,
                          color: sync.isOnline ? const Color(0xFF059669) : const Color(0xFFD97706),
                          size: 18,
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: Text(
                            sync.isOnline
                                ? 'Online — Sales processing automatically'
                                : 'Offline — Local cache enabled',
                            style: TextStyle(
                              color: sync.isOnline ? const Color(0xFF065F46) : const Color(0xFF9A3412),
                              fontSize: 13,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),

                  // Active Pending Upload Items Block
                  if (active.isNotEmpty) ...[
                    const SizedBox(height: 20),
                    const Text(
                      'Pending Upload',
                      style: TextStyle(
                        color: Colors.black,
                        fontSize: 14,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 10),
                    ...active.map((s) => _SaleTile(sale: s)),
                  ],

                  // Historic Uploaded Synced Items Block
                  if (synced.isNotEmpty) ...[
                    const SizedBox(height: 20),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text(
                          'Synced Logs',
                          style: TextStyle(
                            color: Colors.black,
                            fontSize: 14,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        GestureDetector(
                          onTap: () => sync.clearSynced(),
                          child: const Text(
                            'Clear Logs',
                            style: TextStyle(
                              color: Color(0xFFEF4444),
                              fontSize: 12,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 10),
                    ...synced.map((s) => _SaleTile(sale: s)),
                  ],
                ],
              ),
            ),

            // 3. RETRY STICKY FOOTER ACTIONS BAR
            if (sync.isOnline && active.isNotEmpty)
              Container(
                padding: EdgeInsets.fromLTRB(spacing.md, 16, spacing.md, 24),
                decoration: const BoxDecoration(
                  color: Colors.white,
                  border: Border(top: BorderSide(color: Colors.black, width: 1.5)),
                ),
                child: GestureDetector(
                  onTap: sync.isSyncing ? null : () => sync.syncAll(),
                  child: Container(
                    height: 52,
                    decoration: BoxDecoration(
                      color: Colors.black,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Center(
                      child: Text(
                        sync.isSyncing ? 'Processing Synchronization...' : 'Force Retry All Syncs',
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 14,
                          fontWeight: FontWeight.bold,
                        ),
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

class _SaleTile extends StatelessWidget {
  const _SaleTile({required this.sale});

  final PendingSale sale;

  @override
  Widget build(BuildContext context) {
    final sync = context.read<SyncQueueNotifier>();

    // Custom flat color configuration for badges mappings
    final (bgColor, fgColor) = switch (sale.status) {
      PendingSaleStatus.pending => (const Color(0xFFFEF3C7), const Color(0xFFD97706)),
      PendingSaleStatus.syncing => (const Color(0xFFDBEAFE), const Color(0xFF2563EB)),
      PendingSaleStatus.synced => (const Color(0xFFD1FAE5), const Color(0xFF059669)),
      PendingSaleStatus.failed => (const Color(0xFFFEE2E2), const Color(0xFFEF4444)),
    };

    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.black, width: 1.5),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'KES ${sale.total.toStringAsFixed(0)}',
                style: const TextStyle(
                  color: Colors.black,
                  fontSize: 16,
                  fontWeight: FontWeight.w800,
                  fontFeatures: [FontFeature.tabularFigures()],
                ),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: bgColor,
                  borderRadius: BorderRadius.circular(6),
                  border: Border.all(color: fgColor, width: 1.0),
                ),
                child: Text(
                  sale.status.name.toUpperCase(),
                  style: TextStyle(
                    color: fgColor,
                    fontSize: 9,
                    fontWeight: FontWeight.w900,
                    letterSpacing: 0.5,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 4),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                '${sale.lines.length} items · ${sale.paymentMethod}',
                style: const TextStyle(
                  color: Color(0xFF6B7280),
                  fontSize: 12,
                  fontWeight: FontWeight.w500,
                ),
              ),
              Text(
                _formatTime(sale.createdAt),
                style: const TextStyle(
                  color: Color(0xFF9CA3AF),
                  fontSize: 12,
                  fontWeight: FontWeight.bold,
                  fontFeatures: [FontFeature.tabularFigures()],
                ),
              ),
            ],
          ),
          if (sale.lastError != null) ...[
            const SizedBox(height: 8),
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: const Color(0xFFFEF2F2),
                borderRadius: BorderRadius.circular(6),
              ),
              child: Text(
                sale.lastError!,
                style: const TextStyle(
                  color: Color(0xFFEF4444),
                  fontSize: 11,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ),
          ],
          if (sale.status == PendingSaleStatus.failed || sale.status == PendingSaleStatus.pending) ...[
            const SizedBox(height: 12),
            GestureDetector(
              onTap: sync.isOnline && !sync.isSyncing ? () => sync.retry(sale.id) : null,
              child: Container(
                height: 36,
                decoration: BoxDecoration(
                  color: sync.isOnline && !sync.isSyncing ? Colors.black : const Color(0xFFF3F4F6),
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(color: Colors.black, width: 1.2),
                ),
                child: Center(
                  child: Text(
                    'Retry Individual Sync',
                    style: TextStyle(
                      color: sync.isOnline && !sync.isSyncing ? Colors.white : const Color(0xFF9CA3AF),
                      fontSize: 12,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),
            ),
          ],
        ],
      ),
    );
  }

  String _formatTime(DateTime dt) {
    final h = dt.hour.toString().padLeft(2, '0');
    final m = dt.minute.toString().padLeft(2, '0');
    return '$h:$m';
  }
}