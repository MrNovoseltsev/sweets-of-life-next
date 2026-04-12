export type PlaceOrderState = {
  error: string | null;
  success: boolean;
  orderId: number | null;
};

export async function placeOrder(
  _prev: PlaceOrderState,
  _formData: FormData,
): Promise<PlaceOrderState> {
  return { error: null, success: false, orderId: null };
}
