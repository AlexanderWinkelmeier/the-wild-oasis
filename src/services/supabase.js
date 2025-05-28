// Erstellung eines Supabase Client

import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

// Named Export (für neue Imports)
export { supabase };
// Default Export (für Kompatibilität mit bestehenden Imports)
export default supabase;
