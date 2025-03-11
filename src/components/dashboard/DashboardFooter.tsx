
import { Accessibility } from "lucide-react";

export const DashboardFooter = () => {
  return (
    <footer className="h-12 px-6 rounded-xl bg-white flex items-center justify-between text-sm text-gray-700 mx-5 mb-5 shadow-sm glass-card" role="contentinfo" aria-label="Información del pie de página">
      <div className="flex items-center gap-2">
        <Accessibility size={16} aria-hidden="true" />
        <span>Plataforma PDA • Versión 2.0.1</span>
      </div>
      <div className="flex items-center gap-4">
        <a href="#" className="hover:text-[#1A365D] focus:outline-none focus:ring-2 focus:ring-primary rounded-sm p-1" aria-label="Términos y condiciones">Términos</a>
        <a href="#" className="hover:text-[#1A365D] focus:outline-none focus:ring-2 focus:ring-primary rounded-sm p-1" aria-label="Política de privacidad">Privacidad</a>
        <a href="#" className="hover:text-[#1A365D] focus:outline-none focus:ring-2 focus:ring-primary rounded-sm p-1" aria-label="Soporte técnico">Soporte</a>
      </div>
    </footer>
  );
};
