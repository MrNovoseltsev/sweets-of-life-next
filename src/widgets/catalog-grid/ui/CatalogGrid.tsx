import Image from "next/image";
import Link from "next/link";
import { CATEGORY_META } from "@/shared/config/categories";

// Asymmetric layout applies only on desktop (md+): earrings = large 2x2, sets = wide 2x1.
// On mobile and tablet all tiles stay equal squares.
const LAYOUT: Record<string, string> = {
  earrings: "aspect-square md:col-span-2 md:row-span-2",
  sets: "aspect-square md:col-span-2 md:aspect-auto",
};

export default function CatalogGrid() {
  return (
    <div className="grid grid-cols-1 min-[481px]:grid-cols-2 md:grid-cols-4 gap-[14px]">
      {CATEGORY_META.map((cat) => (
        <Link
          key={cat.slug}
          href={`/catalog/${cat.slug}`}
          className={`group relative block overflow-hidden rounded-[12px] bg-brand-pale ${
            LAYOUT[cat.slug] ?? "aspect-square"
          }`}
        >
          <Image
            src={`/images/categories/${cat.slug}.jpg`}
            alt={cat.label}
            fill
            className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.06]"
            sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 280px"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(30,89,69,0.72)_0%,transparent_52%)]" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-4 py-3.5">
            <span className="font-display text-[clamp(16px,2vw,24px)] font-light tracking-[0.04em] text-white">
              {cat.label}
            </span>
            <span
              aria-hidden="true"
              className="-translate-x-2 text-[16px] text-white opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
            >
              →
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
