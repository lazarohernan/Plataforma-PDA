
import { NavLink } from "@/components/atoms/NavLink";
import { cn } from "@/lib/utils";

interface NavigationMenuProps {
  className?: string;
}

export const NavigationMenu = ({ className }: NavigationMenuProps) => {
  return (
    <nav className={cn("flex items-center gap-4", className)}>
      <NavLink to="/about">
        Nosotros
      </NavLink>
      <NavLink to="/features">
        Características
      </NavLink>
      <NavLink to="/pricing">
        Precios
      </NavLink>
      <NavLink to="/contact">
        Contacto
      </NavLink>
    </nav>
  );
};
