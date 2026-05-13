import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.warn("Supabase credentials missing. Check your .env.local file.");
}

// Ensure URL is valid and doesn't have trailing slashes or spaces
const sanitizedUrl = supabaseUrl.trim().replace(/\/$/, "");

export const supabase = createBrowserClient(sanitizedUrl, supabaseKey);
