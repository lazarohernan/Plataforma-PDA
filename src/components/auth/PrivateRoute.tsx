import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface PrivateRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export const PrivateRoute = ({ children, requireAdmin = false }: PrivateRouteProps) => {
  const { isAuthenticated, loading, getUserProfile } = useAuth();
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

  // Si requiere rol de admin, verificar el perfil
  if (requireAdmin) {
    const profile = getUserProfile();
    const isAdmin = profile?.rol?.nivel === 1;

    if (!isAdmin) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
};
