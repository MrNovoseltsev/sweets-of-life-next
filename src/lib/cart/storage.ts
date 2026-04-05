import type { CartItem } from '@/lib/types';

const CART_KEY = 'sweetsoflife_cart';

export function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as CartItem[];
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]): void {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  } catch {
    // storage full or disabled — fail silently
  }
}

export function clearStoredCart(): void {
  try {
    localStorage.removeItem(CART_KEY);
  } catch {
    // fail silently
  }
}
