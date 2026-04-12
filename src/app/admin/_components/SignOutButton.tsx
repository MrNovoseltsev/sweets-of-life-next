"use client";

import { createBrowserClient } from "@supabase/ssr";

export function SignOutButton() {
  const handleClick = async () => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    );
    await supabase.auth.signOut();
    window.location.href = "/auth/login";
  };

  return (
    <button
      onClick={handleClick}
      className="text-xs text-neutral-400 underline hover:text-neutral-700"
    >
      Выйти
    </button>
  );
}
