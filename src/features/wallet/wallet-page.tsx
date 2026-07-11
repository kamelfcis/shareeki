import { useState } from "react";
import { motion } from "framer-motion";
import { cn, formatPrice, currencyLabel } from "@/utils";
import { useLocale } from "@/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { StatCard } from "@/components/shared/stat-card";
import { mockTransactions, walletData } from "@/mocks/data";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Gift,
  Star,
  CreditCard,
  Download,
  Plus,
  Minus,
  Receipt,
  Coins,
  Send,
} from "lucide-react";
import { toast } from "sonner";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

export function WalletPage() {
  const { locale, isRTL } = useLocale();
  const [activeTab, setActiveTab] = useState("all");
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [amount, setAmount] = useState("");

  const handleDeposit = () => {
    if (!amount || Number(amount) <= 0) {
      toast.error(locale === "ar" ? "أدخل مصغلاً صالحاً" : "Enter a valid amount");
      return;
    }
    toast.success(locale === "ar" ? "تم الإيداع بنجاح" : "Deposit successful", {
      description: formatPrice(Number(amount), locale),
    });
    setShowDeposit(false);
    setAmount("");
  };

  const handleWithdraw = () => {
    if (!amount || Number(amount) <= 0) {
      toast.error(locale === "ar" ? "أدخل مصغلاً صالحاً" : "Enter a valid amount");
      return;
    }
    if (Number(amount) > walletData.balance) {
      toast.error(locale === "ar" ? "الرصيد غير كافٍ" : "Insufficient balance");
      return;
    }
    toast.success(locale === "ar" ? "تم السحب بنجاح" : "Withdrawal successful", {
      description: formatPrice(Number(amount), locale),
    });
    setShowWithdraw(false);
    setAmount("");
  };

  const filteredTransactions = mockTransactions.filter((txn) => {
    if (activeTab === "all") return true;
    if (activeTab === "credit") return txn.type === "credit";
    if (activeTab === "debit") return txn.type === "debit";
    return true;
  });

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            {locale === "ar" ? "المحفظة" : "Wallet"}
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            {locale === "ar" ? "إدارة رصيدك ومكافآتك" : "Manage your balance and rewards"}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 me-2" />
            {locale === "ar" ? "تصدير" : "Export"}
          </Button>
        </div>
      </motion.div>

      {/* Balance Card */}
      <motion.div variants={fadeIn}>
        <Card className="relative overflow-hidden bg-gradient-to-r from-brand-600 via-brand-700 to-brand-800 text-white border-0">
          <div className="absolute inset-0 gradient-mesh opacity-20" />
          <CardContent className="relative p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <p className="text-white/70 text-sm mb-1">{locale === "ar" ? "الرصيد الحالي" : "Current Balance"}</p>
                <p className="text-4xl md:text-5xl font-bold">{formatPrice(walletData.balance, locale)}</p>
                <div className="flex items-center gap-2 mt-2">
                  <TrendingUp className="h-4 w-4 text-green-300" />
                  <span className="text-sm text-white/80">+12.5% {locale === "ar" ? "هذا الشهر" : "this month"}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm" onClick={() => setShowDeposit(true)}>
                  <Plus className="h-4 w-4 me-2" />
                  {locale === "ar" ? "إيداع" : "Deposit"}
                </Button>
                <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm" onClick={() => setShowWithdraw(true)}>
                  <Minus className="h-4 w-4 me-2" />
                  {locale === "ar" ? "سحب" : "Withdraw"}
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {[
                { icon: TrendingUp, label: locale === "ar" ? "إجمالي المدخول" : "Total Earned", value: formatPrice(walletData.totalEarned, locale), color: "text-green-300" },
                { icon: TrendingDown, label: locale === "ar" ? "إجمالي المصروف" : "Total Spent", value: formatPrice(walletData.totalSpent, locale), color: "text-red-300" },
                { icon: Gift, label: locale === "ar" ? "مكافآت معلقة" : "Pending Rewards", value: formatPrice(walletData.pendingRewards, locale), color: "text-yellow-300" },
                { icon: Coins, label: locale === "ar" ? "نقاط الولاء" : "Loyalty Points", value: "2,500", color: "text-blue-300" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl bg-white/10 backdrop-blur-sm p-3">
                  <stat.icon className={cn("h-4 w-4 mb-1", stat.color)} />
                  <p className="text-xs text-white/60">{stat.label}</p>
                  <p className="text-sm font-semibold">{stat.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Charts */}
      <motion.div variants={fadeIn} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              {locale === "ar" ? "الإيرادات والمصروفات" : "Income vs Expenses"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={walletData.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-neutral-200 dark:stroke-neutral-800" />
                <XAxis dataKey="month" className="text-xs" tick={{ fill: "#737373" }} />
                <YAxis className="text-xs" tick={{ fill: "#737373" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--background, white)",
                    border: "1px solid var(--border, #e5e5e5)",
                    borderRadius: "12px",
                    fontSize: "13px",
                  }}
                />
                <Bar dataKey="earned" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="spent" fill="#f97316" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              {locale === "ar" ? "الرصيد عبر الزمن" : "Balance Over Time"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={walletData.monthlyData}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-neutral-200 dark:stroke-neutral-800" />
                <XAxis dataKey="month" className="text-xs" tick={{ fill: "#737373" }} />
                <YAxis className="text-xs" tick={{ fill: "#737373" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e5e5",
                    borderRadius: "12px",
                  }}
                />
                <Area type="monotone" dataKey="earned" stroke="#10b981" strokeWidth={2} fill="url(#colorBalance)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Transactions */}
      <motion.div variants={fadeIn}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">
              {locale === "ar" ? "المعاملات" : "Transactions"}
            </CardTitle>
            <Button variant="ghost" size="sm">
              <Download className="h-4 w-4 me-2" />
              {locale === "ar" ? "تصدير" : "Export"}
            </Button>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
              <TabsList className="overflow-x-auto">
                <TabsTrigger value="all">{locale === "ar" ? "الكل" : "All"}</TabsTrigger>
                <TabsTrigger value="credit">{locale === "ar" ? "إيداعات" : "Credits"}</TabsTrigger>
                <TabsTrigger value="debit">{locale === "ar" ? "مصاريف" : "Debits"}</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="space-y-3">
              {filteredTransactions.map((txn) => (
                <div key={txn.id} className="flex items-center justify-between rounded-xl border border-neutral-200 p-3 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "rounded-xl p-2",
                      txn.type === "credit" ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400" : "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400"
                    )}>
                      {txn.type === "credit" ? <ArrowDownRight className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                        {locale === "ar" ? txn.descriptionAr : txn.description}
                      </p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        {locale === "ar" ? txn.categoryAr : txn.category} • {txn.date}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={cn(
                      "text-sm font-semibold",
                      txn.type === "credit" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                    )}>
                      {txn.type === "credit" ? "+" : "-"}{formatPrice(txn.amount, locale)}
                    </p>
                    <Badge variant={txn.status === "completed" ? "success" : "warning"} className="text-[10px]">
                      {txn.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Deposit Dialog */}
      <Dialog open={showDeposit} onOpenChange={setShowDeposit}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>{locale === "ar" ? "إيداع" : "Deposit"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {locale === "ar" ? `المبلغ (${currencyLabel(locale)})` : `Amount (${currencyLabel(locale)})`}
              </label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                min="1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeposit(false)}>
              {locale === "ar" ? "إلغاء" : "Cancel"}
            </Button>
            <Button onClick={handleDeposit}>
              <Send className="h-4 w-4 me-2" />
              {locale === "ar" ? "تأكيد" : "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Withdraw Dialog */}
      <Dialog open={showWithdraw} onOpenChange={setShowWithdraw}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>{locale === "ar" ? "سحب" : "Withdraw"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-neutral-500">
              {locale === "ar" ? "الرصيد المتاح:" : "Available balance:"} <span className="font-semibold text-neutral-900 dark:text-neutral-100">{formatPrice(walletData.balance, locale)}</span>
            </p>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {locale === "ar" ? `المبلغ (${currencyLabel(locale)})` : `Amount (${currencyLabel(locale)})`}
              </label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                min="1"
                max={walletData.balance}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowWithdraw(false)}>
              {locale === "ar" ? "إلغاء" : "Cancel"}
            </Button>
            <Button onClick={handleWithdraw}>
              <Send className="h-4 w-4 me-2" />
              {locale === "ar" ? "تأكيد" : "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
