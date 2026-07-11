import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/utils";
import { useLocale, useSidebar, useCommandPalette } from "@/hooks";
import { UserAvatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Menu,
  Search,
  Bell,
  Moon,
  Sun,
  Globe,
  Settings,
  User,
  LogOut,
  Command,
} from "lucide-react";
import { useAuth, useTheme } from "@/hooks";
import { mockUser } from "@/mocks/data";

export function Navbar() {
  const { locale, isRTL, setLocale } = useLocale();
  const { toggleSidebar } = useSidebar();
  const { toggle: toggleCommandPalette } = useCommandPalette();
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      toggleCommandPalette();
    }
  }, [toggleCommandPalette]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const getPageTitle = () => {
    const path = location.pathname;
    const titles: Record<string, string> = {
      "/dashboard": locale === "ar" ? "لوحة التحكم" : "Dashboard",
      "/services": locale === "ar" ? "الخدمات" : "Services",
      "/requests": locale === "ar" ? "الطلبات" : "Requests",
      "/wallet": locale === "ar" ? "المحفظة" : "Wallet",
      "/news": locale === "ar" ? "الأخبار" : "News",
      "/directory": locale === "ar" ? "دليل الموظفين" : "Directory",
      "/documents": locale === "ar" ? "المستندات" : "Documents",
      "/notifications": locale === "ar" ? "الإشعارات" : "Notifications",
      "/support": locale === "ar" ? "الدعم" : "Support",
      "/settings": locale === "ar" ? "الإعدادات" : "Settings",
      "/profile": locale === "ar" ? "الملف الشخصي" : "Profile",
      "/admin": locale === "ar" ? "لوحة تحكم المشرف" : "Admin Dashboard",
    };

    for (const [key, value] of Object.entries(titles)) {
      if (path === key || (key !== "/dashboard" && key !== "/admin" && path.startsWith(key))) {
        return value;
      }
    }
    return locale === "ar" ? "لوحة التحكم" : "Dashboard";
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex h-14 sm:h-16 items-center gap-2 sm:gap-4 border-b border-border/80 bg-background/80 backdrop-blur-xl px-3 sm:px-4 lg:px-6 transition-all duration-200",
        scrolled && "shadow-sm"
      )}
    >
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className="lg:hidden shrink-0 h-9 w-9"
        aria-label="Toggle menu"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Page Title */}
      <div className="flex-1 min-w-0">
        <h1 className="text-base sm:text-lg font-semibold text-foreground truncate">
          {getPageTitle()}
        </h1>
      </div>

      {/* Search - Desktop */}
      <button
        onClick={toggleCommandPalette}
        className="hidden sm:flex items-center gap-2 rounded-xl border border-border bg-muted/80 px-3 py-2 text-sm text-muted-foreground transition-all hover:border-neutral-300 hover:bg-muted hover:shadow-sm min-h-11"
      >
        <Search className="h-4 w-4 shrink-0" />
        <span className="hidden md:inline">{locale === "ar" ? "بحث..." : "Search..."}</span>
        <kbd className="hidden lg:inline-flex h-5 items-center gap-0.5 rounded border border-border bg-card px-1.5 text-[10px] font-medium text-muted-foreground">
          <Command className="h-2.5 w-2.5" />K
        </kbd>
      </button>

      {/* Search - Mobile (icon only) */}
      <button
        onClick={toggleCommandPalette}
        className="sm:hidden flex items-center justify-center h-11 w-11 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
        aria-label="Search"
      >
        <Search className="h-5 w-5" />
      </button>

      {/* Notifications */}
      <Link
        to="/notifications"
        className="relative flex items-center justify-center h-11 w-11 rounded-lg text-muted-foreground hover:bg-muted transition-colors shrink-0"
        aria-label="Notifications"
      >
        <Bell className="h-[18px] w-[18px]" />
        <span className="absolute -top-0.5 -end-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-accent-500 px-1 text-[10px] font-bold text-white ring-2 ring-background">
          3
        </span>
      </Link>

      {/* Theme Toggle */}
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="flex items-center justify-center h-11 w-11 rounded-lg text-muted-foreground hover:bg-muted transition-colors shrink-0 relative"
        aria-label="Toggle theme"
      >
        <Sun className="h-[18px] w-[18px] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 absolute" />
        <Moon className="h-[18px] w-[18px] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 absolute" />
      </button>

      {/* Language Switcher */}
      <button
        onClick={() => setLocale(locale === "en" ? "ar" : "en")}
        className="flex items-center justify-center h-11 w-11 rounded-lg text-muted-foreground hover:bg-muted transition-colors shrink-0 relative"
        aria-label="Switch language"
      >
        <Globe className="h-[18px] w-[18px]" />
      </button>

      {/* User Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 rounded-xl p-1 hover:bg-muted transition-colors shrink-0 min-h-11">
            <UserAvatar
              src={user?.avatar || mockUser.avatar}
              name={user?.name || mockUser.name}
              size="sm"
            />
            <span className="hidden lg:inline text-sm font-medium text-foreground max-w-[120px] truncate">
              {user?.name || mockUser.name}
            </span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <div className="flex flex-col gap-0.5">
              <span className="font-medium text-sm">{user?.name || mockUser.name}</span>
              <span className="text-xs text-muted-foreground font-normal">{user?.email || mockUser.email}</span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link to="/profile" className="cursor-pointer">
              <User className="h-4 w-4" />
              {locale === "ar" ? "الملف الشخصي" : "Profile"}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/settings" className="cursor-pointer">
              <Settings className="h-4 w-4" />
              {locale === "ar" ? "الإعدادات" : "Settings"}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400">
            <LogOut className="h-4 w-4" />
            {locale === "ar" ? "تسجيل الخروج" : "Sign out"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
