import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:provider/provider.dart';

import '../../state/sync_queue_notifier.dart';
import '../theme/uzapoint_colors.dart';

class OfflineBanner extends StatelessWidget {
  const OfflineBanner({super.key});

  @override
  Widget build(BuildContext context) {
    final sync = context.watch<SyncQueueNotifier>();
    if (sync.isOnline && sync.pendingCount == 0) {
      return const SizedBox.shrink();
    }

    final colors = UzapointColors.of(context);
    final spacing = UzapointSpacing.of(context);

    final offline = !sync.isOnline;
    final pending = sync.pendingCount;

    return Material(
      color: offline ? colors.warning.withValues(alpha: 0.15) : colors.info.withValues(alpha: 0.12),
      child: InkWell(
        onTap: () => context.push('/pos/sync-queue'),
        child: Padding(
          padding: EdgeInsets.symmetric(
            horizontal: spacing.md,
            vertical: spacing.sm,
          ),
          child: Row(
            children: [
              Icon(
                offline ? LucideIcons.wifiOff : LucideIcons.uploadCloud,
                size: 18,
                color: offline ? colors.warning : colors.info,
              ),
              SizedBox(width: spacing.sm),
              Expanded(
                child: Text(
                  offline
                      ? 'Offline — sales will sync when connected'
                      : '$pending sale${pending == 1 ? '' : 's'} pending sync',
                  style: Theme.of(context).textTheme.labelLarge?.copyWith(
                        color: offline ? colors.warning : colors.info,
                        fontWeight: FontWeight.w600,
                      ),
                ),
              ),
              if (sync.isSyncing)
                SizedBox(
                  width: 16,
                  height: 16,
                  child: CircularProgressIndicator(
                    strokeWidth: 2,
                    color: colors.info,
                  ),
                )
              else
                Icon(
                  LucideIcons.chevronRight,
                  size: 18,
                  color: colors.mutedForeground,
                ),
            ],
          ),
        ),
      ),
    );
  }
}
