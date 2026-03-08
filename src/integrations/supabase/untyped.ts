// Untyped supabase client for tables not yet in generated types
import { supabase as typedSupabase } from '@/integrations/supabase/client';

export const supabase = typedSupabase as any;
