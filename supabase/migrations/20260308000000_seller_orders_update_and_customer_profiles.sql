-- Shop owners can update their shop orders (e.g. set status to delivered)
DROP POLICY IF EXISTS "Shop owners can update their shop orders" ON public.orders;
CREATE POLICY "Shop owners can update their shop orders"
ON public.orders
FOR UPDATE
TO authenticated
USING (
  shop_id IN (SELECT id FROM public.shops WHERE owner_id = auth.uid())
)
WITH CHECK (
  shop_id IN (SELECT id FROM public.shops WHERE owner_id = auth.uid())
);

-- Shop owners can read customer profiles for users who placed orders in their shop
-- (profiles.id = auth user id; orders.user_id = customer auth id)
DROP POLICY IF EXISTS "Shop owners can read customer profiles for orders" ON public.profiles;
CREATE POLICY "Shop owners can read customer profiles for orders"
ON public.profiles
FOR SELECT
TO authenticated
USING (
  id IN (SELECT user_id FROM public.orders WHERE shop_id IN (SELECT id FROM public.shops WHERE owner_id = auth.uid()))
);
