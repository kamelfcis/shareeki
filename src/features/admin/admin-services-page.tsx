import { useState } from "react";
import { motion } from "framer-motion";
import { cn, formatPrice } from "@/utils";
import { useLocale } from "@/hooks";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockServices } from "@/mocks/data";
import {
  Search,
  Plus,
  Star,
  Eye,
  Edit,
  Trash2,
  Download,
} from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

export function AdminServicesPage() {
  const { locale } = useLocale();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filtered = mockServices.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase());
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "featured" && s.featured) ||
      (activeTab === "popular" && s.popular) ||
      (activeTab === "inactive" && !s.available);
    return matchesSearch && matchesTab;
  });

  return (
    <motion.div initial="initial" animate="animate" variants={fadeIn} className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {locale === "ar" ? "إدارة الخدمات" : "Service Management"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {filtered.length} {locale === "ar" ? "خدمة" : "services"}
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 me-2" />
            {locale === "ar" ? "تصدير" : "Export"}
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 me-2" />
            {locale === "ar" ? "إضافة خدمة" : "Add Service"}
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={locale === "ar" ? "بحث عن خدمة..." : "Search services..."}
          leftIcon={<Search className="h-4 w-4" />}
          className="sm:max-w-sm"
        />
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">{locale === "ar" ? "الكل" : "All"}</TabsTrigger>
            <TabsTrigger value="featured">{locale === "ar" ? "مميزة" : "Featured"}</TabsTrigger>
            <TabsTrigger value="popular">{locale === "ar" ? "شعبية" : "Popular"}</TabsTrigger>
            <TabsTrigger value="inactive">{locale === "ar" ? "غير نشطة" : "Inactive"}</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Desktop Table */}
      <Card className="hidden md:block">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-start text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {locale === "ar" ? "الخدمة" : "Service"}
                  </th>
                  <th className="px-4 py-3 text-start text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {locale === "ar" ? "الفئة" : "Category"}
                  </th>
                  <th className="px-4 py-3 text-start text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {locale === "ar" ? "السعر" : "Price"}
                  </th>
                  <th className="px-4 py-3 text-start text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {locale === "ar" ? "التقييم" : "Rating"}
                  </th>
                  <th className="px-4 py-3 text-start text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {locale === "ar" ? "الحالة" : "Status"}
                  </th>
                  <th className="px-4 py-3 text-end text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {locale === "ar" ? "إجراءات" : "Actions"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((service) => (
                  <tr
                    key={service.id}
                    className="border-b border-neutral-100 dark:border-neutral-800/50 hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={service.image} alt="" className="h-10 w-10 rounded-lg object-cover" />
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">{locale === "ar" ? service.nameAr : service.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{service.provider}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="secondary" className="text-xs">{locale === "ar" ? service.categoryAr : service.category}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <span className="text-sm font-semibold text-brand-600 dark:text-brand-400">{formatPrice(service.price, locale)}</span>
                        {service.originalPrice && (
                          <span className="text-xs text-muted-foreground line-through ms-1">{formatPrice(service.originalPrice, locale)}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{service.rating}</span>
                        <span className="text-xs text-muted-foreground">({service.reviews})</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={service.available ? "success" : "secondary"} className="text-xs">
                        {service.available ? (locale === "ar" ? "نشط" : "Active") : (locale === "ar" ? "غير نشط" : "Inactive")}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 justify-end">
                        <Button variant="ghost" size="icon-sm">
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon-sm">
                          <Edit className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon-sm" className="text-red-500 hover:text-red-600">
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {filtered.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.04 }}
          >
            <Card className="hover:shadow-md transition-all">
              <CardContent className="p-3.5">
                <div className="flex items-start gap-3">
                  <img src={service.image} alt="" className="h-14 w-14 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="text-sm font-medium text-foreground truncate">
                          {locale === "ar" ? service.nameAr : service.name}
                        </h3>
                        <p className="text-xs text-muted-foreground truncate">{service.provider}</p>
                      </div>
                      <Badge variant={service.available ? "success" : "secondary"} className="text-[10px] shrink-0">
                        {service.available ? (locale === "ar" ? "نشط" : "Active") : (locale === "ar" ? "غير نشط" : "Inactive")}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 mt-2 text-xs">
                      <Badge variant="secondary" className="text-[10px]">
                        {locale === "ar" ? service.categoryAr : service.category}
                      </Badge>
                      <div className="flex items-center gap-0.5 text-amber-500">
                        <Star className="h-3 w-3 fill-current" />
                        <span>{service.rating}</span>
                      </div>
                      <span className="font-semibold text-brand-600 dark:text-brand-400">{formatPrice(service.price, locale)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-1 mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800">
                  <Button variant="ghost" size="icon-sm" className="h-8 w-8">
                    <Eye className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon-sm" className="h-8 w-8">
                    <Edit className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon-sm" className="h-8 w-8 text-red-500 hover:text-red-600">
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
