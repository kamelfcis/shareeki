import { cn } from "@/utils";
import { APP_NAME, APP_NAME_AR, LOGO_PATH } from "@/constants";

const sizeMap = {
  xs: { img: "h-8 w-8", text: "text-sm", sub: "text-[10px]" },
  sm: { img: "h-9 w-9", text: "text-base", sub: "text-[10px]" },
  md: { img: "h-11 w-11", text: "text-lg", sub: "text-[11px]" },
  lg: { img: "h-14 w-14", text: "text-xl", sub: "text-xs" },
  xl: { img: "h-24 w-24 sm:h-28 sm:w-28", text: "text-2xl sm:text-3xl", sub: "text-sm" },
  "2xl": { img: "h-32 w-32 sm:h-36 sm:w-36", text: "text-3xl sm:text-4xl", sub: "text-base sm:text-lg" },
} as const;

interface SharekyLogoProps {
  size?: keyof typeof sizeMap;
  showText?: boolean;
  locale?: "en" | "ar";
  className?: string;
  imgClassName?: string;
  subtitle?: string;
  subtitleAr?: string;
}

export function SharekyLogo({
  size = "sm",
  showText = true,
  locale = "en",
  className,
  imgClassName,
  subtitle,
  subtitleAr,
}: SharekyLogoProps) {
  const sizes = sizeMap[size];
  const defaultSubtitle = locale === "ar" ? "شريكي" : "Enterprise Platform";
  const displaySubtitle = locale === "ar" ? (subtitleAr ?? subtitle ?? defaultSubtitle) : (subtitle ?? defaultSubtitle);

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <img
        src={LOGO_PATH}
        alt={locale === "ar" ? APP_NAME_AR : APP_NAME}
        className={cn(sizes.img, "shrink-0 object-contain drop-shadow-lg", imgClassName)}
        draggable={false}
      />
      {showText && (
        <div className="flex flex-col min-w-0">
          <span className={cn(sizes.text, "font-bold leading-none tracking-tight")}>
            {locale === "ar" ? APP_NAME_AR : APP_NAME}
          </span>
          <span className={cn(sizes.sub, "leading-none mt-1 opacity-70")}>
            {displaySubtitle}
          </span>
        </div>
      )}
    </div>
  );
}
