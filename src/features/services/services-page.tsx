import { useState } from "react";
import { motion } from "framer-motion";
import { cn, formatPrice } from "@/utils";
import { useLocale } from "@/hooks";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { EmptyState } from "@/components/shared/empty-state";
import { mockServices } from "@/mocks/data";
import { SERVICE_CATEGORIES } from "@/constants";
import {
  Search,
  Star,
  Heart,
  ShoppingCart,
  Grid3X3,
  List,
  SlidersHorizontal,
  MapPin,
  Calendar,
  Send,
} from "lucide-react";
import { toast } from "sonner";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

export function ServicesPage() {
  const { locale, isRTL } = useLocale();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showBooking, setShowBooking] = useState<string | null>(null);
  const [bookingDate, setBookingDate] = useState("");

  const filteredServices = mockServices.filter((service) => {
    const matchesSearch = service.name.toLowerCase().includes(search.toLowerCase()) ||
      service.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "all" || service.category.toLowerCase().includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
    toast.success(favorites.includes(id)
      ? (locale === "ar" ? "تمت الإزالة من المفضلة" : "Removed from favorites")
      : (locale === "ar" ? "تمت الإضافة للمفضلة" : "Added to favorites")
    );
  };

  const handleBook = () => {
    toast.success(locale === "ar" ? "تم الحجز بنجاح!" : "Booking confirmed!", {
      description: bookingDate ? `${locale === "ar" ? "التاريخ" : "Date"}: ${bookingDate}` : undefined,
    });
    setShowBooking(null);
    setBookingDate("");
  };

  const bookedService = mockServices.find((s) => s.id === showBooking);

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
            {locale === "ar" ? "الخدمات" : "Services"}
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            {locale === "ar" ? "اكتشف الخدمات المتاحة لك" : "Discover services available to you"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "grid" ? "secondary" : "ghost"}
            size="icon-sm"
            onClick={() => setViewMode("grid")}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "secondary" : "ghost"}
            size="icon-sm"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={locale === "ar" ? "بحث عن الخدمات..." : "Search services..."}
            leftIcon={<Search className="h-4 w-4" />}
          />
        </div>
        <Button variant="outline" className="shrink-0">
          <SlidersHorizontal className="h-4 w-4 me-2" />
          {locale === "ar" ? "فلاتر متقدمة" : "Advanced Filters"}
        </Button>
      </motion.div>

      {/* Category Tabs */}
      <motion.div variants={fadeIn}>
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="w-full justify-start overflow-x-auto">
            {SERVICE_CATEGORIES.map((cat) => (
              <TabsTrigger key={cat.value} value={cat.value} className="whitespace-nowrap">
                {locale === "ar" ? cat.labelAr : cat.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </motion.div>

      {/* Services Grid */}
      {filteredServices.length === 0 ? (
        <EmptyState
          title={locale === "ar" ? "لا توجد خدمات" : "No services found"}
          description={locale === "ar" ? "جرب البحث بكلمات مختلفة" : "Try searching with different keywords"}
        />
      ) : (
        <motion.div
          variants={fadeIn}
          className={cn(
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              : "space-y-4"
          )}
        >
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              {viewMode === "grid" ? (
                <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={(e) => { e.stopPropagation(); toggleFavorite(service.id); }}
                      className={cn(
                        "absolute top-3 end-3 h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm",
                        favorites.includes(service.id) && "text-red-500"
                      )}
                    >
                      <Heart className={cn("h-4 w-4", favorites.includes(service.id) && "fill-current")} />
                    </Button>
                    {service.originalPrice && (
                      <Badge className="absolute top-3 start-3 bg-accent-500 text-white border-0">
                        -{Math.round(((service.originalPrice - service.price) / service.originalPrice) * 100)}%
                      </Badge>
                    )}
                    <div className="absolute bottom-3 left-3 right-3">
                      <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-neutral-700 border-0">
                        {locale === "ar" ? service.categoryAr : service.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 line-clamp-1">
                        {locale === "ar" ? service.nameAr : service.name}
                      </h3>
                      <div className="flex items-center gap-1 shrink-0">
                        <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-medium">{service.rating}</span>
                        <span className="text-xs text-neutral-400">({service.reviews})</span>
                      </div>
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 mb-3">
                      {locale === "ar" ? service.descriptionAr : service.description}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-neutral-500 mb-3">
                      <MapPin className="h-3 w-3" />
                      <span>{locale === "ar" ? service.providerAr : service.provider}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-brand-600">{formatPrice(service.price, locale)}</span>
                        {service.originalPrice && (
                          <span className="ms-1 text-sm text-neutral-400 line-through">
                            {formatPrice(service.originalPrice, locale)}
                          </span>
                        )}
                      </div>
                      <Button size="sm" className="rounded-xl" onClick={(e) => { e.stopPropagation(); setShowBooking(service.id); }}>
                        <ShoppingCart className="h-3.5 w-3.5 me-1" />
                        {locale === "ar" ? "احجز" : "Book"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="group overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer">
                  <CardContent className="p-0">
                    <div className="flex">
                      <div className="relative h-32 w-40 shrink-0 overflow-hidden">
                        <img
                          src={service.image}
                          alt={service.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {service.originalPrice && (
                           <Badge className="absolute top-2 start-2 bg-accent-500 text-white border-0 text-[10px]">
                            -{Math.round(((service.originalPrice - service.price) / service.originalPrice) * 100)}%
                          </Badge>
                        )}
                      </div>
                      <div className="flex-1 p-4 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <Badge variant="secondary" className="mb-1 text-[10px]">
                                {locale === "ar" ? service.categoryAr : service.category}
                              </Badge>
                              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                                {locale === "ar" ? service.nameAr : service.name}
                              </h3>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs font-medium">{service.rating}</span>
                            </div>
                          </div>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-1">
                            {locale === "ar" ? service.descriptionAr : service.description}
                          </p>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-3">
                            <span className="text-lg font-bold text-brand-600">{formatPrice(service.price, locale)}</span>
                            {service.originalPrice && (
                              <span className="text-sm text-neutral-400 line-through">{formatPrice(service.originalPrice, locale)}</span>
                            )}
                          </div>
                          <Button size="sm" className="rounded-xl" onClick={(e) => { e.stopPropagation(); setShowBooking(service.id); }}>
                            {locale === "ar" ? "احجز الآن" : "Book Now"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Booking Dialog */}
    <Dialog open={!!showBooking} onOpenChange={() => setShowBooking(null)}>
      <DialogContent className="sm:max-w-[480px]">
        {bookedService && (
          <>
            <DialogHeader>
              <DialogTitle>{locale === "ar" ? "حجز خدمة" : "Book Service"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                <img src={bookedService.image} alt="" className="h-14 w-14 rounded-lg object-cover" />
                <div>
                  <h4 className="font-medium text-neutral-900 dark:text-neutral-100">{locale === "ar" ? bookedService.nameAr : bookedService.name}</h4>
                  <p className="text-sm text-brand-600 font-semibold">{formatPrice(bookedService.price, locale)}</p>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  {locale === "ar" ? "التاريخ" : "Date"}
                </label>
                <div className="relative">
                  <Calendar className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="flex h-10 w-full rounded-xl border border-neutral-200 bg-white ps-10 pe-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowBooking(null)}>
                {locale === "ar" ? "إلغاء" : "Cancel"}
              </Button>
              <Button onClick={handleBook}>
                <Send className="h-4 w-4 me-2" />
                {locale === "ar" ? "تأكيد الحجز" : "Confirm Booking"}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
    </motion.div>
  );
}
