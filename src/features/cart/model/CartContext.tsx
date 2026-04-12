'use client';

import { createContext, useContext, useEffect, useReducer } from 'react';
import type { CartAction, CartState } from './types';
import { cartReducer } from './reducer';
import { loadCart, saveCart } from './storage';

interface CartContextValue {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  hydrated: boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

const EMPTY_STATE: CartState = { items: [], hydrated: false };

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, EMPTY_STATE);

  // Phase 1: load from localStorage on mount — single dispatch sets items + hydrated
  useEffect(() => {
    dispatch({ type: 'HYDRATE', payload: loadCart() });
  }, []);

  // Phase 2: persist every change after hydration
  useEffect(() => {
    if (!state.hydrated) return;
    saveCart(state.items);
  }, [state.items, state.hydrated]);

  return (
    <CartContext.Provider value={{ state, dispatch, hydrated: state.hydrated }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
