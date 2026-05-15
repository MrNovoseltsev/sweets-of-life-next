import Image from "next/image";
import Link from "next/link";
import PageLayout from "@/widgets/page-layout/ui/PageLayout";
import Breadcrumbs from "@/shared/ui/Breadcrumbs";
import SectionHeader from "@/shared/ui/SectionHeader";
import { getNewsPaginated } from "@/entities/news/api";

type Props = { searchParams: Promise<{ page?: string }> };

export default async function NewsPage({ searchParams }: Props) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);
  const { posts, totalPages } = await getNewsPaginated(page);

  return (
    <PageLayout>
      <section className="sol-container py-11">
        <Breadcrumbs
          items={[{ label: "Главная", href: "/" }, { label: "Новости" }]}
        />
        <SectionHeader title="Новости" />

        <div className="grid grid-cols-1 gap-6 [grid-template-columns:repeat(auto-fill,minmax(280px,1fr))]">
          {posts.map((post) => {
            const card = (
              <>
                <div className="relative h-[200px] w-full overflow-hidden bg-brand-pale">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 320px"
                  />
                </div>
                <div className="px-[18px] pb-5 pt-4">
                  <p className="mb-1.5 text-[10px] tracking-[0.12em] text-brand/50">
                    {post.date}
                  </p>
                  <h3 className="mb-2 font-display text-[19px] font-normal leading-[1.3] text-brand">
                    {post.title}
                  </h3>
                  <p className="text-[12.5px] leading-[1.55] text-brand/75 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </>
            );

            const cardClass =
              "block overflow-hidden rounded-[12px] border border-brand/[0.09] bg-white transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_28px_rgba(30,89,69,0.1)]";

            return post.url ? (
              <a
                key={post.id}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cardClass}
              >
                {card}
              </a>
            ) : (
              <div key={post.id} className={cardClass}>
                {card}
              </div>
            );
          })}
        </div>

        {totalPages > 1 && (
          <nav className="mt-9 flex flex-wrap gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={`/news?page=${p}`}
                className={`flex h-8 w-8 items-center justify-center rounded-full border border-brand/20 text-[13px] transition-colors hover:bg-brand hover:text-white ${
                  p === page ? "bg-brand text-white" : "text-brand"
                }`}
              >
                {p}
              </Link>
            ))}
          </nav>
        )}
      </section>
    </PageLayout>
  );
}
