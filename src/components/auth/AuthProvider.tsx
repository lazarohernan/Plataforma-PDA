import React, { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { AuthResponse, UserProfile } from '@/types/auth';
import { AuthContext } from '@/contexts/AuthContext';

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

      // Si no existe el perfil, crear uno básico
      if (profileError) {
        console.warn("No se encontró perfil de usuario, creando uno básico");
        
        // Obtener el rol de usuario por defecto
        const { data: rolUsuario } = await supabase
          .from('roles')
          .select('id')
          .eq('nivel', 4)
          .single();
        
        // Crear un perfil básico
        const defaultProfile = {
          id: data.user.id,
          nombres: data.user.email?.split('@')[0] || 'Usuario',
          apellidos: '',
          rol_id: rolUsuario?.id,
          activo: true
        };
        
        // Insertar el perfil
        const { data: newProfile, error: insertError } = await supabase
          .from('perfiles_usuario')
          .insert(defaultProfile)
          .select(`
            *,
            organizacion:organizaciones(*),
            rol:roles(*)
          `)
          .single();
        
        if (insertError) {
          console.error("Error al crear perfil:", insertError);
          // Continuar con un perfil mínimo en memoria
          const minimalProfile: UserProfile = {
            ...defaultProfile,
            rol: { id: rolUsuario?.id || '', nivel: 4, nombre: 'Usuario' },
            organizacion: null,
            metadata: {}
          } as UserProfile;
          localStorage.setItem('userProfile', JSON.stringify(minimalProfile));
          return { data, profile: minimalProfile };
        }
        
        localStorage.setItem('userProfile', JSON.stringify(newProfile));
        return { data, profile: newProfile };
      }

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
