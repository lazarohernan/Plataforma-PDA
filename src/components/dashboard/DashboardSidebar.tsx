
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
  Briefcase,
  ShieldCheck,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/atoms/Logo";
import { useAdmin } from "@/hooks/useAdmin";
import { useAuth } from "@/hooks/useAuth";

interface DashboardSidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

export const DashboardSidebar = ({ collapsed, toggleSidebar }: DashboardSidebarProps) => {
  const location = useLocation();
  const { isAdmin, loading } = useAdmin();
  const { getUserProfile } = useAuth();
  const userProfile = getUserProfile();
  
  const navItems = [
    { 
      name: "Dashboard", 
      icon: Home, 
      path: "/dashboard" 
    },
    { 
      name: "Evaluaciones", 
      icon: ClipboardList, 
      path: "/dashboard/evaluations" 
    },
    { 
      name: "Análisis", 
      icon: BarChart3, 
      path: "/dashboard/analysis" 
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
    // Opción de validación solo visible para administradores
    ...(isAdmin ? [{
      name: "Validación de Evaluaciones",
      icon: ShieldCheck,
      path: "/dashboard/validacion",
      adminOnly: true
    }] : []),
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
        "fixed top-5 left-5 h-[calc(100%-40px)] bg-[#1A365D] text-white transition-all duration-300 z-20 rounded-xl shadow-lg",
        collapsed ? "w-20" : "w-64",
        "glass-card border border-white/10"
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
        "flex items-center justify-center h-16 px-4 border-b border-white/10"
      )}>
        <Logo className={collapsed ? "w-8 h-8" : ""} />
      </div>
      
      {/* User Profile */}
      <div className={cn(
        "flex items-center px-4 py-3 border-b border-white/10",
        collapsed ? "justify-center" : "justify-start"
      )}>
        <div className="flex items-center gap-3">
          <div className="bg-white/20 rounded-full p-2">
            <User className="w-5 h-5" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-medium">
                {userProfile ? `${userProfile.nombres || ''} ${userProfile.apellidos || ''}`.trim() : 'Usuario'}
              </span>
              <span className="text-xs text-white/60">
                {userProfile?.organizacion?.nombre || ''}
              </span>
            </div>
          )}
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="mt-6 px-2 h-[calc(100%-80px)] overflow-y-auto">
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
