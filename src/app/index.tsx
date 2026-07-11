import { Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/main-layout";
import { AuthLayout } from "@/components/layout/auth-layout";
import { ErrorBoundary } from "@/components/shared/error-boundary";
import { useAuth, useLocale, useTheme } from "@/hooks";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load pages
import { lazyWithRetry } from "@/lib/lazy-with-retry";

const LoginPage = lazyWithRetry(() => import("@/features/auth/login-page").then(m => ({ default: m.LoginPage })));
const RegisterPage = lazyWithRetry(() => import("@/features/auth/register-page").then(m => ({ default: m.RegisterPage })));
const ForgotPasswordPage = lazyWithRetry(() => import("@/features/auth/forgot-password-page").then(m => ({ default: m.ForgotPasswordPage })));
const ResetPasswordPage = lazyWithRetry(() => import("@/features/auth/reset-password-page").then(m => ({ default: m.ResetPasswordPage })));
const OtpPage = lazyWithRetry(() => import("@/features/auth/otp-page").then(m => ({ default: m.OtpPage })));
const DashboardPage = lazyWithRetry(() => import("@/features/dashboard/dashboard-page").then(m => ({ default: m.DashboardPage })));
const ServicesPage = lazyWithRetry(() => import("@/features/services/services-page").then(m => ({ default: m.ServicesPage })));
const RequestsPage = lazyWithRetry(() => import("@/features/requests/requests-page").then(m => ({ default: m.RequestsPage })));
const WalletPage = lazyWithRetry(() => import("@/features/wallet/wallet-page").then(m => ({ default: m.WalletPage })));
const NewsPage = lazyWithRetry(() => import("@/features/news/news-page").then(m => ({ default: m.NewsPage })));
const DirectoryPage = lazyWithRetry(() => import("@/features/directory/directory-page").then(m => ({ default: m.DirectoryPage })));
const NotificationsPage = lazyWithRetry(() => import("@/features/notifications/notifications-page").then(m => ({ default: m.NotificationsPage })));
const DocumentsPage = lazyWithRetry(() => import("@/features/documents/documents-page").then(m => ({ default: m.DocumentsPage })));
const SupportPage = lazyWithRetry(() => import("@/features/support/support-page").then(m => ({ default: m.SupportPage })));
const SettingsPage = lazyWithRetry(() => import("@/features/settings/settings-page").then(m => ({ default: m.SettingsPage })));
const EmployeeProfilePage = lazyWithRetry(() => import("@/features/employee/employee-profile-page").then(m => ({ default: m.EmployeeProfilePage })));
const AdminDashboardPage = lazyWithRetry(() => import("@/features/admin/admin-dashboard-page").then(m => ({ default: m.AdminDashboardPage })));
const AdminUsersPage = lazyWithRetry(() => import("@/features/admin/admin-users-page").then(m => ({ default: m.AdminUsersPage })));
const AdminDepartmentsPage = lazyWithRetry(() => import("@/features/admin/admin-departments-page").then(m => ({ default: m.AdminDepartmentsPage })));
const AdminServicesPage = lazyWithRetry(() => import("@/features/admin/admin-services-page").then(m => ({ default: m.AdminServicesPage })));
const AdminApprovalsPage = lazyWithRetry(() => import("@/features/admin/admin-approvals-page").then(m => ({ default: m.AdminApprovalsPage })));
const NotFoundPage = lazyWithRetry(() => import("@/pages/not-found-page").then(m => ({ default: m.NotFoundPage })));

function PageLoader() {
  return (
    <div className="space-y-6 p-8">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-64" />
      <div className="grid grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-2xl" />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-64 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }
  return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
}

function ThemeDirectionSync() {
  const { direction } = useLocale();
  const { theme } = useTheme();

  useEffect(() => {
    document.documentElement.dir = direction;
  }, [direction]);

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (theme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (isDark) document.documentElement.classList.add("dark");
    }
  }, [theme]);

  return null;
}

export function App() {
  return (
    <BrowserRouter>
      <ThemeDirectionSync />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Auth Routes */}
          <Route element={<PublicRoute><AuthLayout /></PublicRoute>}>
            <Route path="/auth/login" element={<ErrorBoundary><LoginPage /></ErrorBoundary>} />
            <Route path="/auth/register" element={<ErrorBoundary><RegisterPage /></ErrorBoundary>} />
            <Route path="/auth/forgot-password" element={<ErrorBoundary><ForgotPasswordPage /></ErrorBoundary>} />
            <Route path="/auth/reset-password" element={<ErrorBoundary><ResetPasswordPage /></ErrorBoundary>} />
            <Route path="/auth/otp" element={<ErrorBoundary><OtpPage /></ErrorBoundary>} />
          </Route>

          {/* Protected Routes */}
          <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
            <Route path="/dashboard" element={<ErrorBoundary><DashboardPage /></ErrorBoundary>} />
            <Route path="/services" element={<ErrorBoundary><ServicesPage /></ErrorBoundary>} />
            <Route path="/requests" element={<ErrorBoundary><RequestsPage /></ErrorBoundary>} />
            <Route path="/wallet" element={<ErrorBoundary><WalletPage /></ErrorBoundary>} />
            <Route path="/news" element={<ErrorBoundary><NewsPage /></ErrorBoundary>} />
            <Route path="/directory" element={<ErrorBoundary><DirectoryPage /></ErrorBoundary>} />
            <Route path="/notifications" element={<ErrorBoundary><NotificationsPage /></ErrorBoundary>} />
            <Route path="/documents" element={<ErrorBoundary><DocumentsPage /></ErrorBoundary>} />
            <Route path="/support" element={<ErrorBoundary><SupportPage /></ErrorBoundary>} />
            <Route path="/settings" element={<ErrorBoundary><SettingsPage /></ErrorBoundary>} />
            <Route path="/settings/:tab" element={<ErrorBoundary><SettingsPage /></ErrorBoundary>} />
            <Route path="/profile" element={<ErrorBoundary><EmployeeProfilePage /></ErrorBoundary>} />

            {/* Admin Routes */}
            <Route path="/admin" element={<ErrorBoundary><AdminDashboardPage /></ErrorBoundary>} />
            <Route path="/admin/users" element={<ErrorBoundary><AdminUsersPage /></ErrorBoundary>} />
            <Route path="/admin/departments" element={<ErrorBoundary><AdminDepartmentsPage /></ErrorBoundary>} />
            <Route path="/admin/services" element={<ErrorBoundary><AdminServicesPage /></ErrorBoundary>} />
            <Route path="/admin/approvals" element={<ErrorBoundary><AdminApprovalsPage /></ErrorBoundary>} />
            <Route path="/admin/reports" element={<ErrorBoundary><AdminDashboardPage /></ErrorBoundary>} />
            <Route path="/admin/cms" element={<ErrorBoundary><AdminDashboardPage /></ErrorBoundary>} />
            <Route path="/admin/settings" element={<ErrorBoundary><AdminDashboardPage /></ErrorBoundary>} />
          </Route>

          {/* Root redirect */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* 404 */}
          <Route path="*" element={<ErrorBoundary><NotFoundPage /></ErrorBoundary>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
