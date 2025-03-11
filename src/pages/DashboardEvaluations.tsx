
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { EvaluationsTable } from "@/components/dashboard/evaluations/EvaluationsTable";
import { Button } from "@/components/ui/button";
import { UserPlus, Filter } from "lucide-react";

const DashboardEvaluations = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Gestión de Evaluaciones</h1>
            <p className="text-gray-500">Administra y revisa todas las evaluaciones realizadas</p>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter size={16} />
              Filtros Avanzados
            </Button>
            <Button className="flex items-center gap-2">
              <UserPlus size={16} />
              Nueva Evaluación
            </Button>
          </div>
        </div>
        
        <EvaluationsTable />
      </div>
    </DashboardLayout>
  );
};

export default DashboardEvaluations;
