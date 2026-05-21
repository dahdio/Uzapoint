import 'package:flutter_test/flutter_test.dart';
import 'package:uzapoint_mobile/core/theme/token_models.dart';
import 'package:uzapoint_mobile/core/theme/uzapoint_colors.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  test('UzapointColors loads from token JSON', () async {
    final tokens = await UzapointTokens.load();
    final colors = UzapointColors.fromTokens(
      palette: tokens.light,
      semantic: tokens.semanticLight,
      chartHex: tokens.chartLight,
    );
    expect(colors.background, isNotNull);
    expect(colors.primary, isNotNull);
    expect(colors.charts.length, 5);
  });
}
