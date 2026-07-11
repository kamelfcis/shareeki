import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/utils";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  employeeId: z.string().min(3, "Employee ID is required"),
  department: z.string().min(1, "Department is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterForm = z.infer<typeof registerSchema>;

export function RegisterPage() {
  const { locale, isRTL } = useLocale();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (_data: RegisterForm) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success(
        locale === "ar" ? "تم التسجيل بنجاح!" : "Registration successful!",
        {
          description: locale === "ar"
            ? "تم إرسال رمز التحقق إلى بريدك الإلكتروني"
            : "A verification code has been sent to your email",
        }
      );
      navigate("/auth/otp");
    } catch {
      toast.error(locale === "ar" ? "خطأ في التسجيل" : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = cn(
    "h-12 w-full rounded-xl border bg-white text-[15px] text-neutral-900 shadow-sm transition-all duration-200",
    "placeholder:text-neutral-400",
    "hover:border-neutral-300 hover:shadow-md",
    "focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500",
    "dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:border-neutral-600",
    "dark:placeholder:text-neutral-500",
    "dark:focus:ring-brand-500/20 dark:focus:border-brand-500",
    "border-neutral-200"
  );

  const selectClasses = cn(
    "h-12 w-full rounded-xl border bg-white text-[15px] text-neutral-900 shadow-sm transition-all duration-200",
    "hover:border-neutral-300 hover:shadow-md",
    "focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500",
    "dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:border-neutral-600",
    "dark:focus:ring-brand-500/20 dark:focus:border-brand-500",
    "border-neutral-200"
  );

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-[28px] font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
          {locale === "ar" ? "إنشاء حساب جديد" : "Create an account"}
        </h2>
        <p className="mt-2 text-[15px] text-neutral-500 dark:text-neutral-400">
          {locale === "ar"
            ? "سجل للحصول على منصة شريكي"
            : "Register to access the Shareky platform"}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            {locale === "ar" ? "الاسم الكامل" : "Full Name"}
          </label>
          <div className="relative">
            <User className="pointer-events-none absolute top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-neutral-400 dark:text-neutral-500 start-3.5" />
            <input
              {...register("name")}
              type="text"
              placeholder={locale === "ar" ? "أدخل اسمك الكامل" : "Enter your full name"}
              className={cn(inputClasses, "ps-11 pe-4", errors.name && "border-red-500 focus:ring-red-500/20 focus:border-red-500")}
            />
          </div>
          {errors.name && <p className="text-[13px] text-red-500 mt-1">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            {locale === "ar" ? "البريد الإلكتروني" : "Work Email"}
          </label>
          <div className="relative">
            <Mail className="pointer-events-none absolute top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-neutral-400 dark:text-neutral-500 start-3.5" />
            <input
              {...register("email")}
              type="email"
              placeholder={locale === "ar" ? "name@company.com" : "name@company.com"}
              className={cn(inputClasses, "ps-11 pe-4", errors.email && "border-red-500 focus:ring-red-500/20 focus:border-red-500")}
            />
          </div>
          {errors.email && <p className="text-[13px] text-red-500 mt-1">{errors.email.message}</p>}
        </div>

        {/* Employee ID + Department */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {locale === "ar" ? "رقم الموظف" : "Employee ID"}
            </label>
            <input
              {...register("employeeId")}
              type="text"
              placeholder="EMP-001"
              className={cn(inputClasses, "px-4", errors.employeeId && "border-red-500 focus:ring-red-500/20 focus:border-red-500")}
            />
            {errors.employeeId && <p className="text-[13px] text-red-500 mt-1">{errors.employeeId.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {locale === "ar" ? "القسم" : "Department"}
            </label>
            <select
              {...register("department")}
              className={cn(selectClasses, "px-4", errors.department && "border-red-500 focus:ring-red-500/20 focus:border-red-500")}
            >
              <option value="">{locale === "ar" ? "اختر" : "Select"}</option>
              <option value="engineering">{locale === "ar" ? "الهندسة" : "Engineering"}</option>
              <option value="hr">{locale === "ar" ? "الموارد البشرية" : "Human Resources"}</option>
              <option value="finance">{locale === "ar" ? "المالية" : "Finance"}</option>
              <option value="operations">{locale === "ar" ? "العمليات" : "Operations"}</option>
              <option value="marketing">{locale === "ar" ? "التسويق" : "Marketing"}</option>
            </select>
            {errors.department && <p className="text-[13px] text-red-500 mt-1">{errors.department.message}</p>}
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            {locale === "ar" ? "كلمة المرور" : "Password"}
          </label>
          <div className="relative">
            <Lock className="pointer-events-none absolute top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-neutral-400 dark:text-neutral-500 start-3.5" />
            <input
              {...register("password")}
              type="password"
              placeholder={locale === "ar" ? "أنشئ كلمة مرور" : "Create a password"}
              className={cn(inputClasses, "ps-11 pe-4", errors.password && "border-red-500 focus:ring-red-500/20 focus:border-red-500")}
            />
          </div>
          {errors.password && <p className="text-[13px] text-red-500 mt-1">{errors.password.message}</p>}
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            {locale === "ar" ? "تأكيد كلمة المرور" : "Confirm Password"}
          </label>
          <div className="relative">
            <Lock className="pointer-events-none absolute top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-neutral-400 dark:text-neutral-500 start-3.5" />
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder={locale === "ar" ? "أعد إدخال كلمة المرور" : "Re-enter password"}
              className={cn(inputClasses, "ps-11 pe-4", errors.confirmPassword && "border-red-500 focus:ring-red-500/20 focus:border-red-500")}
            />
          </div>
          {errors.confirmPassword && <p className="text-[13px] text-red-500 mt-1">{errors.confirmPassword.message}</p>}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="h-12 w-full rounded-xl text-[15px] font-semibold shadow-lg shadow-brand-600/25 hover:shadow-xl hover:shadow-brand-600/30 transition-all duration-200"
          loading={loading}
        >
          {locale === "ar" ? "إنشاء الحساب" : "Create Account"}
          <ArrowRight className={cn("h-4 w-4 ms-1.5 transition-transform", isRTL && "rotate-180")} />
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-[14px] text-neutral-500 dark:text-neutral-400">
          {locale === "ar" ? "لديك حساب بالفعل؟" : "Already have an account?"}{" "}
          <Link
            to="/auth/login"
            className="font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 transition-colors"
          >
            {locale === "ar" ? "تسجيل الدخول" : "Sign in"}
          </Link>
        </p>
      </div>
    </div>
  );
}
