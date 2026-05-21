import '../models/pending_sale.dart';

/// Stand-in for Backend Sales API until microservices are live.
class SaleSyncService {
  Future<bool> pushSale(PendingSale sale) async {
    await Future<void>.delayed(const Duration(milliseconds: 600));
    return true;
  }
}
