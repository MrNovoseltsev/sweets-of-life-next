'use client';

import { useState } from 'react';
import { useCart } from '../model/CartContext';
import CartDrawer from './CartDrawer';
import CartIcon from '@/shared/ui/icons/Cart';

export default function CartButton() {
  const { state, hydrated } = useCart();
  const [open, setOpen] = useState(false);

  const totalItems = state.items.reduce((n, i) => n + i.quantity, 0);
  const hasItems = hydrated && totalItems > 0;

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setOpen(true)}
          aria-label="Корзина"
          className="flex h-[38px] w-[38px] items-center justify-center rounded-full border-[1.5px] border-brand/[0.18] text-brand transition-colors hover:border-brand hover:bg-brand hover:text-white cursor-pointer"
        >
          <CartIcon />
        </button>
        {hasItems && (
          <span className="absolute right-[7px] top-[7px] h-[7px] w-[7px] rounded-full border-2 border-bg bg-brand-light" />
        )}
      </div>

      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
