import type { Database } from '@/shared/lib/supabase/types';

export type OrderRow = Database['public']['Tables']['orders']['Row'];

export type OrderStatusDb =
  | 'pending'
  | 'confirmed'
  | 'paid'
  | 'shipped'
  | 'delivered'
  | 'cancelled';
