export type LoginState = { error: string | null };

export async function signIn(
  _prev: LoginState,
  _formData: FormData,
): Promise<LoginState> {
  return { error: 'Вход недоступен в демо-режиме' };
}
