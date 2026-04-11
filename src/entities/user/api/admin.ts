import { createAdminClient } from '@/shared/lib/supabase/admin';
import type { AdminUserRow } from '../model/types';

export async function getAllUsersAdmin(): Promise<AdminUserRow[]> {
  const supabase = createAdminClient();

  const { data: authData, error: authError } = await supabase.auth.admin.listUsers({
    perPage: 1000,
  });
  if (authError) throw new Error(authError.message);

  const { data: profiles, error: profilesError } = await supabase
    .from('profiles')
    .select('id, role');
  if (profilesError) throw new Error(profilesError.message);

  const roleMap = new Map((profiles ?? []).map((p) => [p.id, p.role]));

  return (authData.users ?? []).map((u) => ({
    id: u.id,
    email: u.email ?? '',
    role: roleMap.get(u.id) ?? 'user',
    created_at: u.created_at,
  }));
}

export async function updateUserRole(userId: string, role: string): Promise<void> {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from('profiles')
    .update({ role })
    .eq('id', userId);
  if (error) throw new Error(error.message);
}
