import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-brand-100 text-brand-800 dark:bg-brand-900 dark:text-brand-200",
        secondary: "border-transparent bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200",
        destructive: "border-transparent bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
        outline: "border-neutral-200 text-neutral-700 dark:border-neutral-700 dark:text-neutral-300",
        success: "border-transparent bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
        warning: "border-transparent bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
        accent: "border-transparent bg-accent-100 text-accent-800 dark:bg-accent-900 dark:text-accent-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
