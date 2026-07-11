import { useMemo } from "react";
import { motion } from "framer-motion";
import type { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/utils";
import { useLocale } from "@/hooks";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "@/components/ui/avatar";
import { DataTable, SortableHeader } from "@/components/shared/data-table";
import { mockEmployees } from "@/mocks/data";
import type { Employee } from "@/types";
import {
  Plus,
  Download,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export function AdminUsersPage() {
  const { locale } = useLocale();

  const columns = useMemo<ColumnDef<Employee>[]>(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => (
          <SortableHeader column={column}>
            {locale === "ar" ? "الاسم" : "Name"}
          </SortableHeader>
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <UserAvatar src={row.original.avatar} name={row.original.name} size="sm" />
            <div>
              <p className="text-sm font-medium">{row.original.name}</p>
              <p className="text-xs text-neutral-500">{row.original.email}</p>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "department",
        header: ({ column }) => (
          <SortableHeader column={column}>
            {locale === "ar" ? "القسم" : "Department"}
          </SortableHeader>
        ),
        cell: ({ row }) => (
          <Badge variant="secondary">{row.original.department}</Badge>
        ),
      },
      {
        accessorKey: "position",
        header: locale === "ar" ? "المنصب" : "Position",
        cell: ({ row }) => (
          <span className="text-sm">{row.original.position}</span>
        ),
      },
      {
        accessorKey: "location",
        header: locale === "ar" ? "الموقع" : "Location",
        cell: ({ row }) => (
          <span className="text-sm text-neutral-500">{row.original.location}</span>
        ),
      },
      {
        accessorKey: "status",
        header: locale === "ar" ? "الحالة" : "Status",
        cell: ({ row }) => (
          <Badge variant={row.original.status === "active" ? "success" : "secondary"}>
            {row.original.status}
          </Badge>
        ),
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <div className="flex items-center gap-1 justify-end">
            <Button variant="ghost" size="icon-sm" onClick={() => toast.info(`${locale === "ar" ? "عرض" : "View"} ${row.original.name}`)}>
              <Eye className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="icon-sm" onClick={() => toast.info(`${locale === "ar" ? "تعديل" : "Edit"} ${row.original.name}`)}>
              <Edit className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="icon-sm" className="text-red-500 hover:text-red-600" onClick={() => toast.success(`${locale === "ar" ? "تم الحذف" : "Deleted"} ${row.original.name}`)}>
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        ),
      },
    ],
    [locale]
  );

  return (
    <motion.div initial="initial" animate="animate" variants={fadeIn} className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            {locale === "ar" ? "إدارة المستخدمين" : "User Management"}
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            {mockEmployees.length} {locale === "ar" ? "مستخدم" : "users"}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => toast.success(locale === "ar" ? "جاري التصدير..." : "Exporting...")}>
            <Download className="h-4 w-4 me-2" />
            {locale === "ar" ? "تصدير" : "Export"}
          </Button>
          <Button size="sm" onClick={() => toast.info(locale === "ar" ? "نموذج إضافة مستخدم" : "Add user form")}>
            <Plus className="h-4 w-4 me-2" />
            {locale === "ar" ? "إضافة مستخدم" : "Add User"}
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={mockEmployees}
        searchPlaceholder={locale === "ar" ? "بحث عن مستخدم..." : "Search users..."}
      />
    </motion.div>
  );
}
