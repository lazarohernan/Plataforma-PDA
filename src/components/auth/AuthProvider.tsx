import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { AuthResponse, UserProfile } from '@/types/auth';

interface AuthContextType {
  session: Session | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<AuthResponse>;
  signOut: () => Promise<void>;
  getUserProfile: () => UserProfile | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Recuperar sesión inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Suscribirse a cambios en la autenticación
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string): Promise<AuthResponse> => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Obtener el perfil del usuario y sus roles
      const { data: profile, error: profileError } = await supabase
        .from('perfiles_usuario')
        .select(`
          *,
          organizacion:organizaciones(*),
          rol:roles(*)
        `)
        .eq('id', data.user.id)
        .single();

      if (profileError) throw profileError;

      // Guardar información adicional en el localStorage
      localStorage.setItem('userProfile', JSON.stringify(profile));
      
      return { data, profile };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido';
      setError(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      // Limpiar información adicional del localStorage
      localStorage.removeItem('userProfile');
      
      // Redirigir al inicio
      navigate('/', { replace: true });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido';
      setError(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getUserProfile = (): UserProfile | null => {
    try {
      const profileStr = localStorage.getItem('userProfile');
      return profileStr ? JSON.parse(profileStr) : null;
    } catch {
      return null;
    }
  };

  const value = {
    session,
    loading,
    error,
    isAuthenticated: !!session,
    signIn,
    signOut,
    getUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
