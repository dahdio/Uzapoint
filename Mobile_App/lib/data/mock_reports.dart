class ReportType {
  const ReportType({
    required this.id,
    required this.name,
    required this.description,
    required this.lastGenerated,
  });

  final String id;
  final String name;
  final String description;
  final String lastGenerated;
}

class RecentReport {
  const RecentReport({
    required this.id,
    required this.name,
    required this.type,
    required this.date,
    required this.status,
    required this.size,
  });

  final String id;
  final String name;
  final String type;
  final String date;
  final String status;
  final String size;
}

const reportTypes = [
  ReportType(
    id: 'daily-sales',
    name: 'Daily Sales Report',
    description: 'Detailed breakdown of daily transactions',
    lastGenerated: 'Today, 9:00 AM',
  ),
  ReportType(
    id: 'inventory',
    name: 'Inventory Status Report',
    description: 'Current stock levels and low-stock alerts',
    lastGenerated: 'Today, 8:30 AM',
  ),
  ReportType(
    id: 'revenue',
    name: 'Revenue Summary',
    description: 'Revenue analysis by period, category, and product',
    lastGenerated: 'Feb 23, 2026',
  ),
  ReportType(
    id: 'profit-loss',
    name: 'Profit & Loss Statement',
    description: 'Income vs expenses breakdown',
    lastGenerated: 'Feb 20, 2026',
  ),
  ReportType(
    id: 'top-products',
    name: 'Top Products Report',
    description: 'Best and worst performing products',
    lastGenerated: 'Feb 22, 2026',
  ),
  ReportType(
    id: 'customer',
    name: 'Customer Report',
    description: 'Customer purchase patterns and frequency',
    lastGenerated: 'Feb 21, 2026',
  ),
];

const recentReports = [
  RecentReport(
    id: '1',
    name: 'Daily Sales - Feb 24',
    type: 'Sales',
    date: 'Feb 24, 2026',
    status: 'ready',
    size: '142 KB',
  ),
  RecentReport(
    id: '2',
    name: 'Inventory Status - Feb 24',
    type: 'Inventory',
    date: 'Feb 24, 2026',
    status: 'ready',
    size: '89 KB',
  ),
  RecentReport(
    id: '3',
    name: 'Revenue Summary - Feb',
    type: 'Revenue',
    date: 'Feb 23, 2026',
    status: 'ready',
    size: '256 KB',
  ),
];
