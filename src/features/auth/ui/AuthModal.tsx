'use client';

import { useActionState, useEffect, useState } from 'react';
import { customerSignIn, customerSignUp, type AuthState } from '../actions';
import { useAuth } from '../model/AuthContext';

const INITIAL_STATE: AuthState = { error: null, success: false };

function LoginTab() {
  const { closeAuthModal } = useAuth();
  const [state, formAction, pending] = useActionState(customerSignIn, INITIAL_STATE);

  useEffect(() => {
    if (state.success) closeAuthModal();
  }, [state.success, closeAuthModal]);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {state.error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
          {state.error}
        </p>
      )}
      <div className="flex flex-col gap-1">
        <label className="text-sm text-[#1e5945]/70">Email</label>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="border border-[#1e5945]/30 rounded px-3 py-2 text-sm outline-none focus:border-[#40d39d] transition-colors"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm text-[#1e5945]/70">Пароль</label>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="border border-[#1e5945]/30 rounded px-3 py-2 text-sm outline-none focus:border-[#40d39d] transition-colors"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="bg-[#1e5945] text-white rounded py-2.5 text-sm font-medium hover:bg-[#164030] transition-colors disabled:opacity-60 cursor-pointer"
      >
        {pending ? 'Входим...' : 'Войти'}
      </button>
    </form>
  );
}

function RegisterTab() {
  const { closeAuthModal } = useAuth();
  const [state, formAction, pending] = useActionState(customerSignUp, INITIAL_STATE);

  useEffect(() => {
    if (state.success) closeAuthModal();
  }, [state.success, closeAuthModal]);

  if (state.needsConfirmation) {
    return (
      <div className="text-center py-6">
        <p className="text-[#1e5945] font-medium mb-2">Проверьте почту</p>
        <p className="text-sm text-[#1e5945]/70">
          На ваш email отправлена ссылка для подтверждения регистрации.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {state.error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
          {state.error}
        </p>
      )}
      <div className="flex flex-col gap-1">
        <label className="text-sm text-[#1e5945]/70">Имя</label>
        <input
          name="name"
          type="text"
          required
          autoComplete="name"
          className="border border-[#1e5945]/30 rounded px-3 py-2 text-sm outline-none focus:border-[#40d39d] transition-colors"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm text-[#1e5945]/70">Email</label>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="border border-[#1e5945]/30 rounded px-3 py-2 text-sm outline-none focus:border-[#40d39d] transition-colors"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm text-[#1e5945]/70">Пароль</label>
        <input
          name="password"
          type="password"
          required
          autoComplete="new-password"
          minLength={6}
          className="border border-[#1e5945]/30 rounded px-3 py-2 text-sm outline-none focus:border-[#40d39d] transition-colors"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="bg-[#1e5945] text-white rounded py-2.5 text-sm font-medium hover:bg-[#164030] transition-colors disabled:opacity-60 cursor-pointer"
      >
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
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/40 z-[60] flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#1e5945]/40 hover:text-[#1e5945] text-2xl leading-none cursor-pointer"
          aria-label="Закрыть"
        >
          ×
        </button>

        {/* Tabs */}
        <div className="flex border-b border-[#1e5945]/20 mb-6">
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 pb-3 text-sm font-medium transition-colors cursor-pointer ${
              activeTab === 'login'
                ? 'text-[#1e5945] border-b-2 border-[#40d39d]'
                : 'text-[#1e5945]/50 hover:text-[#1e5945]'
            }`}
          >
            Войти
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`flex-1 pb-3 text-sm font-medium transition-colors cursor-pointer ${
              activeTab === 'register'
                ? 'text-[#1e5945] border-b-2 border-[#40d39d]'
                : 'text-[#1e5945]/50 hover:text-[#1e5945]'
            }`}
          >
            Регистрация
          </button>
        </div>

        {activeTab === 'login' ? <LoginTab /> : <RegisterTab />}
      </div>
    </div>
  );
}
