
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";

// Mock data for department distribution
const departmentData = [
  { name: "Ventas", natural: 22, adapted: 25 },
  { name: "Marketing", natural: 18, adapted: 15 },
  { name: "RRHH", natural: 12, adapted: 14 },
  { name: "TI", natural: 25, adapted: 20 },
  { name: "Finanzas", natural: 10, adapted: 12 },
  { name: "Operaciones", natural: 15, adapted: 18 }
];

export const DepartmentDistribution = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 h-full">
      <h2 className="text-lg font-semibold mb-4">Distribución por Departamentos</h2>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={departmentData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ borderRadius: "4px", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }} 
            />
            <Legend />
            <Bar 
              dataKey="natural" 
              name="Perfil Natural" 
              fill="#1A365D" 
              barSize={20}
              radius={[4, 4, 0, 0]} 
            />
            <Bar 
              dataKey="adapted" 
              name="Perfil Adaptado" 
              fill="#7B1FA2" 
              barSize={20}
              radius={[4, 4, 0, 0]} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
