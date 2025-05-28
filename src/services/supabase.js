// Erstellung eines Supabase Client

import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Debug: Environment Variables prüfen
console.log('Environment Check:', {
  url: supabaseUrl,
  keyExists: !!supabaseKey,
  keyLength: supabaseKey?.length
});

// Fallback für fehlende Environment Variables
if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase Environment Variables fehlen!');
  throw new Error('Supabase configuration is missing. Please check your environment variables.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Named Export (für neue Imports)
export { supabase };
// Default Export (für Kompatibilität mit bestehenden Imports)
export default supabase;
