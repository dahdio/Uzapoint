# UzaPoint — Unified Retail POS & Management Platform

UzaPoint is a modern, multi-platform Point of Sale (POS) and inventory management ecosystem designed for retail, food, pharmacy, and wholesale businesses. The project features a unified brand experience built around shared design tokens, a fluid Next.js management web application, and an adaptive, high-performance Flutter mobile/tablet POS app.

---

## 📂 Repository Structure

The project is organized as a monorepo split into dedicated packages:

*   **[`Mobile_App/`](file:///home/dahdio/UzaPoint/Mobile_App)**
    A Flutter-based mobile and tablet application designed for on-the-floor cashier operations. It features high-speed POS checkouts, integrated camera barcode scanning, offline-first queuing with sync-status detection, and an "iOS 26 Liquid Glass" adaptive interface.
*   **[`Frontend_Web/`](file:///home/dahdio/UzaPoint/Frontend_Web)**
    A Next.js, React, and Tailwind-based web application tailored for owners, managers, and administrators. It houses complex analytics dashboards, financial and inventory report builders, reseller/agent administration, and global store settings.
*   **[`Backend/`](file:///home/dahdio/UzaPoint/Backend)**
    The central backend services and database interface layer that anchors both client applications.
*   **[`design-tokens/`](file:///home/dahdio/UzaPoint/design-tokens)**
    Contains [`uzapoint_tokens.json`](file:///home/dahdio/UzaPoint/design-tokens/uzapoint_tokens.json), the single source of truth for colors, margins, radiuses, typography, and motion presets shared between the Flutter mobile application and the Next.js web application.
*   **[`uzapoint_plans`](file:///home/dahdio/UzaPoint/uzapoint_plans)**
    Project specifications, screen mapping, and architectural guidelines.

---

## 🛠️ Technology Stack

### Mobile Client (`Mobile_App`)
*   **Framework:** Flutter & Dart
*   **State Management:** Riverpod / ChangeNotifier Notifiers
*   **UX/Design:** Custom adaptive UI (Cupertino styling for iOS; Material 3 for Android) leveraging `BackdropFilter` and Spring motion dynamics.
*   **Features:** Offline sync queue, camera scanner (`mobile_scanner` integration), local caching.

### Web Client (`Frontend_Web`)
*   **Framework:** Next.js (App Router), React, TypeScript
*   **Styling:** TailwindCSS, Shadcn UI component design patterns
*   **Build/Package Tool:** `pnpm` (Pnpm workspace / lockfile setup)

### Design & Theme System
*   **Color Space:** OKLCH (neutral, monochromatic system synced between web CSS variables and Flutter `ThemeExtension` classes)
*   **Typography:** Geist & Inter typography
*   **Radii & Borders:** Shared 10px (`0.625rem`) standard corner radius for inputs, buttons, and cards.

---

## 🚀 Key Features

*   **Shared Token Design System:** Neutral/monochromatic palette matching web and mobile.
*   **Cashier-Focused POS Screen:** Interactive product grids, fast-access category chips, and immediate checkout sheets.
*   **M-Pesa STK Push Integration:** Integrated mobile payment polling alongside cash payments.
*   **Offline-First POS Operations:** Local database queue that holds pending sales during connection dropouts and automatically syncs to the server when connection is restored.
*   **Dual-Platform Shells:** Supports phones (bottom navigation layout) and tablets/web (two-pane split navigation rail layout).

---

## 🏁 Getting Started

### Prerequisites
*   [Flutter SDK](https://docs.flutter.dev/get-started/install) (latest stable release)
*   [Node.js](https://nodejs.org/) (v18+)
*   [pnpm](https://pnpm.io/installation) package manager (for Web client)

### Setting up the Mobile App
1.  Navigate to the directory:
    ```bash
    cd Mobile_App
    ```
2.  Install dependencies:
    ```bash
    flutter pub get
    ```
3.  Run the application locally:
    ```bash
    flutter run
    ```

### Setting up the Web Dashboard
1.  Navigate to the directory:
    ```bash
    cd Frontend_Web
    ```
2.  Install dependencies:
    ```bash
    pnpm install
    ```
3.  Start the development server:
    ```bash
    pnpm dev
    ```

---

## 📋 Architectural Plans & Roadmap

For a breakdown of the database entities, detailed UX/UI layout specifications, and Phase 1 vs Phase 2 feature checklists, refer to the [`uzapoint_plans`](file:///home/dahdio/UzaPoint/uzapoint_plans) file in the root directory.
