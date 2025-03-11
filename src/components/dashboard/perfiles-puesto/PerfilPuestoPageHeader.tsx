
import { Briefcase, Plus, Upload, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const PerfilPuestoPageHeader = () => {
  const navigate = useNavigate();
  
  const handleCreateNew = () => {
    navigate("/dashboard/perfiles-puesto/crear");
  };
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
      <div>
        <h1 id="page-title" className="text-2xl font-bold" tabIndex={-1}>Perfiles de Puesto</h1>
        <p className="text-gray-700">Crea y gestiona perfiles conductuales ideales para posiciones en tu organización</p>
      </div>
      
      <div className="flex gap-3">
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
        >
          <Upload size={16} aria-hidden="true" />
          Importar
        </Button>
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
        >
          <Download size={16} aria-hidden="true" />
          Exportar
        </Button>
        <Button 
          className="flex items-center gap-2 bg-[#1A365D]"
          onClick={handleCreateNew}
        >
          <Plus size={16} aria-hidden="true" />
          Nuevo Perfil
        </Button>
      </div>
    </div>
  );
};
