
import { useState, ReactNode } from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardFooter } from "./DashboardFooter";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex h-screen bg-[#F5F7FA] overflow-hidden">
      {/* Sidebar */}
      <DashboardSidebar collapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
      
      {/* Main Content */}
      <div className={`flex flex-col flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-24' : 'ml-72'}`}>
        {/* Header */}
        <DashboardHeader toggleSidebar={toggleSidebar} />
        
        {/* Content */}
        <main className="flex-1 overflow-auto p-5 flex flex-col">
          <div className="bg-white rounded-xl shadow-sm flex-1 glass-card overflow-hidden flex flex-col">
            {children}
          </div>
        </main>
        
        {/* Footer */}
        <DashboardFooter />
      </div>
    </div>
  );
};
