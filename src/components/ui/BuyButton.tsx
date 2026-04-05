'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/lib/types';

type Props = {
  product: Pick<Product, 'sku' | 'name' | 'price' | 'image'>;
};

export default function BuyButton({ product }: Props) {
  const { dispatch } = useCart();
  const [isAdded, setIsAdded] = useState(false);

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
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  }

  return (
    <button
      onClick={handleClick}
      className={`px-6 py-2.5 rounded-lg text-base font-medium transition-colors cursor-pointer ${
        isAdded
          ? 'bg-[#40d39d] text-white'
          : 'bg-[#1e5945] text-white hover:bg-[#164030]'
      }`}
    >
      {isAdded ? 'Добавлено ✓' : 'В корзину'}
    </button>
  );
}
