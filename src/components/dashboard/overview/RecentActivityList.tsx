
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { UserCheck, Clock, Calendar } from "lucide-react";

// Mock data for recent activities
const recentActivities = [
  {
    id: 1,
    type: "evaluation_completed",
    user: "Carlos Rodríguez",
    department: "Ventas",
    date: new Date(2023, 7, 24, 14, 30),
  },
  {
    id: 2,
    type: "user_added",
    user: "Ana Martínez",
    department: "Marketing",
    date: new Date(2023, 7, 23, 10, 15),
  },
  {
    id: 3,
    type: "evaluation_scheduled",
    user: "Luis Hernández",
    department: "Desarrollo",
    date: new Date(2023, 7, 28, 9, 0),
  },
  {
    id: 4,
    type: "evaluation_completed",
    user: "Sofía Gutiérrez",
    department: "Recursos Humanos",
    date: new Date(2023, 7, 22, 16, 45),
  },
  {
    id: 5,
    type: "user_added",
    user: "Miguel Ángel López",
    department: "Finanzas",
    date: new Date(2023, 7, 21, 11, 30),
  },
];

export const RecentActivityList = () => {
  // Helper function to get icon based on activity type
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "evaluation_completed":
        return <UserCheck size={16} className="text-green-500" />;
      case "user_added":
        return <UserCheck size={16} className="text-blue-500" />;
      case "evaluation_scheduled":
        return <Calendar size={16} className="text-orange-500" />;
      default:
        return <Clock size={16} className="text-gray-500" />;
    }
  };

  // Helper function to get activity text based on type
  const getActivityText = (activity: typeof recentActivities[0]) => {
    const { type, user, department } = activity;
    
    switch (type) {
      case "evaluation_completed":
        return (
          <>
            <span className="font-medium">{user}</span> ha completado su evaluación PDA.
            <span className="text-xs text-gray-500 ml-1">({department})</span>
          </>
        );
      case "user_added":
        return (
          <>
            <span className="font-medium">{user}</span> ha sido añadido al sistema.
            <span className="text-xs text-gray-500 ml-1">({department})</span>
          </>
        );
      case "evaluation_scheduled":
        return (
          <>
            Evaluación programada para <span className="font-medium">{user}</span>.
            <span className="text-xs text-gray-500 ml-1">({department})</span>
          </>
        );
      default:
        return <span>Actividad desconocida</span>;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-100 p-5">
      <h2 className="text-lg font-semibold mb-4">Actividad Reciente</h2>
      
      <div className="space-y-4">
        {recentActivities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
            <div className="p-2 bg-gray-100 rounded-full">
              {getActivityIcon(activity.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm">{getActivityText(activity)}</p>
              <p className="text-xs text-gray-500 mt-1">
                {formatDistanceToNow(activity.date, { addSuffix: true, locale: es })}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <a 
        href="#" 
        className="block text-sm text-[#1A365D] font-medium mt-4 text-center hover:underline"
      >
        Ver todas las actividades
      </a>
    </div>
  );
};
