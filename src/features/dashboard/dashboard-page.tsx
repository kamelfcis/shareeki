import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { cn, formatPrice } from "@/utils";
import { useLocale } from "@/hooks";
import { StatCard } from "@/components/shared/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  mockStatCards,
  mockActivities,
  mockAnnouncements,
  mockEvents,
  mockServices,
  dashboardChartData,
  mockUser,
} from "@/mocks/data";
import {
  TrendingUp,
  Bell,
  ChevronRight,
  Wallet,
  ShoppingBag,
  FileText,
  Newspaper,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const fadeIn = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } },
};

export function DashboardPage() {
  const { locale, isRTL } = useLocale();
  const user = mockUser;

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={stagger}
      className="space-y-6 sm:space-y-8"
    >
      {/* Welcome Banner */}
      <motion.div
        variants={fadeIn}
        className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 p-5 sm:p-8 text-white shadow-xl shadow-brand-600/20"
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1.5 tracking-tight">
              {locale === "ar" ? `مرحباً، ${user.nameAr}` : `Welcome back, ${user.name.split(" ")[0]}`}
            </h1>
            <p className="text-white/75 text-sm md:text-base">
              {locale === "ar"
                ? `${user.positionAr} • ${user.departmentAr}`
                : `${user.position} • ${user.department}`}
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              <Button
                asChild
                variant="secondary"
                size="sm"
                className="bg-white/15 hover:bg-white/25 text-white border-0 backdrop-blur-sm rounded-xl"
              >
                <Link to="/services">
                  <ShoppingBag className="h-4 w-4" />
                  {locale === "ar" ? "تصفح الخدمات" : "Browse Services"}
                </Link>
              </Button>
              <Button
                asChild
                variant="secondary"
                size="sm"
                className="bg-white/15 hover:bg-white/25 text-white border-0 backdrop-blur-sm rounded-xl"
              >
                <Link to="/requests">
                  <FileText className="h-4 w-4" />
                  {locale === "ar" ? "تقديم طلب" : "Submit Request"}
                </Link>
              </Button>
            </div>
          </div>
          <div className="hidden md:block shrink-0">
            <div className="rounded-2xl bg-white/10 backdrop-blur-sm p-5 border border-white/10">
              <p className="text-sm text-white/60 mb-1">{locale === "ar" ? "رصيد المحفظة" : "Wallet Balance"}</p>
              <p className="text-3xl font-bold tracking-tight">{formatPrice(4850, locale)}</p>
              <p className="text-xs text-white/50 mt-1.5 flex items-center gap-1">
                <TrendingUp className="h-3.5 w-3.5" /> +12.5% {locale === "ar" ? "هذا الشهر" : "this month"}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={fadeIn} className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {mockStatCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.08 }}
          >
            <StatCard
              {...stat}
              value={stat.title === "Wallet Balance" ? formatPrice(4850, locale) : stat.value}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Section */}
      <motion.div variants={fadeIn} className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Spending Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm sm:text-base">
              {locale === "ar" ? "الإنفاق الشهري" : "Monthly Spending"}
            </CardTitle>
            <Button variant="ghost" size="sm" className="h-8 text-xs">
              {locale === "ar" ? "عرض الكل" : "View All"}{" "}
              <ChevronRight className={cn("h-3.5 w-3.5", isRTL && "rotate-180")} />
            </Button>
          </CardHeader>
          <CardContent className="pt-2">
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={dashboardChartData.services}>
                <defs>
                  <linearGradient id="colorSpent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
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
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    fontSize: "13px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#10b981"
                  strokeWidth={2}
                  fill="url(#colorSpent)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm sm:text-base">
              {locale === "ar" ? "توزيع الفئات" : "Category Breakdown"}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={dashboardChartData.categories}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {dashboardChartData.categories.map((entry, index) => (
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
              {dashboardChartData.categories.map((cat) => (
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

      {/* Recent Activity & Announcements */}
      <motion.div variants={fadeIn} className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm sm:text-base">
              {locale === "ar" ? "النشاط الأخير" : "Recent Activity"}
            </CardTitle>
            <Button variant="ghost" size="sm" className="h-8 text-xs">
              {locale === "ar" ? "عرض الكل" : "View All"}
            </Button>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="space-y-3.5">
              {mockActivities.slice(0, 5).map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 group">
                  <div className={cn(
                    "mt-0.5 rounded-xl p-2 shrink-0 transition-transform group-hover:scale-105",
                    activity.color
                  )}>
                    <Bell className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 leading-snug">
                      {locale === "ar" ? activity.titleAr : activity.title}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                      {locale === "ar" ? activity.descriptionAr : activity.description}
                    </p>
                  </div>
                  <span className="text-xs text-neutral-400 dark:text-neutral-500 whitespace-nowrap shrink-0">
                    {new Date(activity.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Announcements */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm sm:text-base">
              {locale === "ar" ? "الإعلانات" : "Announcements"}
            </CardTitle>
            <Button variant="ghost" size="sm" className="h-8 text-xs">
              {locale === "ar" ? "عرض الكل" : "View All"}
            </Button>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="space-y-3">
              {mockAnnouncements.map((ann) => (
                <div
                  key={ann.id}
                  className="group rounded-xl border border-neutral-200 p-3.5 transition-all hover:shadow-md hover:border-neutral-300 dark:border-neutral-800 dark:hover:border-neutral-700 cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Badge
                          variant={
                            ann.priority === "high"
                              ? "destructive"
                              : ann.priority === "medium"
                              ? "warning"
                              : "secondary"
                          }
                          className="text-[10px] px-1.5 py-0"
                        >
                          {ann.priority}
                        </Badge>
                      </div>
                      <h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 leading-snug">
                        {locale === "ar" ? ann.titleAr : ann.title}
                      </h4>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                        {locale === "ar" ? ann.contentAr : ann.content}
                      </p>
                      <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1.5">
                        {ann.publishedAt}
                      </p>
                    </div>
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 text-neutral-300 dark:text-neutral-600 shrink-0 group-hover:text-brand-500 transition-colors",
                        isRTL && "rotate-180"
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions & Upcoming Events */}
      <motion.div variants={fadeIn} className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm sm:text-base">
              {locale === "ar" ? "إجراءات سريعة" : "Quick Actions"}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="grid grid-cols-2 gap-2.5">
              {[
                {
                  icon: Wallet,
                  label: locale === "ar" ? "المحفظة" : "Wallet",
                  href: "/wallet",
                  color: "text-brand-600 bg-brand-50 dark:bg-brand-950/60 dark:text-brand-400",
                },
                {
                  icon: ShoppingBag,
                  label: locale === "ar" ? "الخدمات" : "Services",
                  href: "/services",
                  color: "text-blue-600 bg-blue-50 dark:bg-blue-950/60 dark:text-blue-400",
                },
                {
                  icon: FileText,
                  label: locale === "ar" ? "الطلبات" : "Requests",
                  href: "/requests",
                  color: "text-accent-600 bg-accent-50 dark:bg-accent-950/60 dark:text-accent-400",
                },
                {
                  icon: Newspaper,
                  label: locale === "ar" ? "الأخبار" : "News",
                  href: "/news",
                  color: "text-purple-600 bg-purple-50 dark:bg-purple-950/60 dark:text-purple-400",
                },
              ].map((action) => (
                <Link
                  key={action.href}
                  to={action.href}
                  className="flex flex-col items-center gap-2.5 rounded-xl border border-neutral-200 p-4 transition-all hover:shadow-md hover:border-neutral-300 hover:scale-[1.02] dark:border-neutral-800 dark:hover:border-neutral-700 active:scale-[0.98]"
                >
                  <div className={cn("rounded-xl p-2.5", action.color)}>
                    <action.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                    {action.label}
                  </span>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm sm:text-base">
              {locale === "ar" ? "الفعاليات القادمة" : "Upcoming Events"}
            </CardTitle>
            <Button variant="ghost" size="sm" className="h-8 text-xs">
              {locale === "ar" ? "عرض الكل" : "View All"}
            </Button>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="space-y-2.5">
              {mockEvents.map((event) => (
                <div
                  key={event.id}
                  className="group flex items-center gap-3 sm:gap-4 rounded-xl border border-neutral-200 p-3 transition-all hover:shadow-md hover:border-neutral-300 dark:border-neutral-800 dark:hover:border-neutral-700 cursor-pointer"
                >
                  <div className="flex h-12 w-12 sm:h-14 sm:w-14 flex-col items-center justify-center rounded-xl bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 shrink-0">
                    <span className="text-[10px] sm:text-xs font-medium leading-none">
                      {new Date(event.date).toLocaleDateString("en", { month: "short" })}
                    </span>
                    <span className="text-base sm:text-lg font-bold leading-none mt-0.5">
                      {new Date(event.date).getDate()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">
                      {locale === "ar" ? event.titleAr : event.title}
                    </h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                      {event.time} • {locale === "ar" ? event.locationAr : event.location}
                    </p>
                  </div>
                  <Badge variant="secondary" className="shrink-0 text-[10px] sm:text-xs">
                    {event.attendees} {locale === "ar" ? "حضور" : ""}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Featured Services */}
      <motion.div variants={fadeIn}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm sm:text-base">
              {locale === "ar" ? "خدمات مميزة" : "Featured Services"}
            </CardTitle>
            <Button asChild variant="ghost" size="sm" className="h-8 text-xs">
              <Link to="/services">
                {locale === "ar" ? "عرض الكل" : "View All"}{" "}
                <ChevronRight className={cn("h-3.5 w-3.5", isRTL && "rotate-180")} />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {mockServices
                .filter((s) => s.featured)
                .slice(0, 4)
                .map((service) => (
                  <div
                    key={service.id}
                    className="group rounded-2xl border border-neutral-200 overflow-hidden transition-all hover:shadow-lg hover:border-neutral-300 dark:border-neutral-800 dark:hover:border-neutral-700 cursor-pointer"
                  >
                    <div className="relative h-28 sm:h-32 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      {service.originalPrice && (
                        <Badge className="absolute top-2 start-2 bg-accent-500 text-white shadow-sm">
                          -{Math.round(((service.originalPrice - service.price) / service.originalPrice) * 100)}%
                        </Badge>
                      )}
                    </div>
                    <div className="p-3">
                      <h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 leading-snug">
                        {locale === "ar" ? service.nameAr : service.name}
                      </h4>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                        {locale === "ar" ? service.providerAr : service.provider}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-baseline gap-1">
                          <span className="text-sm font-bold text-brand-600 dark:text-brand-400">
                            {formatPrice(service.price, locale)}
                          </span>
                          {service.originalPrice && (
                            <span className="text-[11px] text-neutral-400 line-through">
                              {formatPrice(service.originalPrice, locale)}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-0.5 text-xs text-amber-500">
                          <span>★</span>
                          <span className="font-medium">{service.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
