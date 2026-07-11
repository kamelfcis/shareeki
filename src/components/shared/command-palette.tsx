import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command-dialog";
import { useCommandPalette, useLocale, useAuth, useTheme } from "@/hooks";
import {
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
  User,
  Shield,
  Building2,
  CheckCircle,
  Moon,
  Sun,
  Globe,
} from "lucide-react";

export function CommandPalette() {
  const { isOpen, close } = useCommandPalette();
  const { locale, setLocale } = useLocale();
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const isAdmin = user?.role === "admin";

  const navCommands = [
    { icon: LayoutDashboard, label: "Dashboard", labelAr: "لوحة التحكم", href: "/dashboard" },
    { icon: ShoppingBag, label: "Services", labelAr: "الخدمات", href: "/services" },
    { icon: FileText, label: "Requests", labelAr: "الطلبات", href: "/requests" },
    { icon: Wallet, label: "Wallet", labelAr: "المحفظة", href: "/wallet" },
    { icon: Newspaper, label: "News", labelAr: "الأخبار", href: "/news" },
    { icon: Users, label: "Directory", labelAr: "دليل الموظفين", href: "/directory" },
    { icon: FolderOpen, label: "Documents", labelAr: "المستندات", href: "/documents" },
    { icon: Bell, label: "Notifications", labelAr: "الإشعارات", href: "/notifications" },
    { icon: HelpCircle, label: "Support", labelAr: "الدعم", href: "/support" },
    { icon: Settings, label: "Settings", labelAr: "الإعدادات", href: "/settings" },
    { icon: User, label: "Profile", labelAr: "الملف الشخصي", href: "/profile" },
  ];

  const adminCommands = [
    { icon: LayoutDashboard, label: "Admin Dashboard", labelAr: "لوحة تحكم المشرف", href: "/admin" },
    { icon: Users, label: "Manage Users", labelAr: "إدارة المستخدمين", href: "/admin/users" },
    { icon: Building2, label: "Departments", labelAr: "الأقسام", href: "/admin/departments" },
    { icon: ShoppingBag, label: "Manage Services", labelAr: "إدارة الخدمات", href: "/admin/services" },
    { icon: CheckCircle, label: "Approvals", labelAr: "الموافقات", href: "/admin/approvals" },
  ];

  const handleSelect = (href: string) => {
    navigate(href);
    close();
  };

  return (
    <CommandDialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <CommandInput placeholder={locale === "ar" ? "اكتب أمراً أو بحثاً..." : "Type a command or search..."} />
      <CommandList>
        <CommandEmpty>{locale === "ar" ? "لا توجد نتائج" : "No results found."}</CommandEmpty>
        <CommandGroup heading={locale === "ar" ? "التنقل" : "Navigation"}>
          {navCommands.map((cmd) => (
            <CommandItem
              key={cmd.href}
              onSelect={() => handleSelect(cmd.href)}
              className="cursor-pointer"
            >
              <cmd.icon className="me-2 h-4 w-4" />
              <span>{locale === "ar" ? cmd.labelAr : cmd.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        {isAdmin && (
          <CommandGroup heading={locale === "ar" ? "المشرف" : "Admin"}>
            {adminCommands.map((cmd) => (
              <CommandItem
                key={cmd.href}
                onSelect={() => handleSelect(cmd.href)}
                className="cursor-pointer"
              >
                <cmd.icon className="me-2 h-4 w-4" />
                <span>{locale === "ar" ? cmd.labelAr : cmd.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
        <CommandGroup heading={locale === "ar" ? "الإجراءات" : "Actions"}>
          <CommandItem
            onSelect={() => { setTheme(theme === "dark" ? "light" : "dark"); close(); }}
            className="cursor-pointer"
          >
            {theme === "dark" ? <Sun className="me-2 h-4 w-4" /> : <Moon className="me-2 h-4 w-4" />}
            <span>{locale === "ar" ? (theme === "dark" ? "الوضع الفاتح" : "الوضع الداكن") : (theme === "dark" ? "Light Mode" : "Dark Mode")}</span>
          </CommandItem>
          <CommandItem
            onSelect={() => { setLocale(locale === "en" ? "ar" : "en"); close(); }}
            className="cursor-pointer"
          >
            <Globe className="me-2 h-4 w-4" />
            <span>{locale === "ar" ? "التبديل إلى الإنجليزية" : "Switch to Arabic"}</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
