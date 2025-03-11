
import { Accessibility } from "lucide-react";

export const PerfilPuestoAccessibilityInfo = () => {
  return (
    <div className="mt-6 text-xs text-gray-500 border-t pt-4">
      <div className="flex items-center gap-2">
        <Accessibility size={14} className="text-primary" aria-hidden="true" />
        <span>Esta interfaz cumple con los estándares de accesibilidad WCAG 2.1 AA.</span>
      </div>
      <p className="mt-1 ml-6">
        Usa las teclas Tab y Enter para navegar entre elementos. 
        Ctrl+F para buscar. Utiliza las teclas de flecha para navegar en la tabla.
      </p>
    </div>
  );
};
