export interface CartItem {
  sku: string;
  name: string;
  price: number;   // RUB snapshot
  image: string;   // preview URL snapshot
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  hydrated: boolean;
}

export type CartAction =
  | { type: 'ADD_ITEM';    payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { sku: string } }
  | { type: 'UPDATE_QTY';  payload: { sku: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'HYDRATE';     payload: CartItem[] };
