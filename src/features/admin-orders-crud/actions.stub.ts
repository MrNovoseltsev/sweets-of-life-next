export type ActionResult = { success: boolean; error?: string };

export async function updateOrderAction(
  _id: number,
  _formData: FormData,
): Promise<ActionResult> {
  return { success: false, error: 'Not available in demo' };
}

export async function deleteOrderAction(_id: number): Promise<ActionResult> {
  return { success: false, error: 'Not available in demo' };
}
