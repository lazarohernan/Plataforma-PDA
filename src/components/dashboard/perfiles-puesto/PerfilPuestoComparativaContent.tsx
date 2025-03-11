
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PerfilPuestoComparativaChart, PerfilComparativaData } from "./PerfilPuestoComparativaChart";
import { PerfilPuestoComparativaDetalle } from "./PerfilPuestoComparativaDetalle";
import { PerfilPuestoAccessibilityInfo } from "./PerfilPuestoAccessibilityInfo";
import { perfilesPuestoData } from "./data/mockPerfilesPuesto";
import { useToast } from "@/hooks/use-toast";

// Datos de candidatos para la demostración
const candidatosMock = [
  {
    id: "c001",
    nombre: "María Rodríguez",
    dimensiones: {
      riesgo: 78,
      extroversion: 65,
      paciencia: 45,
      normatividad: 60,
      autocontrol: 72
    }
  },
  {
    id: "c002",
    nombre: "Juan Pérez",
    dimensiones: {
      riesgo: 45,
      extroversion: 85,
      paciencia: 55,
      normatividad: 40,
      autocontrol: 60
    }
  },
  {
    id: "c003",
    nombre: "Carlos Sánchez",
    dimensiones: {
      riesgo: 60,
      extroversion: 45,
      paciencia: 80,
      normatividad: 85,
      autocontrol: 75
    }
  },
  {
    id: "c004",
    nombre: "Ana López",
    dimensiones: {
      riesgo: 70,
      extroversion: 75,
      paciencia: 60,
      normatividad: 65,
      autocontrol: 80
    }
  }
];

export const PerfilPuestoComparativaContent = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [perfilPuesto, setPerfilPuesto] = useState(perfilesPuestoData[0]);
  const [candidatoSeleccionado, setCandidatoSeleccionado] = useState(candidatosMock[0].id);
  const [comparativaData, setComparativaData] = useState<PerfilComparativaData | null>(null);
  
  // Cargar el perfil de puesto
  useEffect(() => {
    if (id) {
      const perfil = perfilesPuestoData.find(p => p.id === id);
      if (perfil) {
        setPerfilPuesto(perfil);
      } else {
        toast({
          title: "Error",
          description: "No se encontró el perfil de puesto solicitado",
          variant: "destructive",
        });
        navigate("/dashboard/perfiles-puesto");
      }
    }
  }, [id, navigate, toast]);
  
  // Actualizar datos de comparativa cuando cambie el candidato o perfil
  useEffect(() => {
    const candidato = candidatosMock.find(c => c.id === candidatoSeleccionado);
    if (perfilPuesto && candidato) {
      setComparativaData({
        perfilPuesto,
        perfilCandidato: candidato
      });
    }
  }, [perfilPuesto, candidatoSeleccionado]);
  
  const handleBack = () => {
    navigate("/dashboard/perfiles-puesto");
  };
  
  const handleCandidatoChange = (value: string) => {
    setCandidatoSeleccionado(value);
  };
  
  const handleGenerarReporte = () => {
    toast({
      title: "Generando reporte",
      description: "El reporte de compatibilidad se está generando...",
      variant: "default",
    });
  };
  
  if (!comparativaData) {
    return <div className="p-6">Cargando datos de comparativa...</div>;
  }
  
  return (
    <div className="flex flex-col h-full p-6 space-y-6 overflow-hidden" role="main">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-0 h-8 w-8"
              onClick={handleBack}
              aria-label="Volver a la lista de perfiles"
            >
              <ArrowLeft size={18} />
            </Button>
            <h1 className="text-2xl font-bold">Análisis de Compatibilidad</h1>
          </div>
          <p className="text-gray-700 mt-1 ml-10">
            Comparando candidatos con el perfil: <strong>{perfilPuesto.nombre}</strong>
          </p>
        </div>
        
        <div className="flex gap-3 ml-10 md:ml-0">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={handleGenerarReporte}
          >
            <FileText size={16} aria-hidden="true" />
            Generar Reporte
          </Button>
          <Button 
            className="flex items-center gap-2 bg-[#1A365D]"
          >
            <Download size={16} aria-hidden="true" />
            Exportar PDF
          </Button>
        </div>
      </div>
      
      <div className="w-full max-w-xs ml-10 mb-2">
        <label htmlFor="candidato" className="block text-sm font-medium text-gray-700 mb-1">
          Seleccionar Candidato
        </label>
        <Select
          value={candidatoSeleccionado}
          onValueChange={handleCandidatoChange}
        >
          <SelectTrigger id="candidato">
            <SelectValue placeholder="Selecciona un candidato" />
          </SelectTrigger>
          <SelectContent>
            {candidatosMock.map(candidato => (
              <SelectItem key={candidato.id} value={candidato.id}>
                {candidato.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex-1 overflow-auto min-h-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7">
            <PerfilPuestoComparativaChart data={comparativaData} />
          </div>
          <div className="lg:col-span-5">
            <PerfilPuestoComparativaDetalle data={comparativaData} />
          </div>
        </div>
      </div>
      
      <PerfilPuestoAccessibilityInfo />
    </div>
  );
};
