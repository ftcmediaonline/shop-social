-- Store the human-readable order number (e.g. TNG-ABC123) so customer and seller see the same value
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS order_number text;
