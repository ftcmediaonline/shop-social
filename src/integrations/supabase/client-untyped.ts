// Untyped re-export for pages that reference tables not yet in the DB schema.
// Once the proper migrations are run, remove this file and import from client.ts instead.
import { supabase } from './client';

export const db = supabase as any;
