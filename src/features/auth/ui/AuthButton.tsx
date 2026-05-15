'use client';

import { useRouter } from 'next/navigation';
import { createClient as createBrowserSupabaseClient } from '@/shared/lib/supabase/client';
import { useAuth } from '../model/AuthContext';
import UserIcon from '@/shared/ui/icons/User';

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
        aria-label="Войти"
        className="flex h-[38px] w-[38px] items-center justify-center rounded-full border-[1.5px] border-brand/[0.18] text-brand transition-colors hover:border-brand hover:bg-brand hover:text-white cursor-pointer"
      >
        <UserIcon />
      </button>
    );
  }

  const displayName = user.user_metadata?.name as string | undefined;
  const label = displayName ?? 'Клиент';

  return (
    <div className="flex items-center gap-2">
      <span
        className="hidden max-w-[110px] truncate text-[13px] text-brand md:block"
        title={label}
      >
        {label}
      </span>
      <button
        onClick={handleSignOut}
        title="Выйти"
        className="text-[12px] tracking-[0.06em] text-brand-mid/60 transition-colors hover:text-brand cursor-pointer whitespace-nowrap"
      >
        Выйти
      </button>
    </div>
  );
}
