
import { Logo } from "@/components/atoms/Logo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LogIn, ClipboardCheck } from "lucide-react";

interface HeaderProps {
  minimal?: boolean;
}

export const Header = ({ minimal = false }: HeaderProps) => {
  return (
    <header className="w-full py-4 px-4 md:px-8 backdrop-blur-sm bg-white/80 shadow-sm border-b border-gray-100 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <Logo />
        </Link>
        
        {minimal ? (
          <Button variant="ghost" size="sm" asChild>
            <Link to="/">
              Volver al Inicio
            </Link>
          </Button>
        ) : (
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/acceso-evaluacion" className="flex items-center gap-2">
                <ClipboardCheck className="h-4 w-4" />
                Evaluación
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/login" className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                Iniciar Sesión
              </Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};
