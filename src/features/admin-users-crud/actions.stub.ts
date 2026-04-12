export type ActionResult = { success: boolean; error?: string };

export async function updateUserRoleAction(
  _userId: string,
  _role: string,
): Promise<ActionResult> {
  return { success: false, error: 'Not available in demo' };
}
