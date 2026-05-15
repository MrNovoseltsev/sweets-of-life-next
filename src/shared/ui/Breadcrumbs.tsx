import Link from "next/link";

type BreadcrumbItem = { label: string; href?: string };

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex flex-wrap items-center gap-1.5 mb-7 text-[11px] tracking-[0.06em] text-brand-mid/55">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <span aria-hidden="true">›</span>}
          {item.href ? (
            <Link
              href={item.href}
              className="transition-opacity hover:opacity-100 hover:underline"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-brand/70">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
