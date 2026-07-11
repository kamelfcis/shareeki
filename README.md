# Shareky (شريكي) - Enterprise Employee Services Platform

A premium, enterprise-grade MVP frontend for the Shareky platform - an employee services platform tailored for the petroleum sector, supporting both Arabic (RTL) and English (LTR).

## Tech Stack

- **React 19** + **TypeScript** + **Vite 6**
- **TailwindCSS v4** with custom design tokens
- **Radix UI** primitives (Dialog, Dropdown, Tabs, Select, etc.)
- **React Router** for client-side routing
- **TanStack Query** (mocked) for data fetching
- **React Hook Form** + **Zod** for form validation
- **Framer Motion** for animations
- **Recharts** for data visualization
- **Lucide React** for icons
- **Sonner** for toast notifications
- **cmdk** for command palette
- **class-variance-authority** + **clsx** + **tailwind-merge** for className utilities

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Employee | ahmed.hassan@shareky.com | password123 |
| Admin | admin@shareky.com | password123 |

## Features

### Authentication
- Login with email/password
- Registration with employee ID
- Forgot password flow
- OTP verification
- Remember me functionality

### Dashboard
- Welcome section with wallet balance
- Statistics cards with trends
- Monthly spending chart (Area chart)
- Category breakdown (Donut chart)
- Recent activity feed
- Announcements
- Upcoming events
- Quick actions
- Featured services

### Service Marketplace
- Grid/List view toggle
- Category filtering via tabs
- Search with filters
- Service cards with ratings, prices, discounts
- Favorites system
- Provider info

### Requests Module
- Status filtering (All/Pending/Approved/Rejected/In Progress/Completed)
- Request cards with timeline and comments
- Stats overview
- Search

### Wallet
- Balance card with gradient
- Income vs Expenses bar chart
- Balance over time area chart
- Transaction list with filtering
- Export functionality

### News & Articles
- Pinned articles
- Trending badges
- Category filtering
- Article cards with images

### Employee Directory
- Grid/List view toggle
- Department filtering
- Employee cards with contact actions
- Search

### Notifications
- Read/Unread status
- Type filtering
- Mark as read
- Mark all as read
- Delete

### Documents
- Category filtering
- Upload functionality
- Document cards with size info
- Preview/Download actions

### Support
- Ticket management
- FAQ section
- Contact information
- Live chat UI

### Settings
- Profile management
- Password change
- Language switching (EN/AR)
- Theme switching (Light/Dark/System)
- Security settings
- Notification preferences
- Device management

### Admin Dashboard
- Platform statistics
- Revenue & users chart
- Category distribution
- Department statistics
- Recent activity feed
- Quick actions

### Design System
- Custom color palette (Green/Orange brand)
- Typography scale
- Button variants (primary, secondary, outline, ghost, accent, gradient)
- Card components
- Input/Textarea components
- Badge variants
- Dialog/Sheet components
- Dropdown menu
- Tabs
- Progress bars
- Skeleton loading states
- Empty states
- Stat cards

### UX Features
- Command palette (Ctrl+K)
- Page transitions with Framer Motion
- Skeleton loading states
- Empty states with actions
- Toast notifications
- Keyboard navigation
- Focus rings
- Responsive design (Mobile/Tablet/Desktop)
- RTL support
- Dark mode
- Glassmorphism effects
- Gradient backgrounds
- Smooth animations

## Architecture

```
src/
├── app/              # App root with routing
├── components/       # Shared UI components
│   ├── ui/          # Base design system components
│   ├── layout/      # Layout components (sidebar, navbar)
│   └── shared/      # Shared feature components
├── features/        # Feature-based modules
│   ├── auth/        # Authentication pages
│   ├── dashboard/   # Dashboard page
│   ├── employee/    # Employee profile
│   ├── services/    # Service marketplace
│   ├── requests/    # Request management
│   ├── wallet/      # Wallet & transactions
│   ├── news/        # News feed
│   ├── directory/   # Employee directory
│   ├── notifications/
│   ├── documents/
│   ├── support/
│   ├── settings/
│   └── admin/
├── hooks/           # Custom hooks
├── layouts/         # Page layouts
├── pages/           # Page components
├── routes/          # Route definitions
├── services/        # API services (mocked)
├── store/           # State management
├── types/           # TypeScript types
├── utils/           # Utility functions
├── constants/       # Constants & config
├── mocks/           # Mock data
└── styles/          # Global styles
```

## Mock Data

All data is mocked in `src/mocks/data.ts` with realistic content including:
- User profiles
- Services with images
- Benefits and coupons
- Requests with timelines
- Transactions
- Notifications
- Documents
- Support tickets
- Employees
- Articles
- Events
- Announcements
- Departments

## Theming

### Brand Colors
- **Primary Green**: `#059669` → `#10b981` → `#34d399`
- **Accent Orange**: `#ea580c` → `#f97316` → `#fb9236`

### Dark Mode
Toggle between Light, Dark, and System themes via Settings or the navbar toggle.

### RTL Support
Switch between English (LTR) and Arabic (RTL) via Settings or the language toggle in the navbar.

## Building for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

## Backend Integration

The architecture is designed for easy backend integration:
1. Replace mock data in `src/mocks/data.ts` with API calls
2. Update `src/services/api.ts` with real API endpoints
3. Connect TanStack Query to your backend
4. Replace the store authentication with real JWT handling
