'use client';

import { useState, useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import type { OrderRow, OrderStatusDb } from '@/entities/order/model/types';
import { AdminDataTable } from '@/widgets/admin-data-table/ui/AdminDataTable';
import { AdminRecordModal } from '@/widgets/admin-data-table/ui/AdminRecordModal';
import { ordersColumns } from '@/widgets/admin-data-table/config/ordersColumns';
import { updateOrderAction, deleteOrderAction } from '../actions';
import type { ActionResult } from '../actions';

type Props = {
  initialRows: OrderRow[];
};

export function AdminOrdersTable({ initialRows }: Props) {
  const router = useRouter();
  const [rows, setRows] = useState<OrderRow[]>(initialRows);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRow, setEditingRow] = useState<OrderRow | null>(null);
  const [, startTransition] = useTransition();

  useEffect(() => {
    setRows(initialRows);
  }, [initialRows]);

  function handleEdit(row: OrderRow) {
    setEditingRow(row);
    setModalOpen(true);
  }

  async function handleDelete(row: OrderRow) {
    await deleteOrderAction(row.id);
    setRows((prev) => prev.filter((r) => r.id !== row.id));
    startTransition(() => {
      router.refresh();
    });
  }

  async function handleSubmit(formData: FormData): Promise<ActionResult> {
    if (!editingRow) return { success: false, error: 'Нет данных' };
    const result = await updateOrderAction(editingRow.id, formData);
    if (result.success) {
      const status = String(formData.get('status') ?? editingRow.status) as OrderStatusDb;
      const notes = (formData.get('notes') as string | null) ?? editingRow.notes;
      setRows((prev) =>
        prev.map((r) =>
          r.id === editingRow.id ? { ...r, status, notes: notes?.trim() || null } : r,
        ),
      );
      startTransition(() => {
        router.refresh();
      });
    }
    return result;
  }

  return (
    <>
      <AdminDataTable
        columns={ordersColumns}
        rows={rows}
        sectionLabel="Заказы"
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={() => {}}
        canCreate={false}
        canDelete={true}
      />
      <AdminRecordModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        columns={ordersColumns}
        initialData={editingRow}
        onSubmit={handleSubmit}
        title="Изменить заказ"
      />
    </>
  );
}
