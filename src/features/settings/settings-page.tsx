import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils";
import { useLocale, useTheme, useAuth } from "@/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
} from "lucide-react";
import { toast } from "sonner";

const fadeIn = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

export function SettingsPage() {
  const { locale, isRTL, setLocale } = useLocale();
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false,
  });

  const [profileName, setProfileName] = useState(userData.name);
  const [profileEmail, setProfileEmail] = useState(userData.email);
  const [profilePhone, setProfilePhone] = useState(userData.phone);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userData = user || mockUser;

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={fadeIn}>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          {locale === "ar" ? "الإعدادات" : "Settings"}
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
          {locale === "ar" ? "إدارة حسابك وتفضيلاتك" : "Manage your account and preferences"}
        </p>
      </motion.div>

      <motion.div variants={fadeIn}>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <div className="lg:w-64 shrink-0">
              <TabsList className="flex lg:flex-col w-full justify-start h-auto p-1 bg-transparent overflow-x-auto">
                {[
                  { value: "profile", icon: User, label: "Profile" },
                  { value: "password", icon: Lock, label: "Password" },
                  { value: "security", icon: Shield, label: "Security" },
                  { value: "language", icon: Globe, label: "Language" },
                  { value: "theme", icon: Moon, label: "Theme" },
                  { value: "notifications", icon: Bell, label: "Notifications" },
                  { value: "devices", icon: Smartphone, label: "Devices" },
                ].map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="justify-start w-full mb-1"
                  >
                    <tab.icon className="h-4 w-4 me-2" />
                    {locale === "ar" ? (
                      tab.label === "Profile" ? "الملف الشخصي" :
                      tab.label === "Password" ? "كلمة المرور" :
                      tab.label === "Security" ? "الأمان" :
                      tab.label === "Language" ? "اللغة" :
                      tab.label === "Theme" ? "المظهر" :
                      tab.label === "Notifications" ? "الإشعارات" :
                      "الأجهزة"
                    ) : tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* Content */}
            <div className="flex-1">
              {/* Profile Tab */}
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      {locale === "ar" ? "المعلومات الشخصية" : "Personal Information"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-4">
                      <UserAvatar src={userData.avatar} name={userData.name} size="xl" />
                      <div>
                        <Button variant="outline" size="sm" onClick={() => { const input = document.createElement("input"); input.type = "file"; input.accept = "image/*"; input.onchange = () => toast.success(locale === "ar" ? "تم تحديث الصورة" : "Photo updated"); input.click(); }}>
                          <Camera className="h-4 w-4 me-2" />
                          {locale === "ar" ? "تغيير الصورة" : "Change Photo"}
                        </Button>
                        <p className="text-xs text-neutral-500 mt-2">
                          JPG, PNG {locale === "ar" ? "بحد أقصى 2 ميجا" : "max 2MB"}
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        defaultValue={userData.department}
                        disabled
                      />
                      <Input
                        label={locale === "ar" ? "المنصب" : "Position"}
                        defaultValue={userData.position}
                        disabled
                      />
                    </div>

                    <div className="flex justify-end gap-3">
                      <Button variant="outline" onClick={() => toast.info(locale === "ar" ? "تم الإلغاء" : "Changes discarded")}>{locale === "ar" ? "إلغاء" : "Cancel"}</Button>
                      <Button onClick={() => toast.success(locale === "ar" ? "تم الحفظ" : "Changes saved")}>
                        <Save className="h-4 w-4 me-2" />
                        {locale === "ar" ? "حفظ" : "Save Changes"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Password Tab */}
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
                    <div className="flex justify-end gap-3">
                      <Button variant="outline" onClick={() => { setCurrentPassword(""); setNewPassword(""); setConfirmPassword(""); toast.info(locale === "ar" ? "تم الإلغاء" : "Changes discarded"); }}>{locale === "ar" ? "إلغاء" : "Cancel"}</Button>
                      <Button onClick={() => {
                        if (!currentPassword || !newPassword || !confirmPassword) { toast.error(locale === "ar" ? "املأ جميع الحقول" : "Fill all fields"); return; }
                        if (newPassword !== confirmPassword) { toast.error(locale === "ar" ? "كلمتا المرور غير متطابقتين" : "Passwords don't match"); return; }
                        toast.success(locale === "ar" ? "تم تحديث كلمة المرور" : "Password updated");
                        setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
                      }}>
                        <Lock className="h-4 w-4 me-2" />
                        {locale === "ar" ? "تحديث" : "Update Password"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Language Tab */}
              <TabsContent value="language">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      {locale === "ar" ? "اللغة والمنطقة" : "Language & Region"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        {locale === "ar" ? "اللغة" : "Language"}
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => setLocale("en")}
                          className={cn(
                            "flex items-center gap-3 rounded-xl border-2 p-4 transition-all",
                            locale === "en" ? "border-brand-500 bg-brand-50 dark:bg-brand-950" : "border-neutral-200 hover:border-neutral-300 dark:border-neutral-800"
                          )}
                        >
                          <span className="text-2xl">🇬🇧</span>
                          <div className="text-left">
                            <p className="font-medium">English</p>
                            <p className="text-xs text-neutral-500">LTR</p>
                          </div>
                          {locale === "en" && <Check className="h-5 w-5 text-brand-500 ms-auto" />}
                        </button>
                        <button
                          onClick={() => setLocale("ar")}
                          className={cn(
                            "flex items-center gap-3 rounded-xl border-2 p-4 transition-all",
                            locale === "ar" ? "border-brand-500 bg-brand-50 dark:bg-brand-950" : "border-neutral-200 hover:border-neutral-300 dark:border-neutral-800"
                          )}
                        >
                          <span className="text-2xl">🇸🇦</span>
                          <div className="text-right">
                            <p className="font-medium">العربية</p>
                            <p className="text-xs text-neutral-500">RTL</p>
                          </div>
                          {locale === "ar" && <Check className="h-5 w-5 text-brand-500 ms-auto" />}
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Theme Tab */}
              <TabsContent value="theme">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      {locale === "ar" ? "المظهر" : "Appearance"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-3">
                      {(["light", "dark", "system"] as const).map((t) => (
                        <button
                          key={t}
                          onClick={() => setTheme(t)}
                          className={cn(
                            "flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all",
                            theme === t ? "border-brand-500 bg-brand-50 dark:bg-brand-950" : "border-neutral-200 hover:border-neutral-300 dark:border-neutral-800"
                          )}
                        >
                          <div className={cn(
                            "h-12 w-16 rounded-lg border",
                            t === "light" && "bg-white border-neutral-200",
                            t === "dark" && "bg-neutral-900 border-neutral-700",
                            t === "system" && "bg-gradient-to-r from-white to-neutral-900 border-neutral-300"
                          )} />
                          <span className="text-sm font-medium capitalize">
                            {locale === "ar" ? (
                              t === "light" ? "فاتح" : t === "dark" ? "داكن" : "النظام"
                            ) : t}
                          </span>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      {locale === "ar" ? "الأمان" : "Security"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between rounded-xl border border-neutral-200 p-4 dark:border-neutral-800">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-brand-50 p-2 dark:bg-brand-950/60">
                          <Key className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                            {locale === "ar" ? "المصادقة الثنائية" : "Two-Factor Authentication"}
                          </p>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400">
                            {locale === "ar" ? "أضف طبقة أمان إضافية" : "Add an extra layer of security"}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="rounded-xl" onClick={() => toast.success(locale === "ar" ? "تم تفعيل المصادقة الثنائية" : "2FA enabled")}>
                        {locale === "ar" ? "تفعيل" : "Enable"}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between rounded-xl border border-neutral-200 p-4 dark:border-neutral-800">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-red-50 p-2 dark:bg-red-950/60">
                          <Smartphone className="h-5 w-5 text-red-600 dark:text-red-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                            {locale === "ar" ? "الجلسات النشطة" : "Active Sessions"}
                          </p>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400">
                            {locale === "ar" ? "2 أجهزة مسجلة الدخول" : "2 devices logged in"}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 rounded-xl" onClick={() => toast.success(locale === "ar" ? "تم تسجيل الخروج من جميع الأجهزة" : "Signed out from all devices")}>
                        {locale === "ar" ? "تسجيل الخروج من الكل" : "Sign out all"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      {locale === "ar" ? "إعدادات الإشعارات" : "Notification Settings"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { key: "email" as const, labelAr: "إشعارات البريد الإلكتروني", label: "Email Notifications", descAr: "استلام تحديثات عبر البريد", desc: "Receive email updates" },
                      { key: "push" as const, labelAr: "إشعارات الدفع", label: "Push Notifications", descAr: "استلام إشعارات فورية", desc: "Receive push notifications" },
                      { key: "sms" as const, labelAr: "إشعارات SMS", label: "SMS Notifications", descAr: "استلام تحديثات عبر الرسائل", desc: "Receive SMS updates" },
                      { key: "marketing" as const, labelAr: "رسائل التسويق", label: "Marketing Emails", descAr: "استلام رسائل تسويقية", desc: "Receive marketing emails" },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between rounded-xl border border-neutral-200 p-4 dark:border-neutral-800">
                        <div>
                          <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                            {locale === "ar" ? item.labelAr : item.label}
                          </p>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400">
                            {locale === "ar" ? item.descAr : item.desc}
                          </p>
                        </div>
                        <button
                          onClick={() => setNotifications((prev) => ({ ...prev, [item.key]: !prev[item.key] }))}
                          className={cn(
                            "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-950",
                            notifications[item.key] ? "bg-brand-600" : "bg-neutral-300 dark:bg-neutral-600"
                          )}
                          role="switch"
                          aria-checked={notifications[item.key]}
                          aria-label={locale === "ar" ? item.labelAr : item.label}
                        >
                          <span
                            className={cn(
                              "inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200",
                              notifications[item.key]
                                ? "translate-x-6 rtl:-translate-x-6"
                                : "translate-x-1 rtl:-translate-x-1"
                            )}
                          />
                        </button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Devices Tab */}
              <TabsContent value="devices">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      {locale === "ar" ? "الأجهزة" : "Devices"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2.5">
                    {[
                      { name: "MacBook Pro", location: locale === "ar" ? "القاهرة، مصر" : "Cairo, Egypt", lastActive: locale === "ar" ? "نشط الآن" : "Active now", current: true },
                      { name: "iPhone 15", location: locale === "ar" ? "القاهرة، مصر" : "Cairo, Egypt", lastActive: locale === "ar" ? "منذ ساعتين" : "2 hours ago", current: false },
                      { name: "Windows PC", location: locale === "ar" ? "الإسكندرية، مصر" : "Alexandria, Egypt", lastActive: locale === "ar" ? "منذ 3 أيام" : "3 days ago", current: false },
                    ].map((device) => (
                      <div key={device.name} className="flex items-center justify-between rounded-xl border border-neutral-200 p-4 dark:border-neutral-800">
                        <div className="flex items-center gap-3">
                          <div className="rounded-lg bg-neutral-100 p-2 dark:bg-neutral-800">
                            <Smartphone className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{device.name}</p>
                              {device.current && (
                                <Badge variant="success" className="text-[10px]">
                                  {locale === "ar" ? "الحالية" : "Current"}
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400">
                              {device.location} • {device.lastActive}
                            </p>
                          </div>
                        </div>
                        {!device.current && (
                          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 rounded-xl" onClick={() => toast.success(locale === "ar" ? `تم إزالة ${device.name}` : `${device.name} removed`)}>
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
