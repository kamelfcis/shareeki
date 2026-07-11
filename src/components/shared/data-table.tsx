import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { cn } from "@/utils";
import { useLocale } from "@/hooks";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
} from "lucide-react";

interface DataTableProps<TData> {
  columns: ColumnDef<TData, unknown>[];
  data: TData[];
  searchPlaceholder?: string;
  searchKey?: string;
  pageSize?: number;
}

export function DataTable<TData>({
  columns,
  data,
  searchPlaceholder = "Search...",
  pageSize = 10,
}: DataTableProps<TData>) {
  const { locale, isRTL } = useLocale();
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);

  const filteredData = useMemo(() => {
    if (!search) return data;
    return data.filter((row) =>
      Object.values(row as Record<string, unknown>).some(
        (val) =>
          val !== null &&
          val !== undefined &&
          String(val).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [data, search]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: { pagination: { pageSize } },
  });

  return (
    <Card>
      <CardContent className="p-0">
        <div className="p-4 border-b border-border">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={searchPlaceholder}
            leftIcon={<Search className="h-4 w-4" />}
            className="w-full sm:max-w-sm"
          />
        </div>

        <div className="overflow-x-auto -mx-px">
          <table className="w-full min-w-[640px]">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b border-border">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-start text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="px-4 py-12 text-center text-sm text-muted-foreground">
                    {locale === "ar" ? "لا توجد نتائج" : "No results found"}
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-border/50 hover:bg-muted transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3 text-sm text-foreground">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 border-t border-border gap-3">
          <p className="text-sm text-muted-foreground">
            {locale === "ar" ? "صفحة" : "Page"} {table.getState().pagination.pageIndex + 1}{" "}
            {locale === "ar" ? "من" : "of"} {table.getPageCount()}
          </p>
          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              aria-label={locale === "ar" ? "الصفحة السابقة" : "Previous page"}
            >
              <ChevronLeft className={cn("h-4 w-4", isRTL && "rotate-180")} />
            </Button>
            {Array.from({ length: Math.min(table.getPageCount(), 5) }, (_, i) => {
              const pageIndex = i;
              return (
                <Button
                  key={pageIndex}
                  variant={table.getState().pagination.pageIndex === pageIndex ? "default" : "outline"}
                  size="icon-sm"
                  onClick={() => table.setPageIndex(pageIndex)}
                  className="w-9 h-9"
                  aria-label={`${locale === "ar" ? "صفحة" : "Page"} ${pageIndex + 1}`}
                >
                  {pageIndex + 1}
                </Button>
              );
            })}
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              aria-label={locale === "ar" ? "الصفحة التالية" : "Next page"}
            >
              <ChevronRight className={cn("h-4 w-4", isRTL && "rotate-180")} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function SortableHeader({ children, column }: { children: React.ReactNode; column: { toggleSorting: (desc: boolean) => void; getIsSorted: () => string | false } }) {
  return (
    <button
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="flex items-center gap-1 hover:text-primary min-h-11 sm:min-h-0"
    >
      {children}
      <ArrowUpDown className="h-3 w-3" />
    </button>
  );
}
