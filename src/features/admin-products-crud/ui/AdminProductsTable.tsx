'use client';

import { useState, useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import type { Database } from '@/shared/lib/supabase/types';
import { AdminDataTable } from '@/widgets/admin-data-table/ui/AdminDataTable';
import { AdminRecordModal } from '@/widgets/admin-data-table/ui/AdminRecordModal';
import { productsColumns } from '@/widgets/admin-data-table/config/productsColumns';
import {
  createProductAction,
  updateProductAction,
  deleteProductAction,
} from '../actions';

type ProductRow = Database['public']['Tables']['products']['Row'];

type Props = {
  initialRows: ProductRow[];
};

export function AdminProductsTable({ initialRows }: Props) {
  const router = useRouter();
  const [rows, setRows] = useState<ProductRow[]>(initialRows);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRow, setEditingRow] = useState<ProductRow | null>(null);
  const [, startTransition] = useTransition();

  useEffect(() => {
    setRows(initialRows);
  }, [initialRows]);

  function handleCreate() {
    setEditingRow(null);
    setModalOpen(true);
  }

  function handleEdit(row: ProductRow) {
    setEditingRow(row);
    setModalOpen(true);
  }

  async function handleDelete(row: ProductRow) {
    setRows((prev) => prev.filter((r) => r.id !== row.id));
    startTransition(async () => {
      const result = await deleteProductAction(row.id);
      if (!result.success) {
        setRows((prev) => [row, ...prev]);
      }
    });
  }

  async function handleSubmit(formData: FormData) {
    if (editingRow) {
      const result = await updateProductAction(editingRow.id, formData);
      if (result.success) {
        router.refresh();
      }
      return result;
    } else {
      const result = await createProductAction(formData);
      if (result.success) {
        router.refresh();
      }
      return result;
    }
  }

  return (
    <>
      <AdminDataTable
        columns={productsColumns}
        rows={rows}
        sectionLabel="Продукты"
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
      />
      <AdminRecordModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        columns={productsColumns}
        initialData={editingRow}
        onSubmit={handleSubmit}
        title={editingRow ? 'Редактировать продукт' : 'Создать продукт'}
      />
    </>
  );
}
