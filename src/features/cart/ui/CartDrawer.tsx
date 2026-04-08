'use client';

import Link from 'next/link';
import { useCart } from '../model/CartContext';
import CartItemRow from './CartItem';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CartDrawer({ open, onClose }: Props) {
  const { state, dispatch } = useCart();

  const totalPrice = state.items.reduce((n, i) => n + i.price * i.quantity, 0);
  const totalCount = state.items.reduce((n, i) => n + i.quantity, 0);

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-screen w-full md:w-[340px] bg-white z-50 flex flex-col shadow-xl transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 md:px-4 md:py-3 border-b border-brand/20">
          <h2 className="text-[36px] md:text-lg">Корзина</h2>
          <button
            onClick={onClose}
            className="text-brand/50 hover:text-brand text-[48px] md:text-2xl leading-none cursor-pointer"
            aria-label="Закрыть"
          >
            ×
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-8 md:px-4">
          {state.items.length === 0 ? (
            <p className="text-center text-brand/50 text-[28px] md:text-base mt-12">Корзина пуста</p>
          ) : (
            state.items.map((item) => (
              <CartItemRow key={item.sku} item={item} />
            ))
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="px-8 py-8 md:px-4 md:py-4 border-t border-brand/20 flex flex-col gap-3">
            <div className="flex justify-between text-[32px] md:text-base font-medium">
              <span>Итого ({totalCount} шт.):</span>
              <span>{totalPrice} ₽</span>
            </div>
            <Link
              href="/order"
              onClick={onClose}
              className="block text-center bg-[#1e5945] text-white py-5 md:py-2.5 text-[28px] md:text-base rounded-lg hover:bg-[#164030] transition-colors"
            >
              Оформить заказ
            </Link>
            <button
              onClick={() => dispatch({ type: 'CLEAR_CART' })}
              className="text-[28px] md:text-sm text-brand/50 hover:text-brand cursor-pointer"
            >
              Очистить корзину
            </button>
          </div>
        )}
      </div>
    </>
  );
}
