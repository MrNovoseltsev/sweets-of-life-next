import { getAllOrdersAdmin } from '@/entities/order/api/admin';
import { AdminOrdersTable } from '@/features/admin-orders-crud/ui/AdminOrdersTable';

export default async function AdminOrdersPage() {
  const orders = await getAllOrdersAdmin();
  return <AdminOrdersTable initialRows={orders} />;
}
