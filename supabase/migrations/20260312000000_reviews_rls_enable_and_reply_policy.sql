-- Ensure RLS is enabled on reviews so policies apply
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Ensure shop owners can update (reply to) reviews for their shop's products
DROP POLICY IF EXISTS "Shop owners can reply to reviews" ON public.reviews;
CREATE POLICY "Shop owners can reply to reviews"
ON public.reviews
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.products p
    JOIN public.shops s ON s.id = p.shop_id AND s.owner_id = auth.uid()
    WHERE p.id = reviews.product_id
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.products p
    JOIN public.shops s ON s.id = p.shop_id AND s.owner_id = auth.uid()
    WHERE p.id = reviews.product_id
  )
);
