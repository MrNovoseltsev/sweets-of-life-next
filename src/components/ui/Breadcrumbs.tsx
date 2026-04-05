import Link from "next/link";

type BreadcrumbItem = { label: string; href?: string };

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center gap-1.5 text-sm text-brand/60 mb-1">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <span>—</span>}
          {item.href ? (
            <Link href={item.href} className="hover:text-brand transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-brand/40">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
