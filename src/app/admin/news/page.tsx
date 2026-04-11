import { getAllNewsAdmin } from '@/entities/news/api/admin';
import { AdminNewsTable } from '@/features/admin-news-crud/ui/AdminNewsTable';

export default async function AdminNewsPage() {
  const rows = await getAllNewsAdmin();
  return <AdminNewsTable initialRows={rows} />;
}
