
import { useState } from "react";
import { evaluationsData } from "./data/mockEvaluations";
import { EvaluationFilters } from "./EvaluationFilters";
import { EvaluationTableHeader } from "./EvaluationTableHeader";
import { EvaluationTableRow } from "./EvaluationTableRow";
import { EvaluationPagination } from "./EvaluationPagination";

export const EvaluationsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  
  // Filter evaluations based on current filters
  const filteredEvaluations = evaluationsData.filter(evaluation => {
    // Search filter
    const matchesSearch = 
      evaluation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evaluation.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Department filter
    const matchesDepartment = 
      selectedDepartment === "all" || evaluation.department === selectedDepartment;
    
    // Status filter
    const matchesStatus = 
      selectedStatus === "all" || evaluation.status === selectedStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  return (
    <div className="rounded-lg overflow-hidden border border-gray-100" role="region" aria-label="Tabla de evaluaciones">
      {/* Accessibility information */}
      <div className="sr-only">
        Esta tabla contiene información sobre las evaluaciones. Utilice las teclas de dirección para navegar entre las celdas.
      </div>
      
      {/* Filters */}
      <EvaluationFilters 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedDepartment={selectedDepartment}
        setSelectedDepartment={setSelectedDepartment}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
      />
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200" role="grid" aria-label="Tabla de evaluaciones">
          <caption className="sr-only">Evaluaciones con información de nombre, fecha, departamento, estado y dimensión dominante</caption>
          
          <EvaluationTableHeader />
          
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredEvaluations.map((evaluation) => (
              <EvaluationTableRow key={evaluation.id} evaluation={evaluation} />
            ))}
            {filteredEvaluations.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-gray-700">
                  No se encontraron evaluaciones con los filtros seleccionados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <EvaluationPagination 
        filteredCount={filteredEvaluations.length} 
        totalCount={evaluationsData.length} 
      />
    </div>
  );
};
