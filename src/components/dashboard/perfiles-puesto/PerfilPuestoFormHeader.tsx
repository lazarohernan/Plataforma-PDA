
import { ArrowLeft, Save, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface PerfilPuestoFormHeaderProps {
  isEditing: boolean;
  onSave: () => void;
  onDelete?: () => void;
}

export const PerfilPuestoFormHeader = ({ 
  isEditing, 
  onSave, 
  onDelete 
}: PerfilPuestoFormHeaderProps) => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate("/dashboard/perfiles-puesto");
  };
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
      <div>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-0 h-8 w-8"
            onClick={handleBack}
            aria-label="Volver a la lista de perfiles"
          >
            <ArrowLeft size={18} />
          </Button>
          <h1 id="page-title" className="text-2xl font-bold" tabIndex={-1}>
            {isEditing ? "Editar Perfil de Puesto" : "Crear Nuevo Perfil de Puesto"}
          </h1>
        </div>
        <p className="text-gray-700 mt-1 ml-10">
          {isEditing 
            ? "Modifica los parámetros del perfil conductual para este puesto" 
            : "Define los parámetros conductuales ideales para este puesto"
          }
        </p>
      </div>
      
      <div className="flex gap-3">
        {isEditing && onDelete && (
          <Button 
            variant="outline" 
            className="flex items-center gap-2 text-red-500 hover:text-red-700 hover:bg-red-50"
            onClick={onDelete}
          >
            <Trash size={16} aria-hidden="true" />
            Eliminar
          </Button>
        )}
        <Button 
          onClick={onSave}
          className="flex items-center gap-2 bg-[#1A365D]"
        >
          <Save size={16} aria-hidden="true" />
          Guardar Perfil
        </Button>
      </div>
    </div>
  );
};
