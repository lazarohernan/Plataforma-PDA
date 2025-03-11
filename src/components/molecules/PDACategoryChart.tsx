
import { useEffect, useRef } from "react";
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  Tooltip,
  Legend 
} from "recharts";

export interface ProfileData {
  risk: number;
  extroversion: number;
  patience: number;
  normativity: number;
  selfControl: number;
}

interface PDACategoryChartProps {
  naturalProfile: ProfileData;
  adaptedProfile: ProfileData;
  className?: string;
}

export const PDACategoryChart = ({ 
  naturalProfile, 
  adaptedProfile, 
  className 
}: PDACategoryChartProps) => {
  const chartData = [
    {
      dimension: "Riesgo",
      natural: naturalProfile.risk,
      adapted: adaptedProfile.risk,
      fullMark: 100,
      color: "#D32F2F"
    },
    {
      dimension: "Extroversión",
      natural: naturalProfile.extroversion,
      adapted: adaptedProfile.extroversion,
      fullMark: 100,
      color: "#FFC107"
    },
    {
      dimension: "Paciencia",
      natural: naturalProfile.patience,
      adapted: adaptedProfile.patience,
      fullMark: 100,
      color: "#388E3C"
    },
    {
      dimension: "Normatividad",
      natural: naturalProfile.normativity,
      adapted: adaptedProfile.normativity,
      fullMark: 100,
      color: "#1976D2"
    },
    {
      dimension: "Autocontrol",
      natural: naturalProfile.selfControl,
      adapted: adaptedProfile.selfControl,
      fullMark: 100,
      color: "#7B1FA2"
    }
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 shadow-md rounded-md border border-gray-100">
          <p className="font-semibold" style={{ color: data.color }}>{data.dimension}</p>
          <p className="text-sm">Perfil Natural: <span className="font-semibold">{data.natural}</span></p>
          <p className="text-sm">Perfil Adaptado: <span className="font-semibold">{data.adapted}</span></p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`w-full ${className || ""}`}>
      <h3 className="text-xl font-semibold mb-4 text-center">Perfil PDA</h3>
      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
            <PolarGrid strokeDasharray="3 3" />
            <PolarAngleAxis 
              dataKey="dimension"
              tick={{ fill: "#333", fontSize: 12 }}
            />
            <PolarRadiusAxis angle={90} domain={[0, 100]} />
            <Radar
              name="Perfil Natural"
              dataKey="natural"
              stroke="#1A365D"
              fill="#1A365D"
              fillOpacity={0.3}
              activeDot={{ r: 6 }}
            />
            <Radar
              name="Perfil Adaptado"
              dataKey="adapted"
              stroke="#7B1FA2"
              fill="#7B1FA2"
              fillOpacity={0.25}
              strokeDasharray="5 5"
              activeDot={{ r: 6 }}
            />
            <Legend />
            <Tooltip content={<CustomTooltip />} />
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
