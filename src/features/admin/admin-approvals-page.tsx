import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils";
import { useLocale } from "@/hooks";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserAvatar } from "@/components/ui/avatar";
import { mockRequests } from "@/mocks/data";
import {
  Search,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  MessageSquare,
  Paperclip,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";

const fadeIn = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

const statusConfig = {
  pending: { color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200", label: "Pending" },
  approved: { color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200", label: "Approved" },
  rejected: { color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200", label: "Rejected" },
  in_progress: { color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200", label: "In Progress" },
  completed: { color: "bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200", label: "Completed" },
};

export function AdminApprovalsPage() {
  const { locale, isRTL } = useLocale();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("pending");
  const [requests, setRequests] = useState(mockRequests);

  const filtered = requests.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.type.toLowerCase().includes(search.toLowerCase());
    const matchesTab = activeTab === "all" || r.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const pendingCount = requests.filter((r) => r.status === "pending").length;

  const handleApprove = (id: string) => {
    setRequests((prev) => prev.map((r) => r.id === id ? { ...r, status: "approved" as const } : r));
    toast.success(locale === "ar" ? "تمت الموافقة" : "Approved", {
      description: `${locale === "ar" ? "الطلب" : "Request"} ${id}`,
    });
  };

  const handleReject = (id: string) => {
    setRequests((prev) => prev.map((r) => r.id === id ? { ...r, status: "rejected" as const } : r));
    toast.success(locale === "ar" ? "تم الرفض" : "Rejected", {
      description: `${locale === "ar" ? "الطلب" : "Request"} ${id}`,
    });
  };

  return (
    <motion.div initial="initial" animate="animate" variants={fadeIn} className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            {locale === "ar" ? "الموافقات" : "Approvals"}
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            {pendingCount} {locale === "ar" ? "طلب في انتظار الموافقة" : "pending approvals"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { status: "pending", count: mockRequests.filter(r => r.status === "pending").length, icon: Clock, color: "text-yellow-600 bg-yellow-50 dark:bg-yellow-950" },
          { status: "approved", count: mockRequests.filter(r => r.status === "approved").length, icon: CheckCircle, color: "text-green-600 bg-green-50 dark:bg-green-950" },
          { status: "rejected", count: mockRequests.filter(r => r.status === "rejected").length, icon: XCircle, color: "text-red-600 bg-red-50 dark:bg-red-950" },
          { status: "in_progress", count: mockRequests.filter(r => r.status === "in_progress").length, icon: Clock, color: "text-blue-600 bg-blue-50 dark:bg-blue-950" },
        ].map((stat) => (
          <Card
            key={stat.status}
            className={cn(
              "hover:shadow-md transition-all cursor-pointer",
              activeTab === stat.status && "ring-2 ring-brand-500"
            )}
            onClick={() => setActiveTab(stat.status)}
          >
            <CardContent className="p-4 text-center">
              <div className={cn("inline-flex rounded-xl p-2 mb-2", stat.color)}>
                <stat.icon className="h-5 w-5" />
              </div>
              <p className="text-xl font-bold">{stat.count}</p>
              <p className="text-xs text-neutral-500 capitalize">{stat.status.replace("_", " ")}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={locale === "ar" ? "بحث..." : "Search..."}
          leftIcon={<Search className="h-4 w-4" />}
          className="max-w-sm"
        />
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="overflow-x-auto">
            <TabsTrigger value="all">{locale === "ar" ? "الكل" : "All"}</TabsTrigger>
            <TabsTrigger value="pending">{locale === "ar" ? "قيد الانتظار" : "Pending"}</TabsTrigger>
            <TabsTrigger value="approved">{locale === "ar" ? "موافق" : "Approved"}</TabsTrigger>
            <TabsTrigger value="rejected">{locale === "ar" ? "مرفوض" : "Rejected"}</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="space-y-3">
        {filtered.map((request, index) => {
          const status = statusConfig[request.status];
          return (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="hover:shadow-md transition-all">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-semibold">{locale === "ar" ? request.titleAr : request.title}</h3>
                        <Badge variant="outline" className="text-[10px]">{request.type}</Badge>
                      </div>
                      <p className="text-xs text-neutral-500 line-clamp-1 mb-2">
                        {locale === "ar" ? request.descriptionAr : request.description}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-neutral-400">
                        <span>{request.submittedAt}</span>
                        {request.attachments.length > 0 && (
                          <span className="flex items-center gap-1">
                            <Paperclip className="h-3 w-3" />
                            {request.attachments.length}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {request.status === "pending" && (
                        <>
                          <Button size="sm" variant="default" className="bg-green-600 hover:bg-green-700" onClick={() => handleApprove(request.id)}>
                            <CheckCircle className="h-3.5 w-3.5 me-1" />
                            {locale === "ar" ? "موافقة" : "Approve"}
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleReject(request.id)}>
                            <XCircle className="h-3.5 w-3.5 me-1" />
                            {locale === "ar" ? "رفض" : "Reject"}
                          </Button>
                        </>
                      )}
                      <Badge className={cn("text-xs", status.color)}>
                        {locale === "ar" ? (
                          request.status === "pending" ? "قيد الانتظار" :
                          request.status === "approved" ? "موافق عليه" :
                          request.status === "rejected" ? "مرفوض" :
                          request.status === "in_progress" ? "قيد التنفيذ" : "مكتمل"
                        ) : status.label}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
