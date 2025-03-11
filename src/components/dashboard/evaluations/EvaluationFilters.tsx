
import { Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type EvaluationFiltersProps = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedDepartment: string;
  setSelectedDepartment: (value: string) => void;
  selectedStatus: string;
  setSelectedStatus: (value: string) => void;
};

export const EvaluationFilters = ({
  searchTerm,
  setSearchTerm,
  selectedDepartment,
  setSelectedDepartment,
  selectedStatus,
  setSelectedStatus
}: EvaluationFiltersProps) => {
  return (
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
  );
};
