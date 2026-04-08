'use client';

import { useCart } from '../model/CartContext';
import type { Product } from '@/entities/product/model/types';

type Props = {
  product: Pick<Product, 'sku' | 'name' | 'price' | 'image'>;
  size?: 'sm' | 'md';
};

export default function BuyButton({ product, size = 'md' }: Props) {
  const { state, dispatch } = useCart();
  const inCart = state.items.some((i) => i.sku === product.sku);

  function handleClick() {
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
    ? 'w-full py-1.5 text-sm'
    : 'px-6 py-2.5 text-base';

  return (
    <button
      onClick={handleClick}
      className={`rounded-lg font-medium transition-colors cursor-pointer ${sizeClass} ${
        inCart
          ? 'bg-[#40d39d] text-white'
          : 'bg-[#1e5945] text-white hover:bg-[#164030]'
      }`}
    >
      {inCart ? 'Добавлено ✓' : 'В корзину'}
    </button>
  );
}
