// Erstellung eines Supabase Client

import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://dtikevsjnatnwdnbnjyn.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0aWtldnNqbmF0bndkbmJuanluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MjgwODQsImV4cCI6MjA2NDAwNDA4NH0.CxoDDaGSpcWKeG605XZoZG0UeWmUcHPcdWkY_Qhxmns';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
