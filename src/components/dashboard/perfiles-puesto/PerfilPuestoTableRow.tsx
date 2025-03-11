
import { Eye, Edit, Copy, Trash, GitCompare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PerfilPuesto, getDimensionDominante } from "./data/mockPerfilesPuesto";
import { useNavigate } from "react-router-dom";

type PerfilPuestoTableRowProps = {
  perfil: PerfilPuesto;
  onDelete: (id: string) => void;
  onDuplicate: (perfil: PerfilPuesto) => void;
};

export const PerfilPuestoTableRow = ({ 
  perfil, 
  onDelete, 
  onDuplicate 
}: PerfilPuestoTableRowProps) => {
  const navigate = useNavigate();
  const dimensionDominante = getDimensionDominante(perfil.dimensiones);
  
  // Función para manejar la edición
  const handleEdit = () => {
    navigate(`/dashboard/perfiles-puesto/editar/${perfil.id}`);
  };
  
  // Función para manejar la comparación
  const handleCompare = () => {
    navigate(`/dashboard/perfiles-puesto/comparar/${perfil.id}`);
  };
  
  // Función para ver detalles
  const handleView = () => {
    // Aquí podríamos mostrar un modal con detalles o navegar a una página de detalles
    console.log("Ver detalles del perfil:", perfil.id);
  };

  // Definimos colores para cada dimensión
  const getDimensionColor = (dimension: string) => {
    switch (dimension) {
      case "Riesgo": return "bg-[#D32F2F]/10 text-[#D32F2F]";
      case "Extroversión": return "bg-[#FFC107]/10 text-[#FFC107]";
      case "Paciencia": return "bg-[#388E3C]/10 text-[#388E3C]";
      case "Normatividad": return "bg-[#1976D2]/10 text-[#1976D2]";
      case "Autocontrol": return "bg-[#7B1FA2]/10 text-[#7B1FA2]";
      default: return "bg-gray-100 text-gray-600";
    }
  };
  
  return (
    <tr className="hover:bg-gray-50" tabIndex={0}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="font-medium text-gray-900">{perfil.nombre}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        {perfil.departamento}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        {perfil.fechaCreacion}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {dimensionDominante.nombre !== "-" ? (
          <div className="flex items-center" aria-label={`Dimensión dominante: ${dimensionDominante.nombre} ${dimensionDominante.valor}%`}>
            <span 
              className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getDimensionColor(dimensionDominante.nombre)}`}
            >
              {dimensionDominante.nombre}
            </span>
            <div className="w-16 h-2 bg-gray-200 rounded-full ml-2" role="presentation">
              <div 
                className="h-full rounded-full bg-blue-600" 
                style={{ width: `${dimensionDominante.valor}%` }}
                aria-hidden="true"
              />
            </div>
            <span className="text-xs text-gray-700 ml-1">{dimensionDominante.valor}%</span>
          </div>
        ) : (
          <span className="text-sm text-gray-500" aria-label="Sin dimensión dominante">-</span>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex justify-end gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0" 
            onClick={handleView}
            aria-label={`Ver detalles de ${perfil.nombre}`}
          >
            <Eye size={16} />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0" 
            onClick={handleEdit}
            aria-label={`Editar ${perfil.nombre}`}
          >
            <Edit size={16} />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0" 
            onClick={() => onDuplicate(perfil)}
            aria-label={`Duplicar ${perfil.nombre}`}
          >
            <Copy size={16} />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0" 
            onClick={handleCompare}
            aria-label={`Comparar ${perfil.nombre}`}
          >
            <GitCompare size={16} />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50" 
            onClick={() => onDelete(perfil.id)}
            aria-label={`Eliminar ${perfil.nombre}`}
          >
            <Trash size={16} />
          </Button>
        </div>
      </td>
    </tr>
  );
};
