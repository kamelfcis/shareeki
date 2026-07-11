import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/utils";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks";
import { KeyRound, ArrowRight, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export function ResetPasswordPage() {
  const { locale, isRTL } = useLocale();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error(locale === "ar" ? "كلمتا المرور غير متطابقتين" : "Passwords don't match");
      return;
    }
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success(
        locale === "ar" ? "تم إعادة التعيين بنجاح!" : "Password reset successful!",
        {
          description: locale === "ar"
            ? "يمكنك الآن تسجيل الدخول بكلمة المرور الجديدة"
            : "You can now sign in with your new password",
        }
      );
      navigate("/auth/login");
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

  return (
    <div className="w-full">
      <div className="mb-8 text-center lg:text-left">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-100 dark:bg-brand-900/50 mx-auto lg:mx-0">
          <KeyRound className="h-8 w-8 text-brand-600 dark:text-brand-400" />
        </div>
        <h2 className="text-[28px] font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
          {locale === "ar" ? "إعادة تعيين كلمة المرور" : "Reset Password"}
        </h2>
        <p className="mt-2 text-[15px] text-neutral-500 dark:text-neutral-400">
          {locale === "ar"
            ? "أدخل كلمة المرور الجديدة"
            : "Enter your new password"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* New Password */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            {locale === "ar" ? "كلمة المرور الجديدة" : "New Password"}
          </label>
          <div className="relative">
            <KeyRound className="pointer-events-none absolute top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-neutral-400 dark:text-neutral-500 start-3.5" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={locale === "ar" ? "أدخل كلمة المرور الجديدة" : "Enter new password"}
              required
              className={cn(inputClasses, "ps-11 pe-12")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center w-10 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors end-0"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            {locale === "ar" ? "تأكيد كلمة المرور" : "Confirm Password"}
          </label>
          <div className="relative">
            <KeyRound className="pointer-events-none absolute top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-neutral-400 dark:text-neutral-500 start-3.5" />
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder={locale === "ar" ? "أعد إدخال كلمة المرور" : "Re-enter password"}
              required
              className={cn(inputClasses, "ps-11 pe-12")}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center w-10 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors end-0"
              tabIndex={-1}
            >
              {showConfirm ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          className="h-12 w-full rounded-xl text-[15px] font-semibold shadow-lg shadow-brand-600/25 hover:shadow-xl hover:shadow-brand-600/30 transition-all duration-200"
          loading={loading}
        >
          {locale === "ar" ? "إعادة التعيين" : "Reset Password"}
          {isRTL ? <ArrowLeft className="h-4 w-4 ms-1.5" /> : <ArrowRight className="h-4 w-4 ms-1.5" />}
        </Button>
      </form>
    </div>
  );
}
