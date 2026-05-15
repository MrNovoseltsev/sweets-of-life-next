import PageLayout from "@/widgets/page-layout/ui/PageLayout";
import Hero from "@/widgets/hero/ui/Hero";
import CatalogGrid from "@/widgets/catalog-grid/ui/CatalogGrid";
import NewsScroll from "@/widgets/news-scroll/ui/NewsScroll";
import { getLatestNews } from "@/entities/news/api";

export default async function Page() {
  const latestNews = await getLatestNews(8);

  return (
    <PageLayout>
      <Hero />

      <section className="sol-container pb-16">
        <CatalogGrid />
      </section>

      <NewsScroll posts={latestNews} />
    </PageLayout>
  );
}
