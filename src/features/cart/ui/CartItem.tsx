'use client';

import Image from 'next/image';
import { useCart } from '../model/CartContext';
import type { CartItem } from '../model/types';

type Props = { item: CartItem };

export default function CartItemRow({ item }: Props) {
  const { dispatch } = useCart();
  const lineTotal = item.price * item.quantity;

  return (
    <div className="flex gap-3.5 border-b border-brand/[0.07] py-4 last:border-b-0">
      <div className="relative h-[76px] w-[76px] shrink-0 overflow-hidden rounded-[10px] bg-brand-pale">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="76px"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <p className="mb-1 font-display text-[16px] font-normal leading-[1.25] text-brand">
          {item.name}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-[13px] text-brand-mid">
            {item.quantity} шт.
          </span>
          <span className="font-display text-[17px] font-medium text-brand">
            {lineTotal.toLocaleString('ru-RU')} ₽
          </span>
        </div>

        <button
          onClick={() =>
            dispatch({ type: 'REMOVE_ITEM', payload: { sku: item.sku } })
          }
          className="mt-1.5 self-start text-[11px] uppercase tracking-[0.08em] text-brand-mid opacity-40 transition-opacity hover:opacity-100 cursor-pointer"
        >
          Удалить
        </button>
      </div>
    </div>
  );
}
