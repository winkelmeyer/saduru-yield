import type { User as SupabaseUser } from '@supabase/supabase-js';

export interface AuthError {
  message: string;
  status?: number;
}

export interface User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  referral_code?: string;
}

export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
  referral_code: string | null;
  created_at: string;
  updated_at: string;
}

export type AuthState = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
};

export type AuthContextType = AuthState & {
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}; 