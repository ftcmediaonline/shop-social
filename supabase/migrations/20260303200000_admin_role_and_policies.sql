-- Add admin role to profiles (id = auth.uid() in typical Supabase setup)
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS role text NOT NULL DEFAULT 'user';

-- Admins can update any shop (e.g. set is_verified for approval)
CREATE POLICY "Admins can update shops"
ON public.shops
FOR UPDATE
TO authenticated
USING (
  (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
)
WITH CHECK (true);

-- Admins can delete shops (e.g. reject an application)
CREATE POLICY "Admins can delete shops"
ON public.shops
FOR DELETE
TO authenticated
USING (
  (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);

-- If your shops table has RLS that only allows reading verified shops, add this so admins can see pending:
-- CREATE POLICY "Admins can select all shops" ON public.shops FOR SELECT TO authenticated
-- USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- To make a user an admin, run in SQL Editor (replace with the user's auth id):
-- UPDATE public.profiles SET role = 'admin' WHERE id = 'YOUR_AUTH_USER_UUID';
-- Get YOUR_AUTH_USER_UUID from Supabase Dashboard → Authentication → Users → copy user UUID.
