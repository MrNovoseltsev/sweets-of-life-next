import Image from "next/image";
import SectionHeader from "@/shared/ui/SectionHeader";
import type { NewsPost } from "@/entities/news/model/types";

type Props = { posts: NewsPost[] };

export default function NewsScroll({ posts }: Props) {
  return (
    <section className="sol-container pb-[68px]">
      <SectionHeader
        title="Новости"
        href="/news"
        link={{ label: "Все новости", href: "/news" }}
      />

      <div className="news-scroll flex gap-[18px] overflow-x-auto pb-3 snap-x snap-mandatory">
        {posts.map((post) => {
          const card = (
            <>
              <div className="relative h-[172px] w-full overflow-hidden bg-brand-pale">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="268px"
                />
              </div>
              <div className="px-4 pb-[18px] pt-3.5">
                <p className="mb-1.5 text-[10px] tracking-[0.12em] text-brand/50">
                  {post.date}
                </p>
                <h3 className="mb-1.5 font-display text-[17px] font-normal leading-[1.3] text-brand">
                  {post.title}
                </h3>
                <p className="text-[12.5px] leading-[1.55] text-brand/75 line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </>
          );

          const cardClass =
            "flex-[0_0_240px] min-[481px]:flex-[0_0_268px] snap-start overflow-hidden rounded-[12px] border border-brand/[0.09] bg-white transition-all hover:-translate-y-[3px] hover:shadow-[0_8px_36px_rgba(30,89,69,0.11)]";

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
    </section>
  );
}
