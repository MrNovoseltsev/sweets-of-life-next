import { getAllProductsAdmin } from '@/entities/product/api/admin';
import { AdminProductsTable } from '@/features/admin-products-crud/ui/AdminProductsTable';

export default async function AdminProductsPage() {
  const rows = await getAllProductsAdmin();
  return <AdminProductsTable initialRows={rows} />;
}
