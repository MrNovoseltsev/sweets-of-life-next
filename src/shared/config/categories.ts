import type { CategorySlug } from "@/entities/product/model/types";

interface CategoryMeta {
  slug: CategorySlug;
  label: string;
}

export const CATEGORY_META: CategoryMeta[] = [
  { slug: 'bracelets', label: 'Браслеты' },
  { slug: 'earrings',  label: 'Серьги' },
  { slug: 'brooches',  label: 'Броши' },
  { slug: 'rings',     label: 'Кольца' },
  { slug: 'pendants',  label: 'Подвески' },
  { slug: 'sets',      label: 'Наборы' },
  { slug: 'toys',      label: 'Игрушки' },
  { slug: 'tiaras',    label: 'Диадемы' },
];

export const CATEGORY_SLUGS = CATEGORY_META.map((c) => c.slug);
