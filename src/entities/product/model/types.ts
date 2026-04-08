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
