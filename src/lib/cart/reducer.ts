import type { CartAction, CartState } from '@/lib/types';

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'INITIALIZE':
      return { items: action.payload };

    case 'ADD_ITEM': {
      const existing = state.items.find((i) => i.sku === action.payload.sku);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.sku === action.payload.sku
              ? { ...i, quantity: Math.min(i.quantity + 1, 99) }
              : i
          ),
        };
      }
      return { items: [...state.items, { ...action.payload, quantity: 1 }] };
    }

    case 'REMOVE_ITEM':
      return { items: state.items.filter((i) => i.sku !== action.payload.sku) };

    case 'UPDATE_QTY': {
      if (action.payload.quantity <= 0) {
        return { items: state.items.filter((i) => i.sku !== action.payload.sku) };
      }
      return {
        items: state.items.map((i) =>
          i.sku === action.payload.sku
            ? { ...i, quantity: Math.min(action.payload.quantity, 99) }
            : i
        ),
      };
    }

    case 'CLEAR_CART':
      return { items: [] };

    default:
      return state;
  }
}
