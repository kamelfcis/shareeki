import { useState } from "react";
import { motion } from "framer-motion";
import { cn, formatRelativeTime } from "@/utils";
import { useLocale } from "@/hooks";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/shared/empty-state";
import { mockNotifications } from "@/mocks/data";
import {
  Bell,
  CheckCircle,
  AlertTriangle,
  Info,
  XCircle,
  Gift,
  CreditCard,
  FileWarning,
  PartyPopper,
  Settings,
  Check,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  CheckCircle,
  AlertTriangle,
  Info,
  XCircle,
  Gift,
  CreditCard,
  FileWarning,
  PartyPopper,
};

const typeConfig = {
  success: { color: "text-green-500", bg: "bg-green-100 dark:bg-green-900" },
  info: { color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900" },
  warning: { color: "text-yellow-500", bg: "bg-yellow-100 dark:bg-yellow-900" },
  error: { color: "text-red-500", bg: "bg-red-100 dark:bg-red-900" },
};

export function NotificationsPage() {
  const { locale } = useLocale();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !n.read;
    return n.type === activeTab;
  });

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success(locale === "ar" ? "تم تعليم الكل كمقروء" : "All marked as read");
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    toast.success(locale === "ar" ? "تم الحذف" : "Deleted");
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            {locale === "ar" ? "الإشعارات" : "Notifications"}
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            {unreadCount > 0
              ? `${unreadCount} ${locale === "ar" ? "إشعارات غير مقروءة" : "unread notifications"}`
              : locale === "ar" ? "جميع الإشعارات مقروءة" : "All notifications read"
            }
          </p>
        </div>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              <Check className="h-4 w-4 me-2" />
              {locale === "ar" ? "تعليم الكل كمقروء" : "Mark all read"}
            </Button>
          )}
          <Button variant="ghost" size="icon-sm" onClick={() => { navigate("/settings/notifications"); toast.info(locale === "ar" ? "إعدادات الإشعارات" : "Notification settings"); }}>
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={fadeIn}>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">{locale === "ar" ? "الكل" : "All"}</TabsTrigger>
            <TabsTrigger value="unread">
              {locale === "ar" ? "غير مقروء" : "Unread"}
              {unreadCount > 0 && (
                <Badge className="ms-1 h-5 min-w-[20px] px-1 text-[10px]">{unreadCount}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="info">{locale === "ar" ? "معلومات" : "Info"}</TabsTrigger>
            <TabsTrigger value="success">{locale === "ar" ? "نجاح" : "Success"}</TabsTrigger>
            <TabsTrigger value="warning">{locale === "ar" ? "تحذير" : "Warning"}</TabsTrigger>
          </TabsList>
        </Tabs>
      </motion.div>

      {/* Notifications List */}
      {filteredNotifications.length === 0 ? (
        <EmptyState
          title={locale === "ar" ? "لا توجد إشعارات" : "No notifications"}
          description={locale === "ar" ? "ستظهر الإشعارات الجديدة هنا" : "New notifications will appear here"}
        />
      ) : (
        <motion.div variants={fadeIn} className="space-y-2">
          {filteredNotifications.map((notification, index) => {
            const config = typeConfig[notification.type];
            const Icon = iconMap[notification.icon] || Bell;

            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                layout
              >
                <Card
                  className={cn(
                    "hover:shadow-md transition-all duration-200 cursor-pointer",
                    !notification.read && "border-brand-200 bg-brand-50/50 dark:border-brand-800 dark:bg-brand-950/50"
                  )}
                  onClick={() => markAsRead(notification.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={cn("rounded-xl p-2 shrink-0", config.bg)}>
                        <Icon className={cn("h-4 w-4", config.color)} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className={cn(
                            "text-sm font-medium text-neutral-900 dark:text-neutral-100",
                            !notification.read && "font-semibold"
                          )}>
                            {locale === "ar" ? notification.titleAr : notification.title}
                          </h3>
                          {!notification.read && (
                            <div className="h-2 w-2 rounded-full bg-brand-500 shrink-0 mt-1.5" />
                          )}
                        </div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2">
                          {locale === "ar" ? notification.messageAr : notification.message}
                        </p>
                        <p className="text-xs text-neutral-400 mt-2">
                          {formatRelativeTime(notification.createdAt)}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        {!notification.read && (
                          <Button variant="ghost" size="icon-sm" onClick={(e) => { e.stopPropagation(); markAsRead(notification.id); }}>
                            <Check className="h-3.5 w-3.5" />
                          </Button>
                        )}
                        <Button variant="ghost" size="icon-sm" className="text-red-400 hover:text-red-500" onClick={(e) => { e.stopPropagation(); deleteNotification(notification.id); }}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </motion.div>
  );
}
