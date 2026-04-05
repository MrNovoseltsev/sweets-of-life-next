'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import CartDrawer from './CartDrawer';

export default function CartButton() {
  const { state, hydrated } = useCart();
  const [open, setOpen] = useState(false);

  const totalItems = state.items.reduce((n, i) => n + i.quantity, 0);

  return (
    <>
      <div className="relative group">
        <button
          onClick={() => setOpen(true)}
          className="relative flex items-center cursor-pointer text-brand hover:text-[#40d39d] transition-colors"
          aria-label="Корзина"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          {hydrated && totalItems > 0 && (
            <span className="absolute -top-1 -right-1.5 flex items-center justify-center w-4 h-4 rounded-full bg-[#1e5945] text-white text-[10px] leading-none">
              {totalItems}
            </span>
          )}
        </button>
        <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-full mt-1.5 whitespace-nowrap rounded bg-[#1e5945] text-white text-xs px-2 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          Корзина
        </span>
      </div>

      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
