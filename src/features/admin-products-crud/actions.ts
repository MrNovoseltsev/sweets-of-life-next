'use server';

import { revalidatePath } from 'next/cache';
import { createProduct, updateProduct, deleteProduct } from '@/entities/product/api/admin';
import type { Database } from '@/shared/lib/supabase/types';

type CategorySlugDb = Database['public']['Tables']['products']['Row']['category'];

export type ActionResult = { success: boolean; error?: string };

function parseProductForm(formData: FormData) {
  return {
    sku: String(formData.get('sku') ?? ''),
    category: String(formData.get('category') ?? '') as CategorySlugDb,
    name: String(formData.get('name') ?? ''),
    price: Number(formData.get('price') ?? 0),
    type: String(formData.get('type') ?? ''),
    material: String(formData.get('material') ?? ''),
    decoration: formData.get('decoration') ? String(formData.get('decoration')) : null,
    hardware: formData.get('hardware') ? String(formData.get('hardware')) : null,
    size: String(formData.get('size') ?? ''),
    description: String(formData.get('description') ?? ''),
    image_full: String(formData.get('image_full') ?? ''),
    image_preview: String(formData.get('image_preview') ?? ''),
    stock: Number(formData.get('stock') ?? 0),
  };
}

export async function createProductAction(formData: FormData): Promise<ActionResult> {
  try {
    await createProduct(parseProductForm(formData));
    revalidatePath('/admin/products');
    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : 'Ошибка' };
  }
}

export async function updateProductAction(
  id: number,
  formData: FormData,
): Promise<ActionResult> {
  try {
    await updateProduct(id, parseProductForm(formData));
    revalidatePath('/admin/products');
    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : 'Ошибка' };
  }
}

export async function deleteProductAction(id: number): Promise<ActionResult> {
  try {
    await deleteProduct(id);
    revalidatePath('/admin/products');
    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : 'Ошибка' };
  }
}
