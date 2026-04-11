'use server';

import { revalidatePath } from 'next/cache';
import { updateUserRole } from '@/entities/user/api/admin';

export type ActionResult = { success: boolean; error?: string };

export async function updateUserRoleAction(
  userId: string,
  role: string,
): Promise<ActionResult> {
  try {
    await updateUserRole(userId, role);
    revalidatePath('/admin/users');
    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : 'Ошибка' };
  }
}
