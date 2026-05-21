# UzaPoint Mobile (`uzapoint_mobile`)

Flutter POS app with iOS 26–inspired Liquid Glass chrome and shared design tokens from `../design-tokens/uzapoint_tokens.json`.

## Prerequisites

- [Flutter SDK](https://docs.flutter.dev/get-started/install) 3.24+ (Dart 3.5+)
- Android Studio / Xcode for device simulators

## First-time setup

If `android/` and `ios/` folders are missing, generate platform projects from this directory:

```bash
cd Mobile_App
flutter create . --project-name uzapoint_mobile --org co.uzapoint
flutter pub get
```

## Run

```bash
cd Mobile_App
flutter run
```

## Project structure

| Path | Purpose |
|------|---------|
| `lib/core/theme/` | Tokens, `ThemeExtension`, light/dark themes |
| `lib/core/widgets/` | `UPrimaryButton`, `UCard`, `UGlassSurface`, `UMainTabBar`, … |
| `lib/features/` | Screens (splash, auth, POS, inventory, …) |
| `lib/state/` | `CartNotifier` |
| `assets/uzapoint_tokens.json` | Bundle copy of shared tokens |

## v1 screens included

- Splash, Welcome, Login, Sign up, Onboarding
- Main shell: Dashboard, POS (cart → checkout → receipt), Inventory, More
- Settings hub, theme toggle (system / light / dark)
- **Barcode scanner** (`mobile_scanner`) — POS app bar scan icon
- **Offline sync queue** — sales queued locally, auto-sync when online; view via POS banner or More → Sync queue
- **Analytics & Reports** (v2) — More menu, charts via `fl_chart`

## Design rules

- **Glass**: tab bar, sheets, splash, processing overlay
- **Solid**: POS product grid, cart, checkout totals, receipts, metric cards

When you change colors on web, update `design-tokens/uzapoint_tokens.json` and sync to `Mobile_App/assets/uzapoint_tokens.json`.
