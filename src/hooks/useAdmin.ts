import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          setIsAdmin(false);
          return;
        }

        // Verificar si el usuario tiene rol de administrador en los metadatos
        const { data: user } = await supabase.auth.getUser();
        const isAdminByMetadata = user?.user?.user_metadata?.role === 'admin';
        
        if (isAdminByMetadata) {
          setIsAdmin(true);
          setLoading(false);
          return;
        }
        
        // Si no es admin por metadatos, verificar el nivel del rol en la base de datos
        const { data: profile, error } = await supabase
          .from('perfiles_usuario')
          .select(`
            rol:roles(nivel)
          `)
          .eq('id', session.user.id)
          .single();
        
        if (error) {
          console.error('Error fetching user profile:', error);
          setIsAdmin(false);
          return;
        }
        
        // Verificar si el nivel del rol es 1 (Administrador)
        const isAdminByRole = profile?.rol?.nivel === 1;
        
        setIsAdmin(isAdminByMetadata || isAdminByRole);
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();

    // Suscribirse a cambios en la autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkAdminStatus();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { isAdmin, loading };
};
