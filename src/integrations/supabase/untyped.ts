// Untyped supabase client for tables not yet in generated types
// Use this for tables like shops, products, cart_items, etc.
import { supabase } from '@/integrations/supabase/client';

export const sb = supabase as any;
