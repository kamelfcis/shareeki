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
import { EmptyState } from "@/components/shared/empty-state";
import { mockEmployees, mockDepartments } from "@/mocks/data";
import {
  Search,
  Mail,
  Phone,
  MapPin,
  Building2,
  Grid3X3,
  List,
  ChevronRight,
  Users,
} from "lucide-react";
import { toast } from "sonner";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

export function DirectoryPage() {
  const { locale, isRTL } = useLocale();
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeTab, setActiveTab] = useState("all");

  const filteredEmployees = mockEmployees.filter((emp) => {
    const matchesSearch = emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.position.toLowerCase().includes(search.toLowerCase()) ||
      emp.department.toLowerCase().includes(search.toLowerCase());
    const matchesTab = activeTab === "all" || emp.department.toLowerCase() === activeTab;
    return matchesSearch && matchesTab;
  });

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
            {locale === "ar" ? "دليل الموظفين" : "Employee Directory"}
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            {locale === "ar" ? "ابحث عن زملائك في العمل" : "Find your colleagues"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "grid" ? "secondary" : "ghost"}
            size="icon-sm"
            onClick={() => setViewMode("grid")}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "secondary" : "ghost"}
            size="icon-sm"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>

      {/* Department Stats */}
      <motion.div variants={fadeIn} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {mockDepartments.slice(0, 4).map((dept) => (
          <Card key={dept.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <Building2 className="h-6 w-6 mx-auto mb-2 text-brand-500" />
              <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                {locale === "ar" ? dept.nameAr : dept.name}
              </p>
              <p className="text-xs text-neutral-500">{dept.employeeCount} {locale === "ar" ? "موظف" : "employees"}</p>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Search and Tabs */}
      <motion.div variants={fadeIn} className="space-y-4">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={locale === "ar" ? "بحث عن موظف..." : "Search employees..."}
          leftIcon={<Search className="h-4 w-4" />}
        />

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full justify-start overflow-x-auto">
            <TabsTrigger value="all">{locale === "ar" ? "الكل" : "All"}</TabsTrigger>
            {mockDepartments.map((dept) => (
              <TabsTrigger key={dept.id} value={dept.name.toLowerCase()} className="whitespace-nowrap">
                {locale === "ar" ? dept.nameAr : dept.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </motion.div>

      {/* Employees */}
      {filteredEmployees.length === 0 ? (
        <EmptyState
          title={locale === "ar" ? "لا يوجد موظفون" : "No employees found"}
          description={locale === "ar" ? "جرب البحث بكلمات مختلفة" : "Try different search terms"}
        />
      ) : (
        <motion.div variants={fadeIn}>
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredEmployees.map((emp, index) => (
                <motion.div
                  key={emp.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <UserAvatar src={emp.avatar} name={emp.name} size="xl" className="mx-auto" />
                      <h3 className="mt-4 font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-brand-600 transition-colors">
                        {locale === "ar" ? emp.nameAr : emp.name}
                      </h3>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        {locale === "ar" ? emp.positionAr : emp.position}
                      </p>
                      <Badge variant="secondary" className="mt-2 text-xs">
                        {locale === "ar" ? emp.departmentAr : emp.department}
                      </Badge>
                      <div className="mt-4 flex justify-center gap-2">
                        <Button variant="ghost" size="icon-sm" onClick={() => window.location.href = `mailto:${emp.email || emp.name.toLowerCase().replace(" ", ".")}@shareky.com`}>
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon-sm" onClick={() => { navigator.clipboard.writeText(emp.phone || "+20 10 1234 5678"); toast.success(locale === "ar" ? "تم نسق رقم الهاتف" : "Phone number copied"); }}>
                          <Phone className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredEmployees.map((emp, index) => (
                <motion.div
                  key={emp.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="group hover:shadow-md transition-all cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <UserAvatar src={emp.avatar} name={emp.name} size="lg" />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                            {locale === "ar" ? emp.nameAr : emp.name}
                          </h3>
                          <p className="text-sm text-neutral-500 dark:text-neutral-400">
                            {locale === "ar" ? emp.positionAr : emp.position}
                          </p>
                          <div className="flex items-center gap-3 mt-1 text-xs text-neutral-400">
                            <span className="flex items-center gap-1">
                              <Building2 className="h-3 w-3" />
                              {locale === "ar" ? emp.departmentAr : emp.department}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {locale === "ar" ? emp.locationAr : emp.location}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <Button variant="ghost" size="icon-sm" onClick={() => window.location.href = `mailto:${emp.email || emp.name.toLowerCase().replace(" ", ".")}@shareky.com`}>
                            <Mail className="h-4 w-4" />
                          </Button>
                          <ChevronRight className={cn("h-4 w-4 text-neutral-400", isRTL && "rotate-180")} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
