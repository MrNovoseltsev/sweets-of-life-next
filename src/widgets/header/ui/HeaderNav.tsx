'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Menu from '@/shared/ui/icons/Menu';

const navLinks = [
  { href: "/catalog", label: "КАТАЛОГ" },
  { href: "/news", label: "НОВОСТИ" },
  { href: "/order", label: "ЗАКАЗАТЬ" },
  { href: "/contacts", label: "КОНТАКТЫ" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function HeaderNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop nav */}
      <nav className="hidden md:flex flex-1 items-center gap-0.5">
        {navLinks.map((link) => {
          const active = isActive(pathname, link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`whitespace-nowrap rounded-full px-3.5 py-1.5 font-boblic text-[12px] tracking-[0.13em] transition-colors ${
                active
                  ? "bg-brand text-white"
                  : "text-brand hover:bg-brand/[0.07]"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Mobile hamburger button — placed last via order-last after auth/cart */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Навигация"
        className="md:hidden order-last flex h-[38px] w-[38px] items-center justify-center rounded-full border-[1.5px] border-brand/[0.18] text-brand transition-colors hover:bg-brand hover:border-brand hover:text-white"
      >
        <Menu open={open} />
      </button>

      {/* Mobile drawer */}
      <div
        className={`md:hidden absolute left-0 right-0 top-[68px] z-[199] flex-col gap-0.5 border-b border-brand/10 bg-[rgba(250,249,247,0.98)] backdrop-blur-[20px] px-4 pt-2 pb-5 shadow-[0_8px_32px_rgba(30,89,69,0.08)] ${
          open ? "flex" : "hidden"
        }`}
      >
        {navLinks.map((link) => {
          const active = isActive(pathname, link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`rounded-[10px] px-4 py-3 font-boblic text-[15px] tracking-[0.1em] transition-colors ${
                active
                  ? "bg-brand text-white"
                  : "text-brand hover:bg-brand-pale"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </>
  );
}
