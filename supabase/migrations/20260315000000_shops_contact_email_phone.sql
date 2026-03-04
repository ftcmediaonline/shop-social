-- Store seller contact email and phone on the shop (from open-shop signup)
ALTER TABLE public.shops
  ADD COLUMN IF NOT EXISTS contact_email text,
  ADD COLUMN IF NOT EXISTS contact_phone text;
