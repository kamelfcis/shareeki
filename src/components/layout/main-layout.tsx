import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/layout/sidebar";
import { Navbar } from "@/components/layout/navbar";
import { CommandPalette } from "@/components/shared/command-palette";
import { PageTransition } from "@/components/layout/page-transition";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { cn } from "@/utils";
import { useLocale, useSidebar } from "@/hooks";

export function MainLayout() {
  const { isRTL } = useLocale();
  const { isCollapsed } = useSidebar();

  useKeyboardShortcuts();

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <Sidebar />
      <div
        className={cn(
          "transition-all duration-300",
          isRTL ? "lg:mr-[280px]" : "lg:ml-[280px]",
          isCollapsed && (isRTL ? "lg:mr-[72px]" : "lg:ml-[72px]")
        )}
      >
        <Navbar />
        <main className="p-4 md:p-6 lg:p-8">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
      </div>
      <CommandPalette />
    </div>
  );
}
