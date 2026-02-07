import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jybhgpsogsnomeeyarzg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5YmhncHNvZ3Nub21lZXlhcnpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0ODExMjksImV4cCI6MjA4NjA1NzEyOX0.BGzvGqI7ScUArKxUUTZtTvt_P7yzQxOCJQaV8ATIwOQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
