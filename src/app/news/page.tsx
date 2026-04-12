import Image from "next/image";
import Link from "next/link";
import PageLayout from "@/widgets/page-layout/ui/PageLayout";
import { getNewsPaginated } from "@/entities/news/api";

export const dynamic = "force-static";

type Props = { searchParams: Promise<{ page?: string }> };

export default async function NewsPage({ searchParams }: Props) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);
  const { posts, totalPages } = await getNewsPaginated(page);

  return (
    <PageLayout>
      <section className="px-2.5 py-4">
        <h1 className="text-2xl font-normal mb-1">НОВОСТИ</h1>
        <div className="w-full h-px bg-brand ml-0 mb-4" />

        <div className="flex flex-col gap-6 ml-2.5">
          {posts.map((post) => {
            const content = (
              <>
                <div className="relative w-[180px] h-[180px] shrink-0 rounded-lg overflow-hidden bg-brand-light">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="180px"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-brand/60">{post.date}</span>
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
                className="flex gap-5 items-start hover:opacity-80 transition-opacity"
              >
                {content}
              </a>
            ) : (
              <div key={post.id} className="flex gap-5 items-start">
                {content}
              </div>
            );
          })}
        </div>

        {totalPages > 1 && (
          <nav className="flex gap-2 ml-2.5 mt-8">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={`/news?page=${p}`}
                className={`w-8 h-8 flex items-center justify-center border border-brand rounded-full text-sm hover:bg-brand hover:text-white transition-colors ${
                  p === page ? "bg-brand text-white" : ""
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
