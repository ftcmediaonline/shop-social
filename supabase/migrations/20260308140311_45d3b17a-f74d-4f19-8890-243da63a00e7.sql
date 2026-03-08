
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone text;

CREATE TABLE public.promotional_emails (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject text NOT NULL,
  body text NOT NULL,
  recipient_group text NOT NULL,
  recipient_count integer DEFAULT 0,
  status text NOT NULL DEFAULT 'draft',
  scheduled_at timestamptz,
  sent_at timestamptz,
  open_rate numeric(5,2),
  created_by uuid NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.promotional_emails ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can manage promotional emails"
  ON public.promotional_emails FOR ALL TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);
