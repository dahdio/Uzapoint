import 'package:flutter/material.dart';

import '../theme/uzapoint_colors.dart';
import 'glass/uglass_surface.dart';

Future<T?> showUSheet<T>({
  required BuildContext context,
  required String title,
  required Widget child,
}) {
  final colors = UzapointColors.of(context);
  final radii = UzapointRadii.of(context);

  return showModalBottomSheet<T>(
    context: context,
    isScrollControlled: true,
    backgroundColor: Colors.transparent,
    builder: (context) {
      return Padding(
        padding: EdgeInsets.only(
          bottom: MediaQuery.viewInsetsOf(context).bottom,
        ),
        child: UGlassSurface(
          borderRadius: BorderRadius.vertical(top: Radius.circular(radii.xl)),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const SizedBox(height: 10),
              Container(
                width: 40,
                height: 4,
                decoration: BoxDecoration(
                  color: colors.mutedForeground.withValues(alpha: 0.35),
                  borderRadius: BorderRadius.circular(99),
                ),
              ),
              Padding(
                padding: const EdgeInsets.fromLTRB(20, 16, 20, 8),
                child: Row(
                  children: [
                    Expanded(
                      child: Text(
                        title,
                        style: Theme.of(context).textTheme.titleMedium,
                      ),
                    ),
                    IconButton(
                      onPressed: () => Navigator.pop(context),
                      icon: const Icon(Icons.close, size: 20),
                    ),
                  ],
                ),
              ),
              Flexible(child: child),
              SizedBox(height: MediaQuery.paddingOf(context).bottom + 12),
            ],
          ),
        ),
      );
    },
  );
}
