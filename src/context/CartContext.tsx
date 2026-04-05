'use client';

import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import type { CartAction, CartState } from '@/lib/types';
import { cartReducer } from '@/lib/cart/reducer';
import { loadCart, saveCart } from '@/lib/cart/storage';

interface CartContextValue {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  hydrated: boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

const EMPTY_STATE: CartState = { items: [] };

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, EMPTY_STATE);
  const [hydrated, setHydrated] = useState(false);

  // Phase 1: load from localStorage on mount
  useEffect(() => {
    const stored = loadCart();
    if (stored.length > 0) {
      dispatch({ type: 'INITIALIZE', payload: stored });
    }
    setHydrated(true);
  }, []);

  // Phase 2: persist every change after hydration
  useEffect(() => {
    if (!hydrated) return;
    saveCart(state.items);
  }, [state.items, hydrated]);

  return (
    <CartContext.Provider value={{ state, dispatch, hydrated }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
