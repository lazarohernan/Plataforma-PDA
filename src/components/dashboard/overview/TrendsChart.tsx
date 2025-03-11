
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";

// Mock data for trends chart
const trendsData = [
  { month: "Ene", completed: 45, pending: 12 },
  { month: "Feb", completed: 52, pending: 15 },
  { month: "Mar", completed: 48, pending: 10 },
  { month: "Abr", completed: 61, pending: 8 },
  { month: "May", completed: 55, pending: 9 },
  { month: "Jun", completed: 67, pending: 14 },
  { month: "Jul", completed: 72, pending: 18 },
  { month: "Ago", completed: 78, pending: 16 }
];

export const TrendsChart = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-100 p-5 h-full">
      <h2 className="text-lg font-semibold mb-4">Tendencias de Evaluaciones</h2>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={trendsData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ borderRadius: "4px", border: "1px solid #f0f0f0" }} 
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="completed" 
              name="Completadas" 
              stroke="#1A365D" 
              strokeWidth={2} 
              activeDot={{ r: 6 }} 
            />
            <Line 
              type="monotone" 
              dataKey="pending" 
              name="Pendientes" 
              stroke="#FFC107" 
              strokeWidth={2} 
              activeDot={{ r: 6 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
