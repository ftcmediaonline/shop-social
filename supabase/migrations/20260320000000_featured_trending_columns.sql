-- Add is_featured to shops (admin-curated featured shops on home)
ALTER TABLE public.shops
  ADD COLUMN IF NOT EXISTS is_featured boolean DEFAULT false;

-- Add is_trending to products (admin-curated trending products on home)
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS is_trending boolean DEFAULT false;

-- Admins can already update shops (is_featured) via existing "Admins can update shops" policy.
-- Add policy so admins can update products (is_trending).
DROP POLICY IF EXISTS "Admins can update products" ON public.products;
CREATE POLICY "Admins can update products"
  ON public.products FOR UPDATE
  TO authenticated
  USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
  )
  WITH CHECK (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
  );
