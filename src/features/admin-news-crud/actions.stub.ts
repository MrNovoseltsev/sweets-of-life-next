export type ActionResult = { success: boolean; error?: string };

export async function createNewsAction(_formData: FormData): Promise<ActionResult> {
  return { success: false, error: 'Not available in demo' };
}

export async function updateNewsAction(
  _id: number,
  _formData: FormData,
): Promise<ActionResult> {
  return { success: false, error: 'Not available in demo' };
}

export async function deleteNewsAction(_id: number): Promise<ActionResult> {
  return { success: false, error: 'Not available in demo' };
}
