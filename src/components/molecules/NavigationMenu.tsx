
import { LogIn, UserPlus } from "lucide-react";
import { NavLink } from "@/components/atoms/NavLink";
import { cn } from "@/lib/utils";

interface NavigationMenuProps {
  className?: string;
}

export const NavigationMenu = ({ className }: NavigationMenuProps) => {
  return (
    <nav className={cn("flex items-center gap-4", className)}>
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
