import 'package:flutter/material.dart';

Color colorFromHex(String hex) {
  final cleaned = hex.replaceFirst('#', '');
  final value = int.parse(cleaned, radix: 16);
  if (cleaned.length == 6) {
    return Color(0xFF000000 | value);
  }
  return Color(value);
}
