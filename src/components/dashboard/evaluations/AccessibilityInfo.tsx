
import { Accessibility } from "lucide-react";

export const AccessibilityInfo = () => {
  return (
    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg" role="region" aria-label="Información de accesibilidad">
      <h3 className="text-sm font-medium text-blue-800 mb-2 flex items-center gap-2">
        <Accessibility size={16} aria-hidden="true" />
        Características de accesibilidad
      </h3>
      <ul className="text-sm text-blue-700 list-disc pl-5 space-y-1">
        <li>Navegación completa con teclado (use Tab para moverse entre elementos)</li>
        <li>Compatible con lectores de pantalla</li>
        <li>Contraste de color que cumple con WCAG 2.1 AA</li>
        <li>Texto escalable sin pérdida de funcionalidad</li>
        <li>Mensajes de error claros y descriptivos</li>
      </ul>
    </div>
  );
};
