
import { LogIn, UserPlus } from "lucide-react";
import { NavLink } from "@/components/atoms/NavLink";

export const NavigationMenu = () => {
  return (
    <nav className="flex items-center gap-4">
      <NavLink to="/login" icon={LogIn}>
        Iniciar Sesión
      </NavLink>
      <NavLink 
        to="/register" 
        icon={UserPlus}
        className="bg-gradient-to-r from-gray-700 to-gray-600 text-white px-6 py-2 rounded-md hover:opacity-90"
      >
        Registrarse
      </NavLink>
    </nav>
  );
};

