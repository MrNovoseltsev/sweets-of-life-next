'use client';

import Image from 'next/image';
import { useCart } from '../model/CartContext';
import type { CartItem } from '../model/types';

type Props = { item: CartItem };

export default function CartItemRow({ item }: Props) {
  const { dispatch } = useCart();

  return (
    <div className="flex flex-col md:flex-row gap-3 py-3 border-b border-brand/20">
      {/* Image */}
      <div className="relative w-full aspect-square md:w-16 md:h-16 md:aspect-auto shrink-0 rounded overflow-hidden bg-brand-light">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="(max-width: 767px) 100vw, 64px"
        />
      </div>

      {/* Text content */}
      <div className="flex flex-col flex-1 gap-1 min-w-0">
        <p className="text-[28px] md:text-sm leading-tight truncate">{item.name}</p>
        <p className="text-[28px] md:text-sm text-brand/70">{item.price} ₽</p>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-[28px] md:text-sm">{item.quantity} шт.</span>

          {/* Total + delete — mobile only */}
          <div className="flex items-center gap-6 md:hidden">
            <p className="text-[28px] md:text-sm font-medium">{item.price * item.quantity} ₽</p>
            <button
              onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: { sku: item.sku } })}
              className="text-brand/40 hover:text-brand cursor-pointer text-[48px] md:text-lg leading-none"
              aria-label="Удалить"
            >
              ×
            </button>
          </div>
        </div>
      </div>

      {/* Right column — tablet+ only */}
      <div className="hidden md:flex flex-col items-end justify-between shrink-0">
        <button
          onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: { sku: item.sku } })}
          className="text-brand/40 hover:text-brand cursor-pointer text-lg leading-none"
          aria-label="Удалить"
        >
          ×
        </button>
        <p className="text-sm font-medium">{item.price * item.quantity} ₽</p>
      </div>
    </div>
  );
}
