-- RLS for product_likes (wishlist): users can manage their own likes
ALTER TABLE public.product_likes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own product likes" ON public.product_likes;
DROP POLICY IF EXISTS "Users can insert own product likes" ON public.product_likes;
DROP POLICY IF EXISTS "Users can delete own product likes" ON public.product_likes;

CREATE POLICY "Users can view own product likes"
ON public.product_likes
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Users can insert own product likes"
ON public.product_likes
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own product likes"
ON public.product_likes
FOR DELETE
TO authenticated
USING (user_id = auth.uid());
