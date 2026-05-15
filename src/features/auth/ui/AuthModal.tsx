'use client';

import { useActionState, useEffect, useState } from 'react';
import { customerSignIn, customerSignUp, type AuthState } from '../actions';
import { useAuth } from '../model/AuthContext';
import Close from '@/shared/ui/icons/Close';
import UserIcon from '@/shared/ui/icons/User';

const INITIAL_STATE: AuthState = { error: null, success: false };

const FIELD_LABEL = 'mb-1.5 block text-[11px] tracking-[0.1em] text-brand/55';
const FIELD_INPUT =
  'w-full rounded-[10px] border-[1.5px] border-brand/[0.18] bg-white/70 px-3.5 py-[11px] font-boblic text-[14px] text-brand outline-none transition-colors focus:border-brand-light focus:bg-white';
const SUBMIT_BTN =
  'mt-1 w-full rounded-full bg-brand py-3.5 font-boblic text-[13px] tracking-[0.1em] text-white transition-colors hover:bg-brand-mid disabled:opacity-60 cursor-pointer';
const ERROR_BOX =
  'rounded-[10px] border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-600';

function LoginTab() {
  const { closeAuthModal } = useAuth();
  const [state, formAction, pending] = useActionState(
    customerSignIn,
    INITIAL_STATE,
  );

  useEffect(() => {
    if (state.success) closeAuthModal();
  }, [state.success, closeAuthModal]);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {state.error && <p className={ERROR_BOX}>{state.error}</p>}
      <div>
        <label className={FIELD_LABEL}>Email</label>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className={FIELD_INPUT}
        />
      </div>
      <div>
        <label className={FIELD_LABEL}>Пароль</label>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className={FIELD_INPUT}
        />
      </div>
      <button type="submit" disabled={pending} className={SUBMIT_BTN}>
        {pending ? 'Входим...' : 'Войти'}
      </button>
    </form>
  );
}

function RegisterTab() {
  const { closeAuthModal } = useAuth();
  const [state, formAction, pending] = useActionState(
    customerSignUp,
    INITIAL_STATE,
  );

  useEffect(() => {
    if (state.success) closeAuthModal();
  }, [state.success, closeAuthModal]);

  if (state.needsConfirmation) {
    return (
      <div className="py-6 text-center">
        <p className="mb-2 font-display text-[20px] text-brand">
          Проверьте почту
        </p>
        <p className="text-[13px] text-brand-mid/80">
          На ваш email отправлена ссылка для подтверждения регистрации.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {state.error && <p className={ERROR_BOX}>{state.error}</p>}
      <div>
        <label className={FIELD_LABEL}>Имя</label>
        <input
          name="name"
          type="text"
          required
          autoComplete="name"
          className={FIELD_INPUT}
        />
      </div>
      <div>
        <label className={FIELD_LABEL}>Email</label>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className={FIELD_INPUT}
        />
      </div>
      <div>
        <label className={FIELD_LABEL}>Пароль</label>
        <input
          name="password"
          type="password"
          required
          autoComplete="new-password"
          minLength={6}
          className={FIELD_INPUT}
        />
      </div>
      <button type="submit" disabled={pending} className={SUBMIT_BTN}>
        {pending ? 'Регистрируем...' : 'Зарегистрироваться'}
      </button>
    </form>
  );
}

type Props = {
  onClose: () => void;
};

export default function AuthModal({ onClose }: Props) {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const isLogin = activeTab === 'login';

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[320] flex items-center justify-center bg-[rgba(30,89,69,0.4)] p-6 backdrop-blur-[8px]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-pattern-outer relative w-full max-w-[420px] overflow-hidden rounded-[18px] bg-bg shadow-[0_24px_64px_rgba(30,89,69,0.25)]"
      >
        <button
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute right-3.5 top-3.5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-brand/[0.06] text-brand transition-colors hover:bg-brand hover:text-white cursor-pointer"
        >
          <Close />
        </button>

        <div className="px-8 pb-8 pt-9">
          {/* Header */}
          <div className="mb-6 text-center">
            <div className="mb-3.5 inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-pale text-brand">
              <UserIcon width={28} height={28} />
            </div>
            <h2 className="mb-1.5 font-display text-[28px] font-light text-brand">
              {isLogin ? 'Войти' : 'Регистрация'}
            </h2>
            <p className="text-[13px] text-brand/60">
              {isLogin
                ? 'Войдите, чтобы оформить заказ'
                : 'Создайте аккаунт за минуту'}
            </p>
          </div>

          {/* Tabs */}
          <div className="mb-[22px] flex gap-0 rounded-full bg-brand/[0.06] p-[3px]">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 rounded-full px-3.5 py-2 font-boblic text-[12px] tracking-[0.08em] transition-colors cursor-pointer ${
                isLogin ? 'bg-brand text-white' : 'text-brand'
              }`}
            >
              Войти
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`flex-1 rounded-full px-3.5 py-2 font-boblic text-[12px] tracking-[0.08em] transition-colors cursor-pointer ${
                !isLogin ? 'bg-brand text-white' : 'text-brand'
              }`}
            >
              Регистрация
            </button>
          </div>

          {isLogin ? <LoginTab /> : <RegisterTab />}
        </div>
      </div>
    </div>
  );
}
