import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils";
import { useLocale } from "@/hooks";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { EmptyState } from "@/components/shared/empty-state";
import { mockTickets } from "@/mocks/data";
import {
  Search,
  Plus,
  HelpCircle,
  MessageSquare,
  Clock,
  BookOpen,
  Phone,
  Mail,
  ChevronRight,
  Send,
  Paperclip,
} from "lucide-react";
import { toast } from "sonner";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

const statusConfig = {
  open: { color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200", label: "Open", labelAr: "مفتوحة" },
  in_progress: { color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200", label: "In Progress", labelAr: "قيد المعالجة" },
  resolved: { color: "bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200", label: "Resolved", labelAr: "محلولة" },
  closed: { color: "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400", label: "Closed", labelAr: "مغلقة" },
};

const priorityConfig = {
  low: { color: "text-neutral-500", label: "Low", labelAr: "منخفض" },
  medium: { color: "text-yellow-500", label: "Medium", labelAr: "متوسط" },
  high: { color: "text-orange-500", label: "High", labelAr: "عالي" },
  urgent: { color: "text-red-500", label: "Urgent", labelAr: "عاجل" },
};

export function SupportPage() {
  const { locale, isRTL } = useLocale();
  const [activeTab, setActiveTab] = useState("tickets");
  const [search, setSearch] = useState("");
  const [tickets, setTickets] = useState(mockTickets);
  const [showNewTicket, setShowNewTicket] = useState(false);
  const [showTicketDetail, setShowTicketDetail] = useState<string | null>(null);
  const [newTicket, setNewTicket] = useState({ subject: "", category: "general", priority: "medium", message: "" });
  const [replyText, setReplyText] = useState("");

  const filteredTickets = tickets.filter((t) =>
    t.subject.toLowerCase().includes(search.toLowerCase()) ||
    t.subjectAr.includes(search)
  );

  const handleSubmitTicket = () => {
    if (!newTicket.subject.trim() || !newTicket.message.trim()) {
      toast.error(locale === "ar" ? "يرجى ملء جميع الحقول" : "Please fill all fields");
      return;
    }
    const ticket = {
      id: `TK-${String(tickets.length + 1).padStart(3, "0")}`,
      subject: newTicket.subject,
      subjectAr: newTicket.subject,
      category: "General",
      categoryAr: "عام",
      status: "open" as const,
      priority: newTicket.priority as "low" | "medium" | "high" | "urgent",
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: "Just now",
      messages: 1,
    };
    setTickets((prev) => [ticket, ...prev]);
    setShowNewTicket(false);
    setNewTicket({ subject: "", category: "general", priority: "medium", message: "" });
    toast.success(locale === "ar" ? "تم إنشاء التذكرة" : "Ticket created", {
      description: locale === "ar" ? `رقم التذكرة: ${ticket.id}` : `Ticket ID: ${ticket.id}`,
    });
  };

  const handleReply = () => {
    if (!replyText.trim()) return;
    toast.success(locale === "ar" ? "تم إرسال الرد" : "Reply sent");
    setReplyText("");
    setShowTicketDetail(null);
  };

  const selectedTicket = tickets.find((t) => t.id === showTicketDetail);

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
            {locale === "ar" ? "الدعم" : "Support"}
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            {locale === "ar" ? "احصل على المساعدة التي تحتاجها" : "Get the help you need"}
          </p>
        </div>
        <Button onClick={() => setShowNewTicket(true)}>
          <Plus className="h-4 w-4 me-2" />
          {locale === "ar" ? "تذكرة جديدة" : "New Ticket"}
        </Button>
      </motion.div>

      {/* Quick Links */}
      <motion.div variants={fadeIn} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: BookOpen, title: locale === "ar" ? "قاعدة المعرفة" : "Knowledge Base", desc: locale === "ar" ? "تصفح الأسئلة الشائعة" : "Browse FAQs and guides", color: "text-brand-500 bg-brand-50 dark:bg-brand-950", onClick: () => setActiveTab("faq") },
          { icon: MessageSquare, title: locale === "ar" ? "المحادثة المباشرة" : "Live Chat", desc: locale === "ar" ? "تحدث مع فريق الدعم" : "Chat with support team", color: "text-blue-500 bg-blue-50 dark:bg-blue-950", onClick: () => toast.info(locale === "ar" ? "قريباً!" : "Coming soon!") },
          { icon: Phone, title: locale === "ar" ? "اتصل بنا" : "Contact Us", desc: locale === "ar" ? "اطلب الدعم الهاتفي" : "Request phone support", color: "text-accent-500 bg-accent-50 dark:bg-accent-950", onClick: () => setActiveTab("contact") },
        ].map((item) => (
          <Card key={item.title} className="hover:shadow-md transition-all cursor-pointer group" onClick={item.onClick}>
            <CardContent className="p-5">
              <div className={cn("inline-flex rounded-xl p-2.5 mb-3", item.color)}>
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-brand-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{item.desc}</p>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Tabs */}
      <motion.div variants={fadeIn}>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="tickets">{locale === "ar" ? "التذاكر" : "Tickets"}</TabsTrigger>
            <TabsTrigger value="faq">{locale === "ar" ? "الأسئلة الشائعة" : "FAQ"}</TabsTrigger>
            <TabsTrigger value="contact">{locale === "ar" ? "اتصل بنا" : "Contact"}</TabsTrigger>
          </TabsList>
        </Tabs>
      </motion.div>

      {/* Tickets Tab */}
      {activeTab === "tickets" && (
        <motion.div variants={fadeIn} className="space-y-3">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={locale === "ar" ? "بحث في التذاكر..." : "Search tickets..."}
            leftIcon={<Search className="h-4 w-4" />}
          />
          {filteredTickets.length === 0 ? (
            <EmptyState
              title={locale === "ar" ? "لا توجد تذاكر" : "No tickets"}
              description={locale === "ar" ? "لم تُسجل أي تذكرة بعد" : "No tickets found"}
            />
          ) : (
            filteredTickets.map((ticket, index) => {
              const status = statusConfig[ticket.status];
              const priority = priorityConfig[ticket.priority];
              return (
                <motion.div
                  key={ticket.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="hover:shadow-md transition-all cursor-pointer group" onClick={() => setShowTicketDetail(ticket.id)}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="rounded-xl bg-brand-50 p-2.5 dark:bg-brand-950 shrink-0">
                          <MessageSquare className="h-5 w-5 text-brand-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                              {locale === "ar" ? ticket.subjectAr : ticket.subject}
                            </h3>
                            <Badge variant="outline" className="text-[10px]">{ticket.id}</Badge>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
                            <Badge variant="secondary" className="text-[10px]">
                              {locale === "ar" ? ticket.categoryAr : ticket.category}
                            </Badge>
                            <span className={cn("font-medium", priority.color)}>
                              {locale === "ar" ? priority.labelAr : priority.label}
                            </span>
                            <span>{ticket.updatedAt}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <Badge className={cn("text-xs", status.color)}>
                            {locale === "ar" ? status.labelAr : status.label}
                          </Badge>
                          <ChevronRight className={cn("h-4 w-4 text-neutral-400 group-hover:text-brand-500", isRTL && "rotate-180")} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })
          )}
        </motion.div>
      )}

      {/* FAQ Tab */}
      {activeTab === "faq" && (
        <motion.div variants={fadeIn} className="space-y-3">
          {[
            { q: locale === "ar" ? "كيف أعيد تعيين كلمة المرور؟" : "How do I reset my password?", a: locale === "ar" ? "اذهب إلى الإعدادات > الأمان > تغيير كلمة المرور لإعادة تعيينها." : "Go to Settings > Security > Change Password to reset your password." },
            { q: locale === "ar" ? "كيف أقدم طلب إجازة؟" : "How do I submit a leave request?", a: locale === "ar" ? "انتقل إلى الطلبات > طلب جديد > إجازة لتقديم طلب إجازة جديد." : "Navigate to Requests > New Request > Leave to submit a new leave request." },
            { q: locale === "ar" ? "أين يمكنني عرض كشوف رواتبي؟" : "Where can I view my payslips?", a: locale === "ar" ? "اذهب إلى المستندات > كشوف الرواتب لعرض وتحميل كشوف رواتبك." : "Go to Documents > Payslips to view and download your payslips." },
            { q: locale === "ar" ? "كيف أحدث معلوماتي الشخصية؟" : "How do I update my personal information?", a: locale === "ar" ? "اذهب إلى الإعدادات > الملف الشخصي لتحديث معلوماتك الشخصية." : "Go to Settings > Profile to update your personal information." },
            { q: locale === "ar" ? "كيف أتواصل مع الموارد البشرية؟" : "How do I contact HR?", a: locale === "ar" ? "استخدم صفحة الدعم > اتصل بنا أو أرسل بريد إلكتروني إلى hr@shareky.com." : "Use the Support > Contact Us page or email hr@shareky.com." },
          ].map((faq, index) => (
            <Card key={index} className="hover:shadow-md transition-all cursor-pointer group">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                      {faq.q}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">{faq.a}</p>
                  </div>
                  <ChevronRight className={cn("h-4 w-4 text-neutral-300 dark:text-neutral-600 shrink-0 mt-1 group-hover:text-brand-500 transition-colors", isRTL && "rotate-180")} />
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      )}

      {/* Contact Tab */}
      {activeTab === "contact" && (
        <motion.div variants={fadeIn}>
          <Card>
            <CardContent className="p-6">
              <div className="max-w-md mx-auto text-center space-y-6">
                <div className="inline-flex rounded-2xl bg-brand-100 p-4 dark:bg-brand-900">
                  <Mail className="h-8 w-8 text-brand-600 dark:text-brand-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                    {locale === "ar" ? "تواصل معنا" : "Get in Touch"}
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                    {locale === "ar" ? "فريق الدعم متاح من السبت إلى الخميس" : "Support team available Sat-Thu"}
                  </p>
                </div>
                <div className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400">
                  <div className="flex items-center justify-center gap-2">
                    <Mail className="h-4 w-4 text-brand-500" />
                    <a href="mailto:support@shareky.com" className="hover:text-brand-600 transition-colors">support@shareky.com</a>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Phone className="h-4 w-4 text-brand-500" />
                    <a href="tel:+20223456789" className="hover:text-brand-600 transition-colors">+20 2 2345 6789</a>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="h-4 w-4 text-brand-500" />
                    <span>{locale === "ar" ? "8:00 صباحاً - 5:00 مساءً" : "8:00 AM - 5:00 PM"}</span>
                  </div>
                </div>
                <Button className="w-full" onClick={() => window.location.href = "mailto:support@shareky.com"}>
                  <Mail className="h-4 w-4 me-2" />
                  {locale === "ar" ? "إرسال بريد" : "Send Email"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* New Ticket Dialog */}
      <Dialog open={showNewTicket} onOpenChange={setShowNewTicket}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{locale === "ar" ? "تذكرة دعم جديدة" : "New Support Ticket"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {locale === "ar" ? "الموضوع" : "Subject"}
              </label>
              <Input
                value={newTicket.subject}
                onChange={(e) => setNewTicket((p) => ({ ...p, subject: e.target.value }))}
                placeholder={locale === "ar" ? "موضوع التذكرة" : "Brief description of your issue"}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  {locale === "ar" ? "الفئة" : "Category"}
                </label>
                <select
                  value={newTicket.category}
                  onChange={(e) => setNewTicket((p) => ({ ...p, category: e.target.value }))}
                  className="flex h-10 w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
                >
                  <option value="general">{locale === "ar" ? "عام" : "General"}</option>
                  <option value="technical">{locale === "ar" ? "فني" : "Technical"}</option>
                  <option value="billing">{locale === "ar" ? "فواتير" : "Billing"}</option>
                  <option value="hr">{locale === "ar" ? "موارد بشرية" : "HR"}</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  {locale === "ar" ? "الأولوية" : "Priority"}
                </label>
                <select
                  value={newTicket.priority}
                  onChange={(e) => setNewTicket((p) => ({ ...p, priority: e.target.value }))}
                  className="flex h-10 w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
                >
                  <option value="low">{locale === "ar" ? "منخفضة" : "Low"}</option>
                  <option value="medium">{locale === "ar" ? "متوسطة" : "Medium"}</option>
                  <option value="high">{locale === "ar" ? "عالية" : "High"}</option>
                  <option value="urgent">{locale === "ar" ? "عاجلة" : "Urgent"}</option>
                </select>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {locale === "ar" ? "الرسالة" : "Message"}
              </label>
              <textarea
                value={newTicket.message}
                onChange={(e) => setNewTicket((p) => ({ ...p, message: e.target.value }))}
                placeholder={locale === "ar" ? "اشرح مشكلتك بالتفصيل..." : "Describe your issue in detail..."}
                rows={4}
                className="flex w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewTicket(false)}>
              {locale === "ar" ? "إلغاء" : "Cancel"}
            </Button>
            <Button onClick={handleSubmitTicket}>
              <Send className="h-4 w-4 me-2" />
              {locale === "ar" ? "إرسال" : "Submit"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Ticket Detail Dialog */}
      <Dialog open={!!showTicketDetail} onOpenChange={() => setShowTicketDetail(null)}>
        <DialogContent className="sm:max-w-[500px]">
          {selectedTicket && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {locale === "ar" ? selectedTicket.subjectAr : selectedTicket.subject}
                  <Badge variant="outline" className="text-[10px]">{selectedTicket.id}</Badge>
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-neutral-500">
                  <Badge className={cn("text-xs", statusConfig[selectedTicket.status].color)}>
                    {locale === "ar" ? statusConfig[selectedTicket.status].labelAr : statusConfig[selectedTicket.status].label}
                  </Badge>
                  <span className={cn("font-medium", priorityConfig[selectedTicket.priority].color)}>
                    {locale === "ar" ? priorityConfig[selectedTicket.priority].labelAr : priorityConfig[selectedTicket.priority].label}
                  </span>
                </div>
                <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 bg-neutral-50 dark:bg-neutral-900">
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {locale === "ar" ? selectedTicket.subjectAr : selectedTicket.subject}
                  </p>
                  <p className="text-xs text-neutral-400 mt-2">{selectedTicket.updatedAt}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    {locale === "ar" ? "رد سريع" : "Quick Reply"}
                  </label>
                  <div className="flex gap-2">
                    <Input
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder={locale === "ar" ? "اكتب ردك..." : "Type your reply..."}
                      onKeyDown={(e) => e.key === "Enter" && handleReply()}
                    />
                    <Button size="icon-sm" onClick={handleReply} disabled={!replyText.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
