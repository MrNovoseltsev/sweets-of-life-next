'use client';

import { useState } from 'react';
import { useCart } from '../model/CartContext';
import type { Product } from '@/entities/product/model/types';

type Props = {
  product: Pick<Product, 'sku' | 'name' | 'price' | 'image'>;
  size?: 'sm' | 'md' | 'icon';
};

export default function BuyButton({ product, size = 'md' }: Props) {
  const { state, dispatch } = useCart();
  const [hovered, setHovered] = useState(false);
  const inCart = state.items.some((i) => i.sku === product.sku);

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (inCart) {
      dispatch({ type: 'REMOVE_ITEM', payload: { sku: product.sku } });
      return;
    }
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        sku: product.sku,
        name: product.name,
        price: product.price,
        image: product.image.preview,
        quantity: 1,
      },
    });
  }

  // Icon variant — small round button for ProductCard overlay.
  if (size === 'icon') {
    return (
      <button
        onClick={handleClick}
        aria-label={inCart ? 'Убрать из корзины' : 'В корзину'}
        className={`flex h-[34px] w-[34px] items-center justify-center rounded-full transition-colors cursor-pointer ${
          inCart
            ? 'bg-brand-light text-brand'
            : 'bg-brand text-white hover:bg-brand-mid'
        }`}
      >
        <span className="text-[20px] leading-none">{inCart ? '✓' : '+'}</span>
      </button>
    );
  }

  const isFull = size === 'md';
  const label = inCart
    ? hovered
      ? 'Убрать из корзины'
      : '✓ В корзине'
    : 'Добавить в корзину';

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`w-full rounded-full font-boblic tracking-[0.1em] transition-all cursor-pointer ${
        isFull ? 'py-4 text-[13px]' : 'py-2.5 text-[12px]'
      } ${
        inCart
          ? 'bg-brand-light text-brand hover:bg-brand-mid hover:text-white'
          : 'bg-brand text-white hover:-translate-y-px hover:bg-brand-mid'
      }`}
    >
      {label}
    </button>
  );
}
