import 'package:flutter/foundation.dart';

import '../data/mock_catalog.dart';

class CartNotifier extends ChangeNotifier {
  final List<CartLine> _lines = [];

  List<CartLine> get lines => List.unmodifiable(_lines);

  int get itemCount => _lines.fold(0, (sum, l) => sum + l.quantity);

  double get subtotal =>
      _lines.fold(0, (sum, l) => sum + l.lineTotal);

  void add(ProductItem product) {
    final existing = _lines.where((l) => l.product.id == product.id).firstOrNull;
    if (existing != null) {
      existing.quantity++;
    } else {
      _lines.add(CartLine(product: product));
    }
    notifyListeners();
  }

  void setQuantity(String productId, int qty) {
    final line = _lines.where((l) => l.product.id == productId).firstOrNull;
    if (line == null) return;
    if (qty <= 0) {
      _lines.remove(line);
    } else {
      line.quantity = qty;
    }
    notifyListeners();
  }

  void remove(String productId) {
    _lines.removeWhere((l) => l.product.id == productId);
    notifyListeners();
  }

  void clear() {
    _lines.clear();
    notifyListeners();
  }
}

extension _FirstOrNull<E> on Iterable<E> {
  E? get firstOrNull {
    final iterator = this.iterator;
    if (iterator.moveNext()) return iterator.current;
    return null;
  }
}
