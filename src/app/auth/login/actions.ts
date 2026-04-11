'use server';

import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/shared/lib/supabase';

export type LoginState = { error: string | null };

export async function signIn(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get('email') ?? '');
  const password = String(formData.get('password') ?? '');

  if (!email || !password) {
    return { error: 'Email и пароль обязательны' };
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: 'Неверный email или пароль' };
  }

  redirect('/admin');
}
