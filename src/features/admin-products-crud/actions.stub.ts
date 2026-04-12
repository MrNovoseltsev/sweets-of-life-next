export type ActionResult = { success: boolean; error?: string };

export async function createProductAction(_formData: FormData): Promise<ActionResult> {
  return { success: false, error: 'Not available in demo' };
}

export async function updateProductAction(
  _id: number,
  _formData: FormData,
): Promise<ActionResult> {
  return { success: false, error: 'Not available in demo' };
}

export async function deleteProductAction(_id: number): Promise<ActionResult> {
  return { success: false, error: 'Not available in demo' };
}
