import 'package:flutter_test/flutter_test.dart';
import 'package:uzapoint_mobile/data/mock_catalog.dart';
import 'package:uzapoint_mobile/models/pending_sale.dart';

void main() {
  test('PendingSale serializes and deserializes', () {
    final sale = PendingSale.fromCart(
      id: 'id-1',
      idempotencyKey: 'key-1',
      paymentMethod: 'Cash',
      cartLines: [
        CartLine(product: mockProducts.first, quantity: 2),
      ],
    );

    final restored = PendingSale.fromJson(sale.toJson());
    expect(restored.id, 'id-1');
    expect(restored.total, 360);
    expect(restored.lines.first.name, mockProducts.first.name);
  });
}
