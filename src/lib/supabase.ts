import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gjthhdvxvccehgcbauab.supabase.co';
// Use placeholder key if not set - this allows the landing page to work without auth setup
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key-for-landing-page';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database
export type UserRegistration = {
    id?: string;
    email: string;
    full_name: string;
    company_name: string;
    phone_number: string;
    role?: string;
    industry?: string;
    team_size?: string;
    created_at?: string;
};
