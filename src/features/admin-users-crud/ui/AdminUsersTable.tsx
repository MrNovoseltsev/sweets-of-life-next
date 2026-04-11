'use client';

import { useState, useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import type { AdminUserRow } from '@/entities/user/model/types';
import { AdminDataTable } from '@/widgets/admin-data-table/ui/AdminDataTable';
import { AdminRecordModal } from '@/widgets/admin-data-table/ui/AdminRecordModal';
import { usersColumns } from '@/widgets/admin-data-table/config/usersColumns';
import { updateUserRoleAction } from '../actions';
import type { ActionResult } from '../actions';

type Props = {
  initialRows: AdminUserRow[];
};

export function AdminUsersTable({ initialRows }: Props) {
  const router = useRouter();
  const [rows, setRows] = useState<AdminUserRow[]>(initialRows);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRow, setEditingRow] = useState<AdminUserRow | null>(null);
  const [, startTransition] = useTransition();

  useEffect(() => {
    setRows(initialRows);
  }, [initialRows]);

  function handleEdit(row: AdminUserRow) {
    setEditingRow(row);
    setModalOpen(true);
  }

  async function handleDelete(row: AdminUserRow) {
    // Users cannot be deleted from this panel
    void row;
  }

  async function handleSubmit(formData: FormData): Promise<ActionResult> {
    if (!editingRow) return { success: false, error: 'Нет данных' };
    const role = String(formData.get('role') ?? 'user');
    const result = await updateUserRoleAction(editingRow.id, role);
    if (result.success) {
      // Optimistic update
      setRows((prev) =>
        prev.map((r) => (r.id === editingRow.id ? { ...r, role } : r)),
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
        columns={usersColumns}
        rows={rows}
        sectionLabel="Пользователи"
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={() => {}}
        canCreate={false}
        canDelete={false}
      />
      <AdminRecordModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        columns={usersColumns}
        initialData={editingRow}
        onSubmit={handleSubmit}
        title="Изменить роль пользователя"
      />
    </>
  );
}
