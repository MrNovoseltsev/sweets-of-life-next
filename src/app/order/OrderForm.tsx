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
    return <div className="h-48 animate-pulse rounded-[16px] bg-brand/5" />;
  }

  if (orderState.success) {
    return (
      <div className="rounded-[16px] border border-brand-light/40 bg-brand-light/5 px-7 py-9 text-center">
        <p className="mb-1.5 font-display text-[26px] font-light text-brand">
          Заказ оформлен!
        </p>
        <p className="mb-1 text-[14px] text-brand-mid">
          Номер заказа: <strong className="text-brand">#{orderState.orderId}</strong>
        </p>
        <p className="mb-6 text-[13px] text-brand-mid/80">
          Мы свяжемся с вами по электронной почте.
        </p>
        <Link
          href="/catalog"
          className="inline-block rounded-full bg-brand px-7 py-3 font-boblic text-[12px] tracking-[0.1em] text-white transition-colors hover:bg-brand-mid"
        >
          Вернуться в каталог
        </Link>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="rounded-[16px] border border-brand/[0.18] bg-white px-7 py-9 text-center">
        <p className="mb-5 text-[14px] text-brand-mid">
          Для оформления заказа необходимо войти в аккаунт.
        </p>
        <button
          onClick={openAuthModal}
          className="rounded-full bg-brand px-7 py-3 font-boblic text-[12px] tracking-[0.1em] text-white transition-colors hover:bg-brand-mid cursor-pointer"
        >
          Войти
        </button>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="rounded-[16px] border border-brand/[0.18] bg-white px-7 py-9 text-center">
        <p className="mb-5 text-[14px] text-brand-mid">Корзина пуста.</p>
        <Link
          href="/catalog"
          className="inline-block rounded-full bg-brand px-7 py-3 font-boblic text-[12px] tracking-[0.1em] text-white transition-colors hover:bg-brand-mid"
        >
          Перейти в каталог
        </Link>
      </div>
    );
  }

  const totalPrice = cart.items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0,
  );
  const totalCount = cart.items.reduce((sum, i) => sum + i.quantity, 0);
  const displayName =
    (user.user_metadata?.name as string | undefined) ?? 'Клиент';

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <input
        type="hidden"
        name="items"
        value={JSON.stringify(cart.items)}
        readOnly
      />

      {/* Cart summary */}
      <div className="overflow-hidden rounded-[16px] border border-brand/[0.09] bg-white">
        {cart.items.map((item) => (
          <div
            key={item.sku}
            className="flex items-center gap-3.5 border-b border-brand/[0.07] px-4 py-3.5 last:border-0"
          >
            <Image
              src={item.image}
              alt={item.name}
              width={44}
              height={44}
              className="shrink-0 rounded-[8px] object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-[15px] text-brand">
                {item.name}
              </p>
              <p className="text-[12px] text-brand-mid/60">
                {item.price.toLocaleString('ru-RU')} ₽ × {item.quantity}
              </p>
            </div>
            <p className="shrink-0 text-[14px] font-medium text-brand">
              {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
            </p>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="flex items-baseline justify-between border-t border-brand/10 pt-3.5">
        <span className="font-boblic text-[12px] tracking-[0.1em] text-brand/55">
          ИТОГО ({totalCount} шт.)
        </span>
        <span className="font-display text-[22px] font-normal text-brand">
          {totalPrice.toLocaleString('ru-RU')} ₽
        </span>
      </div>

      {/* Notes */}
      <div>
        <label className="mb-1.5 block text-[11px] tracking-[0.1em] text-brand/55">
          Комментарий к заказу{' '}
          <span className="text-brand/35">(необязательно)</span>
        </label>
        <textarea
          name="notes"
          rows={3}
          placeholder="Уточнения по доставке, пожелания..."
          className="w-full resize-none rounded-[10px] border-[1.5px] border-brand/[0.18] bg-white/70 px-3.5 py-[11px] font-boblic text-[14px] text-brand outline-none transition-colors focus:border-brand-light focus:bg-white"
        />
      </div>

      {orderState.error && (
        <p className="rounded-[10px] border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-600">
          {orderState.error}
        </p>
      )}

      <p className="text-[13px] text-brand-mid/60">
        Заказ будет оформлен на:{' '}
        <strong className="text-brand">{displayName}</strong>
      </p>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-brand py-4 font-boblic text-[13px] tracking-[0.1em] text-white transition-colors hover:bg-brand-mid disabled:opacity-60 cursor-pointer"
      >
        {pending ? 'Оформляем...' : 'Подтвердить заказ'}
      </button>
    </form>
  );
}
