# Touch & Solve - Employee Management System (v2)

A premium, feature-rich, and interactive Employee Management & HRMS dashboard built with React 19, TypeScript, Vite 8, and Tailwind CSS v4.

## 🚀 Features

- **Centralized Dashboard**: At-a-glance analytics, live attendance feed, statistics cards, and upcoming leaves.
- **Attendance Management**:
  - **Attendance Feed**: Real-time punch-in/out logs with method (Face/Fingerprint/RFID) and location data.
  - **Attendance Sheets & Reports**: Individual and summary reporting pages.
  - **Manual Request**: Interface to request attendance corrections.
- **Employee Directory**:
  - **Dynamic Hierarchy**: Automatically sorted employee list by role weights.
  - **Org Chart**: Interactive employee organizational tree/chart.
  - **Employee Creation**: Quick onboarding interface for new team members.
- **Modules**:
  - **Shift Management**: Scheduling, shifts, and rotation details.
  - **Leave & Overtime**: Leave request tracker and overtime analytics.
  - **Devices**: List of biometrics and attendance collection hardware.
  - **Visitor & Parking Management**: Dynamic logs and slot allocation pages.
  - **Project Management**: Multi-project tracking and team assignments.
- **Premium UX/UI**:
  - **Dark Mode Support**: Automatically synchronizes with system preference or persists user choice via LocalStorage.
  - **Micro-animations**: Smooth transitions and interactive cards powered by `framer-motion`.
  - **Responsive Design**: Mobile-friendly sidebar and navbar layout.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 8](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (using `@tailwindcss/vite` compiler plugin)
- **Charts & Data Viz**: [Recharts](https://recharts.org/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Linter**: [Oxlint](https://github.com/oxc-project/oxc) for lightning-fast linting

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### Installation

Clone the repository, navigate to the project directory, and install the dependencies:

```bash
# Install package dependencies
npm install
```

### Development Server

Run the local development server with Hot Module Replacement (HMR):

```bash
# Start the Vite development server
npm run dev
```

The application will be available at `http://localhost:5173`.

### Production Build

Compile and bundle the application for production deployment:

```bash
# Build the application
npm run build
```

The production-ready assets will be generated in the `dist/` directory.

### Preview Production Build

Preview the built application locally:

```bash
# Preview build
npm run preview
```

### Linting

Lint the codebase quickly using Oxlint:

```bash
# Run oxlint linter
npm run lint
```

---

## 📂 Project Structure

```text
employee-management-v2/
├── src/
│   ├── assets/               # Static assets & images
│   ├── components/           # UI Components
│   │   ├── AnalyticsCharts.tsx       # Recharts dashboards
│   │   ├── AttendanceFeed.tsx        # Live punch-in stream
│   │   ├── DashboardWidgets.tsx      # Sidebar helper widgets
│   │   ├── LoginPage.tsx             # Login wrapper screen
│   │   ├── Navbar.tsx                # Responsive header & theme toggler
│   │   ├── Sidebar.tsx               # Navigation control pane
│   │   ├── StatsCards.tsx            # Main KPI statistic cards
│   │   └── WorkablePages.tsx         # Layouts for all sub-management modules
│   ├── App.tsx               # Core router, theme manager & global states
│   ├── main.tsx              # Application entrypoint
│   └── index.css             # Tailwind base & custom styles
├── package.json              # Dependencies & npm script definitions
├── vite.config.ts            # Vite configuration
└── tsconfig.json             # TypeScript configuration options
```
