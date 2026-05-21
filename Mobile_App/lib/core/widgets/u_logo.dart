import 'package:flutter/material.dart';

import '../theme/uzapoint_colors.dart';

class ULogo extends StatelessWidget {
  const ULogo({
    super.key,
    this.size = 40,
    this.inverted = true,
  });

  final double size;
  final bool inverted;

  @override
  Widget build(BuildContext context) {
    final colors = UzapointColors.of(context);
    final radii = UzapointRadii.of(context);

    final bg = inverted ? colors.foreground : colors.primary;
    final fg = inverted ? colors.background : colors.primaryForeground;

    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(radii.logo),
      ),
      alignment: Alignment.center,
      child: Text(
        'U',
        style: TextStyle(
          color: fg,
          fontSize: size * 0.45,
          fontWeight: FontWeight.w700,
          height: 1,
        ),
      ),
    );
  }
}
