import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils";
import { useLocale } from "@/hooks";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { EmptyState } from "@/components/shared/empty-state";
import { mockArticles } from "@/mocks/data";
import { Article } from "@/types";
import {
  Search,
  Pin,
  TrendingUp,
  Clock,
  User,
  Bookmark,
  Share2,
  Tag,
  X,
} from "lucide-react";
import { toast } from "sonner";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

export function NewsPage() {
  const { locale, isRTL } = useLocale();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const filteredArticles = mockArticles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(search.toLowerCase());
    const matchesTab = activeTab === "all" ||
      (activeTab === "pinned" && article.pinned) ||
      (activeTab === "trending" && article.trending) ||
      (activeTab === article.category.toLowerCase());
    return matchesSearch && matchesTab;
  });

  const pinnedArticle = mockArticles.find((a) => a.pinned);
  const regularArticles = filteredArticles.filter((a) => a.id !== pinnedArticle?.id);

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
          <h1 className="text-2xl font-bold text-foreground">
            {locale === "ar" ? "الأخبار" : "News"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {locale === "ar" ? "آخر الأخبار والتحديثات" : "Latest news and updates"}
          </p>
        </div>
      </motion.div>

      {/* Pinned Article */}
      {pinnedArticle && (
        <motion.div variants={fadeIn}>
          <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => setSelectedArticle(pinnedArticle)}>
            <div className="md:flex">
              <div className="relative h-48 md:h-auto md:w-1/3">
                <img
                  src={pinnedArticle.image}
                  alt={pinnedArticle.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <Badge className="absolute top-3 start-3 bg-accent-500 text-white border-0">
                  <Pin className="h-3 w-3 me-1" />
                  {locale === "ar" ? "مثبت" : "Pinned"}
                </Badge>
              </div>
              <CardContent className="p-6 md:w-2/3">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{locale === "ar" ? pinnedArticle.categoryAr : pinnedArticle.category}</Badge>
                  {pinnedArticle.trending && (
                    <Badge variant="accent">
                      <TrendingUp className="h-3 w-3 me-1" />
                      {locale === "ar" ? "رائج" : "Trending"}
                    </Badge>
                  )}
                </div>
                <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-brand-600 transition-colors">
                  {locale === "ar" ? pinnedArticle.titleAr : pinnedArticle.title}
                </h2>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                  {locale === "ar" ? pinnedArticle.excerptAr : pinnedArticle.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {locale === "ar" ? pinnedArticle.authorAr : pinnedArticle.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {pinnedArticle.readTime} min read
                  </span>
                  <span>{pinnedArticle.publishedAt}</span>
                </div>
              </CardContent>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Search and Tabs */}
      <motion.div variants={fadeIn} className="space-y-4">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={locale === "ar" ? "بحث في الأخبار..." : "Search news..."}
          leftIcon={<Search className="h-4 w-4" />}
        />

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">{locale === "ar" ? "الكل" : "All"}</TabsTrigger>
            <TabsTrigger value="pinned">{locale === "ar" ? "مثبت" : "Pinned"}</TabsTrigger>
            <TabsTrigger value="trending">{locale === "ar" ? "رائج" : "Trending"}</TabsTrigger>
            <TabsTrigger value="announcement">{locale === "ar" ? "إعلان" : "Announcements"}</TabsTrigger>
          </TabsList>
        </Tabs>
      </motion.div>

      {/* Articles Grid */}
      {regularArticles.length === 0 ? (
        <EmptyState
          title={locale === "ar" ? "لا توجد أخبار" : "No news found"}
          description={locale === "ar" ? "جرب البحث بكلمات مختلفة" : "Try different search terms"}
        />
      ) : (
        <motion.div variants={fadeIn} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {regularArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="group overflow-hidden h-full hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => setSelectedArticle(article)}>
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <Badge className="absolute top-3 start-3 bg-card/90 backdrop-blur-sm text-foreground border-0">
                    {locale === "ar" ? article.categoryAr : article.category}
                  </Badge>
                </div>
                <CardContent className="p-4 flex flex-col h-full">
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-brand-600 transition-colors line-clamp-2">
                    {locale === "ar" ? article.titleAr : article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
                    {locale === "ar" ? article.excerptAr : article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.readTime} min
                      </span>
                      <span>{article.publishedAt}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon-sm" onClick={(e) => { e.stopPropagation(); toast.success(locale === "ar" ? "تمت الإضافة للمفضلة" : "Bookmarked"); }}>
                        <Bookmark className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon-sm" onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(window.location.href); toast.success(locale === "ar" ? "تم نسخ الرابط" : "Link copied"); }}>
                        <Share2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Article Detail Modal */}
      <Dialog open={!!selectedArticle} onOpenChange={() => setSelectedArticle(null)}>
        <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
          {selectedArticle && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{locale === "ar" ? selectedArticle.categoryAr : selectedArticle.category}</Badge>
                  {selectedArticle.pinned && <Badge className="bg-accent-500 text-white border-0"><Pin className="h-3 w-3 me-1" />{locale === "ar" ? "مثبت" : "Pinned"}</Badge>}
                  {selectedArticle.trending && <Badge variant="accent"><TrendingUp className="h-3 w-3 me-1" />{locale === "ar" ? "رائج" : "Trending"}</Badge>}
                </div>
                <DialogTitle className="text-xl font-bold text-start">
                  {locale === "ar" ? selectedArticle.titleAr : selectedArticle.title}
                </DialogTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                  <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" />{locale === "ar" ? selectedArticle.authorAr : selectedArticle.author}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{selectedArticle.readTime} min read</span>
                  <span>{selectedArticle.publishedAt}</span>
                </div>
              </DialogHeader>
              <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-56 object-cover rounded-xl" />
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p className="text-foreground leading-relaxed whitespace-pre-line">
                  {locale === "ar" ? selectedArticle.contentAr : selectedArticle.content}
                </p>
              </div>
              {selectedArticle.tags.length > 0 && (
                <>
                  <Separator />
                  <div className="flex items-center gap-2 flex-wrap">
                    <Tag className="h-3.5 w-3.5 text-muted-foreground" />
                    {selectedArticle.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                </>
              )}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" onClick={() => { toast.success(locale === "ar" ? "تمت الإضافة للمفضلة" : "Bookmarked"); }}>
                  <Bookmark className="h-4 w-4 me-1" />{locale === "ar" ? "حفظ" : "Bookmark"}
                </Button>
                <Button variant="outline" size="sm" onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success(locale === "ar" ? "تم نسخ الرابط" : "Link copied"); }}>
                  <Share2 className="h-4 w-4 me-1" />{locale === "ar" ? "مشاركة" : "Share"}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
