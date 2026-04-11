'use server';

import { createServerSupabaseClient } from '@/shared/lib/supabase';

export type AuthState = {
  error: string | null;
  success: boolean;
  needsConfirmation?: boolean;
};

export async function customerSignIn(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = String(formData.get('email') ?? '');
  const password = String(formData.get('password') ?? '');

  if (!email || !password) {
    return { error: 'Email и пароль обязательны', success: false };
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: 'Неверный email или пароль', success: false };
  }

  return { error: null, success: true };
}

export async function customerSignUp(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const password = String(formData.get('password') ?? '');

  if (!name || !email || !password) {
    return { error: 'Все поля обязательны', success: false };
  }

  if (password.length < 6) {
    return { error: 'Пароль должен содержать минимум 6 символов', success: false };
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  });

  if (error) {
    if (error.message.includes('already registered') || error.message.includes('already been registered')) {
      return { error: 'Этот email уже зарегистрирован', success: false };
    }
    return { error: 'Ошибка регистрации. Попробуйте позже', success: false };
  }

  // If no session returned — email confirmation required
  if (!data.session) {
    return { error: null, success: false, needsConfirmation: true };
  }

  return { error: null, success: true };
}
