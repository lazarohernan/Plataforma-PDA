
import { useState } from "react";
import { perfilesPuestoData, PerfilPuesto, getDimensionDominante } from "./data/mockPerfilesPuesto";
import { PerfilPuestoFilters } from "./PerfilPuestoFilters";
import { PerfilPuestoTableHeader } from "./PerfilPuestoTableHeader";
import { PerfilPuestoTableRow } from "./PerfilPuestoTableRow";
import { PerfilPuestoPagination } from "./PerfilPuestoPagination";
import { useToast } from "@/hooks/use-toast";

export const PerfilPuestoTable = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartamento, setSelectedDepartamento] = useState("Todos");
  const [selectedDimension, setSelectedDimension] = useState("todas");
  const [perfiles, setPerfiles] = useState(perfilesPuestoData);
  
  // Eliminar perfil
  const handleDelete = (id: string) => {
    setPerfiles(perfiles.filter(perfil => perfil.id !== id));
    toast({
      title: "Perfil eliminado",
      description: "El perfil de puesto ha sido eliminado correctamente.",
      variant: "default",
    });
  };
  
  // Duplicar perfil
  const handleDuplicate = (perfil: PerfilPuesto) => {
    const newPerfil = {
      ...perfil,
      id: `pp${Math.floor(Math.random() * 10000)}`,
      nombre: `${perfil.nombre} (Copia)`,
      fechaCreacion: new Date().toLocaleDateString()
    };
    
    setPerfiles([...perfiles, newPerfil]);
    toast({
      title: "Perfil duplicado",
      description: "Se ha creado una copia del perfil de puesto.",
      variant: "default",
    });
  };
  
  // Filtrar perfiles
  const filteredPerfiles = perfiles.filter(perfil => {
    // Filtro de búsqueda
    const matchesSearch = 
      perfil.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      perfil.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filtro de departamento
    const matchesDepartamento = 
      selectedDepartamento === "Todos" || perfil.departamento === selectedDepartamento;
    
    // Filtro de dimensión dominante
    const dimensionDominante = getDimensionDominante(perfil.dimensiones);
    const matchesDimension = 
      selectedDimension === "todas" || dimensionDominante.nombre === selectedDimension;
    
    return matchesSearch && matchesDepartamento && matchesDimension;
  });

  return (
    <div className="rounded-lg overflow-hidden border border-gray-100" role="region" aria-label="Tabla de perfiles de puesto">
      {/* Accessibility information */}
      <div className="sr-only">
        Esta tabla contiene información sobre los perfiles de puesto. Utilice las teclas de dirección para navegar entre las celdas.
      </div>
      
      {/* Filters */}
      <PerfilPuestoFilters 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedDepartamento={selectedDepartamento}
        setSelectedDepartamento={setSelectedDepartamento}
        selectedDimension={selectedDimension}
        setSelectedDimension={setSelectedDimension}
      />
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200" role="grid" aria-label="Tabla de perfiles de puesto">
          <caption className="sr-only">Perfiles de puesto con información de nombre, departamento, fecha de creación, dimensión dominante y acciones</caption>
          
          <PerfilPuestoTableHeader />
          
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPerfiles.map((perfil) => (
              <PerfilPuestoTableRow 
                key={perfil.id} 
                perfil={perfil} 
                onDelete={handleDelete}
                onDuplicate={handleDuplicate}
              />
            ))}
            {filteredPerfiles.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-gray-700">
                  No se encontraron perfiles de puesto con los filtros seleccionados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <PerfilPuestoPagination 
        filteredCount={filteredPerfiles.length} 
        totalCount={perfiles.length} 
      />
    </div>
  );
};
