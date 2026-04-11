import type { ColumnDef } from '../model/types';
import type { Database } from '@/shared/lib/supabase/types';
import { CATEGORY_META } from '@/shared/config/categories';

type ProductRow = Database['public']['Tables']['products']['Row'];

export const productsColumns: ColumnDef<ProductRow>[] = [
  { key: 'id', label: 'ID', readOnly: true, sortable: true, filterable: false, width: 'w-10' },
  { key: 'sku', label: 'SKU', sortable: true, filterable: true, type: 'text', width: 'w-24' },
  {
    key: 'category',
    label: 'Категория',
    sortable: true,
    filterable: true,
    type: 'select',
    options: CATEGORY_META.map((c) => ({ value: c.slug, label: c.label })),
    width: 'w-28',
  },
  { key: 'name', label: 'Название', sortable: true, filterable: true, type: 'text' },
  {
    key: 'price',
    label: 'Цена',
    sortable: true,
    filterable: true,
    type: 'number',
    width: 'w-20',
    render: (v) => <span className="tabular-nums">{String(v ?? 0)} ₽</span>,
  },
  {
    key: 'stock',
    label: 'Остаток',
    sortable: true,
    filterable: true,
    type: 'number',
    width: 'w-20',
    render: (v) => (
      <span className={`tabular-nums ${Number(v) === 0 ? 'text-red-500' : ''}`}>
        {String(v ?? 0)}
      </span>
    ),
  },
  { key: 'type', label: 'Тип', sortable: true, filterable: true, type: 'text' },
  { key: 'material', label: 'Материал', sortable: true, filterable: true, type: 'text' },
  { key: 'decoration', label: 'Декор', sortable: false, filterable: true, type: 'text' },
  { key: 'hardware', label: 'Фурнитура', sortable: false, filterable: true, type: 'text' },
  { key: 'size', label: 'Размер', sortable: false, filterable: true, type: 'text' },
  {
    key: 'description',
    label: 'Описание',
    sortable: false,
    filterable: true,
    type: 'textarea',
    render: (v) => (
      <span className="line-clamp-2 max-w-xs text-xs text-neutral-600">{String(v ?? '')}</span>
    ),
  },
  {
    key: 'image_preview',
    label: 'Превью',
    readOnly: false,
    sortable: false,
    filterable: false,
    type: 'text',
    render: (v) =>
      v ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={String(v)} className="w-10 h-10 object-cover border border-neutral-100" alt="" />
      ) : (
        <span className="text-neutral-300 text-xs">—</span>
      ),
  },
  {
    key: 'image_full',
    label: 'Фото',
    readOnly: false,
    sortable: false,
    filterable: false,
    type: 'text',
    render: (v) =>
      v ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={String(v)} className="w-10 h-10 object-cover border border-neutral-100" alt="" />
      ) : (
        <span className="text-neutral-300 text-xs">—</span>
      ),
  },
  {
    key: 'created_at',
    label: 'Создано',
    readOnly: true,
    sortable: true,
    filterable: false,
    render: (v) => (
      <span className="text-xs text-neutral-400">
        {v ? new Date(String(v)).toLocaleDateString('ru-RU') : '—'}
      </span>
    ),
  },
];
