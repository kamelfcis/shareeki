import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils";
import { useLocale } from "@/hooks";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { mockDepartments } from "@/mocks/data";
import {
  Search,
  Plus,
  Building2,
  Users,
  Edit,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

const fadeIn = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

const deptColors = [
  "from-brand-500 to-brand-600",
  "from-blue-500 to-blue-600",
  "from-accent-500 to-accent-600",
  "from-purple-500 to-purple-600",
  "from-yellow-500 to-yellow-600",
  "from-red-500 to-red-600",
  "from-teal-500 to-teal-600",
  "from-pink-500 to-pink-600",
];

export function AdminDepartmentsPage() {
  const { locale } = useLocale();
  const [search, setSearch] = useState("");
  const [departments, setDepartments] = useState(mockDepartments);
  const [showEdit, setShowEdit] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [editName, setEditName] = useState("");
  const [addName, setAddName] = useState("");

  const filtered = departments.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.manager.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = () => {
    if (!editName.trim()) return;
    setDepartments((prev) => prev.map((d) => d.id === showEdit ? { ...d, name: editName, nameAr: editName } : d));
    toast.success(locale === "ar" ? "تم التحديث" : "Updated");
    setShowEdit(null);
  };

  const handleDelete = (id: string, name: string) => {
    setDepartments((prev) => prev.filter((d) => d.id !== id));
    toast.success(locale === "ar" ? `تم حذف ${name}` : `Deleted ${name}`);
  };

  const handleAdd = () => {
    if (!addName.trim()) return;
    setDepartments((prev) => [...prev, {
      id: `dept_${Date.now()}`,
      name: addName,
      nameAr: addName,
      description: "New department",
      descriptionAr: "قسم جديد",
      manager: "TBD",
      managerAr: "يحدد لاحقاً",
      employeeCount: 0,
    }]);
    toast.success(locale === "ar" ? "تمت الإضافة" : "Added");
    setShowAdd(false);
    setAddName("");
  };

  const editDept = departments.find((d) => d.id === showEdit);

  return (
    <motion.div initial="initial" animate="animate" variants={fadeIn} className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            {locale === "ar" ? "إدارة الأقسام" : "Department Management"}
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            {filtered.length} {locale === "ar" ? "قسم" : "departments"}
          </p>
        </div>
        <Button size="sm" onClick={() => setShowAdd(true)}>
          <Plus className="h-4 w-4 me-2" />
          {locale === "ar" ? "إضافة قسم" : "Add Department"}
        </Button>
      </div>

      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={locale === "ar" ? "بحث عن قسم..." : "Search departments..."}
        leftIcon={<Search className="h-4 w-4" />}
        className="max-w-sm"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((dept, index) => (
          <motion.div
            key={dept.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className={cn("h-2 bg-gradient-to-r", deptColors[index % deptColors.length])} />
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className={cn("rounded-xl bg-gradient-to-br p-2.5 text-white", deptColors[index % deptColors.length])}>
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div className="flex gap-1 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon-sm" onClick={() => { setEditName(locale === "ar" ? dept.nameAr : dept.name); setShowEdit(dept.id); }}>
                      <Edit className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon-sm" className="text-red-500" onClick={() => handleDelete(dept.id, locale === "ar" ? dept.nameAr : dept.name)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                  {locale === "ar" ? dept.nameAr : dept.name}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-3 line-clamp-2">
                  {locale === "ar" ? dept.descriptionAr : dept.description}
                </p>
                <div className="flex items-center justify-between text-xs text-neutral-500">
                  <div className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    <span>{dept.employeeCount} {locale === "ar" ? "موظف" : "employees"}</span>
                  </div>
                  <span>{locale === "ar" ? dept.managerAr : dept.manager}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!showEdit} onOpenChange={() => setShowEdit(null)}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>{locale === "ar" ? "تعديل القسم" : "Edit Department"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {locale === "ar" ? "اسم القسم" : "Department Name"}
              </label>
              <Input value={editName} onChange={(e) => setEditName(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEdit(null)}>{locale === "ar" ? "إلغاء" : "Cancel"}</Button>
            <Button onClick={handleEdit}>{locale === "ar" ? "حفظ" : "Save"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Dialog */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>{locale === "ar" ? "إضافة قسم جديد" : "Add Department"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {locale === "ar" ? "اسم القسم" : "Department Name"}
              </label>
              <Input value={addName} onChange={(e) => setAddName(e.target.value)} placeholder={locale === "ar" ? "اسم القسم" : "e.g. Engineering"} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAdd(false)}>{locale === "ar" ? "إلغاء" : "Cancel"}</Button>
            <Button onClick={handleAdd}>{locale === "ar" ? "إضافة" : "Add"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
