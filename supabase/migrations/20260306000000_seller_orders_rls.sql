-- Enable RLS so policies apply
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Drop existing policies so migration is idempotent (safe to re-run)
DROP POLICY IF EXISTS "Shop owners can view their shop orders" ON public.orders;
DROP POLICY IF EXISTS "Users can view own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can insert own orders" ON public.orders;
DROP POLICY IF EXISTS "Shop owners can view order items for their shop" ON public.order_items;
DROP POLICY IF EXISTS "Users can view own order items" ON public.order_items;
DROP POLICY IF EXISTS "Users can insert own order items" ON public.order_items;

-- Shop owners can view orders for their shop
CREATE POLICY "Shop owners can view their shop orders"
ON public.orders
FOR SELECT
TO authenticated
USING (
  shop_id IN (SELECT id FROM public.shops WHERE owner_id = auth.uid())
);

-- Customers can view their own orders
CREATE POLICY "Users can view own orders"
ON public.orders
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Customers can create orders (checkout)
CREATE POLICY "Users can insert own orders"
ON public.orders
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

-- Shop owners can view order items for their shop's orders
CREATE POLICY "Shop owners can view order items for their shop"
ON public.order_items
FOR SELECT
TO authenticated
USING (
  order_id IN (
    SELECT id FROM public.orders
    WHERE shop_id IN (SELECT id FROM public.shops WHERE owner_id = auth.uid())
  )
);

-- Customers can view order items for their own orders
CREATE POLICY "Users can view own order items"
ON public.order_items
FOR SELECT
TO authenticated
USING (
  order_id IN (SELECT id FROM public.orders WHERE user_id = auth.uid())
);

-- Customers can insert order items for their own orders (checkout)
CREATE POLICY "Users can insert own order items"
ON public.order_items
FOR INSERT
TO authenticated
WITH CHECK (
  order_id IN (SELECT id FROM public.orders WHERE user_id = auth.uid())
);
