import 'dart:async';
import 'dart:convert';

import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:uuid/uuid.dart';

import '../data/mock_catalog.dart';
import '../models/pending_sale.dart';
import '../services/sale_sync_service.dart';

const _queueKey = 'uzapoint_pending_sales';

class SyncQueueNotifier extends ChangeNotifier {
  SyncQueueNotifier({SaleSyncService? syncService})
      : _syncService = syncService ?? SaleSyncService();

  final SaleSyncService _syncService;
  final Connectivity _connectivity = Connectivity();
  final _uuid = const Uuid();

  final List<PendingSale> _queue = [];
  bool _isOnline = true;
  bool _isSyncing = false;
  StreamSubscription<List<ConnectivityResult>>? _connectivitySub;

  List<PendingSale> get queue => List.unmodifiable(_queue);
  bool get isOnline => _isOnline;
  bool get isSyncing => _isSyncing;

  int get pendingCount =>
      _queue.where((s) => s.status != PendingSaleStatus.synced).length;

  Future<void> init() async {
    await _loadQueue();
    final result = await _connectivity.checkConnectivity();
    _isOnline = _hasConnection(result);
    _connectivitySub = _connectivity.onConnectivityChanged.listen((results) {
      final online = _hasConnection(results);
      if (online && !_isOnline) {
        _isOnline = true;
        notifyListeners();
        unawaited(syncAll());
      } else if (!online && _isOnline) {
        _isOnline = false;
        notifyListeners();
      }
    });
    if (_isOnline && pendingCount > 0) {
      unawaited(syncAll());
    }
    notifyListeners();
  }

  bool _hasConnection(List<ConnectivityResult> results) {
    return results.any(
      (r) =>
          r == ConnectivityResult.mobile ||
          r == ConnectivityResult.wifi ||
          r == ConnectivityResult.ethernet,
    );
  }

  Future<void> _loadQueue() async {
    final prefs = await SharedPreferences.getInstance();
    final raw = prefs.getString(_queueKey);
    if (raw == null) return;
    final list = jsonDecode(raw) as List;
    _queue
      ..clear()
      ..addAll(
        list.map((e) => PendingSale.fromJson(e as Map<String, dynamic>)),
      );
  }

  Future<void> _persistQueue() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(
      _queueKey,
      jsonEncode(_queue.map((s) => s.toJson()).toList()),
    );
  }

  /// Records sale locally and attempts upload when online.
  Future<PendingSale> enqueueFromCart({
    required String paymentMethod,
    required List<CartLine> cartLines,
  }) async {
    final sale = PendingSale.fromCart(
      id: _uuid.v4(),
      idempotencyKey: _uuid.v4(),
      paymentMethod: paymentMethod,
      cartLines: cartLines,
    );
    _queue.insert(0, sale);
    await _persistQueue();
    notifyListeners();

    if (_isOnline) {
      await _syncOne(sale);
    } else {
      sale.status = PendingSaleStatus.pending;
      await _persistQueue();
      notifyListeners();
    }
    return sale;
  }

  Future<void> syncAll() async {
    if (_isSyncing || !_isOnline) return;
    _isSyncing = true;
    notifyListeners();

    for (final sale in _queue.where((s) => s.status != PendingSaleStatus.synced)) {
      await _syncOne(sale);
    }

    _isSyncing = false;
    notifyListeners();
  }

  Future<void> retry(String saleId) async {
    final sale = _queue.where((s) => s.id == saleId).firstOrNull;
    if (sale == null) return;
    sale.status = PendingSaleStatus.pending;
    sale.lastError = null;
    await _persistQueue();
    notifyListeners();
    if (_isOnline) await _syncOne(sale);
  }

  Future<void> _syncOne(PendingSale sale) async {
    if (sale.status == PendingSaleStatus.synced) return;

    sale.status = PendingSaleStatus.syncing;
    sale.lastError = null;
    notifyListeners();

    try {
      if (!_isOnline) {
        sale.status = PendingSaleStatus.pending;
        await _persistQueue();
        notifyListeners();
        return;
      }
      await _syncService.pushSale(sale);
      sale.status = PendingSaleStatus.synced;
      sale.syncedAt = DateTime.now();
      sale.lastError = null;
    } catch (e) {
      sale.status = PendingSaleStatus.failed;
      sale.lastError = e.toString().replaceFirst('Exception: ', '');
    }
    await _persistQueue();
    notifyListeners();
  }

  Future<void> clearSynced() async {
    _queue.removeWhere((s) => s.status == PendingSaleStatus.synced);
    await _persistQueue();
    notifyListeners();
  }

  @override
  void dispose() {
    _connectivitySub?.cancel();
    super.dispose();
  }
}

extension _FirstOrNull<E> on Iterable<E> {
  E? get firstOrNull {
    final it = iterator;
    if (it.moveNext()) return it.current;
    return null;
  }
}
