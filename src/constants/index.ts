export const APP_NAME = "Shareky";
export const APP_NAME_AR = "شريكي";
export const LOGO_PATH = "/shareekilogo.png";
export const APP_DESCRIPTION = "Enterprise Employee Services Platform";
export const APP_DESCRIPTION_AR = "منصة خدمات الموظفين المؤسسية";

export const SUPPORTED_LOCALES = ["en", "ar"] as const;
export const DEFAULT_LOCALE = "en";

export const NAV_ITEMS = [
  {
    title: "Dashboard",
    titleAr: "لوحة التحكم",
    href: "/dashboard",
    icon: "LayoutDashboard",
  },
  {
    title: "Services",
    titleAr: "الخدمات",
    href: "/services",
    icon: "ShoppingBag",
  },
  {
    title: "Requests",
    titleAr: "الطلبات",
    href: "/requests",
    icon: "FileText",
  },
  {
    title: "Wallet",
    titleAr: "المحفظة",
    href: "/wallet",
    icon: "Wallet",
  },
  {
    title: "News",
    titleAr: "الأخبار",
    href: "/news",
    icon: "Newspaper",
  },
  {
    title: "Directory",
    titleAr: "دليل الموظفين",
    href: "/directory",
    icon: "Users",
  },
  {
    title: "Documents",
    titleAr: "المستندات",
    href: "/documents",
    icon: "FolderOpen",
  },
  {
    title: "Notifications",
    titleAr: "الإشعارات",
    href: "/notifications",
    icon: "Bell",
  },
  {
    title: "Support",
    titleAr: "الدعم",
    href: "/support",
    icon: "HelpCircle",
  },
  {
    title: "Settings",
    titleAr: "الإعدادات",
    href: "/settings",
    icon: "Settings",
  },
] as const;

export const ADMIN_NAV_ITEMS = [
  {
    title: "Dashboard",
    titleAr: "لوحة التحكم",
    href: "/admin",
    icon: "LayoutDashboard",
  },
  {
    title: "Users",
    titleAr: "المستخدمين",
    href: "/admin/users",
    icon: "Users",
  },
  {
    title: "Departments",
    titleAr: "الأقسام",
    href: "/admin/departments",
    icon: "Building2",
  },
  {
    title: "Services",
    titleAr: "الخدمات",
    href: "/admin/services",
    icon: "ShoppingBag",
  },
  {
    title: "Approvals",
    titleAr: "الموافقات",
    href: "/admin/approvals",
    icon: "CheckCircle",
  },
  {
    title: "Reports",
    titleAr: "التقارير",
    href: "/admin/reports",
    icon: "BarChart3",
  },
  {
    title: "CMS",
    titleAr: "إدارة المحتوى",
    href: "/admin/cms",
    icon: "FileText",
  },
  {
    title: "Settings",
    titleAr: "الإعدادات",
    href: "/admin/settings",
    icon: "Settings",
  },
] as const;

export const SERVICE_CATEGORIES = [
  { label: "All", labelAr: "الكل", value: "all" },
  { label: "Health & Wellness", labelAr: "الصحة والعافية", value: "health" },
  { label: "Travel", labelAr: "السفر", value: "travel" },
  { label: "Education", labelAr: "التعليم", value: "education" },
  { label: "Finance", labelAr: "المالية", value: "finance" },
  { label: "Shopping", labelAr: "التسوق", value: "shopping" },
  { label: "Entertainment", labelAr: "الترفيه", value: "entertainment" },
  { label: "Home Services", labelAr: "خدمات المنزل", value: "home" },
  { label: "Auto", labelAr: "السيارات", value: "auto" },
] as const;

export const REQUEST_STATUSES = [
  { label: "All", labelAr: "الكل", value: "all" },
  { label: "Pending", labelAr: "قيد الانتظار", value: "pending" },
  { label: "Approved", labelAr: "موافق عليه", value: "approved" },
  { label: "Rejected", labelAr: "مرفوض", value: "rejected" },
  { label: "In Progress", labelAr: "قيد التنفيذ", value: "in_progress" },
  { label: "Completed", labelAr: "مكتمل", value: "completed" },
] as const;

export const TICKET_PRIORITIES = [
  { label: "Low", labelAr: "منخفض", value: "low", color: "text-muted-foreground" },
  { label: "Medium", labelAr: "متوسط", value: "medium", color: "text-yellow-500" },
  { label: "High", labelAr: "عالي", value: "high", color: "text-orange-500" },
  { label: "Urgent", labelAr: "عاجل", value: "urgent", color: "text-red-500" },
] as const;

export const TIME_ZONES = [
  "Africa/Cairo",
  "Asia/Dubai",
  "Asia/Bahrain",
  "Asia/Kuwait",
  "Asia/Qatar",
] as const;

export const CURRENCY = "EGP";
export const CURRENCY_SYMBOL = "جنيه";

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export const PAGE_SIZES = [10, 20, 50, 100] as const;
