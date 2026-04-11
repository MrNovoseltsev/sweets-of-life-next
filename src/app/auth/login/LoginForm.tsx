'use client';

import { useActionState } from 'react';
import { signIn, type LoginState } from './actions';

const initialState: LoginState = { error: null };

export default function LoginForm() {
  const [state, action, pending] = useActionState(signIn, initialState);

  return (
    <form action={action} className="flex flex-col gap-4 w-full max-w-sm">
      <h1 className="text-2xl font-normal tracking-wide">Вход</h1>

      {state.error && (
        <p className="text-red-600 text-sm">{state.error}</p>
      )}

      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        autoComplete="email"
        className="border border-neutral-300 px-3 py-2 text-base focus:outline-none focus:border-neutral-600"
      />
      <input
        name="password"
        type="password"
        placeholder="Пароль"
        required
        autoComplete="current-password"
        className="border border-neutral-300 px-3 py-2 text-base focus:outline-none focus:border-neutral-600"
      />
      <button
        type="submit"
        disabled={pending}
        className="bg-neutral-900 text-white px-4 py-2 text-base hover:bg-neutral-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {pending ? 'Вход...' : 'Войти'}
      </button>
    </form>
  );
}
