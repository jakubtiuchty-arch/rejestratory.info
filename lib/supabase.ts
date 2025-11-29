import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Typy dla danych z bazy
export interface Device {
  id: string;
  created_at: string;
  client_name: string;
  device_name: string;
  serial_number: string;
  last_inspection_date: string;
  next_inspection_date: string;
  location: string;
  last_inspection_id: string | null;
}

export interface Inspection {
  id: string;
  created_at: string;
  client_name: string;
  client_email: string;
  inspection_date: string;
  next_inspection_date: string;
  location: string;
  reminder_sent: boolean;
  device_count: number;
  pdf_url: string | null;
}
