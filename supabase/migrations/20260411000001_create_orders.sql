-- Create orders table (safe re-run)
CREATE TABLE IF NOT EXISTS public.orders (
  id             SERIAL PRIMARY KEY,
  user_id        UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status         TEXT NOT NULL DEFAULT 'pending',
  total_price    NUMERIC(10, 2) NOT NULL,
  items          JSONB NOT NULL,
  customer_name  TEXT,
  customer_email TEXT,
  notes          TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Policy: authenticated users can insert their own orders
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'orders' AND policyname = 'Users can insert own orders'
  ) THEN
    CREATE POLICY "Users can insert own orders"
      ON public.orders FOR INSERT
      WITH CHECK (auth.uid() = user_id);
  END IF;
END
$$;

-- Policy: users can view their own orders
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'orders' AND policyname = 'Users can view own orders'
  ) THEN
    CREATE POLICY "Users can view own orders"
      ON public.orders FOR SELECT
      USING (auth.uid() = user_id);
  END IF;
END
$$;

-- Function: auto-update updated_at on row change
CREATE OR REPLACE FUNCTION public.handle_order_updated()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Trigger (drop and recreate to ensure latest version)
DROP TRIGGER IF EXISTS on_order_updated ON public.orders;
CREATE TRIGGER on_order_updated
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.handle_order_updated();
