import type { ColumnDef } from '../model/types';
import type { Database } from '@/shared/lib/supabase/types';

type NewsRow = Database['public']['Tables']['news']['Row'];

export const newsColumns: ColumnDef<NewsRow>[] = [
  { key: 'id', label: 'ID', readOnly: true, sortable: true, filterable: false, width: 'w-10' },
  { key: 'slug', label: 'Slug', sortable: true, filterable: true, type: 'text' },
  { key: 'title', label: 'Заголовок', sortable: true, filterable: true, type: 'text' },
  {
    key: 'published_date',
    label: 'Дата',
    sortable: true,
    filterable: true,
    type: 'text',
    width: 'w-28',
  },
  {
    key: 'excerpt',
    label: 'Анонс',
    sortable: false,
    filterable: true,
    type: 'textarea',
    render: (v) => (
      <span className="line-clamp-2 max-w-xs text-xs text-neutral-600">{String(v ?? '')}</span>
    ),
  },
  {
    key: 'image',
    label: 'Изображение',
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
    key: 'url',
    label: 'URL',
    sortable: false,
    filterable: true,
    type: 'text',
    render: (v) =>
      v ? (
        <a
          href={String(v)}
          className="underline text-xs text-neutral-500 hover:text-neutral-800"
          target="_blank"
          rel="noreferrer"
        >
          ссылка
        </a>
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
    width: 'w-32',
    render: (v) => (
      <span className="text-xs text-neutral-400">
        {v ? new Date(String(v)).toLocaleDateString('ru-RU') : '—'}
      </span>
    ),
  },
];
