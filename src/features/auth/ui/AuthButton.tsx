'use client';

import { useRouter } from 'next/navigation';
import { createClient as createBrowserSupabaseClient } from '@/shared/lib/supabase/client';
import { useAuth } from '../model/AuthContext';

export default function AuthButton() {
  const { user, openAuthModal } = useAuth();
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createBrowserSupabaseClient();
    await supabase.auth.signOut();
    router.refresh();
  }

  if (!user) {
    return (
      <button
        onClick={openAuthModal}
        className="text-sm text-[#1e5945] border border-[#1e5945]/30 rounded-lg px-3 py-1.5 hover:border-[#40d39d] hover:text-[#40d39d] transition-colors cursor-pointer whitespace-nowrap"
      >
        Войти
      </button>
    );
  }

  const displayName = user.user_metadata?.name as string | undefined;
  const label = displayName ?? user.email ?? 'Аккаунт';

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-[#1e5945] max-w-[100px] truncate hidden md:block" title={label}>
        {label}
      </span>
      <button
        onClick={handleSignOut}
        className="text-sm text-[#1e5945]/60 hover:text-[#1e5945] transition-colors cursor-pointer whitespace-nowrap"
        title="Выйти"
      >
        Выйти
      </button>
    </div>
  );
}
