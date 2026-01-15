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
  last_inspection_date: string | null; // NULL dla nowych urządzeń
  next_inspection_date: string;
  location: string;
  last_inspection_id: string | null;
  forestry_unit?: string;
  fiscalization_date?: string; // Data fiskalizacji dla nowych urządzeń
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

export interface Reminder {
  id: string;
  created_at: string;
  device_id: string;
  client_name: string;
  serial_number: string;
  reminder_date: string;
  reminder_type: 'inspection_due' | 'first_inspection';
  is_sent: boolean;
  sent_at: string | null;
}

export interface ClientDocument {
  id: string;
  created_at: string;
  client_name: string;
  document_type: 'contract' | 'protocol' | 'other';
  document_name: string;
  document_url: string;
  uploaded_by?: string;
  notes?: string;
}

// Typy urządzeń fiskalnych
export const DEVICE_TYPES = [
  { value: 'Posnet Pospay', label: 'Posnet Pospay' },
  { value: 'Posnet Temo Online', label: 'Posnet Temo Online' },
] as const;

export type DeviceType = typeof DEVICE_TYPES[number]['value'];
