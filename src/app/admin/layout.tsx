import { notFound } from 'next/navigation';
import { createServerSupabaseClient } from '@/shared/lib/supabase';
import { AdminSidebar } from '@/widgets/admin-sidebar/ui/AdminSidebar';
import { SignOutButton } from './_components/SignOutButton';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (process.env.NEXT_PUBLIC_USE_MOCK === 'true') {
    notFound();
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen flex bg-white">
      {/* Sidebar */}
      <aside className="w-52 min-h-screen border-r border-neutral-200 flex flex-col shrink-0">
        <div className="px-4 py-4 border-b border-neutral-200">
          <p className="text-xs text-neutral-900 font-medium tracking-wide mb-0.5">
            Администратор
          </p>
          <p className="text-xs text-neutral-400 truncate">{user?.email}</p>
        </div>
        <AdminSidebar />
        <div className="mt-auto px-4 py-4 border-t border-neutral-100">
          <SignOutButton />
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-auto min-w-0">{children}</main>
    </div>
  );
}
