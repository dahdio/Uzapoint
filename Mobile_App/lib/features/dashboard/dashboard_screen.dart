import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:lucide_icons/lucide_icons.dart';

import '../../core/theme/uzapoint_colors.dart';
import '../../core/widgets/glass/uglass_surface.dart';

class DashboardScreen extends StatefulWidget {
  const DashboardScreen({super.key});

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  final LayerLink _plusMenuLayerLink = LayerLink();
  bool _isPlusMenuOpen = false;
  OverlayEntry? _plusMenuOverlayEntry;

  void _togglePlusMenu(BuildContext context) {
    if (_isPlusMenuOpen) {
      _plusMenuOverlayEntry?.remove();
      _plusMenuOverlayEntry = null;
      _isPlusMenuOpen = false;
    } else {
      _plusMenuOverlayEntry = _createPlusMenuOverlay(context);
      Overlay.of(context).insert(_plusMenuOverlayEntry!);
      _isPlusMenuOpen = true;
    }
  }

  @override
  void dispose() {
    if (_isPlusMenuOpen) {
      _plusMenuOverlayEntry?.remove();
    }
    super.dispose();
  }

  OverlayEntry _createPlusMenuOverlay(BuildContext context) {
    return OverlayEntry(
      builder: (context) {
        return Stack(
          children: [
            GestureDetector(
              onTap: () => _togglePlusMenu(context),
              child: Container(
                color: Colors.transparent,
                width: MediaQuery.of(context).size.width,
                height: MediaQuery.of(context).size.height,
              ),
            ),
            Positioned(
              width: 220,
              child: CompositedTransformFollower(
                link: _plusMenuLayerLink,
                showWhenUnlinked: false,
                targetAnchor: Alignment.bottomRight,
                followerAnchor: Alignment.topRight,
                offset: const Offset(0, 8),
                child: Material(
                  color: Colors.transparent,
                  child: Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: Colors.black, width: 1.5),
                      boxShadow: const [
                        BoxShadow(
                          color: Color(0x1A000000),
                          blurRadius: 12,
                          offset: Offset(0, 6),
                        )
                      ],
                    ),
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        _buildOverlayItem(
                          icon: LucideIcons.shoppingCart,
                          label: 'Add Sale',
                          onTap: () {
                            _togglePlusMenu(context);
                            context.go('/pos');
                          },
                        ),
                        const SizedBox(height: 8),
                        _buildOverlayItem(
                          icon: LucideIcons.package,
                          label: 'Add Product',
                          onTap: () {
                            _togglePlusMenu(context);
                            context.go('/inventory');
                          },
                        ),
                        const SizedBox(height: 8),
                        _buildOverlayItem(
                          icon: LucideIcons.fileText,
                          label: 'Generate Report',
                          onTap: () {
                            _togglePlusMenu(context);
                          },
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ],
        );
      },
    );
  }

  Widget _buildOverlayItem({
    required IconData icon,
    required String label,
    required VoidCallback onTap,
  }) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(10),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
        decoration: BoxDecoration(
          color: const Color(0xFFF9FAFB),
          borderRadius: BorderRadius.circular(10),
          border: Border.all(color: Colors.black, width: 1.2),
        ),
        child: Row(
          children: [
            Icon(icon, size: 16, color: Colors.black),
            const SizedBox(width: 12),
            Expanded(
              child: Text(
                label,
                style: const TextStyle(
                  color: Colors.black,
                  fontSize: 13,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final spacing = UzapointSpacing.of(context);
    final textTheme = Theme.of(context).textTheme;
    final chartWidth = MediaQuery.of(context).size.width * 0.85;

    return Scaffold(
      backgroundColor: const Color(0xFFF9FAFB),
      body: SafeArea(
        bottom: false,
        child: CustomScrollView(
          slivers: [
            // 1. TOP BAR ROW
            SliverToBoxAdapter(
              child: Padding(
                padding: EdgeInsets.fromLTRB(spacing.md, spacing.md, spacing.md, spacing.md),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Row(
                      children: [
                        Container(
                          width: 44,
                          height: 44,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            color: Colors.white,
                            border: Border.all(color: Colors.black, width: 1.5),
                          ),
                          child: const Center(
                            child: Icon(LucideIcons.user, color: Colors.black, size: 20),
                          ),
                        ),
                        const SizedBox(width: 12),
                        const Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Text(
                              'Good afternoon,',
                              style: TextStyle(
                                color: Color(0xFF6B7280),
                                fontSize: 13,
                                fontWeight: FontWeight.w400,
                              ),
                            ),
                            Text(
                              'Daud Selemani',
                              style: TextStyle(
                                color: Colors.black,
                                fontSize: 16,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                    Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        CompositedTransformTarget(
                          link: _plusMenuLayerLink,
                          child: GestureDetector(
                            onTap: () => _togglePlusMenu(context),
                            child: Container(
                              width: 40,
                              height: 40,
                              decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                color: Colors.white,
                                border: Border.all(color: Colors.black, width: 1.5),
                              ),
                              child: const Center(
                                child: Icon(LucideIcons.plus, color: Colors.black, size: 20),
                              ),
                            ),
                          ),
                        ),
                        const SizedBox(width: 8),
                        Container(
                          width: 40,
                          height: 40,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            color: Colors.white,
                            border: Border.all(color: Colors.black, width: 1.5),
                          ),
                          child: const Icon(Icons.notifications_outlined, color: Colors.black, size: 20),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),

            // 2. DASHBOARD CONTENT BODY
            SliverPadding(
              padding: EdgeInsets.fromLTRB(0, spacing.xs, 0, 120),
              sliver: SliverList(
                delegate: SliverChildListDelegate([

                  // FIXED SIDE-BY-SIDE GRID LAYOUT
                  Padding(
                    padding: EdgeInsets.symmetric(horizontal: spacing.md),
                    child: const Column(
                      children: [
                        _WebStyledMetricCard(
                          title: 'Sales Today',
                          value: 'KES 48,250',
                          change: '+12.5%',
                          changePositive: true,
                          icon: LucideIcons.trendingUp,
                          isFullWidth: true,
                        ),
                        SizedBox(height: 12),

                        // Row 1: Orders and Products
                        Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Expanded(
                              child: _WebStyledMetricCard(
                                title: 'Orders Today',
                                value: '156',
                                change: '+8.2%',
                                changePositive: true,
                                icon: LucideIcons.shoppingBag,
                                isFullWidth: false,
                              ),
                            ),
                            SizedBox(width: 12),
                            Expanded(
                              child: _WebStyledMetricCard(
                                title: 'Total Products',
                                value: '1,248',
                                change: '+3 new',
                                changePositive: true,
                                icon: LucideIcons.package,
                                isFullWidth: false,
                              ),
                            ),
                          ],
                        ),
                        SizedBox(height: 12),

                        // Row 2: Revenue and Low Stock
                        Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Expanded(
                              child: _WebStyledMetricCard(
                                title: 'Revenue (MTD)',
                                value: 'KES 1.2M',
                                change: '+18.3%',
                                changePositive: true,
                                icon: LucideIcons.dollarSign,
                                isFullWidth: false,
                              ),
                            ),
                            SizedBox(width: 12),
                            Expanded(
                              child: _WebStyledMetricCard(
                                title: 'Low Stock Items',
                                value: '23',
                                change: 'Needs attention',
                                changePositive: false,
                                icon: LucideIcons.alertTriangle,
                                isFullWidth: false,
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),

                  SizedBox(height: spacing.lg),

                  // HORIZONTAL CHARTS
                  SizedBox(
                    height: 245,
                    child: ListView(
                      scrollDirection: Axis.horizontal,
                      padding: EdgeInsets.symmetric(horizontal: spacing.md),
                      physics: const BouncingScrollPhysics(),
                      children: [
                        _buildChartContainer(
                          context,
                          title: 'Weekly Sales Overview',
                          width: chartWidth,
                          child: const _WeeklySalesBarChart(),
                        ),
                        _buildChartContainer(
                          context,
                          title: 'Monthly Revenue Trend',
                          width: chartWidth,
                          child: const _MonthlyRevenueTrendChart(),
                        ),
                      ],
                    ),
                  ),

                  SizedBox(height: spacing.lg),

                  // CONTAINERIZED RECENT ENTRIES LIST
                  Padding(
                    padding: EdgeInsets.symmetric(horizontal: spacing.md),
                    child: UGlassSurface(
                      child: Container(
                        padding: const EdgeInsets.all(16),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(color: Colors.black, width: 1.5),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'Recent Sales',
                              style: textTheme.titleMedium?.copyWith(
                                fontWeight: FontWeight.bold,
                                color: Colors.black,
                              ),
                            ),
                            const SizedBox(height: 14),
                            const _RecentRow(
                              customer: 'Jane Wanjiku',
                              amount: 'KES 2,450',
                              time: '2 min ago',
                              status: 'completed',
                            ),
                            const SizedBox(height: 10),
                            const _RecentRow(
                              customer: 'Peter Ochieng',
                              amount: 'KES 850',
                              time: '15 min ago',
                              status: 'completed',
                            ),
                            const SizedBox(height: 10),
                            const _RecentRow(
                              customer: 'Walk-in Customer',
                              amount: 'KES 1,200',
                              time: '1 hr ago',
                              status: 'completed',
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                ]),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildChartContainer(BuildContext context, {required String title, required double width, required Widget child}) {
    return Container(
      width: width,
      margin: const EdgeInsets.only(right: 14),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.black, width: 1.5),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: Theme.of(context).textTheme.bodyLarge?.copyWith(
              fontWeight: FontWeight.bold,
              color: Colors.black,
            ),
          ),
          const SizedBox(height: 24),
          SizedBox(height: 160, child: child),
        ],
      ),
    );
  }
}

class _WebStyledMetricCard extends StatelessWidget {
  const _WebStyledMetricCard({
    required this.title,
    required this.value,
    required this.change,
    required this.changePositive,
    required this.icon,
    this.isFullWidth = false,
  });

  final String title;
  final String value;
  final String change;
  final bool changePositive;
  final IconData icon;
  final bool isFullWidth;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.black, width: 1.5),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Expanded(
                child: Text(
                  title,
                  style: const TextStyle(color: Color(0xFF6B7280), fontSize: 12, fontWeight: FontWeight.w500),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
              ),
              Icon(icon, color: Colors.black, size: 16),
            ],
          ),
          const SizedBox(height: 10),

          if (isFullWidth)
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                Text(
                  value,
                  style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.black),
                ),
                _buildTrendIndicator(),
              ],
            )
          else
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  value,
                  style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.black),
                ),
                const SizedBox(height: 4),
                _buildTrendIndicator(),
              ],
            ),
        ],
      ),
    );
  }

  Widget _buildTrendIndicator() {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Icon(
          changePositive ? LucideIcons.arrowUpRight : LucideIcons.arrowDownRight,
          color: changePositive ? const Color(0xFF10B981) : const Color(0xFFEF4444),
          size: 12,
        ),
        const SizedBox(width: 2),
        Flexible(
          child: Text(
            change,
            style: TextStyle(
              color: changePositive ? const Color(0xFF10B981) : const Color(0xFFEF4444),
              fontSize: 11,
              fontWeight: FontWeight.w600,
            ),
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
          ),
        ),
      ],
    );
  }
}

class _WeeklySalesBarChart extends StatelessWidget {
  const _WeeklySalesBarChart();

  @override
  Widget build(BuildContext context) {
    final yLabels = ['80k', '60k', '40k', '20k', '0k'];
    final xLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    final dataRatios = [0.35, 0.48, 0.32, 0.62, 0.58, 0.78, 0.45];

    return Row(
      children: [
        Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: yLabels
              .map((label) => SizedBox(
            width: 28,
            child: Text(
              label,
              style: const TextStyle(color: Color(0xFF9CA3AF), fontSize: 11),
              textAlign: TextAlign.right,
            ),
          ))
              .toList(),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            children: [
              Expanded(
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: List.generate(xLabels.length, (index) {
                    return FractionallySizedBox(
                      heightFactor: dataRatios[index],
                      child: Container(
                        width: 24,
                        decoration: BoxDecoration(
                          color: Colors.black,
                          borderRadius: BorderRadius.circular(4),
                        ),
                      ),
                    );
                  }),
                ),
              ),
              const SizedBox(height: 8),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: xLabels
                    .map((day) => SizedBox(
                  width: 28,
                  child: Text(
                    day,
                    style: const TextStyle(color: Color(0xFF9CA3AF), fontSize: 11),
                    textAlign: TextAlign.center,
                  ),
                ))
                    .toList(),
              ),
            ],
          ),
        ),
      ],
    );
  }
}

class _MonthlyRevenueTrendChart extends StatelessWidget {
  const _MonthlyRevenueTrendChart();

  @override
  Widget build(BuildContext context) {
    final yLabels = ['1.2M', '0.9M', '0.6M', '0.3M', '0.0M'];
    final xLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

    return Row(
      children: [
        Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: yLabels
              .map((label) => SizedBox(
            width: 28,
            child: Text(
              label,
              style: const TextStyle(color: Color(0xFF9CA3AF), fontSize: 11),
              textAlign: TextAlign.right,
            ),
          ))
              .toList(),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            children: [
              Expanded(
                child: LayoutBuilder(
                  builder: (context, constraints) {
                    return CustomPaint(
                      size: Size(constraints.maxWidth, constraints.maxHeight),
                      painter: const _LineTrendPainter(),
                    );
                  },
                ),
              ),
              const SizedBox(height: 8),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: xLabels
                    .map((month) => Text(
                  month,
                  style: const TextStyle(color: Color(0xFF9CA3AF), fontSize: 11),
                ))
                    .toList(),
              ),
            ],
          ),
        ),
      ],
    );
  }
}

class _LineTrendPainter extends CustomPainter {
  const _LineTrendPainter();

  @override
  void paint(Canvas canvas, Size size) {
    final points = [
      Offset(size.width * 0.08, size.height * 0.40),
      Offset(size.width * 0.26, size.height * 0.28),
      Offset(size.width * 0.44, size.height * 0.20),
      Offset(size.width * 0.62, size.height * 0.35),
      Offset(size.width * 0.80, size.height * 0.15),
      Offset(size.width * 0.94, size.height * 0.08),
    ];

    if (points.isEmpty) return;

    // 1. Draw the Connecting Path
    final linePaint = Paint()
      ..color = Colors.black
      ..strokeWidth = 2.5
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round
      ..isAntiAlias = true;

    final path = Path()..moveTo(points.first.dx, points.first.dy);
    for (int i = 1; i < points.length; i++) {
      path.lineTo(points[i].dx, points[i].dy);
    }
    canvas.drawPath(path, linePaint);

    // 2. Draw the Data Intersection Nodes (Circles)
    final dotPaint = Paint()
      ..color = Colors.black
      ..style = PaintingStyle.fill
      ..isAntiAlias = true;

    final innerDotPaint = Paint()
      ..color = Colors.white
      ..style = PaintingStyle.fill
      ..isAntiAlias = true;

    for (var point in points) {
      // Bold solid ring effect matching the theme
      canvas.drawCircle(point, 5.0, dotPaint);
      canvas.drawCircle(point, 2.5, innerDotPaint);
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

class _RecentRow extends StatelessWidget {
  const _RecentRow({
    required this.customer,
    required this.amount,
    required this.time,
    required this.status,
  });

  final String customer;
  final String amount;
  final String time;
  final String status;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
      decoration: BoxDecoration(
        color: const Color(0xFFF9FAFB),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.black, width: 1.2),
      ),
      child: Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  customer,
                  style: const TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF1F2937), fontSize: 13),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
                const SizedBox(height: 2),
                Text(time, style: const TextStyle(color: Color(0xFF6B7280), fontSize: 11)),
              ],
            ),
          ),
          const SizedBox(width: 8),
          Text(
            amount,
            style: const TextStyle(
              fontWeight: FontWeight.w800,
              color: Colors.black,
              fontSize: 13,
            ),
          ),
          const SizedBox(width: 10),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
            decoration: BoxDecoration(
              color: Colors.black,
              borderRadius: BorderRadius.circular(8),
            ),
            child: Text(
              status,
              style: const TextStyle(
                color: Colors.white,
                fontSize: 10,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ],
      ),
    );
  }
}