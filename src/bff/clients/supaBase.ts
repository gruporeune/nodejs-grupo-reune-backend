import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rxlymqymfccfjupiquvg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4bHltcXltZmNjZmp1cGlxdXZnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MTI5ODk4NywiZXhwIjoyMDY2ODc0OTg3fQ.szAh31DbMyhtj1dj_nTSR8NOYxKEH_RX50_ct4N0Vh0';

if (!supabaseKey) throw new Error('SUPABASE_KEY is missing in .env');

export const supabase = createClient(supabaseUrl, supabaseKey);
