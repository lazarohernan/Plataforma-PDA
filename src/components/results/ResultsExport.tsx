
import { Button } from "@/components/ui/button";
import { mockResults } from "@/models/results";
import { GeneratePDF } from "@/components/pdf/GeneratePDF";
import { Mail, ArrowRightCircle, FileText, Download, Table } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";

interface ResultsExportProps {
  onExportPDF?: () => void;
}

export const ResultsExport = ({ onExportPDF }: ResultsExportProps) => {
  const [selectedSections, setSelectedSections] = useState({
    naturalProfile: true,
    adaptedProfile: true,
    derivedIndicators: true,
    recommendations: true,
    compatibility: false
  });
  
  const [reportFormat, setReportFormat] = useState("pdf");
  
  const handleSectionToggle = (section: string) => {
    setSelectedSections(prev => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev]
    }));
  };
  
  const handleExportData = (format: string) => {
    toast.success(`Exportando datos en formato ${format.toUpperCase()}...`);
    // Implementación futura de exportación de datos en diferentes formatos
    console.log(`Exportando datos en formato ${format}`);
  };
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-2xl font-semibold mb-4">Exportar Resultados</h2>
      <p className="text-gray-600 mb-6">
        Descarga tus resultados en diferentes formatos o compártelos con otros.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="p-4 border border-gray-200">
          <h3 className="font-medium text-lg mb-3">Reporte PDF Personalizado</h3>
          <CardContent className="p-0 space-y-4">
            <div className="space-y-3 mb-4">
              <p className="text-sm text-gray-600 mb-2">Selecciona las secciones a incluir:</p>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="section-natural" className="cursor-pointer">Perfil Natural</Label>
                <Switch 
                  id="section-natural" 
                  checked={selectedSections.naturalProfile}
                  onCheckedChange={() => handleSectionToggle('naturalProfile')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="section-adapted" className="cursor-pointer">Perfil Adaptado</Label>
                <Switch 
                  id="section-adapted" 
                  checked={selectedSections.adaptedProfile}
                  onCheckedChange={() => handleSectionToggle('adaptedProfile')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="section-indicators" className="cursor-pointer">Indicadores Derivados</Label>
                <Switch 
                  id="section-indicators" 
                  checked={selectedSections.derivedIndicators}
                  onCheckedChange={() => handleSectionToggle('derivedIndicators')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="section-recommendations" className="cursor-pointer">Recomendaciones</Label>
                <Switch 
                  id="section-recommendations" 
                  checked={selectedSections.recommendations}
                  onCheckedChange={() => handleSectionToggle('recommendations')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="section-compatibility" className="cursor-pointer">Compatibilidad con Roles</Label>
                <Switch 
                  id="section-compatibility" 
                  checked={selectedSections.compatibility}
                  onCheckedChange={() => handleSectionToggle('compatibility')}
                />
              </div>
            </div>
            
            <GeneratePDF 
              naturalProfile={mockResults.natural}
              adaptedProfile={mockResults.adapted}
              derivedIndicators={mockResults.derivedIndicators}
              selectedSections={selectedSections}
              className="w-full"
            />
          </CardContent>
        </Card>
        
        <Card className="p-4 border border-gray-200">
          <h3 className="font-medium text-lg mb-3">Exportar Datos</h3>
          <CardContent className="p-0 space-y-4">
            <div className="space-y-3 mb-4">
              <p className="text-sm text-gray-600 mb-2">Selecciona el formato de exportación:</p>
              
              <Select onValueChange={setReportFormat} defaultValue={reportFormat}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar formato" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              variant="outline" 
              className="flex items-center gap-2 w-full"
              onClick={() => handleExportData(reportFormat)}
            >
              <Table size={16} />
              Exportar datos en {reportFormat.toUpperCase()}
            </Button>
            
            <Button 
              variant="outline" 
              className="flex items-center gap-2 w-full"
              onClick={() => {
                toast.success("El enlace ha sido copiado al portapapeles");
              }}
            >
              <Mail size={16} />
              Compartir resultados por email
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-100">
        <h3 className="text-lg font-medium mb-2">Centro de Reportes</h3>
        <p className="text-sm text-gray-600 mb-4">
          Si eres un profesional de RRHH, accede al dashboard administrativo para gestionar evaluaciones y generar reportes avanzados.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/dashboard" className="flex-1">
            <Button className="flex items-center gap-2 w-full">
              <ArrowRightCircle size={16} />
              Acceder al Dashboard
            </Button>
          </Link>
          <Link to="/dashboard/reportes" className="flex-1">
            <Button variant="outline" className="flex items-center gap-2 w-full">
              <FileText size={16} />
              Centro de Reportes
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
