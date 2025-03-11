
import { Button } from "@/components/ui/button";
import { FileDown, Info } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const ReportesPageHeader = () => {
  return (
    <div className="flex flex-col space-y-2 sm:flex-row sm:justify-between sm:items-center" role="region" aria-label="Encabezado de página">
      <div>
        <h1 className="text-2xl font-bold tracking-tight" id="reportes-title">Centro de Reportes</h1>
        <p className="text-muted-foreground">
          Genera, gestiona y programa reportes para tu organización
        </p>
      </div>
      
      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon">
                <span className="sr-only">Información sobre reportes</span>
                <Info className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">
                Los reportes pueden ser personalizados, programados y compartidos con tu equipo.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <Button>
          <FileDown className="mr-2 h-4 w-4" />
          Nuevo Reporte
        </Button>
      </div>
    </div>
  );
};
