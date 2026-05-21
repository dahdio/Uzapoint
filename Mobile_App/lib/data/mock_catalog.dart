class ProductItem {
  const ProductItem({
    required this.id,
    required this.name,
    required this.price,
    required this.category,
    required this.stock,
    required this.sku,
    required this.barcode,
    this.wholesalePrice,
    this.wholesaleMinQty = 1,
  });

  final String id;
  final String name;
  final double price;
  final String category;
  final int stock;
  final String sku;
  final String barcode;
  final double? wholesalePrice;
  final int wholesaleMinQty;
}

class CartLine {
  CartLine({required this.product, this.quantity = 1});

  final ProductItem product;
  int quantity;

  double get lineTotal => product.price * quantity;
}

const mockProducts = [
  ProductItem(
    id: '1',
    name: 'Unga Jogoo 2kg',
    price: 180,
    category: 'Flour',
    stock: 45,
    sku: 'FL-001',
    barcode: '6234567890123',
    wholesalePrice: 165,
    wholesaleMinQty: 10,
  ),
  ProductItem(
    id: '2',
    name: 'Kimbo 1kg',
    price: 320,
    category: 'Cooking Oil',
    stock: 32,
    sku: 'CO-001',
    barcode: '6234567890124',
    wholesalePrice: 295,
    wholesaleMinQty: 5,
  ),
  ProductItem(
    id: '3',
    name: 'Brookside Milk 500ml',
    price: 65,
    category: 'Dairy',
    stock: 120,
    sku: 'DA-001',
    barcode: '6234567890125',
  ),
  ProductItem(
    id: '4',
    name: 'Mumias Sugar 1kg',
    price: 150,
    category: 'Sugar',
    stock: 58,
    sku: 'SG-001',
    barcode: '6234567890126',
  ),
  ProductItem(
    id: '5',
    name: 'Ketepa Tea 100g',
    price: 95,
    category: 'Beverages',
    stock: 78,
    sku: 'BV-001',
    barcode: '6234567890127',
  ),
  ProductItem(
    id: '6',
    name: 'Royco Mchuzi Mix',
    price: 10,
    category: 'Spices',
    stock: 200,
    sku: 'SP-001',
    barcode: '6234567890128',
  ),
  ProductItem(
    id: '7',
    name: 'Omo Detergent 1kg',
    price: 220,
    category: 'Household',
    stock: 40,
    sku: 'HH-001',
    barcode: '6234567890129',
  ),
  ProductItem(
    id: '8',
    name: 'Bread (White) 400g',
    price: 60,
    category: 'Bakery',
    stock: 8,
    sku: 'BK-001',
    barcode: '6234567890130',
  ),
];

const mockCategories = [
  'All',
  'Flour',
  'Cooking Oil',
  'Dairy',
  'Sugar',
  'Beverages',
  'Spices',
  'Household',
  'Bakery',
];

ProductItem? findProductByBarcode(String raw) {
  final code = raw.trim();
  if (code.isEmpty) return null;
  for (final p in mockProducts) {
    if (p.barcode == code || p.sku == code) return p;
  }
  return null;
}
