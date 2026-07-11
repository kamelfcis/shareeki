import { useEffect, useState } from "react";
import { cn } from "@/utils";
import { APP_NAME, APP_NAME_AR, LOGO_PATH } from "@/constants";

const SPLASH_DURATION_MS = 2800;
const FADE_OUT_MS = 600;

interface SplashScreenProps {
  onComplete: () => void;
}

function getInitialLocale(): "en" | "ar" {
  const stored = localStorage.getItem("locale");
  return stored === "ar" ? "ar" : "en";
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<"enter" | "exit">("enter");
  const [locale] = useState(getInitialLocale);
  const isRTL = locale === "ar";

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const exitTimer = window.setTimeout(() => setPhase("exit"), SPLASH_DURATION_MS);
    const completeTimer = window.setTimeout(onComplete, SPLASH_DURATION_MS + FADE_OUT_MS);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      lang={locale}
      aria-hidden={phase === "exit"}
      className={cn(
        "fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden",
        "bg-gradient-to-br from-neutral-950 via-[#021a14] to-neutral-950",
        phase === "enter" ? "animate-splash-fade-in" : "animate-splash-fade-out pointer-events-none"
      )}
    >
      {/* Ambient glow orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/4 -start-1/4 h-[60vh] w-[60vh] rounded-full bg-brand-600/20 blur-[120px] animate-splash-pulse" />
        <div className="absolute -bottom-1/4 -end-1/4 h-[50vh] w-[50vh] rounded-full bg-brand-400/15 blur-[100px] animate-splash-pulse [animation-delay:1s]" />
        <div className="absolute top-1/2 start-1/2 h-[40vh] w-[40vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-500/10 blur-[80px] animate-splash-pulse [animation-delay:0.5s]" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.07] animate-splash-grid"
        style={{
          backgroundImage:
            "linear-gradient(rgba(16,185,129,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.8) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-brand-400/40 animate-splash-particle"
            style={{
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              left: `${(i * 17 + 5) % 95}%`,
              top: `${(i * 23 + 8) % 90}%`,
              animationDelay: `${(i * 0.25) % 2}s`,
              animationDuration: `${3 + (i % 4)}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <div className="relative mb-8 animate-splash-logo-enter">
          <div className="absolute inset-0 scale-110 rounded-full bg-brand-500/20 blur-2xl animate-splash-glow" />
          <img
            src={LOGO_PATH}
            alt={locale === "ar" ? APP_NAME_AR : APP_NAME}
            className="relative h-28 w-28 sm:h-32 sm:w-32 object-contain drop-shadow-[0_0_32px_rgba(16,185,129,0.45)]"
            draggable={false}
          />
        </div>

        <h1
          className={cn(
            "font-bold tracking-tight text-white animate-splash-text-enter",
            "text-3xl sm:text-4xl"
          )}
        >
          {locale === "ar" ? APP_NAME_AR : APP_NAME}
        </h1>

        <p className="mt-2 text-sm sm:text-base text-brand-300/80 animate-splash-text-enter [animation-delay:200ms]">
          {locale === "ar"
            ? "منصة خدمات الموظفين المؤسسية"
            : "Enterprise Employee Services Platform"}
        </p>

        <p className="mt-1 text-xs text-muted-foreground animate-splash-text-enter [animation-delay:350ms]">
          {locale === "ar" ? "قطاع البترول والطاقة" : "Petroleum & Energy Sector"}
        </p>

        {/* Progress bar */}
        <div className="mt-10 h-0.5 w-48 sm:w-56 overflow-hidden rounded-full bg-card/10">
          <div className="h-full rounded-full bg-gradient-to-r from-brand-600 via-brand-400 to-brand-300 animate-splash-progress" />
        </div>
      </div>
    </div>
  );
}
