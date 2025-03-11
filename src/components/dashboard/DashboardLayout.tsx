
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
    <div className="flex h-screen bg-[#F5F7FA]">
      {/* Sidebar */}
      <DashboardSidebar collapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
      
      {/* Main Content */}
      <div className={`flex flex-col flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-24' : 'ml-72'}`}>
        {/* Header */}
        <DashboardHeader toggleSidebar={toggleSidebar} />
        
        {/* Content */}
        <main className="flex-1 overflow-auto px-5 pb-5">
          <div className="bg-white p-6 rounded-xl shadow-sm h-full glass-card">
            {children}
          </div>
        </main>
        
        {/* Footer */}
        <DashboardFooter />
      </div>
    </div>
  );
};
