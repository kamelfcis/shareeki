import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks";
import { useLocale } from "@/hooks";
import { SharekyLogo } from "@/components/shared/shareky-logo";

const AUTH_BG_IMAGE =
  "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200";
const AUTH_BG_IMAGE_SECONDARY =
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200";

export function AuthLayout() {
  const { isAuthenticated } = useAuth();
  const { locale } = useLocale();
  const location = useLocation();

  if (isAuthenticated && location.pathname.startsWith("/auth")) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-dvh flex flex-col lg:flex-row bg-neutral-950">
      {/* Left Side - Futuristic Branding (hidden on mobile/tablet, visible on lg+) */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[50%] relative min-h-dvh overflow-hidden">
        {/* Unsplash background */}
        <div className="absolute inset-0">
          <img
            src={AUTH_BG_IMAGE}
            alt=""
            className="h-full w-full object-cover"
            draggable={false}
          />
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
            style={{ backgroundImage: `url(${AUTH_BG_IMAGE_SECONDARY})` }}
          />
        </div>

        {/* Gradient overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-950/90 via-brand-900/80 to-neutral-950/95" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-brand-600/10" />

        {/* Ambient glow orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/4 -start-1/4 h-[60vh] w-[60vh] rounded-full bg-brand-600/25 blur-[120px] animate-splash-pulse" />
          <div className="absolute -bottom-1/4 -end-1/4 h-[50vh] w-[50vh] rounded-full bg-brand-400/20 blur-[100px] animate-splash-pulse [animation-delay:1s]" />
          <div className="absolute top-1/2 start-1/2 h-[35vh] w-[35vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-500/10 blur-[80px] animate-splash-pulse [animation-delay:0.5s]" />
        </div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.06] animate-splash-grid pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(16,185,129,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.8) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 14 }).map((_, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-brand-400/50 animate-splash-particle"
              style={{
                width: `${2 + (i % 3)}px`,
                height: `${2 + (i % 3)}px`,
                left: `${(i * 19 + 3) % 95}%`,
                top: `${(i * 27 + 10) % 88}%`,
                animationDelay: `${(i * 0.3) % 2}s`,
                animationDuration: `${3 + (i % 4)}s`,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 flex min-h-dvh flex-col justify-between p-8 xl:p-12 w-full text-white">
          {/* Top - Large Logo with glow */}
          <div className="relative animate-splash-logo-enter">
            <div className="absolute -inset-4 scale-110 rounded-full bg-brand-500/20 blur-2xl animate-splash-glow" />
            <SharekyLogo
              size="2xl"
              locale={locale}
              className="relative text-white [&_span]:text-white [&_span:last-child]:text-brand-300/80"
              imgClassName="drop-shadow-[0_0_32px_rgba(16,185,129,0.5)]"
            />
          </div>

          {/* Center - Main Content */}
          <div className="flex-1 flex flex-col justify-center max-w-lg mx-auto w-full py-12">
            <div className="rounded-2xl border border-white/10 bg-card/5 backdrop-blur-md p-6 xl:p-8 shadow-2xl shadow-brand-900/20">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-400 mb-3">
                {locale === "ar" ? "قطاع البترول والطاقة" : "Petroleum & Energy Sector"}
              </p>
              <h2 className="text-3xl xl:text-4xl font-bold mb-4 leading-tight">
                {locale === "ar"
                  ? "منصة خدمات الموظفين الذكية"
                  : "Smart Employee Services Platform"}
              </h2>
              <p className="text-base text-white/70 leading-relaxed">
                {locale === "ar"
                  ? "حلول رقمية متكاملة للقطاع البترولي — إدارة المزايا، الخدمات، والمكافآت في مكان واحد"
                  : "Comprehensive digital solutions for the petroleum sector — manage benefits, services, and rewards in one place"}
              </p>

              {/* Feature list */}
              <div className="mt-8 space-y-3">
                {[
                  locale === "ar" ? "إدارة المزايا والمكافآت" : "Benefits & rewards management",
                  locale === "ar" ? "خدمات الموظفين الرقمية" : "Digital employee services",
                  locale === "ar" ? "تتبع الطلبات والمعاملات" : "Track requests & transactions",
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-500/20 border border-brand-400/30 shrink-0 shadow-[0_0_12px_rgba(16,185,129,0.25)]">
                      <svg className="h-3.5 w-3.5 text-brand-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-white/85">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom - Stats */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: "5,000+", label: locale === "ar" ? "موظف" : "Employees" },
              { value: "200+", label: locale === "ar" ? "خدمة" : "Services" },
              { value: "50+", label: locale === "ar" ? "شريك" : "Partners" },
              { value: "99.9%", label: locale === "ar" ? "وقت التشغيل" : "Uptime" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl bg-card/5 backdrop-blur-md border border-white/10 px-4 py-3 shadow-lg shadow-brand-900/10 hover:border-brand-400/30 transition-colors duration-300"
              >
                <p className="text-lg font-bold leading-none text-brand-300">{stat.value}</p>
                <p className="text-xs text-white/50 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Form Content */}
      <div className="relative flex-1 flex items-center justify-center min-h-dvh lg:min-h-auto p-4 sm:p-6 md:p-8 lg:p-12 overflow-hidden">
        {/* Dark futuristic background */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-[#021a14] to-neutral-950" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(16,185,129,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.8) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Ambient glow on form side */}
        <div className="absolute top-0 end-0 w-[400px] h-[400px] rounded-full bg-brand-600/10 blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 start-0 w-[300px] h-[300px] rounded-full bg-brand-400/8 blur-[80px] translate-y-1/4 -translate-x-1/4 pointer-events-none" />

        <div className="relative z-10 w-full max-w-[440px]">
          {/* Mobile Logo */}
          <div className="relative mb-8 lg:hidden flex justify-center animate-splash-logo-enter">
            <div className="absolute inset-0 scale-110 rounded-full bg-brand-500/15 blur-2xl animate-splash-glow" />
            <SharekyLogo
              size="xl"
              locale={locale}
              className="relative [&_span:first-of-type]:text-white [&_span:last-child]:text-brand-300/70"
              imgClassName="drop-shadow-[0_0_24px_rgba(16,185,129,0.45)]"
            />
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
