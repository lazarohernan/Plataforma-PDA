import { Link, useLocation } from "react-router-dom";
import { 
  BarChart3, 
  ClipboardList, 
  Settings, 
  UserCheck, 
  FileBarChart2, 
  HelpCircle, 
  ChevronLeft, 
  ChevronRight, 
  Home,
  Briefcase
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/atoms/Logo";

interface DashboardSidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

export const DashboardSidebar = ({ collapsed, toggleSidebar }: DashboardSidebarProps) => {
  const location = useLocation();
  
  const navItems = [
    { 
      name: "Dashboard", 
      icon: Home, 
      path: "/dashboard" 
    },
    { 
      name: "Evaluaciones", 
      icon: ClipboardList, 
      path: "/dashboard/evaluaciones" 
    },
    { 
      name: "Análisis", 
      icon: BarChart3, 
      path: "/dashboard/analisis" 
    },
    { 
      name: "Perfiles de Puesto", 
      icon: Briefcase, 
      path: "/dashboard/perfiles-puesto" 
    },
    { 
      name: "Reportes", 
      icon: FileBarChart2, 
      path: "/dashboard/reportes" 
    },
    { 
      name: "Configuración", 
      icon: Settings, 
      path: "/dashboard/configuracion" 
    },
    { 
      name: "Ayuda y Soporte", 
      icon: HelpCircle, 
      path: "/dashboard/ayuda" 
    },
  ];
  
  return (
    <aside 
      className={cn(
        "fixed h-full bg-[#1A365D] text-white transition-all duration-300 z-20", 
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Toggle button */}
      <button 
        onClick={toggleSidebar}
        className="absolute -right-3 top-20 bg-white text-[#1A365D] rounded-full p-1 shadow-md hover:bg-gray-100 z-30"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
      
      {/* Logo */}
      <div className={cn(
        "flex items-center h-16 px-4 border-b border-white/10",
        collapsed ? "justify-center" : "justify-between"
      )}>
        {collapsed ? (
          <Logo className="w-8 h-8" />
        ) : (
          <>
            <Logo className="w-8 h-8" />
            <span className="text-lg font-semibold">PDA Admin</span>
          </>
        )}
      </div>
      
      {/* Navigation */}
      <nav className="mt-6 px-2">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-md transition-colors hover:bg-white/10",
                  location.pathname === item.path ? "bg-white/20" : "",
                  collapsed ? "justify-center" : ""
                )}
              >
                <item.icon className="w-5 h-5" />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
