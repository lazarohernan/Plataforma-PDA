
import { Accessibility } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserPlus, Filter } from "lucide-react";

export const EvaluationPageHeader = () => {
  return (
    <>
      <div className="flex items-center gap-2 mb-2">
        <Accessibility size={20} className="text-primary" aria-hidden="true" />
        <span className="text-sm text-primary">Accesible según WCAG 2.1 AA</span>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 id="page-title" className="text-2xl font-bold" tabIndex={-1}>Gestión de Evaluaciones</h1>
          <p className="text-gray-700">Administra y revisa todas las evaluaciones realizadas</p>
        </div>
        
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            aria-haspopup="dialog"
            aria-expanded="false"
          >
            <Filter size={16} aria-hidden="true" />
            Filtros Avanzados
          </Button>
          <Button 
            className="flex items-center gap-2"
            aria-haspopup="dialog"
          >
            <UserPlus size={16} aria-hidden="true" />
            Nueva Evaluación
          </Button>
        </div>
      </div>
    </>
  );
};
