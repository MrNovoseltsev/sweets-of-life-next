'use client';

import { useCart } from '../model/CartContext';
import type { Product } from '@/entities/product/model/types';

type Props = {
  product: Pick<Product, 'sku' | 'name' | 'price' | 'image'>;
};

export default function BuyButton({ product }: Props) {
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

  return (
    <button
      onClick={handleClick}
      className={`px-6 py-2.5 rounded-lg text-base font-medium transition-colors cursor-pointer ${
        inCart
          ? 'bg-[#40d39d] text-white'
          : 'bg-[#1e5945] text-white hover:bg-[#164030]'
      }`}
    >
      {inCart ? 'Добавлено ✓' : 'В корзину'}
    </button>
  );
}
