import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useAdmin } from '@/hooks/useAdmin';
import { supabase } from '@/lib/supabase';

interface PrivateRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export const PrivateRoute = ({ children, requireAdmin = false }: PrivateRouteProps) => {
  const { isAuthenticated, loading, getUserProfile } = useAuth();
  const { isAdmin } = useAdmin();
  const location = useLocation();

  // Mostrar pantalla de carga mientras verificamos la autenticación
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-indigo-100">
        <div className="text-2xl text-gray-600 animate-pulse">Cargando...</div>
      </div>
    );
  }

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    // Guardar la ubicación actual para redirigir después del login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si requiere rol de admin, verificar si es admin
  if (requireAdmin) {
    // Obtener el perfil del usuario para depuración
    const profile = getUserProfile();
    
    console.log('PrivateRoute - isAdmin:', isAdmin);
    console.log('PrivateRoute - profile:', profile);
    
    // Si no es admin, redirigir
    if (!isAdmin) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
};
