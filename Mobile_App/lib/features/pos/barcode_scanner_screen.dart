import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:go_router/go_router.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:mobile_scanner/mobile_scanner.dart';

import '../../core/theme/uzapoint_colors.dart';
import '../../data/mock_catalog.dart';

class BarcodeScannerScreen extends StatefulWidget {
  const BarcodeScannerScreen({super.key});

  @override
  State<BarcodeScannerScreen> createState() => _BarcodeScannerScreenState();
}

class _BarcodeScannerScreenState extends State<BarcodeScannerScreen> {
  final MobileScannerController _controller = MobileScannerController(
    detectionSpeed: DetectionSpeed.normal,
    facing: CameraFacing.back,
  );

  bool _handled = false;
  String? _lastCode;
  String? _message;

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _onDetect(BarcodeCapture capture) {
    if (_handled) return;
    final barcode = capture.barcodes.firstOrNull;
    final raw = barcode?.rawValue;
    if (raw == null || raw.isEmpty) return;

    final product = findProductByBarcode(raw);
    setState(() {
      _lastCode = raw;
      _message = product != null
          ? 'Found: ${product.name}'
          : 'No product found for "$raw"';
    });

    if (product != null) {
      _handled = true;
      HapticFeedback.mediumImpact();
      context.pop(product);
    }
  }

  @override
  Widget build(BuildContext context) {
    final spacing = UzapointSpacing.of(context);

    return Scaffold(
      backgroundColor: Colors.black,
      body: SafeArea(
        child: Stack(
          fit: StackFit.expand,
          children: [
            // 1. BASE CAMERA SCANNER STREAM LAYER
            MobileScanner(
              controller: _controller,
              onDetect: _onDetect,
            ),

            // 2. NEO-BRUTALIST OVERLAY TOP BAR
            Positioned(
              top: spacing.md,
              left: spacing.md,
              right: spacing.md,
              child: Row(
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
                        child: Icon(LucideIcons.x, color: Colors.black, size: 18),
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(20),
                      border: Border.all(color: Colors.black, width: 1.5),
                    ),
                    child: const Text(
                      'Scan Product Barcode',
                      style: TextStyle(
                        color: Colors.black,
                        fontSize: 14,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ],
              ),
            ),

            // 3. RETICLE VIEWPORT TARGET FRAME
            Center(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Container(
                    width: 280,
                    height: 160,
                    decoration: BoxDecoration(
                      color: Colors.transparent,
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: Colors.white, width: 2.5),
                    ),
                  ),
                  const SizedBox(height: 16),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                    decoration: BoxDecoration(
                      // Fixed: Used .withValues(alpha: 0.6) instead of deprecated withOpacity
                      color: Colors.black.withValues(alpha: 0.6),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: const Text(
                      'Align barcode inside target area',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 12,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ),
                ],
              ),
            ),

            // 4. BOTTOM DYNAMIC RESULT FEEDBACK BAR
            if (_lastCode != null || _message != null)
              Positioned(
                left: spacing.md,
                right: spacing.md,
                bottom: spacing.md,
                child: Container(
                  padding: const EdgeInsets.all(14),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(14),
                    border: Border.all(color: Colors.black, width: 1.5),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Row(
                        children: [
                          Icon(
                            _handled ? LucideIcons.checkCircle2 : LucideIcons.alertTriangle,
                            color: _handled ? const Color(0xFF10B981) : const Color(0xFFEF4444),
                            size: 16,
                          ),
                          const SizedBox(width: 8),
                          Text(
                            _handled ? 'SKU MATCH FOUND' : 'UNKNOWN ITEM',
                            style: TextStyle(
                              color: _handled ? const Color(0xFF10B981) : const Color(0xFFEF4444),
                              fontSize: 11,
                              fontWeight: FontWeight.bold,
                              letterSpacing: 0.5,
                            ),
                          ),
                        ],
                      ),
                      if (_lastCode != null) ...[
                        const SizedBox(height: 6),
                        Text(
                          'Barcode: $_lastCode',
                          style: const TextStyle(
                            color: Color(0xFF4B5563),
                            fontSize: 12,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                      if (_message != null) ...[
                        const SizedBox(height: 2),
                        Text(
                          _message!,
                          style: const TextStyle(
                            color: Colors.black,
                            fontSize: 14,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ],
                    ],
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }
}

extension _FirstBarcode on List<Barcode> {
  Barcode? get firstOrNull => isEmpty ? null : first;
}