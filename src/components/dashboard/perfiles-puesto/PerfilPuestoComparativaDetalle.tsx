
import { Check, AlertTriangle, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PerfilComparativaData } from "./PerfilPuestoComparativaChart";

interface PerfilPuestoComparativaDetalleProps {
  data: PerfilComparativaData;
}

export const PerfilPuestoComparativaDetalle = ({ data }: PerfilPuestoComparativaDetalleProps) => {
  const { perfilPuesto, perfilCandidato } = data;
  
  // Analizar la compatibilidad por dimensión
  const analizarDimension = (
    nombreDimension: string,
    valorCandidato: number,
    valorIdeal: number,
    valorMin: number,
    valorMax: number
  ) => {
    let estado: "compatible" | "alerta" | "incompatible" = "incompatible";
    let mensaje = "";
    
    if (valorCandidato >= valorMin && valorCandidato <= valorMax) {
      // Dentro del rango aceptable
      estado = "compatible";
      
      const cercaDelIdeal = Math.abs(valorCandidato - valorIdeal) <= 10;
      if (cercaDelIdeal) {
        mensaje = `Nivel óptimo de ${nombreDimension.toLowerCase()} para el puesto.`;
      } else if (valorCandidato > valorIdeal) {
        mensaje = `Nivel de ${nombreDimension.toLowerCase()} ligeramente por encima del ideal, pero aceptable.`;
      } else {
        mensaje = `Nivel de ${nombreDimension.toLowerCase()} ligeramente por debajo del ideal, pero aceptable.`;
      }
    } else {
      // Fuera del rango aceptable
      const distanciaMin = Math.abs(valorCandidato - valorMin);
      const distanciaMax = Math.abs(valorCandidato - valorMax);
      const distanciaMinima = Math.min(distanciaMin, distanciaMax);
      
      if (distanciaMinima <= 15) {
        // Cerca del rango aceptable
        estado = "alerta";
        if (valorCandidato < valorMin) {
          mensaje = `Nivel de ${nombreDimension.toLowerCase()} ligeramente por debajo del mínimo requerido.`;
        } else {
          mensaje = `Nivel de ${nombreDimension.toLowerCase()} ligeramente por encima del máximo recomendado.`;
        }
      } else {
        // Muy lejos del rango aceptable
        if (valorCandidato < valorMin) {
          mensaje = `Nivel de ${nombreDimension.toLowerCase()} significativamente por debajo del mínimo necesario.`;
        } else {
          mensaje = `Nivel de ${nombreDimension.toLowerCase()} significativamente por encima del máximo recomendado.`;
        }
      }
    }
    
    return { estado, mensaje };
  };
  
  // Análisis para cada dimensión
  const analisisRiesgo = analizarDimension(
    "Riesgo",
    perfilCandidato.dimensiones.riesgo,
    perfilPuesto.dimensiones.riesgo.ideal,
    perfilPuesto.dimensiones.riesgo.min,
    perfilPuesto.dimensiones.riesgo.max
  );
  
  const analisisExtroversion = analizarDimension(
    "Extroversión",
    perfilCandidato.dimensiones.extroversion,
    perfilPuesto.dimensiones.extroversion.ideal,
    perfilPuesto.dimensiones.extroversion.min,
    perfilPuesto.dimensiones.extroversion.max
  );
  
  const analisisPaciencia = analizarDimension(
    "Paciencia",
    perfilCandidato.dimensiones.paciencia,
    perfilPuesto.dimensiones.paciencia.ideal,
    perfilPuesto.dimensiones.paciencia.min,
    perfilPuesto.dimensiones.paciencia.max
  );
  
  const analisisNormatividad = analizarDimension(
    "Normatividad",
    perfilCandidato.dimensiones.normatividad,
    perfilPuesto.dimensiones.normatividad.ideal,
    perfilPuesto.dimensiones.normatividad.min,
    perfilPuesto.dimensiones.normatividad.max
  );
  
  const analisisAutocontrol = analizarDimension(
    "Autocontrol",
    perfilCandidato.dimensiones.autocontrol,
    perfilPuesto.dimensiones.autocontrol.ideal,
    perfilPuesto.dimensiones.autocontrol.min,
    perfilPuesto.dimensiones.autocontrol.max
  );
  
  // Determinar fortalezas y áreas de oportunidad
  const determinarFortalezasYDebilidades = () => {
    const analisis = [
      { dimension: "Riesgo", resultado: analisisRiesgo, color: "#D32F2F" },
      { dimension: "Extroversión", resultado: analisisExtroversion, color: "#FFC107" },
      { dimension: "Paciencia", resultado: analisisPaciencia, color: "#388E3C" },
      { dimension: "Normatividad", resultado: analisisNormatividad, color: "#1976D2" },
      { dimension: "Autocontrol", resultado: analisisAutocontrol, color: "#7B1FA2" }
    ];
    
    const fortalezas = analisis.filter(a => a.resultado.estado === "compatible");
    const alertas = analisis.filter(a => a.resultado.estado === "alerta");
    const debilidades = analisis.filter(a => a.resultado.estado === "incompatible");
    
    return { fortalezas, alertas, debilidades };
  };
  
  const { fortalezas, alertas, debilidades } = determinarFortalezasYDebilidades();
  
  // Renderizar tarjeta de dimensión
  const renderDimensionCard = (
    dimension: string, 
    analisis: { estado: string; mensaje: string; },
    valorCandidato: number,
    valorIdeal: number,
    valorMin: number,
    valorMax: number,
    color: string
  ) => {
    const getIconByEstado = () => {
      switch (analisis.estado) {
        case "compatible": 
          return <Check className="h-5 w-5 text-green-500" />;
        case "alerta": 
          return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
        case "incompatible": 
          return <X className="h-5 w-5 text-red-500" />;
        default:
          return null;
      }
    };
    
    return (
      <div className="p-4 border border-gray-100 rounded-lg flex items-start gap-3">
        <div className="mt-1">{getIconByEstado()}</div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: color }}
              aria-hidden="true"
            ></div>
            <h3 className="font-medium">{dimension}</h3>
          </div>
          <p className="text-sm text-gray-600 mb-2">{analisis.mensaje}</p>
          <div className="flex gap-4 text-xs">
            <span className="text-gray-500">Candidato: <strong>{valorCandidato}%</strong></span>
            <span className="text-gray-500">Ideal: <strong>{valorIdeal}%</strong></span>
            <span className="text-gray-500">Rango: <strong>{valorMin}% - {valorMax}%</strong></span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Análisis Dimensional</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {renderDimensionCard(
            "Riesgo", 
            analisisRiesgo,
            perfilCandidato.dimensiones.riesgo,
            perfilPuesto.dimensiones.riesgo.ideal,
            perfilPuesto.dimensiones.riesgo.min,
            perfilPuesto.dimensiones.riesgo.max,
            "#D32F2F"
          )}
          
          {renderDimensionCard(
            "Extroversión", 
            analisisExtroversion,
            perfilCandidato.dimensiones.extroversion,
            perfilPuesto.dimensiones.extroversion.ideal,
            perfilPuesto.dimensiones.extroversion.min,
            perfilPuesto.dimensiones.extroversion.max,
            "#FFC107"
          )}
          
          {renderDimensionCard(
            "Paciencia", 
            analisisPaciencia,
            perfilCandidato.dimensiones.paciencia,
            perfilPuesto.dimensiones.paciencia.ideal,
            perfilPuesto.dimensiones.paciencia.min,
            perfilPuesto.dimensiones.paciencia.max,
            "#388E3C"
          )}
          
          {renderDimensionCard(
            "Normatividad", 
            analisisNormatividad,
            perfilCandidato.dimensiones.normatividad,
            perfilPuesto.dimensiones.normatividad.ideal,
            perfilPuesto.dimensiones.normatividad.min,
            perfilPuesto.dimensiones.normatividad.max,
            "#1976D2"
          )}
          
          {renderDimensionCard(
            "Autocontrol", 
            analisisAutocontrol,
            perfilCandidato.dimensiones.autocontrol,
            perfilPuesto.dimensiones.autocontrol.ideal,
            perfilPuesto.dimensiones.autocontrol.min,
            perfilPuesto.dimensiones.autocontrol.max,
            "#7B1FA2"
          )}
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-green-600">Fortalezas</CardTitle>
          </CardHeader>
          <CardContent>
            {fortalezas.length > 0 ? (
              <ul className="space-y-2">
                {fortalezas.map((f, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-1" />
                    <div>
                      <strong style={{ color: f.color }}>{f.dimension}:</strong> {f.resultado.mensaje}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No se identificaron fortalezas significativas.</p>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-red-600">Áreas de Oportunidad</CardTitle>
          </CardHeader>
          <CardContent>
            {debilidades.length > 0 || alertas.length > 0 ? (
              <ul className="space-y-2">
                {debilidades.map((d, index) => (
                  <li key={`d-${index}`} className="flex items-start gap-2">
                    <X className="h-4 w-4 text-red-500 mt-1" />
                    <div>
                      <strong style={{ color: d.color }}>{d.dimension}:</strong> {d.resultado.mensaje}
                    </div>
                  </li>
                ))}
                {alertas.map((a, index) => (
                  <li key={`a-${index}`} className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-500 mt-1" />
                    <div>
                      <strong style={{ color: a.color }}>{a.dimension}:</strong> {a.resultado.mensaje}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No se identificaron áreas de oportunidad significativas.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
