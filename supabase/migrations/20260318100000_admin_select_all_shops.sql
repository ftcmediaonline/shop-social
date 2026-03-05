-- Allow admins to select all shops (for admin dashboard "All shops" list)
DROP POLICY IF EXISTS "Admins can select all shops" ON public.shops;
CREATE POLICY "Admins can select all shops"
  ON public.shops FOR SELECT
  TO authenticated
  USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
  );
