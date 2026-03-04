-- Allow sellers to reply to reviews
ALTER TABLE public.reviews
ADD COLUMN IF NOT EXISTS owner_reply text,
ADD COLUMN IF NOT EXISTS owner_replied_at timestamptz;

-- Everyone can read products (storefront)
CREATE POLICY "Public can read products"
ON public.products
FOR SELECT
TO public
USING (true);

-- Shop owners can read their own products (for dashboard; also covered by public read)
CREATE POLICY "Shop owners can select own products"
ON public.products
FOR SELECT
TO authenticated
USING (
  EXISTS (SELECT 1 FROM public.shops WHERE id = shop_id AND owner_id = auth.uid())
);

-- Shop owners can insert products for their own shop
CREATE POLICY "Shop owners can insert products"
ON public.products
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (SELECT 1 FROM public.shops WHERE id = shop_id AND owner_id = auth.uid())
);

-- Shop owners can update their own products
CREATE POLICY "Shop owners can update own products"
ON public.products
FOR UPDATE
TO authenticated
USING (
  EXISTS (SELECT 1 FROM public.shops WHERE id = shop_id AND owner_id = auth.uid())
)
WITH CHECK (true);

-- Everyone can read reviews (product page)
CREATE POLICY "Public can read reviews"
ON public.reviews
FOR SELECT
TO public
USING (true);

-- Shop owners can update reviews (reply) for products in their shop
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
WITH CHECK (true);

-- Shop owners can read reviews for their products
CREATE POLICY "Shop owners can read reviews for own products"
ON public.reviews
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.products p
    JOIN public.shops s ON s.id = p.shop_id AND s.owner_id = auth.uid()
    WHERE p.id = reviews.product_id
  )
);
