import { getAllUsersAdmin } from '@/entities/user/api/admin';
import { AdminUsersTable } from '@/features/admin-users-crud/ui/AdminUsersTable';

export default async function AdminUsersPage() {
  const rows = await getAllUsersAdmin();
  return <AdminUsersTable initialRows={rows} />;
}
