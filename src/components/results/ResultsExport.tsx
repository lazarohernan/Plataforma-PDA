
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface ResultsExportProps {
  onExportPDF: () => void;
}

export const ResultsExport = ({ onExportPDF }: ResultsExportProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-semibold mb-4">Exportar Resultados</h2>
      <p className="text-gray-600 mb-6">
        Descarga tus resultados en diferentes formatos o compártelos con otros.
      </p>
      <div className="flex flex-col gap-4 max-w-md">
        <Button 
          className="flex items-center gap-2"
          onClick={onExportPDF}
        >
          <Download size={18} />
          Descargar informe completo (PDF)
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          Compartir resultados por email
        </Button>
      </div>
    </div>
  );
};
