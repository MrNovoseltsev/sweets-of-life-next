'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { useCart } from '../model/CartContext';
import { useAuth } from '@/features/auth/model/AuthContext';
import CartItemRow from './CartItem';
import Close from '@/shared/ui/icons/Close';
import CartIcon from '@/shared/ui/icons/Cart';

type Props = {
  open: boolean;
  onClose: () => void;
};

function plural(n: number, forms: [string, string, string]) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1];
  return forms[2];
}

const emptySubscribe = () => () => {};

export default function CartDrawer({ open, onClose }: Props) {
  const { state, dispatch } = useCart();
  const { user, openAuthModal } = useAuth();
  const router = useRouter();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  useEffect(() => {
    if (!open) return;
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  function handleCheckout() {
    if (!user) {
      openAuthModal();
    } else {
      onClose();
      router.push('/order');
    }
  }

  const totalPrice = state.items.reduce((n, i) => n + i.price * i.quantity, 0);
  const totalCount = state.items.reduce((n, i) => n + i.quantity, 0);
  const isEmpty = state.items.length === 0;

  const content = (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[300] bg-[rgba(30,89,69,0.32)] backdrop-blur-[2px] transition-opacity duration-[320ms] ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* Drawer */}
      <div
        className={`bg-pattern-outer fixed bottom-0 right-0 top-0 z-[310] flex w-full max-w-[440px] flex-col bg-bg shadow-[-16px_0_48px_rgba(30,89,69,0.16)] transition-transform duration-[420ms] ease-[cubic-bezier(0.4,0.01,0.2,1)] ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Head */}
        <div className="flex shrink-0 items-center justify-between border-b border-brand/10 px-6 pb-[18px] pt-[22px]">
          <div className="flex items-baseline gap-2.5">
            <h2 className="font-display text-[26px] font-light text-brand">
              Корзина
            </h2>
            {!isEmpty && (
              <span className="text-[11px] tracking-[0.12em] text-brand/50">
                {totalCount}{' '}
                {plural(totalCount, ['товар', 'товара', 'товаров'])}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Закрыть"
            className="flex h-9 w-9 items-center justify-center rounded-full border-[1.5px] border-brand/[0.18] text-brand transition-colors hover:border-brand hover:bg-brand hover:text-white cursor-pointer"
          >
            <Close />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-2">
          {isEmpty ? (
            <div className="flex h-full flex-col items-center justify-center px-6 py-[60px] text-center">
              <div className="mb-[18px] flex h-[72px] w-[72px] items-center justify-center rounded-full bg-brand-pale text-brand opacity-70">
                <CartIcon width={32} height={32} />
              </div>
              <h3 className="mb-1.5 font-display text-[22px] font-normal text-brand">
                Корзина пуста
              </h3>
              <p className="max-w-[260px] text-[13px] leading-[1.55] text-brand/60">
                Добавьте понравившиеся украшения, чтобы оформить заказ.
              </p>
            </div>
          ) : (
            state.items.map((item) => (
              <CartItemRow key={item.sku} item={item} />
            ))
          )}
        </div>

        {/* Foot */}
        {!isEmpty && (
          <div className="shrink-0 border-t border-brand/10 bg-white/45 px-6 pb-6 pt-5 backdrop-blur-[8px]">
            <div className="mb-4">
              <div className="flex justify-between py-1.5 text-[13px] text-brand-mid">
                <span>Подытог</span>
                <span>{totalPrice.toLocaleString('ru-RU')} ₽</span>
              </div>
              <div className="flex justify-between py-1.5 text-[13px] text-brand-mid">
                <span>Доставка</span>
                <span className="opacity-60">Уточняется</span>
              </div>
              <div className="mt-2.5 flex items-baseline justify-between border-t border-brand/10 pt-3.5">
                <span className="font-boblic text-[11px] tracking-[0.16em] text-brand/55">
                  ИТОГО
                </span>
                <span className="font-display text-[22px] font-normal text-brand">
                  {totalPrice.toLocaleString('ru-RU')} ₽
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="mb-2.5 w-full rounded-full bg-brand py-3.5 font-boblic text-[13px] tracking-[0.1em] text-white transition-colors hover:bg-brand-mid cursor-pointer"
            >
              Оформить заказ
            </button>
            <button
              onClick={() => dispatch({ type: 'CLEAR_CART' })}
              className="w-full text-[12px] tracking-[0.06em] text-brand-mid/55 transition-colors hover:text-brand cursor-pointer"
            >
              Очистить корзину
            </button>
          </div>
        )}
      </div>
    </>
  );

  if (!mounted) return null;
  return createPortal(content, document.body);
}
