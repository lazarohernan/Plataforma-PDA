import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-indigo-100">
      <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          {/* Icono de error estilizado */}
          <div className="mx-auto mb-6 relative">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-6xl font-bold text-red-500">!</span>
            </div>
            <div className="absolute -top-2 -right-2 bg-indigo-500 text-white text-xs font-bold rounded-full h-8 w-8 flex items-center justify-center">
              404
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Página no encontrada</h1>
          <p className="text-gray-600 mb-6">
            Lo sentimos, la página que estás buscando no existe o ha sido movida.
          </p>
          
          <div className="space-y-3">
            <Link 
              to="/" 
              className="block w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition duration-200"
            >
              Volver al inicio
            </Link>
            
            <div className="grid grid-cols-2 gap-3 mt-4">
              <Link 
                to="/assessment-welcome" 
                className="py-2 px-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm transition duration-200"
              >
                Iniciar evaluación
              </Link>
              <Link 
                to="/login" 
                className="py-2 px-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm transition duration-200"
              >
                Iniciar sesión
              </Link>
            </div>
            
            <Link 
              to="/acceso-evaluacion" 
              className="block mt-3 text-sm text-indigo-600 hover:text-indigo-800"
            >
              Tengo un código de evaluación
            </Link>
          </div>
          
          <p className="mt-8 text-sm text-gray-500">
            Si crees que esto es un error, por favor contacta a soporte.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
