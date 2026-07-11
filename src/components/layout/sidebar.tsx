import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/utils";
import { useLocale, useSidebar } from "@/hooks";
import { NAV_ITEMS, ADMIN_NAV_ITEMS, APP_NAME, APP_NAME_AR, LOGO_PATH } from "@/constants";
import { SharekyLogo } from "@/components/shared/shareky-logo";
import { UserAvatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  ShoppingBag,
  FileText,
  Wallet,
  Newspaper,
  Users,
  FolderOpen,
  Bell,
  HelpCircle,
  Settings,
  LogOut,
  Building2,
  CheckCircle,
  BarChart3,
} from "lucide-react";
import { useAuth } from "@/hooks";
import { mockUser } from "@/mocks/data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  ShoppingBag,
  FileText,
  Wallet,
  Newspaper,
  Users,
  FolderOpen,
  Bell,
  HelpCircle,
  Settings,
  Building2,
  CheckCircle,
  BarChart3,
};

export function Sidebar() {
  const location = useLocation();
  const { locale, direction, isRTL } = useLocale();
  const { isOpen, isCollapsed, toggleCollapsed, closeSidebar } = useSidebar();
  const { user } = useAuth();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const isAdmin = user?.role === "admin" || location.pathname.startsWith("/admin");
  const navItems = isAdmin ? [...ADMIN_NAV_ITEMS] : [...NAV_ITEMS];

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={closeSidebar}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        dir={direction}
        className={cn(
          "fixed inset-y-0 z-50 flex flex-col bg-white border-neutral-200 transition-all duration-300 ease-in-out dark:bg-neutral-950 dark:border-neutral-800",
          isRTL ? "right-0 border-l" : "left-0 border-r",
          isCollapsed ? "w-[72px]" : "w-[280px]",
          // Mobile: off-screen by default, slide in when open
          !isOpen && (isRTL ? "translate-x-full" : "-translate-x-full"),
          isOpen && "translate-x-0",
          // Desktop: always visible, respect collapsed state
          "lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className={cn(
          "flex h-14 sm:h-16 items-center border-b border-neutral-200 dark:border-neutral-800 shrink-0",
          isCollapsed ? "justify-center px-2" : "px-4 sm:px-6"
        )}>
          {!isCollapsed && (
            <Link to="/dashboard" className="group">
              <SharekyLogo
                size="sm"
                locale={locale}
                subtitle="Shareky"
                subtitleAr="شريكي"
                className="group-hover:opacity-90 transition-opacity"
              />
            </Link>
          )}
          {isCollapsed && (
            <Link to="/dashboard" className="flex shrink-0 hover:opacity-90 transition-opacity">
              <img
                src={LOGO_PATH}
                alt={locale === "ar" ? APP_NAME_AR : APP_NAME}
                className="h-9 w-9 object-contain"
                draggable={false}
              />
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={toggleCollapsed}
            className={cn("hidden lg:flex shrink-0", isCollapsed ? "mt-0" : "ms-auto")}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isRTL ? (
              isCollapsed ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
            ) : (
              isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <ScrollArea dir={direction} className="flex-1 py-3 min-h-0">
          <nav className={cn("space-y-0.5", isCollapsed ? "px-2" : "px-3")}>
            {navItems.map((item) => {
              const Icon = iconMap[item.icon] || LayoutDashboard;
              const isActive = location.pathname === item.href ||
                (item.href !== "/dashboard" && item.href !== "/admin" && location.pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onMouseEnter={() => setHoveredItem(item.href)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={closeSidebar}
                  className={cn(
                    "group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150",
                    isActive
                      ? "bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300"
                      : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800/80 dark:hover:text-neutral-100",
                    isCollapsed && "justify-center px-2",
                    isRTL && !isCollapsed && "justify-start"
                  )}
                  title={isCollapsed ? (locale === "ar" ? item.titleAr : item.title) : undefined}
                >
                  {isActive && (
                    <div className={cn(
                      "absolute top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-full bg-brand-600 dark:bg-brand-400",
                      isRTL ? "right-0" : "left-0"
                    )} />
                  )}
                  <Icon className={cn(
                    "h-5 w-5 shrink-0 transition-colors",
                    isActive
                      ? "text-brand-600 dark:text-brand-400"
                      : "text-neutral-500 dark:text-neutral-500 group-hover:text-neutral-700 dark:group-hover:text-neutral-300"
                  )} />
                  {!isCollapsed && (
                    <span className="truncate">{locale === "ar" ? item.titleAr : item.title}</span>
                  )}
                  {!isCollapsed && "badge" in item && item.badge && item.badge > 0 && (
                    <span className="ms-auto flex h-5 min-w-[20px] items-center justify-center rounded-full bg-accent-500 px-1.5 text-[10px] font-bold text-white">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </ScrollArea>

        {/* User Section */}
        <div className={cn(
          "border-t border-neutral-200 dark:border-neutral-800 shrink-0",
          isCollapsed ? "p-2" : "p-3"
        )}>
          <Link
            to="/profile"
            onClick={closeSidebar}
            className={cn(
              "flex w-full items-center gap-3 rounded-xl p-2 transition-colors",
              isCollapsed ? "justify-center" : "justify-start",
              "hover:bg-neutral-100 dark:hover:bg-neutral-800",
              location.pathname === "/profile" && "bg-brand-50 dark:bg-brand-950/60"
            )}
          >
            <UserAvatar
              src={user?.avatar || mockUser.avatar}
              name={user?.name || mockUser.name}
              size="sm"
            />
            {!isCollapsed && (
              <>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate leading-tight">
                    {user?.name || mockUser.name}
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate leading-tight mt-0.5">
                    {user?.position || mockUser.position}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="shrink-0 text-neutral-400 hover:text-red-500 dark:text-neutral-500 dark:hover:text-red-400"
                  aria-label="Sign out"
                  onClick={(e) => e.preventDefault()}
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            )}
          </Link>
        </div>
      </aside>
    </>
  );
}
