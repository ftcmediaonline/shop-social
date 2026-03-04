-- Allow authenticated users to submit their own review (user_id must match)
DROP POLICY IF EXISTS "Authenticated users can insert own review" ON public.reviews;
CREATE POLICY "Authenticated users can insert own review"
ON public.reviews
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());
