import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';

export const useAuth = () => {
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

  const signIn = async (email: string, password: string) => {
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

  const getUserProfile = () => {
    try {
      const profileStr = localStorage.getItem('userProfile');
      return profileStr ? JSON.parse(profileStr) : null;
    } catch {
      return null;
    }
  };

  return {
    session,
    loading,
    error,
    signIn,
    signOut,
    getUserProfile,
    isAuthenticated: !!session,
  };
};
