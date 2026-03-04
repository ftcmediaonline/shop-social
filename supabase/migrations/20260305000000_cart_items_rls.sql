-- Allow users to manage their own cart items
CREATE POLICY "Users can select own cart items"
ON public.cart_items
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Users can insert own cart items"
ON public.cart_items
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own cart items"
ON public.cart_items
FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own cart items"
ON public.cart_items
FOR DELETE
TO authenticated
USING (user_id = auth.uid());
