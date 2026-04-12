export type AuthState = {
  error: string | null;
  success: boolean;
  needsConfirmation?: boolean;
};

export async function customerSignIn(
  _prev: AuthState,
  _formData: FormData,
): Promise<AuthState> {
  return { error: null, success: false };
}

export async function customerSignUp(
  _prev: AuthState,
  _formData: FormData,
): Promise<AuthState> {
  return { error: null, success: false };
}
