
import { Button } from "@/components/ui/button";
import { mockResults } from "@/models/results";
import { GeneratePDF } from "@/components/pdf/GeneratePDF";

interface ResultsExportProps {
  onExportPDF?: () => void;
}

export const ResultsExport = ({ onExportPDF }: ResultsExportProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-semibold mb-4">Exportar Resultados</h2>
      <p className="text-gray-600 mb-6">
        Descarga tus resultados en diferentes formatos o compártelos con otros.
      </p>
      <div className="flex flex-col gap-4 max-w-md">
        <GeneratePDF 
          naturalProfile={mockResults.natural}
          adaptedProfile={mockResults.adapted}
          derivedIndicators={mockResults.derivedIndicators}
          className="w-full"
        />
        <Button variant="outline" className="flex items-center gap-2 w-full">
          Compartir resultados por email
        </Button>
      </div>
    </div>
  );
};
