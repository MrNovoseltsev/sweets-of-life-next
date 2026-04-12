import type { CartAction, CartState } from './types';

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'HYDRATE':
      return { items: action.payload, hydrated: true };

    case 'ADD_ITEM': {
      const existing = state.items.find((i) => i.sku === action.payload.sku);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.sku === action.payload.sku
              ? { ...i, quantity: Math.min(i.quantity + 1, 99) }
              : i
          ),
        };
      }
      return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
    }

    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((i) => i.sku !== action.payload.sku) };

    case 'UPDATE_QTY': {
      if (action.payload.quantity <= 0) {
        return { ...state, items: state.items.filter((i) => i.sku !== action.payload.sku) };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.sku === action.payload.sku
            ? { ...i, quantity: Math.min(action.payload.quantity, 99) }
            : i
        ),
      };
    }

    case 'CLEAR_CART':
      return { ...state, items: [] };

    default:
      return state;
  }
}
