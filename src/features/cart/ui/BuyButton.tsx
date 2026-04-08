'use client';

import { useState } from 'react';
import { useCart } from '../model/CartContext';
import type { Product } from '@/entities/product/model/types';

type Props = {
  product: Pick<Product, 'sku' | 'name' | 'price' | 'image'>;
  size?: 'sm' | 'md';
};

export default function BuyButton({ product, size = 'md' }: Props) {
  const { state, dispatch } = useCart();
  const [hovered, setHovered] = useState(false);
  const inCart = state.items.some((i) => i.sku === product.sku);

  function handleClick() {
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

  const sizeClass = size === 'sm'
    ? 'w-full py-3 text-[28px] desktop:py-1.5 desktop:text-sm'
    : 'px-6 py-5 text-[32px] md:py-2.5 md:text-base';

  // Mobile/tablet: inCart → always red. Desktop: inCart+hovered → red, inCart → green.
  const inCartClass = hovered
    ? 'bg-[#e05555] text-white'
    : 'bg-[#e05555] desktop:bg-[#40d39d] text-white';

  const desktopLabel = inCart
    ? hovered ? 'Убрать из корзины' : 'Добавлено'
    : 'В корзину';

  const mobileLabel = inCart ? 'Убрать из корзины' : 'В корзину';

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`rounded-lg font-medium transition-colors cursor-pointer ${sizeClass} ${
        inCart ? inCartClass : 'bg-[#1e5945] text-white hover:bg-[#164030]'
      }`}
    >
      <span className="desktop:hidden">{mobileLabel}</span>
      <span className="hidden desktop:inline">{desktopLabel}</span>
    </button>
  );
}
