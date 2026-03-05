-- Add phone number to user profiles (editable on profile page)
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS phone text;
