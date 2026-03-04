-- Add seller reply columns to reviews (run this if you get "could not find owner_replied_at" errors)
ALTER TABLE public.reviews
  ADD COLUMN IF NOT EXISTS owner_reply text,
  ADD COLUMN IF NOT EXISTS owner_replied_at timestamptz;
