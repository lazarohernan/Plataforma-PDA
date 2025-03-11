
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type EvaluationPaginationProps = {
  filteredCount: number;
  totalCount: number;
};

export const EvaluationPagination = ({
  filteredCount,
  totalCount
}: EvaluationPaginationProps) => {
  return (
    <div className="px-6 py-4 flex items-center justify-between border-t bg-gray-50" aria-label="Paginación">
      <div className="text-sm text-gray-700">
        Mostrando <span className="font-medium">1</span> a <span className="font-medium">{filteredCount}</span> de <span className="font-medium">{totalCount}</span> resultados
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
          disabled={filteredCount >= totalCount}
        >
          Siguiente
          <ChevronRight size={16} aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
};
