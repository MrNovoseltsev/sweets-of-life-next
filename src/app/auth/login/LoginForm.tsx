'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = String(formData.get('email') ?? '');
    const password = String(formData.get('password') ?? '');

    if (!email || !password) {
      setError('Email и пароль обязательны');
      return;
    }

    setPending(true);
    setError(null);

    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    );
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError('Неверный email или пароль');
      setPending(false);
    } else {
      router.push('/admin');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
      <h1 className="text-2xl font-normal tracking-wide">Вход</h1>

      {error && <p className="text-red-600 text-sm">{error}</p>}

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
