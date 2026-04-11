'use client';

import { useState, useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import type { Database } from '@/shared/lib/supabase/types';
import { AdminDataTable } from '@/widgets/admin-data-table/ui/AdminDataTable';
import { AdminRecordModal } from '@/widgets/admin-data-table/ui/AdminRecordModal';
import { newsColumns } from '@/widgets/admin-data-table/config/newsColumns';
import {
  createNewsAction,
  updateNewsAction,
  deleteNewsAction,
} from '../actions';

type NewsRow = Database['public']['Tables']['news']['Row'];

type Props = {
  initialRows: NewsRow[];
};

export function AdminNewsTable({ initialRows }: Props) {
  const router = useRouter();
  const [rows, setRows] = useState<NewsRow[]>(initialRows);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRow, setEditingRow] = useState<NewsRow | null>(null);
  const [, startTransition] = useTransition();

  // Sync local state when server re-renders with fresh data after router.refresh()
  useEffect(() => {
    setRows(initialRows);
  }, [initialRows]);

  function handleCreate() {
    setEditingRow(null);
    setModalOpen(true);
  }

  function handleEdit(row: NewsRow) {
    setEditingRow(row);
    setModalOpen(true);
  }

  async function handleDelete(row: NewsRow) {
    // Optimistic remove
    setRows((prev) => prev.filter((r) => r.id !== row.id));
    startTransition(async () => {
      const result = await deleteNewsAction(row.id);
      if (!result.success) {
        // Revert on error
        setRows((prev) => [row, ...prev]);
      }
    });
  }

  async function handleSubmit(formData: FormData) {
    if (editingRow) {
      const result = await updateNewsAction(editingRow.id, formData);
      if (result.success) {
        // Optimistic update: refresh from server to get accurate data
        router.refresh();
      }
      return result;
    } else {
      const result = await createNewsAction(formData);
      if (result.success) {
        router.refresh();
      }
      return result;
    }
  }

  return (
    <>
      <AdminDataTable
        columns={newsColumns}
        rows={rows}
        sectionLabel="Новости"
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
      />
      <AdminRecordModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        columns={newsColumns}
        initialData={editingRow}
        onSubmit={handleSubmit}
        title={editingRow ? 'Редактировать новость' : 'Создать новость'}
      />
    </>
  );
}
