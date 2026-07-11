import { cn } from "@/utils";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";

interface StatCardProps {
  title: string;
  titleAr?: string;
  value: string | number;
  change?: number;
  changeType?: "increase" | "decrease" | "neutral";
  icon: string;
  color?: string;
  className?: string;
}

export function StatCard({
  title,
  titleAr,
  value,
  change,
  changeType = "neutral",
  icon,
  color = "text-brand-500",
  className,
}: StatCardProps) {
  const IconComponent = (Icons as Record<string, LucideIcon>)[icon] || Icons.BarChart3;

  return (
    <Card className={cn("group hover:shadow-md transition-all duration-300 hover:-translate-y-0.5", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              {titleAr && title}
            </p>
            <p className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              {value}
            </p>
            {change !== undefined && (
              <div className="flex items-center gap-1">
                {changeType === "increase" ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : changeType === "decrease" ? (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                ) : (
                  <Minus className="h-4 w-4 text-muted-foreground" />
                )}
                <span
                  className={cn(
                    "text-xs font-medium",
                    changeType === "increase" && "text-green-600 dark:text-green-400",
                    changeType === "decrease" && "text-red-600 dark:text-red-400",
                    changeType === "neutral" && "text-muted-foreground"
                  )}
                >
                  {changeType === "increase" ? "+" : ""}
                  {change}%
                </span>
              </div>
            )}
          </div>
          <div className={cn("rounded-2xl bg-brand-50 p-3 dark:bg-brand-950", `bg-opacity-10`)}>
            <IconComponent className={cn("h-6 w-6", color)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
