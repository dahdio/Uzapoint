class DailySalesPoint {
  const DailySalesPoint({
    required this.date,
    required this.sales,
    required this.orders,
  });

  final String date;
  final double sales;
  final int orders;
}

class CategoryShare {
  const CategoryShare({required this.name, required this.value});

  final String name;
  final double value;
}

class TopProduct {
  const TopProduct({required this.name, required this.units});

  final String name;
  final int units;
}

const dailySalesData = [
  DailySalesPoint(date: 'Feb 18', sales: 42300, orders: 134),
  DailySalesPoint(date: 'Feb 19', sales: 38100, orders: 121),
  DailySalesPoint(date: 'Feb 20', sales: 55200, orders: 178),
  DailySalesPoint(date: 'Feb 21', sales: 48900, orders: 156),
  DailySalesPoint(date: 'Feb 22', sales: 61400, orders: 195),
  DailySalesPoint(date: 'Feb 23', sales: 52700, orders: 167),
  DailySalesPoint(date: 'Feb 24', sales: 48250, orders: 156),
];

const categoryShareData = [
  CategoryShare(name: 'Flour', value: 32),
  CategoryShare(name: 'Dairy', value: 24),
  CategoryShare(name: 'Beverages', value: 18),
  CategoryShare(name: 'Cooking Oil', value: 14),
  CategoryShare(name: 'Other', value: 12),
];

const topProductsData = [
  TopProduct(name: 'Unga Jogoo 2kg', units: 245),
  TopProduct(name: 'Brookside Milk', units: 198),
  TopProduct(name: 'Kimbo 1kg', units: 167),
  TopProduct(name: 'Mumias Sugar', units: 145),
  TopProduct(name: 'Ketepa Tea', units: 132),
];

const analyticsSummary = [
  ('Avg. Order Value', 'KES 312'),
  ('Conversion Rate', '78.4%'),
  ('Returns', '2.1%'),
  ('Top Hour', '12 – 1 PM'),
];
