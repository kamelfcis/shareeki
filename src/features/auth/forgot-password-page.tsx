import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/utils";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks";
import { Mail, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export function ForgotPasswordPage() {
  const { locale, isRTL } = useLocale();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSent(true);
      toast.success(
        locale === "ar" ? "تم الإرسال!" : "Email sent!",
        {
          description: locale === "ar"
            ? "تم إرسال رمز إعادة التعيين إلى بريدك الإلكتروني"
            : "A password reset code has been sent to your email",
        }
      );
    } catch {
      toast.error(locale === "ar" ? "خطأ" : "Error");
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = cn(
    "h-12 w-full rounded-xl border border-neutral-200 bg-white text-[15px] text-neutral-900 shadow-sm transition-all duration-200",
    "placeholder:text-neutral-400",
    "hover:border-neutral-300 hover:shadow-md",
    "focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500",
    "dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:border-neutral-600",
    "dark:placeholder:text-neutral-500",
    "dark:focus:ring-brand-500/20 dark:focus:border-brand-500"
  );

  if (sent) {
    return (
      <div className="w-full text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-100 dark:bg-brand-900/50 mx-auto">
          <CheckCircle className="h-8 w-8 text-brand-600 dark:text-brand-400" />
        </div>
        <h2 className="text-[28px] font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
          {locale === "ar" ? "تحقق من بريدك الإلكتروني" : "Check your email"}
        </h2>
        <p className="mt-2 text-[15px] text-neutral-500 dark:text-neutral-400">
          {locale === "ar"
            ? `أرسلنا رمز إعادة تعيين كلمة المرور إلى`
            : `We've sent a password reset code to`}
        </p>
        <p className="mt-1 text-[15px] font-medium text-neutral-700 dark:text-neutral-300">{email}</p>
        <div className="mt-8 space-y-3">
          <Button
            onClick={() => navigate("/auth/reset-password")}
            className="h-12 w-full rounded-xl text-[15px] font-semibold shadow-lg shadow-brand-600/25 hover:shadow-xl hover:shadow-brand-600/30 transition-all duration-200"
          >
            {locale === "ar" ? "إعادة تعيين كلمة المرور" : "Reset Password"}
            {isRTL ? <ArrowLeft className="h-4 w-4 ms-1.5" /> : <ArrowRight className="h-4 w-4 ms-1.5" />}
          </Button>
          <Button variant="ghost" onClick={() => setSent(false)} className="w-full h-12 rounded-xl text-[15px]">
            {locale === "ar" ? "إعادة الإرسال" : "Resend Email"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-8 text-center lg:text-left">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-100 dark:bg-brand-900/50 mx-auto lg:mx-0">
          <Mail className="h-8 w-8 text-brand-600 dark:text-brand-400" />
        </div>
        <h2 className="text-[28px] font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
          {locale === "ar" ? "نسيت كلمة المرور؟" : "Forgot your password?"}
        </h2>
        <p className="mt-2 text-[15px] text-neutral-500 dark:text-neutral-400">
          {locale === "ar"
            ? "أدخل بريدك الإلكتروني وسنرسل لك رمز إعادة التعيين"
            : "Enter your email and we'll send you a reset code"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            {locale === "ar" ? "البريد الإلكتروني" : "Email address"}
          </label>
          <div className="relative">
            <Mail className="pointer-events-none absolute top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-neutral-400 dark:text-neutral-500 start-3.5" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={locale === "ar" ? "name@company.com" : "name@company.com"}
              required
              className={cn(inputClasses, "ps-11 pe-4")}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="h-12 w-full rounded-xl text-[15px] font-semibold shadow-lg shadow-brand-600/25 hover:shadow-xl hover:shadow-brand-600/30 transition-all duration-200"
          loading={loading}
        >
          {locale === "ar" ? "إرسال رمز إعادة التعيين" : "Send Reset Code"}
          {isRTL ? <ArrowLeft className="h-4 w-4 ms-1.5" /> : <ArrowRight className="h-4 w-4 ms-1.5" />}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <Link
          to="/auth/login"
          className="text-[14px] font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 transition-colors"
        >
          {locale === "ar" ? "العودة إلى تسجيل الدخول" : "Back to sign in"}
        </Link>
      </div>
    </div>
  );
}
