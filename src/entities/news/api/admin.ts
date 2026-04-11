import { createAdminClient } from '@/shared/lib/supabase/admin';
import type { Database } from '@/shared/lib/supabase/types';

type NewsRow = Database['public']['Tables']['news']['Row'];
type NewsInsert = Database['public']['Tables']['news']['Insert'];
type NewsUpdate = Database['public']['Tables']['news']['Update'];

export async function getAllNewsAdmin(): Promise<NewsRow[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .order('id', { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function createNews(data: NewsInsert): Promise<void> {
  const supabase = createAdminClient();
  const { error } = await supabase.from('news').insert(data);
  if (error) throw new Error(error.message);
}

export async function updateNews(id: number, data: NewsUpdate): Promise<void> {
  const supabase = createAdminClient();
  const { error } = await supabase.from('news').update(data).eq('id', id);
  if (error) throw new Error(error.message);
}

export async function deleteNews(id: number): Promise<void> {
  const supabase = createAdminClient();
  const { error } = await supabase.from('news').delete().eq('id', id);
  if (error) throw new Error(error.message);
}
