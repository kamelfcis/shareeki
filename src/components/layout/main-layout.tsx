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
    <div className="min-h-dvh bg-background text-foreground overflow-x-hidden">
      <Sidebar />
      <div
        className={cn(
          "transition-all duration-300 min-w-0",
          isRTL ? "lg:mr-[280px]" : "lg:ml-[280px]",
          isCollapsed && (isRTL ? "lg:mr-[72px]" : "lg:ml-[72px]")
        )}
      >
        <Navbar />
        <main className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
      </div>
      <CommandPalette />
    </div>
  );
}
