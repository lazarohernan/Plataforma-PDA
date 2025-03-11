
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

// Mock data for distribution chart
const profileDistribution = [
  { name: "Riesgo", value: 25, color: "#D32F2F" },
  { name: "Extroversión", value: 30, color: "#FFC107" },
  { name: "Paciencia", value: 15, color: "#388E3C" },
  { name: "Normatividad", value: 20, color: "#1976D2" },
  { name: "Autocontrol", value: 10, color: "#7B1FA2" },
];

interface DistributionChartProps {
  title: string;
  data?: typeof profileDistribution;
}

export const DistributionChart = ({ title, data = profileDistribution }: DistributionChartProps) => {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 shadow-md border border-gray-100 rounded-md text-sm">
          <p className="font-medium" style={{ color: payload[0].payload.color }}>
            {payload[0].name}: {payload[0].value}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 h-full">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
