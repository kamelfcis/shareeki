import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/utils";
import { useLocale, useTheme, useAuth } from "@/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserAvatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { mockUser } from "@/mocks/data";
import {
  User,
  Lock,
  Shield,
  Globe,
  Moon,
  Bell,
  Smartphone,
  Key,
  Camera,
  Save,
  Check,
  Eye,
} from "lucide-react";
import { toast } from "sonner";

const fadeIn = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

const SETTINGS_TABS = [
  "profile",
  "password",
  "security",
  "language",
  "theme",
  "notifications",
  "privacy",
  "devices",
] as const;

type SettingsTab = (typeof SETTINGS_TABS)[number];

const TAB_CONFIG: { value: SettingsTab; icon: typeof User; label: string; labelAr: string }[] = [
  { value: "profile", icon: User, label: "Profile", labelAr: "الملف الشخصي" },
  { value: "password", icon: Lock, label: "Password", labelAr: "كلمة المرور" },
  { value: "security", icon: Shield, label: "Security", labelAr: "الأمان" },
  { value: "language", icon: Globe, label: "Language", labelAr: "اللغة" },
  { value: "theme", icon: Moon, label: "Theme", labelAr: "المظهر" },
  { value: "notifications", icon: Bell, label: "Notifications", labelAr: "الإشعارات" },
  { value: "privacy", icon: Eye, label: "Privacy", labelAr: "الخصوصية" },
  { value: "devices", icon: Smartphone, label: "Devices", labelAr: "الأجهزة" },
];

function isValidTab(tab?: string): tab is SettingsTab {
  return SETTINGS_TABS.includes(tab as SettingsTab);
}

export function SettingsPage() {
  const { locale, setLocale } = useLocale();
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();
  const { tab: tabParam } = useParams<{ tab?: string }>();
  const navigate = useNavigate();

  const userData = user || mockUser;
  const displayName = locale === "ar" && userData.nameAr ? userData.nameAr : userData.name;
  const displayDepartment = locale === "ar" && userData.departmentAr ? userData.departmentAr : userData.department;
  const displayPosition = locale === "ar" && userData.positionAr ? userData.positionAr : userData.position;

  const activeTab: SettingsTab = isValidTab(tabParam) ? tabParam : "profile";

  const [profileName, setProfileName] = useState(displayName);
  const [profileEmail, setProfileEmail] = useState(userData.email);
  const [profilePhone, setProfilePhone] = useState(userData.phone);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false,
    requests: true,
    benefits: true,
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showEmail: false,
    showPhone: false,
    activityStatus: true,
    analytics: true,
  });

  const [devices, setDevices] = useState([
    { id: "dev_1", name: "MacBook Pro", location: locale === "ar" ? "القاهرة، مصر" : "Cairo, Egypt", lastActive: locale === "ar" ? "نشط الآن" : "Active now", current: true },
    { id: "dev_2", name: "iPhone 15", location: locale === "ar" ? "القاهرة، مصر" : "Cairo, Egypt", lastActive: locale === "ar" ? "منذ ساعتين" : "2 hours ago", current: false },
    { id: "dev_3", name: "Windows PC", location: locale === "ar" ? "الإسكندرية، مصر" : "Alexandria, Egypt", lastActive: locale === "ar" ? "منذ 3 أيام" : "3 days ago", current: false },
  ]);

  useEffect(() => {
    setProfileName(displayName);
    setProfileEmail(userData.email);
    setProfilePhone(userData.phone);
  }, [displayName, userData.email, userData.phone]);

  useEffect(() => {
    if (tabParam && !isValidTab(tabParam)) {
      navigate("/settings", { replace: true });
    }
  }, [tabParam, navigate]);

  const handleTabChange = (value: string) => {
    if (!isValidTab(value)) return;
    navigate(value === "profile" ? "/settings" : `/settings/${value}`);
  };

  const handleRemoveDevice = (deviceId: string, deviceName: string) => {
    setDevices((prev) => prev.filter((d) => d.id !== deviceId));
    toast.success(
      locale === "ar" ? `تم إزالة ${deviceName}` : `${deviceName} removed`
    );
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
      className="page-container"
    >
      <motion.div variants={fadeIn}>
        <h1 className="page-title">
          {locale === "ar" ? "الإعدادات" : "Settings"}
        </h1>
        <p className="page-description mt-1">
          {locale === "ar" ? "إدارة حسابك وتفضيلاتك" : "Manage your account and preferences"}
        </p>
      </motion.div>

      <motion.div variants={fadeIn}>
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-64 shrink-0">
              <TabsList className="flex lg:flex-col w-full justify-start h-auto p-1 bg-transparent overflow-x-auto scrollbar-none">
                {TAB_CONFIG.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="justify-start w-full mb-1"
                  >
                    <tab.icon className="h-4 w-4 me-2" />
                    {locale === "ar" ? tab.labelAr : tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <div className="flex-1">
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      {locale === "ar" ? "المعلومات الشخصية" : "Personal Information"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <UserAvatar src={userData.avatar} name={displayName} size="xl" />
                      <div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const input = document.createElement("input");
                            input.type = "file";
                            input.accept = "image/*";
                            input.onchange = () =>
                              toast.success(locale === "ar" ? "تم تحديث الصورة" : "Photo updated");
                            input.click();
                          }}
                        >
                          <Camera className="h-4 w-4 me-2" />
                          {locale === "ar" ? "تغيير الصورة" : "Change Photo"}
                        </Button>
                        <p className="text-xs text-muted-foreground mt-2">
                          JPG, PNG {locale === "ar" ? "بحد أقصى 2 ميجا" : "max 2MB"}
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <div className="form-grid">
                      <Input
                        label={locale === "ar" ? "الاسم" : "Name"}
                        value={profileName}
                        onChange={(e) => setProfileName(e.target.value)}
                      />
                      <Input
                        label={locale === "ar" ? "البريد الإلكتروني" : "Email"}
                        value={profileEmail}
                        onChange={(e) => setProfileEmail(e.target.value)}
                        type="email"
                      />
                      <Input
                        label={locale === "ar" ? "الهاتف" : "Phone"}
                        value={profilePhone}
                        onChange={(e) => setProfilePhone(e.target.value)}
                      />
                      <Input
                        label={locale === "ar" ? "رقم الموظف" : "Employee ID"}
                        defaultValue={userData.employeeId}
                        disabled
                      />
                      <Input
                        label={locale === "ar" ? "القسم" : "Department"}
                        defaultValue={displayDepartment}
                        disabled
                      />
                      <Input
                        label={locale === "ar" ? "المنصب" : "Position"}
                        defaultValue={displayPosition}
                        disabled
                      />
                    </div>

                    <div className="action-row">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setProfileName(displayName);
                          setProfileEmail(userData.email);
                          setProfilePhone(userData.phone);
                          toast.info(locale === "ar" ? "تم الإلغاء" : "Changes discarded");
                        }}
                      >
                        {locale === "ar" ? "إلغاء" : "Cancel"}
                      </Button>
                      <Button
                        onClick={() =>
                          toast.success(locale === "ar" ? "تم الحفظ" : "Changes saved")
                        }
                      >
                        <Save className="h-4 w-4 me-2" />
                        {locale === "ar" ? "حفظ" : "Save Changes"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="password">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      {locale === "ar" ? "تغيير كلمة المرور" : "Change Password"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input
                      type="password"
                      label={locale === "ar" ? "كلمة المرور الحالية" : "Current Password"}
                      placeholder="••••••••"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <Input
                      type="password"
                      label={locale === "ar" ? "كلمة المرور الجديدة" : "New Password"}
                      placeholder="••••••••"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <Input
                      type="password"
                      label={locale === "ar" ? "تأكيد كلمة المرور" : "Confirm Password"}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <div className="action-row">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setCurrentPassword("");
                          setNewPassword("");
                          setConfirmPassword("");
                          toast.info(locale === "ar" ? "تم الإلغاء" : "Changes discarded");
                        }}
                      >
                        {locale === "ar" ? "إلغاء" : "Cancel"}
                      </Button>
                      <Button
                        onClick={() => {
                          if (!currentPassword || !newPassword || !confirmPassword) {
                            toast.error(locale === "ar" ? "املأ جميع الحقول" : "Fill all fields");
                            return;
                          }
                          if (newPassword !== confirmPassword) {
                            toast.error(
                              locale === "ar"
                                ? "كلمتا المرور غير متطابقتين"
                                : "Passwords don't match"
                            );
                            return;
                          }
                          toast.success(
                            locale === "ar" ? "تم تحديث كلمة المرور" : "Password updated"
                          );
                          setCurrentPassword("");
                          setNewPassword("");
                          setConfirmPassword("");
                        }}
                      >
                        <Lock className="h-4 w-4 me-2" />
                        {locale === "ar" ? "تحديث" : "Update Password"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="language">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      {locale === "ar" ? "اللغة والمنطقة" : "Language & Region"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        {locale === "ar" ? "اللغة" : "Language"}
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => setLocale("en")}
                          className={cn(
                            "flex items-center gap-3 rounded-xl border-2 p-4 transition-all",
                            locale === "en"
                              ? "border-brand-500 bg-brand-50 dark:bg-brand-950"
                              : "border-border hover:border-neutral-300 dark:border-neutral-800"
                          )}
                        >
                          <span className="text-2xl">🇬🇧</span>
                          <div className="text-start">
                            <p className="font-medium">English</p>
                            <p className="text-xs text-muted-foreground">LTR</p>
                          </div>
                          {locale === "en" && <Check className="h-5 w-5 text-brand-500 ms-auto" />}
                        </button>
                        <button
                          onClick={() => setLocale("ar")}
                          className={cn(
                            "flex items-center gap-3 rounded-xl border-2 p-4 transition-all",
                            locale === "ar"
                              ? "border-brand-500 bg-brand-50 dark:bg-brand-950"
                              : "border-border hover:border-neutral-300 dark:border-neutral-800"
                          )}
                        >
                          <span className="text-2xl">🇸🇦</span>
                          <div className="text-start">
                            <p className="font-medium">العربية</p>
                            <p className="text-xs text-muted-foreground">RTL</p>
                          </div>
                          {locale === "ar" && <Check className="h-5 w-5 text-brand-500 ms-auto" />}
                        </button>
                      </div>
                    </div>
                    <div className="rounded-xl border border-border p-4 dark:border-neutral-800">
                      <p className="text-sm font-medium text-foreground">
                        {locale === "ar" ? "المنطقة الزمنية" : "Time Zone"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {locale === "ar" ? "توقيت القاهرة (UTC+2)" : "Cairo Time (UTC+2)"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="theme">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      {locale === "ar" ? "المظهر" : "Appearance"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {(["light", "dark", "system"] as const).map((themeOption) => (
                        <button
                          key={themeOption}
                          onClick={() => setTheme(themeOption)}
                          className={cn(
                            "flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all min-h-[44px]",
                            theme === themeOption
                              ? "border-brand-500 bg-brand-50 dark:bg-brand-950"
                              : "border-border hover:border-neutral-300 dark:hover:border-neutral-700"
                          )}
                        >
                          <div
                            className={cn(
                              "h-12 w-16 rounded-lg border",
                              themeOption === "light" && "bg-card border-border",
                              themeOption === "dark" && "bg-neutral-900 border-neutral-700",
                              themeOption === "system" &&
                                "bg-gradient-to-r from-white to-neutral-900 border-neutral-300"
                            )}
                          />
                          <span className="text-sm font-medium capitalize">
                            {locale === "ar"
                              ? themeOption === "light"
                                ? "فاتح"
                                : themeOption === "dark"
                                  ? "داكن"
                                  : "النظام"
                              : themeOption}
                          </span>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      {locale === "ar" ? "الأمان" : "Security"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between rounded-xl border border-border p-4 dark:border-neutral-800">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-brand-50 p-2 dark:bg-brand-950/60">
                          <Key className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {locale === "ar" ? "المصادقة الثنائية" : "Two-Factor Authentication"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {locale === "ar"
                              ? "أضف طبقة أمان إضافية"
                              : "Add an extra layer of security"}
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={twoFactorEnabled}
                        onCheckedChange={(checked) => {
                          setTwoFactorEnabled(checked);
                          toast.success(
                            checked
                              ? locale === "ar"
                                ? "تم تفعيل المصادقة الثنائية"
                                : "2FA enabled"
                              : locale === "ar"
                                ? "تم إيقاف المصادقة الثنائية"
                                : "2FA disabled"
                          );
                        }}
                        aria-label={
                          locale === "ar" ? "المصادقة الثنائية" : "Two-Factor Authentication"
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between rounded-xl border border-border p-4 dark:border-neutral-800">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-red-50 p-2 dark:bg-red-950/60">
                          <Smartphone className="h-5 w-5 text-red-600 dark:text-red-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {locale === "ar" ? "الجلسات النشطة" : "Active Sessions"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {locale === "ar"
                              ? `${devices.length} أجهزة مسجلة الدخول`
                              : `${devices.length} devices logged in`}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-600 rounded-xl"
                        onClick={() => {
                          setDevices((prev) => prev.filter((d) => d.current));
                          toast.success(
                            locale === "ar"
                              ? "تم تسجيل الخروج من جميع الأجهزة"
                              : "Signed out from all devices"
                          );
                        }}
                      >
                        {locale === "ar" ? "تسجيل الخروج من الكل" : "Sign out all"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      {locale === "ar" ? "إعدادات الإشعارات" : "Notification Settings"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      {
                        key: "email" as const,
                        labelAr: "إشعارات البريد الإلكتروني",
                        label: "Email Notifications",
                        descAr: "استلام تحديثات عبر البريد",
                        desc: "Receive email updates",
                      },
                      {
                        key: "push" as const,
                        labelAr: "إشعارات الدفع",
                        label: "Push Notifications",
                        descAr: "استلام إشعارات فورية",
                        desc: "Receive push notifications",
                      },
                      {
                        key: "sms" as const,
                        labelAr: "إشعارات SMS",
                        label: "SMS Notifications",
                        descAr: "استلام تحديثات عبر الرسائل",
                        desc: "Receive SMS updates",
                      },
                      {
                        key: "requests" as const,
                        labelAr: "تحديثات الطلبات",
                        label: "Request Updates",
                        descAr: "إشعارات حالة طلباتك",
                        desc: "Status updates for your requests",
                      },
                      {
                        key: "benefits" as const,
                        labelAr: "تحديثات المزايا",
                        label: "Benefits Updates",
                        descAr: "إشعارات المزايا والعروض",
                        desc: "Benefits and offers notifications",
                      },
                      {
                        key: "marketing" as const,
                        labelAr: "رسائل التسويق",
                        label: "Marketing Emails",
                        descAr: "استلام رسائل تسويقية",
                        desc: "Receive marketing emails",
                      },
                    ].map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center justify-between rounded-xl border border-border p-4 dark:border-neutral-800"
                      >
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {locale === "ar" ? item.labelAr : item.label}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {locale === "ar" ? item.descAr : item.desc}
                          </p>
                        </div>
                        <Switch
                          checked={notifications[item.key]}
                          onCheckedChange={(checked) =>
                            setNotifications((prev) => ({ ...prev, [item.key]: checked }))
                          }
                          aria-label={locale === "ar" ? item.labelAr : item.label}
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="privacy">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      {locale === "ar" ? "إعدادات الخصوصية" : "Privacy Settings"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      {
                        key: "profileVisible" as const,
                        labelAr: "الملف الشخصي مرئي",
                        label: "Profile Visible",
                        descAr: "السماح للموظفين برؤية ملفك في الدليل",
                        desc: "Allow employees to see your profile in directory",
                      },
                      {
                        key: "showEmail" as const,
                        labelAr: "إظهار البريد الإلكتروني",
                        label: "Show Email",
                        descAr: "عرض بريدك في الملف الشخصي",
                        desc: "Display your email on profile",
                      },
                      {
                        key: "showPhone" as const,
                        labelAr: "إظهار رقم الهاتف",
                        label: "Show Phone",
                        descAr: "عرض رقم هاتفك في الملف الشخصي",
                        desc: "Display your phone on profile",
                      },
                      {
                        key: "activityStatus" as const,
                        labelAr: "حالة النشاط",
                        label: "Activity Status",
                        descAr: "إظهار متى كنت نشطاً آخر مرة",
                        desc: "Show when you were last active",
                      },
                      {
                        key: "analytics" as const,
                        labelAr: "تحليلات الاستخدام",
                        label: "Usage Analytics",
                        descAr: "المساعدة في تحسين المنصة",
                        desc: "Help improve the platform",
                      },
                    ].map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center justify-between rounded-xl border border-border p-4 dark:border-neutral-800"
                      >
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {locale === "ar" ? item.labelAr : item.label}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {locale === "ar" ? item.descAr : item.desc}
                          </p>
                        </div>
                        <Switch
                          checked={privacy[item.key]}
                          onCheckedChange={(checked) =>
                            setPrivacy((prev) => ({ ...prev, [item.key]: checked }))
                          }
                          aria-label={locale === "ar" ? item.labelAr : item.label}
                        />
                      </div>
                    ))}
                    <div className="flex justify-end pt-2">
                      <Button
                        onClick={() =>
                          toast.success(
                            locale === "ar"
                              ? "تم حفظ إعدادات الخصوصية"
                              : "Privacy settings saved"
                          )
                        }
                      >
                        <Save className="h-4 w-4 me-2" />
                        {locale === "ar" ? "حفظ" : "Save"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="devices">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      {locale === "ar" ? "الأجهزة" : "Devices"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2.5">
                    {devices.map((device) => (
                      <div
                        key={device.id}
                        className="flex items-center justify-between rounded-xl border border-border p-4 dark:border-neutral-800"
                      >
                        <div className="flex items-center gap-3">
                          <div className="rounded-lg bg-neutral-100 p-2 dark:bg-neutral-800">
                            <Smartphone className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium text-foreground">
                                {device.name}
                              </p>
                              {device.current && (
                                <Badge variant="success" className="text-[10px]">
                                  {locale === "ar" ? "الحالية" : "Current"}
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {device.location} • {device.lastActive}
                            </p>
                          </div>
                        </div>
                        {!device.current && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-600 rounded-xl"
                            onClick={() => handleRemoveDevice(device.id, device.name)}
                          >
                            {locale === "ar" ? "إزالة" : "Remove"}
                          </Button>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}
