# Habibi Stream 💜

An Arabic-first live-streaming platform built for the MENA region.

Habibi Stream is a full-stack, monorepo application featuring a mobile app for creators/viewers, a web platform, an admin console, and a real-time backend API.

## 🏗 Architecture & Tech Stack

This project is structured as a **Turborepo** monorepo using **pnpm** workspaces.

### Applications (`apps/`)

- 📱 **Mobile App (`@habibi/mobile`)**
  - **Tech:** Expo SDK 54, React Native 0.81, React 19, Expo Router
  - **Features:** Full viewer and creator experience (26 screens). Includes discovery feeds, live video playback, chat, gifting, wallet, creator profiles, and hosting tools.
- 💻 **Web App (`@habibi/web`)**
  - **Tech:** React 19, Vite, Tailwind CSS (RTL Dark Theme)
  - **Features:** Desktop streaming experience focusing on discovery, live viewing, and responsive design.
- 🛡️ **Admin Console (`@habibi/admin`)**
  - **Tech:** React 19, Vite, Vanilla CSS Theme
  - **Features:** Platform moderation, analytics dashboard, reports queue, user management, stream moderation, and creator verification workflows.
- ⚙️ **Backend API (`@habibi/api`)**
  - **Tech:** Node.js, Express.js v5, TypeScript, WebSockets (`ws`)
  - **Features:** REST API (Authentication, Users, Streams, Wallet, Gifts, Subscriptions, Admin/Reports) and real-time WebSocket Gateway for live chat functionality.

### Shared Packages (`packages/`)

- 🔧 **`@habibi/shared`**: Shared utilities, constants, currency formatters, and validation logic.
- 🏷 **`@habibi/types`**: Shared TypeScript interfaces uniting the frontend and backend models.

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 20.0
- `pnpm` >= 9.0 (`npm install -g pnpm`)
- Expo Go app on your iOS or Android device (for mobile development)

### Installation

1. Clone the repository and navigate into it:

   ```bash
   cd Habibitch
   ```

2. Install dependencies (this will install across all monorepo workspaces):
   ```bash
   pnpm install
   ```

_(Note: Do not use `npm install` inside individual app folders, as this is a pnpm workspace)._

---

## 💻 Running the Applications

You can run applications individually or all at once using Turborepo.

### Run All Apps Simultaneously

```bash
pnpm dev
```

### Run Apps Individually

**Backend API (Port 3001 & WS:** `ws://localhost:3001/ws/chat`**)**

```bash
pnpm dev:api
```

**Web Platform (Port 5173)**

```bash
pnpm dev:web
```

**Admin Console (Port 5174)**

```bash
pnpm dev:admin
```

**Mobile App (Expo Go)**

```bash
pnpm dev:mobile
```

_Once the Metro bundler starts, scan the QR code using the Expo Go app on your phone, or press `a` for Android Emulator / `i` for iOS Simulator._

---

## 🎨 Design System

Habibi Stream uses a unified, premium dark theme tailored for Arabic users.

- **RTL First**: All interfaces natively support Right-to-Left layouts.
- **Palette**: Deep backgrounds (`#09090b`, `#18181b`) accented with vibrant primary purple (`#8b5cf6`), energetic live indicators (`#ef4444`), and premium gold accents (`#fbbf24`).
- **State Management**: `zustand` is used across frontends for lightweight, fast state management.

---

## 🛠 Useful Commands

- `pnpm build` - Builds all applications and packages.
- `pnpm lint` - Runs linting across the workspace.
- `pnpm clean` - Cleans build artifacts (`.expo`, `dist`) and removes `node_modules` across all workspaces.

---

_Built with ❤️ for the Arab streaming community._
