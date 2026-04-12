'use server';

import { revalidatePath } from 'next/cache';
import { updateOrder, deleteOrder } from '@/entities/order/api/admin';
import type { OrderStatusDb } from '@/entities/order/model/types';

export type ActionResult = { success: boolean; error?: string };

export async function updateOrderAction(
  id: number,
  formData: FormData,
): Promise<ActionResult> {
  try {
    const status = String(formData.get('status') ?? '') as OrderStatusDb;
    const notes = formData.get('notes') as string | null;
    await updateOrder(id, { status, notes: notes?.trim() || null });
    revalidatePath('/admin/orders');
    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : 'Ошибка' };
  }
}

export async function deleteOrderAction(id: number): Promise<ActionResult> {
  try {
    await deleteOrder(id);
    revalidatePath('/admin/orders');
    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : 'Ошибка' };
  }
}
