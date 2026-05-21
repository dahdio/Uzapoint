import '../data/mock_catalog.dart';

enum PendingSaleStatus { pending, syncing, synced, failed }

class PendingSaleLine {
  const PendingSaleLine({
    required this.productId,
    required this.name,
    required this.sku,
    required this.quantity,
    required this.unitPrice,
  });

  final String productId;
  final String name;
  final String sku;
  final int quantity;
  final double unitPrice;

  double get lineTotal => unitPrice * quantity;

  Map<String, dynamic> toJson() => {
        'productId': productId,
        'name': name,
        'sku': sku,
        'quantity': quantity,
        'unitPrice': unitPrice,
      };

  factory PendingSaleLine.fromJson(Map<String, dynamic> json) => PendingSaleLine(
        productId: json['productId'] as String,
        name: json['name'] as String,
        sku: json['sku'] as String,
        quantity: json['quantity'] as int,
        unitPrice: (json['unitPrice'] as num).toDouble(),
      );
}

class PendingSale {
  PendingSale({
    required this.id,
    required this.idempotencyKey,
    required this.createdAt,
    required this.paymentMethod,
    required this.lines,
    this.status = PendingSaleStatus.pending,
    this.lastError,
    this.syncedAt,
  });

  final String id;
  final String idempotencyKey;
  final DateTime createdAt;
  final String paymentMethod;
  final List<PendingSaleLine> lines;
  PendingSaleStatus status;
  String? lastError;
  DateTime? syncedAt;

  double get total => lines.fold(0, (sum, l) => sum + l.lineTotal);

  Map<String, dynamic> toJson() => {
        'id': id,
        'idempotencyKey': idempotencyKey,
        'createdAt': createdAt.toIso8601String(),
        'paymentMethod': paymentMethod,
        'lines': lines.map((l) => l.toJson()).toList(),
        'status': status.name,
        'lastError': lastError,
        'syncedAt': syncedAt?.toIso8601String(),
      };

  factory PendingSale.fromJson(Map<String, dynamic> json) {
    return PendingSale(
      id: json['id'] as String,
      idempotencyKey: json['idempotencyKey'] as String,
      createdAt: DateTime.parse(json['createdAt'] as String),
      paymentMethod: json['paymentMethod'] as String,
      lines: (json['lines'] as List)
          .map((e) => PendingSaleLine.fromJson(e as Map<String, dynamic>))
          .toList(),
      status: PendingSaleStatus.values.byName(json['status'] as String),
      lastError: json['lastError'] as String?,
      syncedAt: json['syncedAt'] != null
          ? DateTime.parse(json['syncedAt'] as String)
          : null,
    );
  }

  static PendingSale fromCart({
    required String id,
    required String idempotencyKey,
    required String paymentMethod,
    required List<CartLine> cartLines,
  }) {
    return PendingSale(
      id: id,
      idempotencyKey: idempotencyKey,
      createdAt: DateTime.now(),
      paymentMethod: paymentMethod,
      lines: cartLines
          .map(
            (l) => PendingSaleLine(
              productId: l.product.id,
              name: l.product.name,
              sku: l.product.sku,
              quantity: l.quantity,
              unitPrice: l.product.price,
            ),
          )
          .toList(),
    );
  }
}
