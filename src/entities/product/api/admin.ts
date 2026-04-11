import { createAdminClient } from '@/shared/lib/supabase/admin';
import type { Database } from '@/shared/lib/supabase/types';

type ProductRow = Database['public']['Tables']['products']['Row'];
type ProductInsert = Database['public']['Tables']['products']['Insert'];
type ProductUpdate = Database['public']['Tables']['products']['Update'];

export async function getAllProductsAdmin(): Promise<ProductRow[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('id', { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function createProduct(data: ProductInsert): Promise<void> {
  const supabase = createAdminClient();
  const { error } = await supabase.from('products').insert(data);
  if (error) throw new Error(error.message);
}

export async function updateProduct(id: number, data: ProductUpdate): Promise<void> {
  const supabase = createAdminClient();
  const { error } = await supabase.from('products').update(data).eq('id', id);
  if (error) throw new Error(error.message);
}

export async function deleteProduct(id: number): Promise<void> {
  const supabase = createAdminClient();
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) throw new Error(error.message);
}
