import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('SUPABASE_URL_EM_USO:', supabaseUrl);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  email: string;
  full_name: string;
  phone: string | null;
  role: 'client' | 'professional' | 'admin';
  created_at: string;
  updated_at: string;
};

export type Service = {
  id: string;
  name: string;
  description: string;
  duration_minutes: number;
  price: number;
  active: boolean;
  created_at: string;
};

export type Appointment = {
  id: string;
  client_id: string;
  service_id: string;
  professional_id: string | null;
  appointment_date: string;
  appointment_time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes: string | null;
  created_at: string;
};

export type Evaluation = {
  id: string;
  client_id: string;
  professional_id: string;
  appointment_id: string | null;
  evaluation_date: string;
  pdf_url: string | null;
  notes: string | null;
  created_at: string;
};
