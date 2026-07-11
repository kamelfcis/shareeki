import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { cn, formatPrice } from "@/utils";
import { useLocale, useAuth } from "@/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserAvatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { mockUser, mockBenefits, mockRequests, walletData } from "@/mocks/data";
import {
  Mail,
  Phone,
  Building2,
  Calendar,
  Edit,
  Share2,
  Download,
  Shield,
  FileText,
  Wallet,
  Gift,
  Star,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";

const fadeIn = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

export function EmployeeProfilePage() {
  const { locale, isRTL } = useLocale();
  const { user: authUser } = useAuth();
  const user = authUser || mockUser;

  const displayName = locale === "ar" && user.nameAr ? user.nameAr : user.name;
  const displayPosition = locale === "ar" && user.positionAr ? user.positionAr : user.position;
  const displayDepartment = locale === "ar" && user.departmentAr ? user.departmentAr : user.department;
  const displayCompany = locale === "ar" && user.companyAr ? user.companyAr : user.company;
  const activeBenefits = mockBenefits.filter((b) => !b.used).length;
  const statusLabel = user.status === "active"
    ? (locale === "ar" ? "نشط" : "Active")
    : (locale === "ar" ? "غير نشط" : "Inactive");

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={{ animate: { transition: { staggerChildren: 0.08 } } }}
      className="space-y-6"
    >
      {/* Profile Header */}
      <motion.div variants={fadeIn}>
        <Card className="overflow-hidden">
          <div className="relative h-28 sm:h-32 bg-gradient-to-r from-brand-600 via-brand-700 to-brand-800">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-white/10 blur-3xl" />
            </div>
          </div>
          <CardContent className="relative px-4 sm:px-6 pb-5 sm:pb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3 sm:gap-4 -mt-10 sm:-mt-12">
              <UserAvatar
                src={user.avatar}
                name={displayName}
                size="xl"
                className="ring-4 ring-white dark:ring-neutral-900 shadow-lg"
              />
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4">
                  <div className="min-w-0">
                    <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 truncate">
                      {displayName}
                    </h1>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      {displayPosition} • {displayDepartment}
                    </p>
                  </div>
                   <div className="flex gap-2 shrink-0">
                    <Button variant="outline" size="sm" className="rounded-xl" onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success(locale === "ar" ? "تم نسخ رابط الملف الشخصي" : "Profile link copied"); }}>
                      <Share2 className="h-4 w-4 me-1.5" />
                      {locale === "ar" ? "مشاركة" : "Share"}
                    </Button>
                    <Button asChild size="sm" className="rounded-xl">
                      <Link to="/settings">
                        <Edit className="h-4 w-4 me-1.5" />
                        {locale === "ar" ? "تعديل" : "Edit"}
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                  <span className="flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{user.email}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 shrink-0" />
                    {user.phone}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5 shrink-0" />
                    {displayCompany}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 shrink-0" />
                    {locale === "ar" ? `انضم ${user.joinDate}` : `Joined ${user.joinDate}`}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Stats */}
      <motion.div variants={fadeIn} className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { icon: Wallet, label: locale === "ar" ? "الرصيد" : "Balance", value: formatPrice(walletData.balance, locale), href: "/wallet", color: "text-brand-600 bg-brand-50 dark:bg-brand-950/60 dark:text-brand-400" },
          { icon: Star, label: locale === "ar" ? "النقاط" : "Points", value: walletData.pendingRewards.toLocaleString(locale === "ar" ? "ar-EG" : "en-US"), href: "/wallet", color: "text-yellow-600 bg-yellow-50 dark:bg-yellow-950/60 dark:text-yellow-400" },
          { icon: Gift, label: locale === "ar" ? "المزايا" : "Benefits", value: String(activeBenefits), href: undefined, color: "text-accent-600 bg-accent-50 dark:bg-accent-950/60 dark:text-accent-400" },
          { icon: FileText, label: locale === "ar" ? "الطلبات" : "Requests", value: String(mockRequests.length), href: "/requests", color: "text-blue-600 bg-blue-50 dark:bg-blue-950/60 dark:text-blue-400" },
        ].map((stat) => {
          const content = (
            <CardContent className="p-4 text-center">
              <div className={cn("inline-flex rounded-xl p-2 mb-2", stat.color)}>
                <stat.icon className="h-5 w-5" />
              </div>
              <p className="text-xl font-bold text-neutral-900 dark:text-neutral-100">{stat.value}</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">{stat.label}</p>
            </CardContent>
          );

          return stat.href ? (
            <Link key={stat.label} to={stat.href}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">{content}</Card>
            </Link>
          ) : (
            <Card key={stat.label} className="hover:shadow-md transition-shadow h-full">{content}</Card>
          );
        })}
      </motion.div>

      {/* Content */}
      <motion.div variants={fadeIn}>
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">{locale === "ar" ? "نظرة عامة" : "Overview"}</TabsTrigger>
            <TabsTrigger value="benefits">{locale === "ar" ? "المزايا" : "Benefits"}</TabsTrigger>
            <TabsTrigger value="history">{locale === "ar" ? "السجل" : "History"}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Personal Info */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm sm:text-base">
                    {locale === "ar" ? "المعلومات الشخصية" : "Personal Information"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-0">
                  {[
                    { label: locale === "ar" ? "رقم الموظف" : "Employee ID", value: user.employeeId, isStatus: false },
                    { label: locale === "ar" ? "القسم" : "Department", value: displayDepartment, isStatus: false },
                    { label: locale === "ar" ? "المنصب" : "Position", value: displayPosition, isStatus: false },
                    { label: locale === "ar" ? "الشركة" : "Company", value: displayCompany, isStatus: false },
                    { label: locale === "ar" ? "الهاتف" : "Phone", value: user.phone, isStatus: false },
                    { label: locale === "ar" ? "البريد" : "Email", value: user.email, isStatus: false },
                    { label: locale === "ar" ? "تاريخ الانضمام" : "Join Date", value: user.joinDate, isStatus: false },
                    { label: locale === "ar" ? "الحالة" : "Status", value: statusLabel, isStatus: true },
                  ].map((item, i, arr) => (
                    <div key={item.label}>
                      <div className="flex items-center justify-between py-2.5">
                        <span className="text-sm text-neutral-500 dark:text-neutral-400">{item.label}</span>
                        <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100 text-end">
                          {item.isStatus ? (
                            <Badge variant="success" className="text-[10px]">{item.value}</Badge>
                          ) : (
                            <span className="truncate max-w-[180px]">{item.value}</span>
                          )}
                        </span>
                      </div>
                      {i < arr.length - 1 && <Separator />}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Digital ID Card */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm sm:text-base">
                    {locale === "ar" ? "البطاقة الشخصية الرقمية" : "Digital ID Card"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-5 sm:p-6 text-white shadow-xl shadow-brand-600/20">
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/20 blur-2xl" />
                      <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-white/20 blur-2xl" />
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-5">
                        <div>
                          <p className="text-white/50 text-[11px]">{locale === "ar" ? "شريكي" : "Shareky"}</p>
                          <p className="text-sm font-bold">{displayCompany}</p>
                        </div>
                        <Shield className="h-6 w-6 text-white/50" />
                      </div>
                      <div className="flex items-center gap-3 sm:gap-4 mb-5">
                        <UserAvatar src={user.avatar} name={displayName} size="lg" className="ring-2 ring-white/30" />
                        <div className="min-w-0">
                          <h3 className="font-bold text-base sm:text-lg truncate">{displayName}</h3>
                          <p className="text-sm text-white/70 truncate">{displayPosition}</p>
                          <p className="text-xs text-white/45 mt-0.5">{user.employeeId}</p>
                        </div>
                      </div>
                      <Separator className="bg-white/15 mb-4" />
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <p className="text-white/45">{locale === "ar" ? "القسم" : "Department"}</p>
                          <p className="font-medium mt-0.5">{displayDepartment}</p>
                        </div>
                        <div>
                          <p className="text-white/45">{locale === "ar" ? "الهاتف" : "Phone"}</p>
                          <p className="font-medium mt-0.5">{user.phone}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                   <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1 rounded-xl" onClick={() => toast.success(locale === "ar" ? "جاري تحميل البطاقة..." : "Downloading ID card...")}>
                      <Download className="h-4 w-4 me-1.5" />
                      {locale === "ar" ? "تحميل" : "Download"}
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 rounded-xl" onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success(locale === "ar" ? "تم نسخ الرابط" : "Link copied"); }}>
                      <Share2 className="h-4 w-4 me-1.5" />
                      {locale === "ar" ? "مشاركة" : "Share"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="benefits" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {mockBenefits.map((benefit) => (
                <Card key={benefit.id} className="hover:shadow-md transition-all cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className={cn(
                        "rounded-xl p-2",
                        benefit.type === "discount" ? "bg-accent-50 text-accent-600 dark:bg-accent-950/60 dark:text-accent-400" :
                        benefit.type === "points" ? "bg-yellow-50 text-yellow-600 dark:bg-yellow-950/60 dark:text-yellow-400" :
                        "bg-brand-50 text-brand-600 dark:bg-brand-950/60 dark:text-brand-400"
                      )}>
                        <Gift className="h-5 w-5" />
                      </div>
                      {benefit.used ? (
                        <Badge variant="secondary" className="text-[10px]">
                          {locale === "ar" ? "مستخدم" : "Used"}
                        </Badge>
                      ) : (
                        <Badge variant="success" className="text-[10px]">
                          {locale === "ar" ? "نشط" : "Active"}
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-semibold text-sm text-neutral-900 dark:text-neutral-100 mb-1">
                      {locale === "ar" ? benefit.titleAr : benefit.title}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 mb-3 leading-relaxed">
                      {locale === "ar" ? benefit.descriptionAr : benefit.description}
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-400 dark:text-neutral-500">
                        {locale === "ar" ? "ينتهي" : "Expires"}: {benefit.expiresAt}
                      </span>
                      {benefit.value > 0 && (
                        <span className="font-bold text-brand-600 dark:text-brand-400">
                          {benefit.type === "points" ? `${benefit.value} pts` :
                           benefit.type === "discount" ? `${benefit.value}% off` :
                           formatPrice(benefit.value, locale)}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-2">
                  {mockRequests.slice(0, 5).map((req) => (
                    <div key={req.id} className="flex items-center gap-3 sm:gap-4 p-3 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors cursor-pointer group">
                      <div className={cn(
                        "rounded-xl p-2 shrink-0",
                        req.status === "approved" ? "bg-green-100 text-green-600 dark:bg-green-950/60 dark:text-green-400" :
                        req.status === "pending" ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-950/60 dark:text-yellow-400" :
                        "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
                      )}>
                        <FileText className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">
                          {locale === "ar" ? req.titleAr : req.title}
                        </p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">{req.submittedAt}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Badge variant={
                          req.status === "approved" ? "success" :
                          req.status === "pending" ? "warning" :
                          req.status === "rejected" ? "destructive" : "secondary"
                        } className="text-[10px]">
                          {locale === "ar" ? (
                            req.status === "approved" ? "موافق" :
                            req.status === "pending" ? "قيد الانتظار" :
                            req.status === "rejected" ? "مرفوض" : req.status
                          ) : req.status}
                        </Badge>
                        <ChevronRight className={cn(
                          "h-4 w-4 text-neutral-300 dark:text-neutral-600 group-hover:text-brand-500 transition-colors",
                          isRTL && "rotate-180"
                        )} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}
