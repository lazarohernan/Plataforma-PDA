
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { departamentos } from "./data/mockPerfilesPuesto";

type PerfilPuestoFiltersProps = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedDepartamento: string;
  setSelectedDepartamento: (value: string) => void;
  selectedDimension: string;
  setSelectedDimension: (value: string) => void;
};

export const PerfilPuestoFilters = ({
  searchTerm,
  setSearchTerm,
  selectedDepartamento,
  setSelectedDepartamento,
  selectedDimension,
  setSelectedDimension
}: PerfilPuestoFiltersProps) => {
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
              placeholder="Buscar por nombre o descripción..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10"
              aria-label="Buscar perfiles de puesto"
            />
          </div>
        </div>
        
        <div className="w-full md:w-1/4">
          <label htmlFor="departamento" className="block text-sm font-medium text-gray-700 mb-1">
            Departamento
          </label>
          <Select 
            value={selectedDepartamento} 
            onValueChange={setSelectedDepartamento}
            aria-label="Filtrar por departamento"
          >
            <SelectTrigger id="departamento">
              <SelectValue placeholder="Todos los departamentos" />
            </SelectTrigger>
            <SelectContent>
              {departamentos.map((depto) => (
                <SelectItem key={depto} value={depto}>
                  {depto}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-1/4">
          <label htmlFor="dimension" className="block text-sm font-medium text-gray-700 mb-1">
            Dimensión Dominante
          </label>
          <Select 
            value={selectedDimension} 
            onValueChange={setSelectedDimension}
            aria-label="Filtrar por dimensión dominante"
          >
            <SelectTrigger id="dimension">
              <SelectValue placeholder="Todas las dimensiones" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas las dimensiones</SelectItem>
              <SelectItem value="Riesgo">Riesgo</SelectItem>
              <SelectItem value="Extroversión">Extroversión</SelectItem>
              <SelectItem value="Paciencia">Paciencia</SelectItem>
              <SelectItem value="Normatividad">Normatividad</SelectItem>
              <SelectItem value="Autocontrol">Autocontrol</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
