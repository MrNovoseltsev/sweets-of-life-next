export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type CategorySlugDb =
  | 'bracelets'
  | 'earrings'
  | 'brooches'
  | 'rings'
  | 'pendants'
  | 'sets'
  | 'toys'
  | 'tiaras';

export type OrderStatusDb =
  | 'pending'
  | 'confirmed'
  | 'paid'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: number;
          sku: string;
          category: CategorySlugDb;
          name: string;
          price: number;
          type: string;
          material: string;
          decoration: string | null;
          hardware: string | null;
          size: string;
          description: string;
          image_full: string;
          image_preview: string;
          stock: number;
          created_at: string;
        };
        Insert: {
          id?: never;
          sku: string;
          category: CategorySlugDb;
          name: string;
          price: number;
          type: string;
          material: string;
          decoration?: string | null;
          hardware?: string | null;
          size: string;
          description: string;
          image_full: string;
          image_preview: string;
          stock?: number;
          created_at?: string;
        };
        Update: {
          id?: never;
          sku?: string;
          category?: CategorySlugDb;
          name?: string;
          price?: number;
          type?: string;
          material?: string;
          decoration?: string | null;
          hardware?: string | null;
          size?: string;
          description?: string;
          image_full?: string;
          image_preview?: string;
          stock?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      orders: {
        Row: {
          id: number;
          user_id: string | null;
          status: OrderStatusDb;
          total_price: number;
          items: Json;
          customer_name: string | null;
          customer_email: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: never;
          user_id?: string | null;
          status?: OrderStatusDb;
          total_price: number;
          items: Json;
          customer_name?: string | null;
          customer_email?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: never;
          user_id?: string | null;
          status?: OrderStatusDb;
          total_price?: number;
          items?: Json;
          customer_name?: string | null;
          customer_email?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      news: {
        Row: {
          id: number;
          slug: string;
          published_date: string;
          title: string;
          excerpt: string;
          image: string;
          url: string | null;
          created_at: string;
        };
        Insert: {
          id?: never;
          slug: string;
          published_date: string;
          title: string;
          excerpt: string;
          image: string;
          url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: never;
          slug?: string;
          published_date?: string;
          title?: string;
          excerpt?: string;
          image?: string;
          url?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          id: string;
          role: string;
          name: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          role?: string;
          name?: string | null;
          created_at?: string;
        };
        Update: {
          role?: string;
          name?: string | null;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
