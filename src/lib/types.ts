export type CategorySlug =
  | 'bracelets'
  | 'earrings'
  | 'brooches'
  | 'rings'
  | 'pendants'
  | 'sets'
  | 'toys'
  | 'tiaras';

export interface Product {
  sku: string;           // e.g. BC-0001
  category: CategorySlug;
  name: string;
  price: number;         // RUB, integer
  type: string;
  material: string;
  decoration?: string;   // bracelets, brooches, rings, sets, toys, tiaras
  hardware?: string;     // earrings, pendants
  size: string;
  description: string;
  image: {
    full: string;        // /images/products/full/BC-0001.jpg
    preview: string;     // /images/products/preview/BC-0001.jpg
  };
}

export interface CartItem {
  sku: string;
  name: string;
  price: number;   // RUB snapshot
  image: string;   // preview URL snapshot
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

export type CartAction =
  | { type: 'ADD_ITEM';    payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { sku: string } }
  | { type: 'UPDATE_QTY';  payload: { sku: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'INITIALIZE';  payload: CartItem[] };

export interface NewsPost {
  id: string;            // NS-0061
  date: string;          // "23 июля 2015"
  title: string;
  excerpt: string;
  image: string;         // /images/news/NS-0061.jpg
  url: string | null;
}
