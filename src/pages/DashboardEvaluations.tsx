
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { EvaluationsTable } from "@/components/dashboard/evaluations/EvaluationsTable";
import { Button } from "@/components/ui/button";
import { UserPlus, Filter, Accessibility } from "lucide-react";

const DashboardEvaluations = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6" role="main" aria-labelledby="page-title">
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
        
        <EvaluationsTable />
        
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
      </div>
    </DashboardLayout>
  );
};

export default DashboardEvaluations;
