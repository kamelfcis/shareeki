import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn, formatPrice } from "@/utils";
import { useLocale } from "@/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/shared/stat-card";
import { mockDepartments } from "@/mocks/data";
import {
  Users,
  ShoppingBag,
  FileText,
  BarChart3,
  ArrowRight,
  DollarSign,
  UserCheck,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const fadeIn = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

const adminStats = [
  { title: "Total Users", titleAr: "إجمالي المستخدمين", value: "5,234", change: 12.5, changeType: "increase" as const, icon: "Users", color: "text-brand-500" },
  { title: "Active Services", titleAr: "الخدمات النشطة", value: "48", change: 8, changeType: "increase" as const, icon: "ShoppingBag", color: "text-blue-500" },
  { title: "Pending Approvals", titleAr: "الموافقات المعلقة", value: "23", change: -5, changeType: "decrease" as const, icon: "FileText", color: "text-accent-500" },
  { title: "Revenue", titleAr: "الإيرادات", value: "EGP 1.2M", valueAr: "1.2M جنيه", change: 15.3, changeType: "increase" as const, icon: "DollarSign", color: "text-green-500" },
];

const revenueData = [
  { month: "Aug", revenue: 85000, users: 4200 },
  { month: "Sep", revenue: 92000, users: 4350 },
  { month: "Oct", revenue: 88000, users: 4500 },
  { month: "Nov", revenue: 105000, users: 4800 },
  { month: "Dec", revenue: 115000, users: 5000 },
  { month: "Jan", revenue: 120000, users: 5234 },
];

const departmentData = mockDepartments.map((d) => ({
  name: d.name,
  employees: d.employeeCount,
}));

const categoryData = [
  { name: "Health", value: 35, color: "#10b981" },
  { name: "Travel", value: 20, color: "#f97316" },
  { name: "Education", value: 25, color: "#3b82f6" },
  { name: "Entertainment", value: 15, color: "#8b5cf6" },
  { name: "Other", value: 5, color: "#6b7280" },
];

const recentActivity = [
  { user: "Ahmed Hassan", action: "Booked Gym Membership", time: "2 min ago", icon: UserCheck, color: "text-green-500 bg-green-50 dark:bg-green-950/60" },
  { user: "Sara Ibrahim", action: "Created new ticket", time: "15 min ago", icon: FileText, color: "text-blue-500 bg-blue-50 dark:bg-blue-950/60" },
  { user: "Mohamed El-Sayed", action: "Updated profile", time: "1 hour ago", icon: Users, color: "text-brand-500 bg-brand-50 dark:bg-brand-950/60" },
  { user: "Fatima Mahmoud", action: "Submitted expense report", time: "2 hours ago", icon: DollarSign, color: "text-accent-500 bg-accent-50 dark:bg-accent-950/60" },
  { user: "Khalid Hassan", action: "Approved leave request", time: "3 hours ago", icon: UserCheck, color: "text-green-500 bg-green-50 dark:bg-green-950/60" },
];

const quickActions = [
  { icon: Users, label: "Manage Users", labelAr: "إدارة المستخدمين", href: "/admin/users", color: "text-brand-500 bg-brand-50 dark:bg-brand-950/60 dark:text-brand-400" },
  { icon: ShoppingBag, label: "Manage Services", labelAr: "إدارة الخدمات", href: "/admin/services", color: "text-blue-500 bg-blue-50 dark:bg-blue-950/60 dark:text-blue-400" },
  { icon: FileText, label: "Approvals", labelAr: "الموافقات", href: "/admin/approvals", color: "text-accent-500 bg-accent-50 dark:bg-accent-950/60 dark:text-accent-400" },
  { icon: BarChart3, label: "Reports", labelAr: "التقارير", href: "/admin/reports", color: "text-purple-500 bg-purple-50 dark:bg-purple-950/60 dark:text-purple-400" },
];

export function AdminDashboardPage() {
  const { locale, isRTL } = useLocale();

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={{ animate: { transition: { staggerChildren: 0.08 } } }}
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={fadeIn}>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          {locale === "ar" ? "لوحة تحكم المشرف" : "Admin Dashboard"}
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
          {locale === "ar" ? "نظرة عامة على المنصة" : "Platform overview"}
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div variants={fadeIn} className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {adminStats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.08 }}
          >
            <StatCard
              {...stat}
              value={locale === "ar" && "valueAr" in stat && stat.valueAr ? stat.valueAr : stat.value}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Charts */}
      <motion.div variants={fadeIn} className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm sm:text-base">
              {locale === "ar" ? "الإيرادات والمستخدمين" : "Revenue & Users"}
            </CardTitle>
            <Button variant="ghost" size="sm" className="h-8 text-xs">
              {locale === "ar" ? "عرض التقرير" : "View Report"}
              <ArrowRight className={cn("h-3.5 w-3.5 ms-1", isRTL && "rotate-180")} />
            </Button>
          </CardHeader>
          <CardContent className="pt-2">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-neutral-200 dark:stroke-neutral-800" />
                <XAxis dataKey="month" className="text-xs" tick={{ fill: "#737373", fontSize: 11 }} />
                <YAxis className="text-xs" tick={{ fill: "#737373", fontSize: 11 }} width={40} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--background, white)",
                    border: "1px solid var(--border, #e5e5e5)",
                    borderRadius: "12px",
                    fontSize: "13px",
                  }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} fill="url(#colorRevenue)" />
                <Area type="monotone" dataKey="users" stroke="#f97316" strokeWidth={2} fill="url(#colorUsers)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm sm:text-base">
              {locale === "ar" ? "توزيع الفئات" : "Service Categories"}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--background, white)",
                    border: "1px solid var(--border, #e5e5e5)",
                    borderRadius: "12px",
                    fontSize: "13px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-3 space-y-2">
              {categoryData.map((cat) => (
                <div key={cat.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                    <span className="text-neutral-600 dark:text-neutral-400 truncate">{cat.name}</span>
                  </div>
                  <span className="font-medium text-neutral-900 dark:text-neutral-100 shrink-0 ms-2">{cat.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Department Stats & Recent Activity */}
      <motion.div variants={fadeIn} className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Departments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm sm:text-base">
              {locale === "ar" ? "الأقسام" : "Departments"}
            </CardTitle>
            <Button variant="ghost" size="sm" className="h-8 text-xs">
              {locale === "ar" ? "عرض الكل" : "View All"}
            </Button>
          </CardHeader>
          <CardContent className="pt-2">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={departmentData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" className="stroke-neutral-200 dark:stroke-neutral-800" />
                <XAxis type="number" className="text-xs" tick={{ fill: "#737373", fontSize: 11 }} />
                <YAxis dataKey="name" type="category" className="text-xs" tick={{ fill: "#737373", fontSize: 11 }} width={80} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--background, white)",
                    border: "1px solid var(--border, #e5e5e5)",
                    borderRadius: "12px",
                    fontSize: "13px",
                  }}
                />
                <Bar dataKey="employees" fill="#10b981" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm sm:text-base">
              {locale === "ar" ? "النشاط الأخير" : "Recent Activity"}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="space-y-3">
              {recentActivity.map((activity, i) => (
                <div key={i} className="flex items-center gap-3 group">
                  <div className={cn("rounded-xl p-2 shrink-0 group-hover:scale-105 transition-transform", activity.color)}>
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                      {activity.user}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                      {activity.action}
                    </p>
                  </div>
                  <span className="text-xs text-neutral-400 dark:text-neutral-500 shrink-0">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={fadeIn}>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm sm:text-base">
              {locale === "ar" ? "إجراءات سريعة" : "Quick Actions"}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
              {quickActions.map((action) => (
                <Link
                  key={action.href}
                  to={action.href}
                  className="flex flex-col items-center gap-2.5 rounded-xl border border-neutral-200 p-4 transition-all hover:shadow-md hover:border-neutral-300 hover:scale-[1.02] dark:border-neutral-800 dark:hover:border-neutral-700 active:scale-[0.98]"
                >
                  <div className={cn("rounded-xl p-2.5", action.color)}>
                    <action.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300 text-center">
                    {locale === "ar" ? action.labelAr : action.label}
                  </span>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
