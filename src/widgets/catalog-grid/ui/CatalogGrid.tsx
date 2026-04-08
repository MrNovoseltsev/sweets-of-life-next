import Image from "next/image";
import Link from "next/link";
import { CATEGORY_META } from "@/shared/config/categories";

export default function CatalogGrid() {
  return (
    <div className="grid grid-cols-4 gap-5 pt-2.5">
      {CATEGORY_META.map((cat) => (
        <Link
          key={cat.slug}
          href={`/catalog/${cat.slug}`}
          className="group relative h-[280px] rounded-[20px] border border-brand overflow-hidden bg-brand-light hover:scale-105 hover:shadow-[0_0_10px_0_var(--color-brand)] transition-transform"
        >
          <Image
            src={`/images/categories/${cat.slug}.jpg`}
            alt={cat.label}
            fill
            className="object-cover"
            sizes="230px"
          />
          <span className="absolute inset-x-0 bottom-0 flex justify-center items-center h-12 text-2xl text-brand bg-white/60 group-hover:text-[#fff44f] group-hover:bg-brand/70 transition-colors">
            {cat.label.toUpperCase()}
          </span>
        </Link>
      ))}
    </div>
  );
}
