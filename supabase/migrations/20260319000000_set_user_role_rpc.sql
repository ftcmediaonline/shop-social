-- RPC so admins can set any user's role (bypasses RLS)
-- Works whether profiles use id = auth.uid() or user_id = auth.uid()
CREATE OR REPLACE FUNCTION public.set_user_role(target_profile_id uuid, new_role text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  caller_role text;
  use_user_id boolean;
BEGIN
  -- Detect whether profiles has user_id column (some setups use id = auth.uid() instead)
  SELECT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'user_id'
  ) INTO use_user_id;

  IF use_user_id THEN
    SELECT role INTO caller_role FROM public.profiles WHERE user_id = auth.uid() LIMIT 1;
  ELSE
    SELECT role INTO caller_role FROM public.profiles WHERE id = auth.uid() LIMIT 1;
  END IF;

  IF caller_role IS NULL OR caller_role != 'admin' THEN
    RAISE EXCEPTION 'Only admins can set user role';
  END IF;

  IF new_role IS NULL OR new_role NOT IN ('admin', 'user') THEN
    RAISE EXCEPTION 'Invalid role. Use admin or user.';
  END IF;

  UPDATE public.profiles SET role = new_role WHERE id = target_profile_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Profile not found';
  END IF;
END;
$$;

GRANT EXECUTE ON FUNCTION public.set_user_role(uuid, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.set_user_role(uuid, text) TO service_role;
