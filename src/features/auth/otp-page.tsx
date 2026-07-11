import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/utils";
import { Button } from "@/components/ui/button";
import { useLocale, useAuth } from "@/hooks";
import { KeyRound, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export function OtpPage() {
  const { locale, isRTL } = useLocale();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [verified, setVerified] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted) {
      const newOtp = pasted.split("").concat(Array(6).fill("")).slice(0, 6);
      setOtp(newOtp);
      const nextEmpty = newOtp.findIndex((d) => !d);
      inputRefs.current[nextEmpty === -1 ? 5 : nextEmpty]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length !== 6) {
      toast.error(locale === "ar" ? "أدخل الرمز كاملاً" : "Please enter the complete code");
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setVerified(true);
      setTimeout(() => {
        login("ahmed.hassan@shareky.com", "password123");
        navigate("/dashboard");
      }, 1500);
    } catch {
      toast.error(locale === "ar" ? "رمز غير صحيح" : "Invalid code");
    } finally {
      setLoading(false);
    }
  };

  if (verified) {
    return (
      <div className="w-full text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 dark:bg-green-900/50 mx-auto">
          <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="text-[28px] font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
          {locale === "ar" ? "تم التحقق بنجاح!" : "Verified Successfully!"}
        </h2>
        <p className="mt-2 text-[15px] text-neutral-500 dark:text-neutral-400">
          {locale === "ar" ? "جاري التحويل..." : "Redirecting..."}
        </p>
      </div>
    );
  }

  const inputClasses = cn(
    "h-14 w-12 text-center text-xl font-bold rounded-xl border border-neutral-200 bg-white shadow-sm transition-all duration-200",
    "focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500",
    "dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:ring-brand-500/20 dark:focus:border-brand-500"
  );

  return (
    <div className="w-full">
      <div className="mb-8 text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-100 dark:bg-brand-900/50 mx-auto">
          <KeyRound className="h-8 w-8 text-brand-600 dark:text-brand-400" />
        </div>
        <h2 className="text-[28px] font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
          {locale === "ar" ? "التحقق من الرمز" : "Verify Code"}
        </h2>
        <p className="mt-2 text-[15px] text-neutral-500 dark:text-neutral-400">
          {locale === "ar"
            ? "أدخل الرمز المكون من 6 أرقام المرسل إلى بريدك الإلكتروني"
            : "Enter the 6-digit code sent to your email"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-center gap-2 sm:gap-3" dir="ltr">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => { inputRefs.current[index] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className={cn(inputClasses, digit && "border-brand-500 dark:border-brand-500")}
            />
          ))}
        </div>

        <Button
          type="submit"
          className="h-12 w-full rounded-xl text-[15px] font-semibold shadow-lg shadow-brand-600/25 hover:shadow-xl hover:shadow-brand-600/30 transition-all duration-200"
          loading={loading}
        >
          {locale === "ar" ? "تحقق" : "Verify"}
          {isRTL ? <ArrowLeft className="h-4 w-4 ms-1.5" /> : <ArrowRight className="h-4 w-4 ms-1.5" />}
        </Button>

        <div className="text-center">
          <p className="text-[14px] text-neutral-500 dark:text-neutral-400">
            {locale === "ar" ? "لم تتلق الرمز؟" : "Didn't receive the code?"}{" "}
            <button
              type="button"
              className="font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 transition-colors"
            >
              {locale === "ar" ? "إعادة الإرسال" : "Resend"}
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}
