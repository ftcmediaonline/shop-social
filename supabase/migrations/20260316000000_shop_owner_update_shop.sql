-- Shop owners can update their own shop (e.g. contact email/phone)
DROP POLICY IF EXISTS "Shop owners can update own shop" ON public.shops;
CREATE POLICY "Shop owners can update own shop"
  ON public.shops
  FOR UPDATE
  TO authenticated
  USING (owner_id = auth.uid())
  WITH CHECK (owner_id = auth.uid());
