'use client';

import { useState } from 'react';
import Link from 'next/link';

const navLinks = [
  { href: "/catalog", label: "КАТАЛОГ" },
  { href: "/news", label: "НОВОСТИ" },
  { href: "/order", label: "ЗАКАЗАТЬ" },
  { href: "/contacts", label: "КОНТАКТЫ" },
];

export default function HeaderNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-brand-light border border-brand rounded-[20px] md:rounded-full self-end">
      <button
        className="md:hidden w-full py-2 flex justify-center items-center"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Навигация"
      >
        <svg width="24" height="18" viewBox="0 0 24 18" fill="currentColor" aria-hidden="true">
          <rect
            className={`transition-all duration-300 [transform-box:fill-box] [transform-origin:center] ${open ? 'translate-y-[7.75px] rotate-45' : ''}`}
            width="24" height="2.5" rx="1.25" y="0"
          />
          <rect
            className={`transition-all duration-300 ${open ? 'opacity-0' : ''}`}
            width="24" height="2.5" rx="1.25" y="7.75"
          />
          <rect
            className={`transition-all duration-300 [transform-box:fill-box] [transform-origin:center] ${open ? '-translate-y-[7.75px] -rotate-45' : ''}`}
            width="24" height="2.5" rx="1.25" y="15.5"
          />
        </svg>
      </button>

      <div className={`flex-col pb-1 md:pb-0 md:flex md:flex-row md:items-center md:h-[35px] ${open ? 'flex' : 'hidden md:flex'}`}>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="md:flex-1 text-center text-2xl desktop:text-base hover:text-[#fff44f] py-1 md:py-0"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
