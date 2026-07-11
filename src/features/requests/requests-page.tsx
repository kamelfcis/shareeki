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
import { mockRequests } from "@/mocks/data";
import { REQUEST_STATUSES } from "@/constants";
import {
  Search,
  Plus,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Calendar,
  Paperclip,
  MessageSquare,
  ChevronRight,
  Send,
} from "lucide-react";
import { toast } from "sonner";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

const statusConfig = {
  pending: { color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200", icon: Clock, label: "Pending" },
  approved: { color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200", icon: CheckCircle, label: "Approved" },
  rejected: { color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200", icon: XCircle, label: "Rejected" },
  in_progress: { color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200", icon: AlertCircle, label: "In Progress" },
  completed: { color: "bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200", icon: CheckCircle, label: "Completed" },
};

const REQUEST_TYPES = [
  { value: "leave", label: "Leave", labelAr: "إجازة" },
  { value: "expense", label: "Expense", labelAr: "مصروف" },
  { value: "equipment", label: "Equipment", labelAr: "معدات" },
  { value: "access", label: "Access", labelAr: "وصول" },
];

export function RequestsPage() {
  const { locale, isRTL } = useLocale();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [requests, setRequests] = useState(mockRequests);
  const [showNewRequest, setShowNewRequest] = useState(false);
  const [showDetail, setShowDetail] = useState<string | null>(null);
  const [newRequest, setNewRequest] = useState({ title: "", type: "leave", description: "" });

  const filteredRequests = requests.filter((req) => {
    const matchesSearch = req.title.toLowerCase().includes(search.toLowerCase()) ||
      req.type.toLowerCase().includes(search.toLowerCase());
    const matchesTab = activeTab === "all" || req.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const getStatusConfig = (status: string) => {
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  };

  const handleSubmitRequest = () => {
    if (!newRequest.title.trim() || !newRequest.description.trim()) {
      toast.error(locale === "ar" ? "يرجى ملء جميع الحقول" : "Please fill all fields");
      return;
    }
    const req = {
      id: `REQ-${String(requests.length + 1).padStart(3, "0")}`,
      title: newRequest.title,
      titleAr: newRequest.title,
      type: REQUEST_TYPES.find((t) => t.value === newRequest.type)?.label || "Leave",
      typeAr: REQUEST_TYPES.find((t) => t.value === newRequest.type)?.labelAr || "إجازة",
      description: newRequest.description,
      descriptionAr: newRequest.description,
      status: "pending" as const,
      submittedAt: new Date().toISOString().split("T")[0],
      attachments: [],
      comments: [],
    };
    setRequests((prev) => [req, ...prev]);
    setShowNewRequest(false);
    setNewRequest({ title: "", type: "leave", description: "" });
    toast.success(locale === "ar" ? "تم إرسال الطلب" : "Request submitted", {
      description: locale === "ar" ? `رقم الطلب: ${req.id}` : `Request ID: ${req.id}`,
    });
  };

  const selectedRequest = requests.find((r) => r.id === showDetail);

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
          <h1 className="text-2xl font-bold text-foreground">
            {locale === "ar" ? "الطلبات" : "Requests"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {locale === "ar" ? "إدارة طلباتك ومتتبعتها" : "Manage and track your requests"}
          </p>
        </div>
        <Button onClick={() => setShowNewRequest(true)}>
          <Plus className="h-4 w-4 me-2" />
          {locale === "ar" ? "طلب جديد" : "New Request"}
        </Button>
      </motion.div>

      {/* Stats */}
      <motion.div variants={fadeIn} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: locale === "ar" ? "الكل" : "Total", count: requests.length, color: "text-muted-foreground" },
          { label: locale === "ar" ? "قيد الانتظار" : "Pending", count: requests.filter(r => r.status === "pending").length, color: "text-yellow-600" },
          { label: locale === "ar" ? "موافق عليه" : "Approved", count: requests.filter(r => r.status === "approved").length, color: "text-green-600" },
          { label: locale === "ar" ? "مرفوض" : "Rejected", count: requests.filter(r => r.status === "rejected").length, color: "text-red-600" },
        ].map((stat) => (
          <Card key={stat.label} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTab(stat.label === "Total" || stat.label === "الكل" ? "all" : stat.label === "Pending" || stat.label === "قيد الانتظار" ? "pending" : stat.label === "Approved" || stat.label === "موافق عليه" ? "approved" : "rejected")}>
            <CardContent className="p-4 text-center">
              <p className={cn("text-2xl font-bold", stat.color)}>{stat.count}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Search and Tabs */}
      <motion.div variants={fadeIn} className="space-y-4">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={locale === "ar" ? "بحث في الطلبات..." : "Search requests..."}
          leftIcon={<Search className="h-4 w-4" />}
        />

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full justify-start overflow-x-auto">
            {REQUEST_STATUSES.map((status) => (
              <TabsTrigger key={status.value} value={status.value}>
                {locale === "ar" ? status.labelAr : status.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </motion.div>

      {/* Requests List */}
      {filteredRequests.length === 0 ? (
        <EmptyState
          title={locale === "ar" ? "لا توجد طلبات" : "No requests found"}
          description={locale === "ar" ? "لم تقم بأي طلبات بعد" : "You haven't made any requests yet"}
          action={{
            label: locale === "ar" ? "طلب جديد" : "New Request",
            onClick: () => setShowNewRequest(true),
          }}
        />
      ) : (
        <motion.div variants={fadeIn} className="space-y-3">
          {filteredRequests.map((request, index) => {
            const status = getStatusConfig(request.status);
            const StatusIcon = status.icon;
            return (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="group hover:shadow-md transition-all duration-200 cursor-pointer" onClick={() => setShowDetail(request.id)}>
                  <CardContent className="p-4 md:p-5">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className={cn("mt-0.5 rounded-xl p-2 shrink-0", status.color)}>
                          <StatusIcon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-sm font-semibold text-foreground">
                              {locale === "ar" ? request.titleAr : request.title}
                            </h3>
                            <Badge variant="outline" className="text-[10px] shrink-0">
                              {locale === "ar" ? request.typeAr : request.type}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {locale === "ar" ? request.descriptionAr : request.description}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {request.submittedAt}
                            </span>
                            {request.attachments.length > 0 && (
                              <span className="flex items-center gap-1">
                                <Paperclip className="h-3 w-3" />
                                {request.attachments.length}
                              </span>
                            )}
                            {request.comments.length > 0 && (
                              <span className="flex items-center gap-1">
                                <MessageSquare className="h-3 w-3" />
                                {request.comments.length}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 md:ms-4">
                        <Badge className={cn("text-xs", status.color)}>
                          {locale === "ar" ? (
                            request.status === "pending" ? "قيد الانتظار" :
                            request.status === "approved" ? "موافق عليه" :
                            request.status === "rejected" ? "مرفوض" :
                            request.status === "in_progress" ? "قيد التنفيذ" : "مكتمل"
                          ) : status.label}
                        </Badge>
                        <ChevronRight className={cn("h-4 w-4 text-muted-foreground group-hover:text-brand-500 transition-colors", isRTL && "rotate-180")} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* New Request Dialog */}
      <Dialog open={showNewRequest} onOpenChange={setShowNewRequest}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{locale === "ar" ? "طلب جديد" : "New Request"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">
                {locale === "ar" ? "نوع الطلب" : "Request Type"}
              </label>
              <select
                value={newRequest.type}
                onChange={(e) => setNewRequest((p) => ({ ...p, type: e.target.value }))}
                className="flex h-10 w-full rounded-xl border border-border bg-card px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
              >
                {REQUEST_TYPES.map((typeOption) => (
                  <option key={typeOption.value} value={typeOption.value}>{locale === "ar" ? typeOption.labelAr : typeOption.label}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">
                {locale === "ar" ? "العنوان" : "Title"}
              </label>
              <Input
                value={newRequest.title}
                onChange={(e) => setNewRequest((p) => ({ ...p, title: e.target.value }))}
                placeholder={locale === "ar" ? "عنوان الطلب" : "Brief title for your request"}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">
                {locale === "ar" ? "التفاصيل" : "Description"}
              </label>
              <textarea
                value={newRequest.description}
                onChange={(e) => setNewRequest((p) => ({ ...p, description: e.target.value }))}
                placeholder={locale === "ar" ? "اشرح طلبك بالتفصيل..." : "Describe your request in detail..."}
                rows={4}
                className="flex w-full rounded-xl border border-border bg-card px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-muted-foreground"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewRequest(false)}>
              {locale === "ar" ? "إلغاء" : "Cancel"}
            </Button>
            <Button onClick={handleSubmitRequest}>
              <Send className="h-4 w-4 me-2" />
              {locale === "ar" ? "إرسال" : "Submit"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Request Detail Dialog */}
      <Dialog open={!!showDetail} onOpenChange={() => setShowDetail(null)}>
        <DialogContent className="sm:max-w-[500px]">
          {selectedRequest && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {locale === "ar" ? selectedRequest.titleAr : selectedRequest.title}
                  <Badge variant="outline" className="text-[10px]">{selectedRequest.id}</Badge>
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge className={cn("text-xs", statusConfig[selectedRequest.status].color)}>
                    {locale === "ar" ? (
                      selectedRequest.status === "pending" ? "قيد الانتظار" :
                      selectedRequest.status === "approved" ? "موافق عليه" :
                      selectedRequest.status === "rejected" ? "مرفوض" :
                      selectedRequest.status === "in_progress" ? "قيد التنفيذ" : "مكتمل"
                    ) : statusConfig[selectedRequest.status].label}
                  </Badge>
                  <Badge variant="secondary" className="text-[10px]">
                    {locale === "ar" ? selectedRequest.typeAr : selectedRequest.type}
                  </Badge>
                </div>
                <div className="rounded-xl border border-border p-4 bg-muted">
                  <p className="text-sm text-muted-foreground">
                    {locale === "ar" ? selectedRequest.descriptionAr : selectedRequest.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-3">{selectedRequest.submittedAt}</p>
                </div>
                {selectedRequest.attachments.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2">
                      {locale === "ar" ? "المرفقات" : "Attachments"} ({selectedRequest.attachments.length})
                    </h4>
                    <div className="space-y-1">
                      {selectedRequest.attachments.map((att: string, i: number) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Paperclip className="h-3 w-3" />
                          {att}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
