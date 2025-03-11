
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { PerfilPuesto } from "./data/mockPerfilesPuesto";

export interface PerfilComparativaData {
  perfilPuesto: PerfilPuesto;
  perfilCandidato: {
    id: string;
    nombre: string;
    dimensiones: {
      riesgo: number;
      extroversion: number;
      paciencia: number;
      normatividad: number;
      autocontrol: number;
    };
  };
}

interface PerfilPuestoComparativaChartProps {
  data: PerfilComparativaData;
}

export const PerfilPuestoComparativaChart = ({ data }: PerfilPuestoComparativaChartProps) => {
  const { perfilPuesto, perfilCandidato } = data;
  
  // Preparar datos para el gráfico
  const chartData = [
    { 
      dimension: "Riesgo", 
      puesto: perfilPuesto.dimensiones.riesgo.ideal, 
      candidato: perfilCandidato.dimensiones.riesgo,
      min: perfilPuesto.dimensiones.riesgo.min,
      max: perfilPuesto.dimensiones.riesgo.max,
      color: "#D32F2F"
    },
    { 
      dimension: "Extroversión", 
      puesto: perfilPuesto.dimensiones.extroversion.ideal, 
      candidato: perfilCandidato.dimensiones.extroversion,
      min: perfilPuesto.dimensiones.extroversion.min,
      max: perfilPuesto.dimensiones.extroversion.max,
      color: "#FFC107"
    },
    { 
      dimension: "Paciencia", 
      puesto: perfilPuesto.dimensiones.paciencia.ideal, 
      candidato: perfilCandidato.dimensiones.paciencia,
      min: perfilPuesto.dimensiones.paciencia.min,
      max: perfilPuesto.dimensiones.paciencia.max,
      color: "#388E3C"
    },
    { 
      dimension: "Normatividad", 
      puesto: perfilPuesto.dimensiones.normatividad.ideal, 
      candidato: perfilCandidato.dimensiones.normatividad,
      min: perfilPuesto.dimensiones.normatividad.min,
      max: perfilPuesto.dimensiones.normatividad.max,
      color: "#1976D2"
    },
    { 
      dimension: "Autocontrol", 
      puesto: perfilPuesto.dimensiones.autocontrol.ideal, 
      candidato: perfilCandidato.dimensiones.autocontrol,
      min: perfilPuesto.dimensiones.autocontrol.min,
      max: perfilPuesto.dimensiones.autocontrol.max,
      color: "#7B1FA2"
    }
  ];
  
  // Tooltip personalizado
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 shadow-md rounded-md border border-gray-100">
          <p className="font-semibold" style={{ color: data.color }}>{data.dimension}</p>
          <p className="text-sm">Perfil Puesto: <span className="font-semibold">{data.puesto}%</span></p>
          <p className="text-sm">Perfil Candidato: <span className="font-semibold">{data.candidato}%</span></p>
          <p className="text-sm text-gray-500">Rango aceptable: {data.min}% - {data.max}%</p>
        </div>
      );
    }
    return null;
  };
  
  // Calcular la compatibilidad general
  const calcularCompatibilidad = () => {
    let compatibilidadTotal = 0;
    let dimensionesEvaluadas = 0;
    
    chartData.forEach(item => {
      const { puesto, candidato, min, max } = item;
      
      if (candidato >= min && candidato <= max) {
        // Si está dentro del rango, calculamos qué tan cerca está del ideal
        const distanciaMaxima = Math.max(puesto - min, max - puesto);
        const distanciaActual = Math.abs(puesto - candidato);
        const compatibilidadDimension = 100 - ((distanciaActual / distanciaMaxima) * 100);
        
        compatibilidadTotal += compatibilidadDimension;
      } else {
        // Si está fuera del rango, penalizamos
        const distanciaMinima = candidato < min ? min - candidato : candidato - max;
        const rangoTotal = max - min;
        const penalizacion = (distanciaMinima / rangoTotal) * 100;
        const compatibilidadDimension = Math.max(0, 50 - penalizacion);
        
        compatibilidadTotal += compatibilidadDimension;
      }
      
      dimensionesEvaluadas++;
    });
    
    return Math.round(compatibilidadTotal / dimensionesEvaluadas);
  };
  
  const compatibilidadGeneral = calcularCompatibilidad();
  
  // Determinar el color según la compatibilidad
  const getCompatibilidadColor = (valor: number) => {
    if (valor >= 80) return "text-green-600";
    if (valor >= 60) return "text-yellow-600";
    return "text-red-600";
  };
  
  return (
    <div className="bg-white rounded-lg border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Comparativa de Perfiles</h2>
        <div className="flex items-center">
          <span className="text-sm mr-2">Compatibilidad general:</span>
          <span className={`text-xl font-bold ${getCompatibilidadColor(compatibilidadGeneral)}`}>
            {compatibilidadGeneral}%
          </span>
        </div>
      </div>
      
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
            <PolarGrid strokeDasharray="3 3" />
            <PolarAngleAxis 
              dataKey="dimension"
              tick={{ fill: "#333", fontSize: 12 }}
            />
            <PolarRadiusAxis angle={90} domain={[0, 100]} />
            
            {/* Área de rango aceptable */}
            <Radar
              name="Rango Aceptable"
              dataKey="max"
              stroke="rgba(0, 0, 0, 0.1)"
              fill="rgba(200, 200, 200, 0.2)"
              fillOpacity={0.5}
            />
            
            {/* Perfil del puesto */}
            <Radar
              name="Perfil Puesto"
              dataKey="puesto"
              stroke="#1A365D"
              fill="#1A365D"
              fillOpacity={0.4}
            />
            
            {/* Perfil del candidato */}
            <Radar
              name="Perfil Candidato"
              dataKey="candidato"
              stroke="#7B1FA2"
              fill="#7B1FA2"
              fillOpacity={0.3}
              strokeWidth={2}
            />
            
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-5 gap-2 mt-4">
        {chartData.map((item) => (
          <div key={item.dimension} className="text-center">
            <div 
              className="w-4 h-4 rounded-full mx-auto mb-1" 
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs font-medium">{item.dimension}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
