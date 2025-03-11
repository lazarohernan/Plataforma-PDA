
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { PerfilPuesto } from "./data/mockPerfilesPuesto";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PerfilPuestoPreviewProps {
  perfil: PerfilPuesto;
}

export const PerfilPuestoPreview = ({ perfil }: PerfilPuestoPreviewProps) => {
  // Preparar datos para el gráfico
  const dimensionColors = {
    "Riesgo": "#D32F2F",
    "Extroversión": "#FFC107",
    "Paciencia": "#388E3C",
    "Normatividad": "#1976D2",
    "Autocontrol": "#7B1FA2"
  };
  
  const chartData = [
    { name: "Riesgo", valor: perfil.dimensiones.riesgo.ideal, color: dimensionColors["Riesgo"] },
    { name: "Extroversión", valor: perfil.dimensiones.extroversion.ideal, color: dimensionColors["Extroversión"] },
    { name: "Paciencia", valor: perfil.dimensiones.paciencia.ideal, color: dimensionColors["Paciencia"] },
    { name: "Normatividad", valor: perfil.dimensiones.normatividad.ideal, color: dimensionColors["Normatividad"] },
    { name: "Autocontrol", valor: perfil.dimensiones.autocontrol.ideal, color: dimensionColors["Autocontrol"] }
  ];
  
  // Componente para el tooltip personalizado
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-md rounded-md border border-gray-100">
          <p className="font-semibold" style={{ color: payload[0].payload.color }}>{payload[0].name}</p>
          <p className="text-sm">Valor ideal: <span className="font-medium">{payload[0].value}%</span></p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <Card className="border border-gray-100">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Visualización del Perfil</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="valor"
                labelLine={false}
                label={({ name, percent }) => `${name}`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <h4 className="font-medium mb-2">Competencias requeridas:</h4>
          <div className="flex flex-wrap gap-2">
            {perfil.competencias.map((competencia, index) => (
              <span 
                key={index} 
                className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded-full"
              >
                {competencia}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
