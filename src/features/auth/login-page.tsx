import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/utils";
import { Button } from "@/components/ui/button";
import { useAuth, useLocale } from "@/hooks";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Info } from "lucide-react";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

export function LoginPage() {
  const { login } = useAuth();
  const { locale, isRTL } = useLocale();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "ahmed.hassan@shareky.com",
      password: "password123",
    },
  });

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      login(data.email, data.password);
      toast.success(
        locale === "ar" ? "مرحباً بك!" : "Welcome back!",
        {
          description: locale === "ar"
            ? "تم تسجيل الدخول بنجاح"
            : "You have successfully logged in",
        }
      );
      navigate("/dashboard");
    } catch {
      toast.error(
        locale === "ar" ? "خطأ في تسجيل الدخول" : "Login failed",
        {
          description: locale === "ar"
            ? "يرجى التحقق من بيانات الدخول"
            : "Please check your credentials",
        }
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (hasError: boolean) =>
    cn(
      "h-12 w-full rounded-xl border bg-card/5 text-[15px] text-white shadow-sm transition-all duration-200",
      "placeholder:text-muted-foreground",
      "hover:border-white/20 hover:bg-card/[0.07]",
      "focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500/50 focus:bg-card/[0.07]",
      "ps-11 pe-4",
      hasError
        ? "border-red-500/60 focus:ring-red-500/20 focus:border-red-500"
        : "border-white/10"
    );

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-card/5 backdrop-blur-xl p-6 sm:p-8 shadow-2xl shadow-brand-900/20">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-[28px] font-bold text-white tracking-tight">
          {locale === "ar" ? "مرحباً بك" : "Welcome back"}
        </h2>
        <p className="mt-2 text-[15px] text-muted-foreground">
          {locale === "ar"
            ? "سجل الدخول للوصول إلى حسابك"
            : "Sign in to access your account"}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email Field */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-neutral-300">
            {locale === "ar" ? "البريد الإلكتروني" : "Email address"}
          </label>
          <div className="relative">
            <Mail className="pointer-events-none absolute top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-muted-foreground start-3.5" />
            <input
              {...register("email")}
              type="email"
              placeholder={locale === "ar" ? "name@company.com" : "name@company.com"}
              className={cn(inputClass(!!errors.email), "pe-4")}
            />
          </div>
          {errors.email && (
            <p className="text-[13px] text-red-400 mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-neutral-300">
              {locale === "ar" ? "كلمة المرور" : "Password"}
            </label>
            <Link
              to="/auth/forgot-password"
              className="text-[13px] font-medium text-brand-400 hover:text-brand-300 transition-colors"
            >
              {locale === "ar" ? "نسيت كلمة المرور؟" : "Forgot password?"}
            </Link>
          </div>
          <div className="relative">
            <Lock className="pointer-events-none absolute top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-muted-foreground start-3.5" />
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder={locale === "ar" ? "••••••••" : "••••••••"}
              className={cn(inputClass(!!errors.password), "pe-12")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center w-10 text-muted-foreground hover:text-neutral-300 transition-colors end-0"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-[13px] text-red-400 mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Remember Me */}
        <div className="flex items-center">
          <label className="flex items-center gap-2.5 cursor-pointer group">
            <button
              type="button"
              role="switch"
              aria-checked={rememberMe}
              onClick={() => setRememberMe(!rememberMe)}
              className={cn(
                "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:ring-offset-2 focus:ring-offset-transparent",
                rememberMe ? "bg-brand-600" : "bg-neutral-600"
              )}
            >
              <span
                className={cn(
                  "inline-block h-4 w-4 rounded-full bg-card shadow-sm transition-transform duration-200",
                  rememberMe ? "translate-x-4 rtl:-translate-x-4" : "translate-x-0.5 rtl:-translate-x-0.5"
                )}
              />
            </button>
            <span className="text-[14px] text-muted-foreground select-none">
              {locale === "ar" ? "تذكرني" : "Remember me"}
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="h-12 w-full rounded-xl text-[15px] font-semibold shadow-lg shadow-brand-600/30 hover:shadow-xl hover:shadow-brand-500/40 transition-all duration-200"
          loading={loading}
        >
          {locale === "ar" ? "تسجيل الدخول" : "Sign in"}
          <ArrowRight className={cn("h-4 w-4 ms-1.5 transition-transform", isRTL && "rotate-180")} />
        </Button>
      </form>

      {/* Divider */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10" />
        </div>
        <div className="relative flex justify-center text-[13px]">
          <span className="bg-transparent px-4 text-muted-foreground">
            {locale === "ar" ? "أو" : "or"}
          </span>
        </div>
      </div>

      {/* Sign Up Link */}
      <p className="text-center text-[14px] text-muted-foreground">
        {locale === "ar" ? "ليس لديك حساب؟" : "Don't have an account?"}{" "}
        <Link
          to="/auth/register"
          className="font-semibold text-brand-400 hover:text-brand-300 transition-colors"
        >
          {locale === "ar" ? "سجل الآن" : "Sign up for free"}
        </Link>
      </p>

      {/* Demo Credentials */}
      <div className="mt-8 rounded-xl border border-white/10 bg-card/[0.03] backdrop-blur-sm p-4">
        <div className="flex items-start gap-2.5">
          <Info className="h-4 w-4 text-brand-400/70 mt-0.5 shrink-0" />
          <div className="text-[13px] space-y-1.5">
            <p className="font-medium text-neutral-300">
              {locale === "ar" ? "حسابات تجريبية:" : "Demo accounts:"}
            </p>
            <div className="space-y-1 text-muted-foreground">
              <p>
                <span className="font-medium text-muted-foreground">Employee:</span>{" "}
                ahmed.hassan@shareky.com
              </p>
              <p>
                <span className="font-medium text-muted-foreground">Admin:</span>{" "}
                admin@shareky.com
              </p>
              <p className="text-muted-foreground">
                Password: password123
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
