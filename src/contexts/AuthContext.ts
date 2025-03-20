import { createContext, useContext } from 'react';
import { Session } from '@supabase/supabase-js';
import { AuthResponse, UserProfile } from '@/types/auth';

export interface AuthContextType {
  session: Session | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<AuthResponse>;
  signOut: () => Promise<void>;
  getUserProfile: () => UserProfile | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
