import type { ColumnDef } from '../model/types';
import type { AdminUserRow } from '@/entities/user/model/types';

export const usersColumns: ColumnDef<AdminUserRow>[] = [
  {
    key: 'id',
    label: 'UUID',
    readOnly: true,
    sortable: false,
    filterable: true,
    render: (v) => (
      <span className="text-xs text-neutral-400 font-mono">{String(v ?? '').slice(0, 8)}…</span>
    ),
  },
  { key: 'email', label: 'Email', readOnly: true, sortable: true, filterable: true, type: 'text' },
  {
    key: 'name',
    label: 'Имя',
    readOnly: true,
    sortable: true,
    filterable: true,
    type: 'text',
    render: (v) => (
      <span className="text-sm text-neutral-700">{v ? String(v) : <span className="text-neutral-400">—</span>}</span>
    ),
  },
  {
    key: 'role',
    label: 'Роль',
    sortable: true,
    filterable: true,
    type: 'select',
    options: [
      { value: 'user', label: 'user' },
      { value: 'admin', label: 'admin' },
    ],
    width: 'w-24',
    render: (v) => (
      <span
        className={`text-xs px-1.5 py-0.5 border ${
          v === 'admin'
            ? 'border-[#1e5945] text-[#1e5945]'
            : 'border-neutral-300 text-neutral-500'
        }`}
      >
        {String(v ?? 'user')}
      </span>
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
