import 'package:flutter/material.dart';
import '../theme/uzapoint_colors.dart';

class UTextField extends StatelessWidget {
  const UTextField({
    super.key,
    required this.controller,
    this.label,
    this.hint,
    this.obscureText = false,
    this.keyboardType,
    this.textInputAction,
    this.prefixIcon,
    this.suffix,
    this.onSubmitted,
  });

  final TextEditingController controller;
  final String? label;
  final String? hint;
  final bool obscureText;
  final TextInputType? keyboardType;
  final TextInputAction? textInputAction;
  final Widget? prefixIcon;
  final Widget? suffix;
  final ValueChanged<String>? onSubmitted;

  @override
  Widget build(BuildContext context) {
    final spacing = UzapointSpacing.of(context);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (label != null) ...[
          Text(
            label!,
            style: Theme.of(context).textTheme.labelLarge?.copyWith(
              fontWeight: FontWeight.w600,
              color: Colors.black87,
            ),
          ),
          SizedBox(height: spacing.xs + 2),
        ],
        TextField(
          controller: controller,
          obscureText: obscureText,
          keyboardType: keyboardType,
          textInputAction: textInputAction,
          onSubmitted: onSubmitted,
          style: Theme.of(context).textTheme.bodyMedium?.copyWith(
            color: const Color(0xFF1F2937),
            fontWeight: FontWeight.w600, // Slightly bolder text for neo-brutalist presence
          ),
          decoration: InputDecoration(
            hintText: hint,
            hintStyle: TextStyle(
              color: Colors.grey.shade500,
              fontWeight: FontWeight.w500,
            ),
            // Upgraded icon themes to high-contrast black to match button accents
            prefixIcon: prefixIcon != null
                ? IconTheme(
              data: const IconThemeData(color: Colors.black),
              child: prefixIcon!,
            )
                : null,
            suffixIcon: suffix,
            contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
            filled: true,
            fillColor: Colors.white,
            // Changed radius from 30 to 12 and gray color to thick black frames
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: const BorderSide(color: Colors.black, width: 1.5),
            ),
            enabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: const BorderSide(color: Colors.black, width: 1.5),
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: const BorderSide(color: Colors.black, width: 1.5),
            ),
          ),
        ),
      ],
    );
  }
}

class UPasswordSuffix extends StatefulWidget {
  const UPasswordSuffix({super.key, required this.obscured, required this.onToggle});

  final bool obscured;
  final VoidCallback onToggle;

  @override
  State<UPasswordSuffix> createState() => _UPasswordSuffixState();
}

class _UPasswordSuffixState extends State<UPasswordSuffix> {
  @override
  Widget build(BuildContext context) {
    return IconButton(
      icon: Icon(
        widget.obscured ? Icons.visibility_off_outlined : Icons.visibility_outlined,
        color: Colors.black, // Upgraded to bold black for consistency
        size: 20,
      ),
      onPressed: widget.onToggle,
    );
  }
}