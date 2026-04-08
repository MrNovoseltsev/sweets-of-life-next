import Image from "next/image";
import Link from "next/link";
import PageLayout from "@/widgets/page-layout/ui/PageLayout";
import CatalogGrid from "@/widgets/catalog-grid/ui/CatalogGrid";
import { getLatestNews } from "@/entities/news/api";

export default async function Page() {
  const latestNews = getLatestNews(5);

  return (
    <PageLayout>
      <section className="p-2.5">
        <div className="flex items-baseline justify-between mb-1">
          <h2 className="text-2xl font-normal">
            <Link href="/catalog" className="hover:text-brand-light transition-colors">КАТАЛОГ</Link>
          </h2>
        </div>
        <div className="w-full h-px bg-brand ml-0 mb-4" />
        <CatalogGrid />
      </section>

      <section className="px-2.5 py-4">
        <div className="flex items-baseline justify-between mb-1">
          <h2 className="text-2xl font-normal">
            <Link href="/news" className="hover:text-brand-light transition-colors">НОВОСТИ</Link>
          </h2>
          <Link href="/news" className="text-sm text-brand hover:text-brand-light transition-colors">
            Все новости →
          </Link>
        </div>
        <div className="w-full h-px bg-brand ml-0 mb-4" />

        <div className="flex flex-col gap-4 ml-2.5">
          {latestNews.map((post) => {
            const content = (
              <>
                <div className="relative w-[90px] h-[90px] shrink-0 rounded-lg overflow-hidden bg-brand-light">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="90px"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-lg">{post.title}</span>
                  <p className="text-base leading-relaxed">{post.excerpt}</p>
                </div>
              </>
            );

            return post.url ? (
              <a
                key={post.id}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-4 items-start hover:opacity-80 transition-opacity"
              >
                {content}
              </a>
            ) : (
              <div key={post.id} className="flex gap-4 items-start">
                {content}
              </div>
            );
          })}
        </div>
      </section>
    </PageLayout>
  );
}
