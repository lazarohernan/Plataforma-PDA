
import { Button } from "@/components/ui/button";
import { mockResults } from "@/models/results";
import { GeneratePDF } from "@/components/pdf/GeneratePDF";
import { Mail, ArrowRightCircle } from "lucide-react";
import { Link } from "react-router-dom";

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
          <Mail size={16} />
          Compartir resultados por email
        </Button>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <h3 className="text-lg font-medium mb-2">Acceso para profesionales</h3>
          <p className="text-sm text-gray-600 mb-4">
            Si eres un profesional de RRHH, accede al dashboard administrativo para gestionar evaluaciones y realizar análisis avanzados.
          </p>
          <Link to="/dashboard">
            <Button className="flex items-center gap-2 w-full">
              <ArrowRightCircle size={16} />
              Acceder al Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
