
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { PerfilPuestoFormHeader } from "./PerfilPuestoFormHeader";
import { PerfilPuestoDimensionSlider } from "./PerfilPuestoDimensionSlider";
import { PerfilPuestoPreview } from "./PerfilPuestoPreview";
import { PerfilPuestoAccessibilityInfo } from "./PerfilPuestoAccessibilityInfo";

import { PerfilPuesto, departamentos, perfilesPuestoData } from "./data/mockPerfilesPuesto";

interface PerfilPuestoFormProps {
  perfilId?: string;
}

// Perfil por defecto para crear uno nuevo
const defaultPerfil: PerfilPuesto = {
  id: "",
  nombre: "",
  departamento: "",
  fechaCreacion: new Date().toLocaleDateString(),
  descripcion: "",
  dimensiones: {
    riesgo: { min: 30, ideal: 50, max: 70 },
    extroversion: { min: 30, ideal: 50, max: 70 },
    paciencia: { min: 30, ideal: 50, max: 70 },
    normatividad: { min: 30, ideal: 50, max: 70 },
    autocontrol: { min: 30, ideal: 50, max: 70 }
  },
  competencias: [],
  observaciones: ""
};

export const PerfilPuestoForm = ({ perfilId }: PerfilPuestoFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditing = !!perfilId;
  
  const [perfil, setPerfil] = useState<PerfilPuesto>(defaultPerfil);
  const [competencia, setCompetencia] = useState("");
  
  // Si estamos editando, cargar datos del perfil
  useEffect(() => {
    if (isEditing) {
      const perfilFound = perfilesPuestoData.find(p => p.id === perfilId);
      if (perfilFound) {
        setPerfil(perfilFound);
      } else {
        // Si no se encuentra, redirigir a la lista
        toast({
          title: "Error",
          description: "No se encontró el perfil solicitado",
          variant: "destructive",
        });
        navigate("/dashboard/perfiles-puesto");
      }
    }
  }, [isEditing, perfilId, navigate, toast]);
  
  // Manejadores de cambios para los campos básicos
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPerfil(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Manejador para el cambio de departamento
  const handleDepartmentChange = (value: string) => {
    setPerfil(prev => ({
      ...prev,
      departamento: value
    }));
  };
  
  // Manejadores para dimensiones
  const handleDimensionChange = (
    dimension: keyof PerfilPuesto["dimensiones"], 
    property: "min" | "ideal" | "max", 
    value: number
  ) => {
    setPerfil(prev => ({
      ...prev,
      dimensiones: {
        ...prev.dimensiones,
        [dimension]: {
          ...prev.dimensiones[dimension],
          [property]: value
        }
      }
    }));
  };
  
  // Agregar competencia
  const handleAddCompetencia = () => {
    if (competencia.trim() && !perfil.competencias.includes(competencia.trim())) {
      setPerfil(prev => ({
        ...prev,
        competencias: [...prev.competencias, competencia.trim()]
      }));
      setCompetencia("");
    }
  };
  
  // Eliminar competencia
  const handleRemoveCompetencia = (index: number) => {
    setPerfil(prev => ({
      ...prev,
      competencias: prev.competencias.filter((_, i) => i !== index)
    }));
  };
  
  // Guardar perfil
  const handleSave = () => {
    // Aquí iría la lógica para guardar en la BD
    toast({
      title: `Perfil ${isEditing ? "actualizado" : "creado"}`,
      description: `El perfil ha sido ${isEditing ? "actualizado" : "creado"} exitosamente.`,
      variant: "default",
    });
    
    navigate("/dashboard/perfiles-puesto");
  };
  
  // Eliminar perfil
  const handleDelete = () => {
    // Aquí iría la lógica para eliminar de la BD
    toast({
      title: "Perfil eliminado",
      description: "El perfil ha sido eliminado exitosamente.",
      variant: "default",
    });
    
    navigate("/dashboard/perfiles-puesto");
  };
  
  return (
    <div className="flex flex-col h-full p-6 space-y-6 overflow-hidden">
      <PerfilPuestoFormHeader 
        isEditing={isEditing} 
        onSave={handleSave} 
        onDelete={isEditing ? handleDelete : undefined} 
      />
      
      <div className="flex-1 overflow-auto min-h-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Primera columna - Información básica */}
          <div className="space-y-4">
            <div className="p-5 border border-gray-100 rounded-lg bg-white">
              <h2 className="text-lg font-semibold mb-4">Información Básica</h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="nombre">Nombre del Puesto</Label>
                  <Input 
                    id="nombre" 
                    name="nombre" 
                    value={perfil.nombre} 
                    onChange={handleChange} 
                    className="mt-1" 
                    placeholder="Ej. Gerente de Ventas"
                  />
                </div>
                
                <div>
                  <Label htmlFor="departamento">Departamento</Label>
                  <Select
                    value={perfil.departamento}
                    onValueChange={handleDepartmentChange}
                  >
                    <SelectTrigger id="departamento" className="mt-1">
                      <SelectValue placeholder="Selecciona un departamento" />
                    </SelectTrigger>
                    <SelectContent>
                      {departamentos.slice(1).map((dept) => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="descripcion">Descripción</Label>
                  <Textarea 
                    id="descripcion" 
                    name="descripcion" 
                    value={perfil.descripcion} 
                    onChange={handleChange} 
                    className="mt-1 resize-none" 
                    rows={4} 
                    placeholder="Describe brevemente las responsabilidades y el contexto del puesto"
                  />
                </div>
              </div>
            </div>
            
            <div className="p-5 border border-gray-100 rounded-lg bg-white">
              <h2 className="text-lg font-semibold mb-4">Competencias</h2>
              
              <div className="flex gap-2 mb-4">
                <Input 
                  value={competencia} 
                  onChange={(e) => setCompetencia(e.target.value)} 
                  placeholder="Añadir competencia" 
                  className="flex-1"
                />
                <button 
                  className="px-3 py-2 bg-[#1A365D] text-white rounded-md hover:bg-[#2d4a76] transition-colors"
                  onClick={handleAddCompetencia}
                  type="button"
                >
                  Añadir
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {perfil.competencias.map((comp, index) => (
                  <div 
                    key={index} 
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full flex items-center gap-2"
                  >
                    <span>{comp}</span>
                    <button 
                      className="text-gray-500 hover:text-red-500"
                      onClick={() => handleRemoveCompetencia(index)}
                      type="button"
                      aria-label={`Eliminar competencia ${comp}`}
                    >
                      &times;
                    </button>
                  </div>
                ))}
                {perfil.competencias.length === 0 && (
                  <p className="text-sm text-gray-500">No hay competencias definidas</p>
                )}
              </div>
            </div>
            
            <div className="p-5 border border-gray-100 rounded-lg bg-white">
              <h2 className="text-lg font-semibold mb-4">Observaciones</h2>
              
              <Textarea 
                id="observaciones" 
                name="observaciones" 
                value={perfil.observaciones} 
                onChange={handleChange} 
                className="resize-none" 
                rows={5} 
                placeholder="Añade cualquier información adicional relevante para este perfil"
              />
            </div>
          </div>
          
          {/* Segunda columna - Configuración de dimensiones */}
          <div className="space-y-4">
            <PerfilPuestoDimensionSlider 
              title="Riesgo"
              color="#D32F2F"
              minValue={perfil.dimensiones.riesgo.min}
              idealValue={perfil.dimensiones.riesgo.ideal}
              maxValue={perfil.dimensiones.riesgo.max}
              onMinChange={(value) => handleDimensionChange("riesgo", "min", value)}
              onIdealChange={(value) => handleDimensionChange("riesgo", "ideal", value)}
              onMaxChange={(value) => handleDimensionChange("riesgo", "max", value)}
              description="Disposición a tomar decisiones, asumir retos y manejar situaciones de incertidumbre."
            />
            
            <PerfilPuestoDimensionSlider 
              title="Extroversión"
              color="#FFC107"
              minValue={perfil.dimensiones.extroversion.min}
              idealValue={perfil.dimensiones.extroversion.ideal}
              maxValue={perfil.dimensiones.extroversion.max}
              onMinChange={(value) => handleDimensionChange("extroversion", "min", value)}
              onIdealChange={(value) => handleDimensionChange("extroversion", "ideal", value)}
              onMaxChange={(value) => handleDimensionChange("extroversion", "max", value)}
              description="Tendencia a relacionarse con otros, comunicar ideas y ejercer influencia en entornos sociales."
            />
            
            <PerfilPuestoDimensionSlider 
              title="Paciencia"
              color="#388E3C"
              minValue={perfil.dimensiones.paciencia.min}
              idealValue={perfil.dimensiones.paciencia.ideal}
              maxValue={perfil.dimensiones.paciencia.max}
              onMinChange={(value) => handleDimensionChange("paciencia", "min", value)}
              onIdealChange={(value) => handleDimensionChange("paciencia", "ideal", value)}
              onMaxChange={(value) => handleDimensionChange("paciencia", "max", value)}
              description="Capacidad para mantener la calma, trabajar en tareas repetitivas y gestionar situaciones de estrés."
            />
          </div>
          
          {/* Tercera columna - Más dimensiones y visualización */}
          <div className="space-y-4">
            <PerfilPuestoDimensionSlider 
              title="Normatividad"
              color="#1976D2"
              minValue={perfil.dimensiones.normatividad.min}
              idealValue={perfil.dimensiones.normatividad.ideal}
              maxValue={perfil.dimensiones.normatividad.max}
              onMinChange={(value) => handleDimensionChange("normatividad", "min", value)}
              onIdealChange={(value) => handleDimensionChange("normatividad", "ideal", value)}
              onMaxChange={(value) => handleDimensionChange("normatividad", "max", value)}
              description="Tendencia a seguir reglas, procesos establecidos y atención a los detalles."
            />
            
            <PerfilPuestoDimensionSlider 
              title="Autocontrol"
              color="#7B1FA2"
              minValue={perfil.dimensiones.autocontrol.min}
              idealValue={perfil.dimensiones.autocontrol.ideal}
              maxValue={perfil.dimensiones.autocontrol.max}
              onMinChange={(value) => handleDimensionChange("autocontrol", "min", value)}
              onIdealChange={(value) => handleDimensionChange("autocontrol", "ideal", value)}
              onMaxChange={(value) => handleDimensionChange("autocontrol", "max", value)}
              description="Capacidad para gestionar emociones, adaptarse a situaciones cambiantes y mantener equilibrio personal."
            />
            
            <PerfilPuestoPreview perfil={perfil} />
          </div>
        </div>
      </div>
      
      <PerfilPuestoAccessibilityInfo />
    </div>
  );
};
