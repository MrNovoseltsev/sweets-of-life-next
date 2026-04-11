'use server';

import { revalidatePath } from 'next/cache';
import { createNews, updateNews, deleteNews } from '@/entities/news/api/admin';

export type ActionResult = { success: boolean; error?: string };

function parseNewsForm(formData: FormData) {
  return {
    slug: String(formData.get('slug') ?? ''),
    published_date: String(formData.get('published_date') ?? ''),
    title: String(formData.get('title') ?? ''),
    excerpt: String(formData.get('excerpt') ?? ''),
    image: String(formData.get('image') ?? ''),
    url: formData.get('url') ? String(formData.get('url')) : null,
  };
}

export async function createNewsAction(formData: FormData): Promise<ActionResult> {
  try {
    await createNews(parseNewsForm(formData));
    revalidatePath('/admin/news');
    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : 'Ошибка' };
  }
}

export async function updateNewsAction(
  id: number,
  formData: FormData,
): Promise<ActionResult> {
  try {
    await updateNews(id, parseNewsForm(formData));
    revalidatePath('/admin/news');
    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : 'Ошибка' };
  }
}

export async function deleteNewsAction(id: number): Promise<ActionResult> {
  try {
    await deleteNews(id);
    revalidatePath('/admin/news');
    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : 'Ошибка' };
  }
}
