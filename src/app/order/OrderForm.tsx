'use client';

import { useActionState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/features/cart/model/CartContext';
import { useAuth } from '@/features/auth/model/AuthContext';
import { placeOrder, type PlaceOrderState } from '@/features/checkout/actions';

const INIT: PlaceOrderState = { error: null, success: false, orderId: null };

export default function OrderForm() {
  const { state: cart, dispatch, hydrated } = useCart();
  const { user, openAuthModal } = useAuth();
  const [orderState, formAction, pending] = useActionState(placeOrder, INIT);

  useEffect(() => {
    if (orderState.success) {
      dispatch({ type: 'CLEAR_CART' });
    }
  }, [orderState.success, dispatch]);

  if (!hydrated) {
    return <div className="animate-pulse h-48 bg-[#1e5945]/5 rounded-lg" />;
  }

  if (orderState.success) {
    return (
      <div className="border border-[#40d39d]/40 bg-[#40d39d]/5 rounded-xl px-6 py-8 text-center">
        <p className="text-2xl md:text-xl mb-1">Заказ оформлен!</p>
        <p className="text-[#1e5945]/70 mb-1">
          Номер заказа: <strong>#{orderState.orderId}</strong>
        </p>
        <p className="text-[#1e5945]/70 mb-6 text-sm">
          Мы свяжемся с вами по электронной почте
        </p>
        <Link
          href="/catalog/bracelets"
          className="text-sm text-[#40d39d] underline underline-offset-2 hover:text-[#1e5945] transition-colors"
        >
          Вернуться в каталог
        </Link>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="border border-[#1e5945]/20 rounded-xl px-6 py-8 text-center">
        <p className="text-[#1e5945]/70 mb-4">Для оформления заказа необходимо войти в аккаунт</p>
        <button
          onClick={openAuthModal}
          className="bg-[#1e5945] text-white rounded-lg px-6 py-2.5 text-sm hover:bg-[#164030] transition-colors cursor-pointer"
        >
          Войти
        </button>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="border border-[#1e5945]/20 rounded-xl px-6 py-8 text-center">
        <p className="text-[#1e5945]/70 mb-4">Корзина пуста</p>
        <Link
          href="/catalog/bracelets"
          className="text-sm text-[#40d39d] underline underline-offset-2"
        >
          Перейти в каталог
        </Link>
      </div>
    );
  }

  const totalPrice = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const totalCount = cart.items.reduce((sum, i) => sum + i.quantity, 0);
  const displayName = (user.user_metadata?.name as string | undefined) ?? 'Клиент';

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <input type="hidden" name="items" value={JSON.stringify(cart.items)} readOnly />

      {/* Cart summary */}
      <div className="border border-[#1e5945]/20 rounded-xl overflow-hidden">
        {cart.items.map((item) => (
          <div
            key={item.sku}
            className="flex items-center gap-3 px-4 py-3 border-b border-[#1e5945]/10 last:border-0"
          >
            <Image
              src={item.image}
              alt={item.name}
              width={40}
              height={40}
              className="rounded object-cover shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm truncate">{item.name}</p>
              <p className="text-xs text-[#1e5945]/60">
                {item.price.toLocaleString('ru-RU')} ₽ × {item.quantity}
              </p>
            </div>
            <p className="text-sm font-medium shrink-0">
              {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
            </p>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="flex justify-between text-base font-medium border-t border-[#1e5945]/20 pt-3">
        <span>Итого ({totalCount} шт.):</span>
        <span>{totalPrice.toLocaleString('ru-RU')} ₽</span>
      </div>

      {/* Notes */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm text-[#1e5945]/70">
          Комментарий к заказу <span className="text-[#1e5945]/40">(необязательно)</span>
        </label>
        <textarea
          name="notes"
          rows={3}
          placeholder="Уточнения по доставке, пожелания..."
          className="border border-[#1e5945]/30 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#40d39d] transition-colors resize-none"
        />
      </div>

      {/* Error */}
      {orderState.error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {orderState.error}
        </p>
      )}

      {/* Account info */}
      <p className="text-sm text-[#1e5945]/60">
        Заказ будет оформлен на:{' '}
        <strong className="text-[#1e5945]">{displayName}</strong>
      </p>

      <button
        type="submit"
        disabled={pending}
        className="bg-[#1e5945] text-white rounded-xl py-3.5 text-base font-medium hover:bg-[#164030] transition-colors disabled:opacity-60 cursor-pointer"
      >
        {pending ? 'Оформляем...' : 'Подтвердить заказ'}
      </button>
    </form>
  );
}
