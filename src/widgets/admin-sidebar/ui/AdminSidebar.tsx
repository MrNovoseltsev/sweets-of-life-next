'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const sections = [
  { slug: 'news', label: 'Новости' },
  { slug: 'products', label: 'Продукты' },
  { slug: 'users', label: 'Пользователи' },
] as const;

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col py-2">
      {sections.map(({ slug, label }) => {
        const href = `/admin/${slug}`;
        const isActive = pathname.startsWith(href);
        return (
          <Link
            key={slug}
            href={href}
            className={[
              'px-4 py-2.5 text-sm transition-colors border-l-2',
              isActive
                ? 'border-[#1e5945] text-[#1e5945] bg-neutral-50 font-medium'
                : 'border-transparent text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50',
            ].join(' ')}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
