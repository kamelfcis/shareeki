import * as React from "react";
import { cn } from "@/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-xl bg-neutral-200 dark:bg-neutral-800", className)}
      {...props}
    />
  );
}

export { Skeleton };
