import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../core/theme/uzapoint_colors.dart';
import '../../core/widgets/u_metric_card.dart';
import '../../data/mock_analytics.dart';

class AnalyticsScreen extends StatelessWidget {
  const AnalyticsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final colors = UzapointColors.of(context);
    final spacing = UzapointSpacing.of(context);
    final chartColors = colors.charts;
    final horizontalChartWidth = MediaQuery.of(context).size.width * 0.85;

    // Define standard days of the week for titles data alignment
    final List<String> daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    // --- Dynamic Semi-Circle Computations ---
    // 1. Top Products Sum Calculation
    final double totalProductsSum = topProductsData.fold(0.0, (sum, item) => sum + item.units);

    // 2. Category Share Sum Calculation
    final double totalCategorySum = categoryShareData.fold(0.0, (sum, item) => sum + item.value);

    // 3. Dynamic Center Alignment Calculation
    // Calculate the outer radius of the semi-circle (center space + section radius)
    final double chartOuterRadius = (horizontalChartWidth * 0.25) + 22;
    // Shift downward by exactly half the outer radius to vertically center the semi-circle arc
    final double chartYOffset = chartOuterRadius / 2;

    return Scaffold(
      backgroundColor: const Color(0xFFF9FAFB),
      body: SafeArea(
        bottom: false,
        child: ListView(
          padding: EdgeInsets.fromLTRB(spacing.md, spacing.md, spacing.md, 120),
          children: [
            // 1. TOP NAVIGATION & TITLE ROW WITH NOTIFICATION ICON
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    GestureDetector(
                      onTap: () => Navigator.maybePop(context),
                      child: Container(
                        width: 40,
                        height: 40,
                        decoration: BoxDecoration(
                          color: Colors.white,
                          shape: BoxShape.circle,
                          border: Border.all(color: Colors.black, width: 1.5),
                        ),
                        child: const Center(
                          child: Icon(LucideIcons.arrowLeft, color: Colors.black, size: 18),
                        ),
                      ),
                    ),
                    const SizedBox(width: 12),
                    const Text(
                      'Analytics',
                      style: TextStyle(
                        color: Colors.black,
                        fontSize: 22,
                        fontWeight: FontWeight.bold,
                        letterSpacing: -0.5,
                      ),
                    ),
                  ],
                ),
                GestureDetector(
                  onTap: () {},
                  child: Container(
                    width: 40,
                    height: 40,
                    decoration: BoxDecoration(
                      color: Colors.white,
                      shape: BoxShape.circle,
                      border: Border.all(color: Colors.black, width: 1.5),
                    ),
                    child: const Center(
                      child: Icon(LucideIcons.bell, color: Colors.black, size: 18),
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 18),

            // 2. UNIFIED SEARCH & FILTER BAR ROW
            Row(
              children: [
                Expanded(
                  child: Container(
                    height: 46,
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: Colors.black, width: 1.5),
                    ),
                    clipBehavior: Clip.antiAlias,
                    child: const TextField(
                      style: TextStyle(
                        color: Colors.black,
                        fontSize: 14,
                        fontWeight: FontWeight.w600,
                      ),
                      decoration: InputDecoration(
                        hintText: 'Search analytics...',
                        hintStyle: TextStyle(
                          color: Color(0xFF9CA3AF),
                          fontSize: 14,
                          fontWeight: FontWeight.w500,
                        ),
                        prefixIcon: Icon(
                          LucideIcons.search,
                          color: Colors.black,
                          size: 18,
                        ),
                        border: InputBorder.none,
                        contentPadding: EdgeInsets.symmetric(vertical: 12),
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 10),
                GestureDetector(
                  onTap: () {},
                  child: Container(
                    width: 46,
                    height: 46,
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: Colors.black, width: 1.5),
                    ),
                    child: const Center(
                      child: Icon(
                        LucideIcons.slidersHorizontal,
                        color: Colors.black,
                        size: 18,
                      ),
                    ),
                  ),
                ),
              ],
            ),

            const SizedBox(height: 20),

            // 3. HIGH CONTRAST SUMMARY METRICS GRID
            GridView.count(
              crossAxisCount: 2,
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              mainAxisSpacing: 12,
              crossAxisSpacing: 12,
              childAspectRatio: 1.35,
              children: analyticsSummary.map((m) {
                return Container(
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: Colors.black, width: 1.5),
                  ),
                  clipBehavior: Clip.antiAlias,
                  child: UMetricCard(
                    title: m.$1,
                    value: m.$2,
                    change: '—',
                    changePositive: true,
                  ),
                );
              }).toList(),
            ),

            const SizedBox(height: 24),

            // 4. HIGH-CONTRAST DASHBOARD-STYLE SALES TREND
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: Colors.black, width: 1.5),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Sales trend',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w900,
                      color: Colors.black,
                    ),
                  ),
                  const SizedBox(height: 24),
                  SizedBox(
                    height: 180,
                    child: LineChart(
                      LineChartData(
                        gridData: FlGridData(
                          show: true,
                          drawVerticalLine: false,
                          getDrawingHorizontalLine: (v) => const FlLine(
                            color: Color(0xFFE5E7EB),
                            strokeWidth: 1,
                          ),
                        ),
                        titlesData: FlTitlesData(
                          leftTitles: AxisTitles(
                            sideTitles: SideTitles(
                              showTitles: true,
                              reservedSize: 42,
                              getTitlesWidget: (v, _) => Text(
                                '${(v / 1000).toStringAsFixed(0)}k',
                                style: const TextStyle(
                                  color: Color(0xFF6B7280),
                                  fontSize: 11,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ),
                          ),
                          bottomTitles: AxisTitles(
                            sideTitles: SideTitles(
                              showTitles: true,
                              getTitlesWidget: (v, meta) {
                                final i = v.toInt();
                                if (i < 0 || i >= daysOfWeek.length) {
                                  return const SizedBox.shrink();
                                }
                                return Padding(
                                  padding: const EdgeInsets.only(top: 8),
                                  child: Text(
                                    daysOfWeek[i],
                                    style: const TextStyle(
                                      color: Color(0xFF6B7280),
                                      fontSize: 11,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                );
                              },
                            ),
                          ),
                          rightTitles: const AxisTitles(),
                          topTitles: const AxisTitles(),
                        ),
                        borderData: FlBorderData(show: false),
                        lineBarsData: [
                          LineChartBarData(
                            spots: dailySalesData.asMap().entries.map((e) {
                              final double xVal = e.key.toDouble() % 7;
                              return FlSpot(xVal, e.value.sales);
                            }).toList(),
                            isCurved: false,
                            color: Colors.black,
                            barWidth: 3,
                            dotData: FlDotData(
                              show: true,
                              getDotPainter: (spot, percent, barData, index) => FlDotCirclePainter(
                                radius: 5,
                                color: Colors.white,
                                strokeColor: Colors.black,
                                strokeWidth: 2.5,
                              ),
                            ),
                            belowBarData: BarAreaData(
                              show: true,
                              color: Colors.black.withOpacity(0.05),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 24),

            // 5. HORIZONTAL SCROLL SECTION: GENUINE HALF PIE CHARTS WITH CORRESPONDING LEGENDS
            SizedBox(
              height: 390,
              child: ListView(
                scrollDirection: Axis.horizontal,
                physics: const BouncingScrollPhysics(),
                children: [
                  // CARD A: TOP PRODUCTS HALF-PIE & LEGEND
                  Container(
                    width: horizontalChartWidth,
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
                        const Text(
                          'Top products',
                          style: TextStyle(fontSize: 16, fontWeight: FontWeight.w900, color: Colors.black),
                        ),
                        const SizedBox(height: 10),
                        SizedBox(
                          height: 140,
                          child: Transform.translate(
                            offset: Offset(0, chartYOffset),
                            child: PieChart(
                              PieChartData(
                                startDegreeOffset: 180,
                                sectionsSpace: 4,
                                centerSpaceRadius: horizontalChartWidth * 0.25,
                                borderData: FlBorderData(show: false),
                                sections: [
                                  ...topProductsData.asMap().entries.map((e) {
                                    final double percentage = (e.value.units / totalProductsSum) * 100;
                                    return PieChartSectionData(
                                      color: chartColors[e.key % chartColors.length],
                                      value: e.value.units.toDouble(),
                                      title: '${percentage.toStringAsFixed(0)}%',
                                      radius: 22,
                                      titleStyle: const TextStyle(fontSize: 10, fontWeight: FontWeight.w900, color: Colors.white),
                                    );
                                  }),
                                  PieChartSectionData(
                                    color: Colors.transparent,
                                    value: totalProductsSum,
                                    radius: 22,
                                    showTitle: false,
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ),
                        const Divider(color: Color(0xFFE5E7EB), height: 24, thickness: 1),
                        // Dynamic Grid Legend for Products
                        Expanded(
                          child: GridView.builder(
                            physics: const NeverScrollableScrollPhysics(),
                            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                              crossAxisCount: 2,
                              childAspectRatio: 3.5,
                              crossAxisSpacing: 8,
                              mainAxisSpacing: 6,
                            ),
                            itemCount: topProductsData.length,
                            itemBuilder: (context, idx) {
                              final item = topProductsData[idx];
                              final double pct = (item.units / totalProductsSum) * 100;
                              final itemColor = chartColors[idx % chartColors.length];
                              return Row(
                                children: [
                                  Container(
                                    width: 10,
                                    height: 10,
                                    decoration: BoxDecoration(color: itemColor, shape: BoxShape.circle),
                                  ),
                                  const SizedBox(width: 8),
                                  Expanded(
                                    child: Text(
                                      item.name,
                                      maxLines: 1,
                                      overflow: TextOverflow.ellipsis,
                                      style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: Colors.black87),
                                    ),
                                  ),
                                  const SizedBox(width: 4),
                                  Text(
                                    '${pct.toStringAsFixed(0)}%',
                                    style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w900, color: Colors.black),
                                  ),
                                ],
                              );
                            },
                          ),
                        ),
                      ],
                    ),
                  ),

                  // CARD B: BY CATEGORY HALF-PIE & LEGEND
                  Container(
                    width: horizontalChartWidth,
                    margin: const EdgeInsets.only(right: 2),
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: Colors.black, width: 1.5),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'By category',
                          style: TextStyle(fontSize: 16, fontWeight: FontWeight.w900, color: Colors.black),
                        ),
                        const SizedBox(height: 10),
                        SizedBox(
                          height: 140,
                          child: Transform.translate(
                            offset: Offset(0, chartYOffset),
                            child: PieChart(
                              PieChartData(
                                startDegreeOffset: 180,
                                sectionsSpace: 4,
                                centerSpaceRadius: horizontalChartWidth * 0.25,
                                borderData: FlBorderData(show: false),
                                sections: [
                                  ...categoryShareData.asMap().entries.map((e) {
                                    return PieChartSectionData(
                                      color: chartColors[e.key % chartColors.length],
                                      value: e.value.value,
                                      title: '${e.value.value.toStringAsFixed(0)}%',
                                      radius: 22,
                                      titleStyle: const TextStyle(fontSize: 10, fontWeight: FontWeight.w900, color: Colors.white),
                                    );
                                  }),
                                  PieChartSectionData(
                                    color: Colors.transparent,
                                    value: totalCategorySum,
                                    radius: 22,
                                    showTitle: false,
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ),
                        const Divider(color: Color(0xFFE5E7EB), height: 24, thickness: 1),
                        // Dynamic Grid Legend for Categories
                        Expanded(
                          child: GridView.builder(
                            physics: const NeverScrollableScrollPhysics(),
                            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                              crossAxisCount: 2,
                              childAspectRatio: 3.5,
                              crossAxisSpacing: 8,
                              mainAxisSpacing: 6,
                            ),
                            itemCount: categoryShareData.length,
                            itemBuilder: (context, idx) {
                              final item = categoryShareData[idx];
                              final itemColor = chartColors[idx % chartColors.length];
                              return Row(
                                children: [
                                  Container(
                                    width: 10,
                                    height: 10,
                                    decoration: BoxDecoration(color: itemColor, shape: BoxShape.circle),
                                  ),
                                  const SizedBox(width: 8),
                                  Expanded(
                                    child: Text(
                                      item.name,
                                      maxLines: 1,
                                      overflow: TextOverflow.ellipsis,
                                      style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: Colors.black87),
                                    ),
                                  ),
                                  const SizedBox(width: 4),
                                  Text(
                                    '${item.value.toStringAsFixed(0)}%',
                                    style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w900, color: Colors.black),
                                  ),
                                ],
                              );
                            },
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}