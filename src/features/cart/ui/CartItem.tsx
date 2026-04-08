'use client';

import Image from 'next/image';
import { useCart } from '../model/CartContext';
import type { CartItem } from '../model/types';

type Props = { item: CartItem };

export default function CartItemRow({ item }: Props) {
  const { dispatch } = useCart();

  return (
    <div className="flex gap-3 py-3 border-b border-brand/20">
      <div className="relative w-16 h-16 shrink-0 rounded overflow-hidden bg-brand-light">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>

      <div className="flex flex-col flex-1 gap-1 min-w-0">
        <p className="text-sm leading-tight truncate">{item.name}</p>
        <p className="text-sm text-brand/70">{item.price} ₽</p>

        <div className="flex items-center gap-2 mt-auto">
          <button
            onClick={() => dispatch({ type: 'UPDATE_QTY', payload: { sku: item.sku, quantity: item.quantity - 1 } })}
            className="w-6 h-6 flex items-center justify-center rounded border border-brand/30 hover:bg-brand/10 cursor-pointer text-sm"
          >
            −
          </button>
          <span className="text-sm w-4 text-center">{item.quantity}</span>
          <button
            onClick={() => dispatch({ type: 'UPDATE_QTY', payload: { sku: item.sku, quantity: item.quantity + 1 } })}
            className="w-6 h-6 flex items-center justify-center rounded border border-brand/30 hover:bg-brand/10 cursor-pointer text-sm"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between shrink-0">
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
