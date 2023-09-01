// Erstellung eines Supabase Client

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://npkbzmbbycmbbavnpptp.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wa2J6bWJieWNtYmJhdm5wcHRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMzMDIzNTIsImV4cCI6MjAwODg3ODM1Mn0.elzPs3uY9SMFKdTqA41W9TjJmMCJ5n6oy4DJrQf70JU';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
