'use server';

import { createServerSupabaseClient, createAdminClient } from '@/shared/lib/supabase';
import type { CartItem } from '@/features/cart/model/types';

export type PlaceOrderState = {
  error: string | null;
  success: boolean;
  orderId: number | null;
};

export async function placeOrder(
  _prev: PlaceOrderState,
  formData: FormData,
): Promise<PlaceOrderState> {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'Необходимо войти в аккаунт', success: false, orderId: null };
  }

  const itemsRaw = String(formData.get('items') ?? '[]');
  const notes = formData.get('notes') as string | null;

  let items: CartItem[];
  try {
    items = JSON.parse(itemsRaw) as CartItem[];
  } catch {
    return { error: 'Ошибка данных корзины', success: false, orderId: null };
  }

  if (!items.length) {
    return { error: 'Корзина пуста', success: false, orderId: null };
  }

  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const admin = createAdminClient();
  const { data, error } = await admin
    .from('orders')
    .insert({
      user_id: user.id,
      status: 'pending',
      total_price: totalPrice,
      items: items as unknown as import('@/shared/lib/supabase/types').Json,
      customer_name: (user.user_metadata?.name as string | undefined) ?? null,
      customer_email: user.email ?? null,
      notes: notes?.trim() || null,
    })
    .select('id')
    .single();

  if (error) {
    return { error: 'Не удалось оформить заказ. Попробуйте позже', success: false, orderId: null };
  }

  return { error: null, success: true, orderId: data.id };
}
