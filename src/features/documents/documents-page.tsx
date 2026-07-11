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
import { mockDocuments } from "@/mocks/data";
import {
  Search,
  Upload,
  Download,
  Eye,
  FileText,
  FileCheck,
  Receipt,
  Shield,
  BarChart,
  Award,
  FolderOpen,
  Clock,
  Star,
  Share2,
  X,
} from "lucide-react";
import { toast } from "sonner";

const fadeIn = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FileText,
  FileCheck,
  Receipt,
  Shield,
  BarChart,
  Award,
};

export function DocumentsPage() {
  const { locale } = useLocale();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [showUpload, setShowUpload] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [documents, setDocuments] = useState(mockDocuments);

  const categories = [...new Set(documents.map((d) => d.category))];

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(search.toLowerCase());
    const matchesTab = activeTab === "all" || doc.category === activeTab;
    return matchesSearch && matchesTab;
  });

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const handleUpload = (fileName?: string) => {
    const name = fileName || "New Document";
    const newDoc = {
      id: `doc_${Date.now()}`,
      name,
      nameAr: name,
      category: "Uploads",
      type: "PDF",
      size: Math.floor(Math.random() * 5000000) + 100000,
      uploadedAt: new Date().toISOString().split("T")[0],
      icon: "FileText",
    };
    setDocuments((prev) => [newDoc, ...prev]);
    setShowUpload(false);
    toast.success(locale === "ar" ? "تم رفع الملف بنجاح" : "File uploaded successfully");
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={{ animate: { transition: { staggerChildren: 0.08 } } }}
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            {locale === "ar" ? "المستندات" : "Documents"}
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            {locale === "ar" ? "إدارة مستنداتك الشخصية" : "Manage your personal documents"}
          </p>
        </div>
        <Button className="shrink-0" onClick={() => setShowUpload(true)}>
          <Upload className="h-4 w-4 me-2" />
          {locale === "ar" ? "رفع مستند" : "Upload"}
        </Button>
      </motion.div>

      {/* Stats */}
      <motion.div variants={fadeIn} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { icon: FolderOpen, label: locale === "ar" ? "إجمالي" : "Total", count: documents.length, color: "text-brand-500 bg-brand-50 dark:bg-brand-950/60" },
          { icon: Clock, label: locale === "ar" ? "هذا الشهر" : "This Month", count: documents.filter((d) => { const dt = new Date(d.uploadedAt); const now = new Date(); return dt.getMonth() === now.getMonth() && dt.getFullYear() === now.getFullYear(); }).length || 2, color: "text-blue-500 bg-blue-50 dark:bg-blue-950/60" },
          { icon: Star, label: locale === "ar" ? "مفضلة" : "Favorites", count: 1, color: "text-yellow-500 bg-yellow-50 dark:bg-yellow-950/60" },
          { icon: Upload, label: locale === "ar" ? "مرفوعة" : "Uploaded", count: documents.length, color: "text-green-500 bg-green-50 dark:bg-green-950/60" },
        ].map((stat) => (
          <Card key={stat.label} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <div className={cn("inline-flex rounded-xl p-2 mb-2", stat.color)}>
                <stat.icon className="h-5 w-5" />
              </div>
              <p className="text-xl font-bold text-neutral-900 dark:text-neutral-100">{stat.count}</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Search and Tabs */}
      <motion.div variants={fadeIn} className="space-y-3">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={locale === "ar" ? "بحث في المستندات..." : "Search documents..."}
          leftIcon={<Search className="h-4 w-4" />}
        />

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full justify-start overflow-x-auto">
            <TabsTrigger value="all">{locale === "ar" ? "الكل" : "All"}</TabsTrigger>
            {categories.map((cat) => (
              <TabsTrigger key={cat} value={cat} className="whitespace-nowrap">
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </motion.div>

      {/* Documents List */}
      {filteredDocuments.length === 0 ? (
        <EmptyState
          title={locale === "ar" ? "لا توجد مستندات" : "No documents found"}
          description={locale === "ar" ? "ارفع مستنداتك الأولى" : "Upload your first document"}
          action={{
            label: locale === "ar" ? "رفع مستند" : "Upload Document",
            onClick: () => setShowUpload(true),
          }}
        />
      ) : (
        <motion.div variants={fadeIn} className="space-y-2">
          {filteredDocuments.map((doc, index) => {
            const Icon = iconMap[doc.icon] || FileText;
            return (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
              >
                <Card className="hover:shadow-md transition-all cursor-pointer group">
                  <CardContent className="p-3.5 sm:p-4">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="rounded-xl bg-brand-50 p-2.5 dark:bg-brand-950/60 shrink-0">
                        <Icon className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">
                          {locale === "ar" ? doc.nameAr : doc.name}
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                          <Badge variant="secondary" className="text-[10px] px-1.5 py-0">{doc.category}</Badge>
                          <span>{doc.type}</span>
                          <span>{formatSize(doc.size)}</span>
                          <span>{doc.uploadedAt}</span>
                        </div>
                      </div>
                      {/* Actions — always visible on mobile, hover on desktop */}
                      <div className="flex items-center gap-0.5 sm:gap-1 shrink-0 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon-sm" className="h-8 w-8 sm:h-9 sm:w-9" onClick={(e) => { e.stopPropagation(); toast.info(locale === "ar" ? "معاينة المستند" : "Previewing document"); }}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon-sm" className="h-8 w-8 sm:h-9 sm:w-9" onClick={(e) => { e.stopPropagation(); toast.success(locale === "ar" ? "جاري التحميل..." : "Downloading..."); }}>
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon-sm" className="h-8 w-8 sm:h-9 sm:w-9 hidden sm:inline-flex" onClick={(e) => { e.stopPropagation(); toast.success(locale === "ar" ? "تم نسخ رابط المشاركة" : "Share link copied"); }}>
                          <Share2 className="h-4 w-4" />
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

      {/* Upload Dialog */}
      <Dialog open={showUpload} onOpenChange={setShowUpload}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>{locale === "ar" ? "رفع مستند" : "Upload Document"}</DialogTitle>
          </DialogHeader>
          <div
            className={cn(
              "border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer",
              dragActive ? "border-brand-500 bg-brand-50 dark:bg-brand-950" : "border-neutral-300 dark:border-neutral-700 hover:border-brand-400"
            )}
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => { e.preventDefault(); setDragActive(false); handleUpload(e.dataTransfer.files[0]?.name); }}
            onClick={() => { const input = document.createElement("input"); input.type = "file"; input.onchange = () => handleUpload(input.files?.[0]?.name); input.click(); }}
          >
            <Upload className="h-10 w-10 text-neutral-400 mx-auto mb-3" />
            <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {locale === "ar" ? "اسحب الملفات هنا أو انقر للتحديد" : "Drag & drop files here or click to browse"}
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              PDF, DOC, XLS, JPG, PNG (max 10MB)
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUpload(false)}>
              {locale === "ar" ? "إلغاء" : "Cancel"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
