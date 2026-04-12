import { createAdminClient } from '@/shared/lib/supabase/admin';
import type { OrderRow, OrderStatusDb } from '../model/types';

export async function getAllOrdersAdmin(): Promise<OrderRow[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function updateOrder(
  id: number,
  fields: { status?: OrderStatusDb; notes?: string | null },
): Promise<void> {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from('orders')
    .update(fields)
    .eq('id', id);
  if (error) throw new Error(error.message);
}

export async function deleteOrder(id: number): Promise<void> {
  const supabase = createAdminClient();
  const { error } = await supabase.from('orders').delete().eq('id', id);
  if (error) throw new Error(error.message);
}
