import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks";
import { cn } from "@/utils";
import { ArrowLeft, Home, Search } from "lucide-react";

export function NotFoundPage() {
  const { locale, isRTL } = useLocale();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <div className="relative mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[120px] font-bold text-brand-100 dark:text-brand-900 leading-none"
          >
            404
          </motion.div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-2xl bg-card p-4 shadow-xl">
              <Search className="h-8 w-8 text-brand-500" />
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-2">
          {locale === "ar" ? "الصفحة غير موجودة" : "Page Not Found"}
        </h1>
        <p className="text-muted-foreground mb-8">
          {locale === "ar"
            ? "عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها."
            : "Sorry, the page you're looking for doesn't exist or has been moved."}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild>
            <Link to="/dashboard">
              <Home className="h-4 w-4 me-2" />
              {locale === "ar" ? "العودة للرئيسية" : "Go to Dashboard"}
            </Link>
          </Button>
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className={cn("h-4 w-4 me-2", isRTL && "rotate-180")} />
            {locale === "ar" ? "رجوع" : "Go Back"}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
