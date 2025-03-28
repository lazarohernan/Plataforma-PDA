
import { useState } from "react";
import { 
  Bell, 
  Search, 
  UserCircle, 
  ChevronDown,
  LogOut,
  Settings,
  User,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { useAdmin } from "@/hooks/useAdmin";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";

interface DashboardHeaderProps {
  toggleSidebar: () => void;
}

export const DashboardHeader = ({ toggleSidebar }: DashboardHeaderProps) => {
  const [notifications, setNotifications] = useState(3);
  const { getUserProfile } = useAuth();
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();
  
  const userProfile = getUserProfile();
  const userName = userProfile?.nombres && userProfile?.apellidos 
    ? `${userProfile.nombres} ${userProfile.apellidos}`
    : userProfile?.nombres || 'Usuario';
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };
  
  return (
    <header className="h-16 px-6 rounded-xl bg-white flex items-center justify-between mx-5 mt-5 mb-4 glass-card">
      <div className="flex-1">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar evaluaciones, candidatos, reportes..." 
            className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1A365D]/30 focus:border-[#1A365D]"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 rounded-full hover:bg-gray-100">
          <Bell size={20} />
          {notifications > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {notifications}
            </span>
          )}
        </button>
        
        {/* Company and User */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <UserCircle size={28} />
              <div className="text-left hidden sm:block">
                <div className="flex items-center gap-1">
                  <p className="text-sm font-medium">{userName}</p>
                  {isAdmin && <Shield size={14} className="text-blue-600" />}
                </div>
                <p className="text-xs text-gray-500">
                  {isAdmin ? 'Administrador' : 'Usuario'}
                </p>
              </div>
              <ChevronDown size={16} className="text-gray-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Configuración</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Cerrar Sesión</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
