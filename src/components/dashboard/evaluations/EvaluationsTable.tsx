
import { useState } from "react";
import { 
  Eye, 
  MailPlus, 
  Download, 
  Archive, 
  Search, 
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Accessibility
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for evaluations
const evaluationsData = [
  {
    id: 1,
    name: "Carlos Rodríguez",
    date: "24/08/2023",
    department: "Ventas",
    status: "Completado",
    dimensions: { risk: 82, extroversion: 65, patience: 40, normativity: 55, selfControl: 60 }
  },
  {
    id: 2,
    name: "Ana Martínez",
    date: "22/08/2023",
    department: "Marketing",
    status: "Completado",
    dimensions: { risk: 45, extroversion: 85, patience: 62, normativity: 40, selfControl: 55 }
  },
  {
    id: 3,
    name: "Luis Hernández",
    date: "Pendiente",
    department: "Desarrollo",
    status: "Enviado",
    dimensions: null
  },
  {
    id: 4,
    name: "María García",
    date: "20/08/2023",
    department: "RRHH",
    status: "Completado",
    dimensions: { risk: 35, extroversion: 55, patience: 78, normativity: 82, selfControl: 70 }
  },
  {
    id: 5,
    name: "Jorge Fernández",
    date: "18/08/2023",
    department: "Ventas",
    status: "Completado",
    dimensions: { risk: 75, extroversion: 68, patience: 45, normativity: 50, selfControl: 40 }
  },
  {
    id: 6,
    name: "Sofía Gutiérrez",
    date: "Pendiente",
    department: "Marketing",
    status: "Enviado",
    dimensions: null
  },
  {
    id: 7,
    name: "Roberto Sánchez",
    date: "15/08/2023",
    department: "Finanzas",
    status: "Completado",
    dimensions: { risk: 55, extroversion: 40, patience: 60, normativity: 85, selfControl: 75 }
  },
  {
    id: 8,
    name: "Lucía Torres",
    date: "12/08/2023",
    department: "Desarrollo",
    status: "Completado",
    dimensions: { risk: 65, extroversion: 70, patience: 55, normativity: 60, selfControl: 50 }
  }
];

// Helper to get dominant dimension
const getDominantDimension = (dimensions: typeof evaluationsData[0]['dimensions']) => {
  if (!dimensions) return { name: "-", value: 0 };
  
  type DimensionType = keyof typeof dimensions;
  const entries = Object.entries(dimensions) as [DimensionType, number][];
  const sorted = [...entries].sort((a, b) => b[1] - a[1]);
  
  const dominantDimName = sorted[0][0];
  const dimensionNameMap: Record<string, string> = {
    risk: "Riesgo",
    extroversion: "Extroversión",
    patience: "Paciencia",
    normativity: "Normatividad",
    selfControl: "Autocontrol"
  };
  
  return { 
    name: dimensionNameMap[dominantDimName] || dominantDimName, 
    value: sorted[0][1]
  };
};

// Helper to get color for status badges
const getStatusColor = (status: string) => {
  switch (status) {
    case "Completado":
      return "bg-green-100 text-green-700";
    case "Enviado":
      return "bg-blue-100 text-blue-700";
    case "Pendiente":
      return "bg-amber-100 text-amber-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

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
      <div className="p-5 border-b bg-gray-50">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="w-full md:w-1/3">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Búsqueda
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" aria-hidden="true" size={16} />
              <Input
                id="search"
                placeholder="Buscar por nombre o departamento..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10"
                aria-label="Buscar evaluaciones"
              />
            </div>
          </div>
          
          <div className="w-full md:w-1/4">
            <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
              Departamento
            </label>
            <Select 
              value={selectedDepartment} 
              onValueChange={setSelectedDepartment}
              aria-label="Filtrar por departamento"
            >
              <SelectTrigger id="department">
                <SelectValue placeholder="Todos los departamentos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los departamentos</SelectItem>
                <SelectItem value="Ventas">Ventas</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Desarrollo">Desarrollo</SelectItem>
                <SelectItem value="RRHH">RRHH</SelectItem>
                <SelectItem value="Finanzas">Finanzas</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full md:w-1/4">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Estado
            </label>
            <Select 
              value={selectedStatus} 
              onValueChange={setSelectedStatus}
              aria-label="Filtrar por estado"
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Todos los estados" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="Completado">Completado</SelectItem>
                <SelectItem value="Enviado">Enviado</SelectItem>
                <SelectItem value="Pendiente">Pendiente</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full md:w-auto">
            <Button 
              variant="outline" 
              aria-expanded="false"
              aria-haspopup="true"
              aria-label="Mostrar más opciones de filtro"
            >
              Más filtros
              <ChevronDown size={16} className="ml-1" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200" role="grid" aria-label="Tabla de evaluaciones">
          <caption className="sr-only">Evaluaciones con información de nombre, fecha, departamento, estado y dimensión dominante</caption>
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Fecha
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Departamento
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Estado
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Dimensión Dominante
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredEvaluations.map((evaluation) => {
              const dominantDimension = getDominantDimension(evaluation.dimensions);
              
              return (
                <tr key={evaluation.id} className="hover:bg-gray-50" tabIndex={0}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{evaluation.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {evaluation.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {evaluation.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span 
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(evaluation.status)}`}
                      aria-label={`Estado: ${evaluation.status}`}
                    >
                      {evaluation.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {dominantDimension.name !== "-" ? (
                      <div className="flex items-center" aria-label={`Dimensión dominante: ${dominantDimension.name} ${dominantDimension.value}%`}>
                        <span className="text-sm text-gray-900 mr-2">{dominantDimension.name}</span>
                        <div className="w-16 h-2 bg-gray-200 rounded-full" role="presentation">
                          <div 
                            className="h-full rounded-full bg-blue-600" 
                            style={{ width: `${dominantDimension.value}%` }}
                            aria-hidden="true"
                          />
                        </div>
                        <span className="text-xs text-gray-700 ml-1">{dominantDimension.value}%</span>
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
                        aria-label="Ver detalles de la evaluación de (nombre)"
                      >
                        <Eye size={16} />
                      </Button>
                      {evaluation.status !== "Completado" && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0" 
                          aria-label="Enviar recordatorio por correo electrónico"
                        >
                          <MailPlus size={16} />
                        </Button>
                      )}
                      {evaluation.status === "Completado" && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0" 
                          aria-label="Descargar resultados"
                        >
                          <Download size={16} />
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0" 
                        aria-label="Archivar evaluación"
                      >
                        <Archive size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
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
      <div className="px-6 py-4 flex items-center justify-between border-t bg-gray-50" aria-label="Paginación">
        <div className="text-sm text-gray-700">
          Mostrando <span className="font-medium">1</span> a <span className="font-medium">{filteredEvaluations.length}</span> de <span className="font-medium">{evaluationsData.length}</span> resultados
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8" 
            aria-label="Página anterior"
            disabled={true}
          >
            <ChevronLeft size={16} aria-hidden="true" />
            Anterior
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8" 
            aria-label="Página siguiente"
            disabled={filteredEvaluations.length >= evaluationsData.length}
          >
            Siguiente
            <ChevronRight size={16} aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
};
