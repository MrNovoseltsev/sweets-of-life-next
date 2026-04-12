import type { ColumnDef } from '../model/types';
import type { OrderRow, OrderStatusDb } from '@/entities/order/model/types';

const STATUS_LABELS: Record<OrderStatusDb, string> = {
  pending:   'Ожидает',
  confirmed: 'Подтверждён',
  paid:      'Оплачен',
  shipped:   'Отправлен',
  delivered: 'Доставлен',
  cancelled: 'Отменён',
};

const STATUS_COLORS: Record<OrderStatusDb, string> = {
  pending:   'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  paid:      'bg-green-100 text-green-800',
  shipped:   'bg-indigo-100 text-indigo-800',
  delivered: 'bg-emerald-100 text-emerald-800',
  cancelled: 'bg-red-100 text-red-800',
};

export const ordersColumns: ColumnDef<OrderRow>[] = [
  {
    key: 'id',
    label: '№',
    readOnly: true,
    sortable: true,
    filterable: false,
    width: 'w-12',
  },
  {
    key: 'created_at',
    label: 'Дата',
    readOnly: true,
    sortable: true,
    filterable: false,
    render: (value) =>
      new Date(value as string).toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
  },
  {
    key: 'customer_name',
    label: 'Покупатель',
    readOnly: true,
    sortable: true,
    filterable: true,
    render: (value) => (value as string) ?? '—',
  },
  {
    key: 'customer_email',
    label: 'Email',
    readOnly: true,
    sortable: true,
    filterable: true,
    render: (value) =>
      value ? (
        <a
          href={`mailto:${value}`}
          className="text-[#40d39d] hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          {value as string}
        </a>
      ) : (
        '—'
      ),
  },
  {
    key: 'status',
    label: 'Статус',
    sortable: true,
    filterable: true,
    type: 'select',
    options: (Object.keys(STATUS_LABELS) as OrderStatusDb[]).map((s) => ({
      value: s,
      label: STATUS_LABELS[s],
    })),
    render: (value) => {
      const s = value as OrderStatusDb;
      return (
        <span
          className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[s] ?? 'bg-gray-100 text-gray-700'}`}
        >
          {STATUS_LABELS[s] ?? s}
        </span>
      );
    },
  },
  {
    key: 'items',
    label: 'Товары',
    readOnly: true,
    sortable: false,
    filterable: false,
    render: (value) => {
      const items = value as Array<{ quantity: number }>;
      const count = items.reduce((n, i) => n + i.quantity, 0);
      return <span>{count} шт.</span>;
    },
  },
  {
    key: 'total_price',
    label: 'Сумма',
    sortable: true,
    filterable: false,
    readOnly: true,
    render: (value) => `${Number(value).toLocaleString('ru-RU')} ₽`,
  },
  {
    key: 'notes',
    label: 'Комментарий',
    sortable: false,
    filterable: true,
    type: 'textarea',
    render: (value) => (value as string) ?? '—',
  },
];
