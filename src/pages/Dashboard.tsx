
import { 
  ClipboardCheck, 
  Clock, 
  Users, 
  TrendingUp 
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DashboardMetricCard } from "@/components/dashboard/overview/DashboardMetricCard";
import { RecentActivityList } from "@/components/dashboard/overview/RecentActivityList";
import { DistributionChart } from "@/components/dashboard/overview/DistributionChart";
import { TrendsChart } from "@/components/dashboard/overview/TrendsChart";
import { DepartmentDistribution } from "@/components/dashboard/overview/DepartmentDistribution";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Panel de Control</h1>
          <p className="text-gray-500">Vista general de la plataforma PDA</p>
        </div>
        
        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardMetricCard 
            title="Total Evaluaciones" 
            value="1,248" 
            icon={ClipboardCheck} 
            trend={{ value: 12, isPositive: true }}
            iconColor="bg-blue-100 text-blue-600"
          />
          <DashboardMetricCard 
            title="Evaluaciones este mes" 
            value="86" 
            icon={TrendingUp} 
            trend={{ value: 8, isPositive: true }}
            iconColor="bg-green-100 text-green-600"
          />
          <DashboardMetricCard 
            title="Evaluaciones pendientes" 
            value="24" 
            icon={Clock} 
            description="Necesitan seguimiento"
            iconColor="bg-amber-100 text-amber-600"
          />
          <DashboardMetricCard 
            title="Porcentaje finalización" 
            value="78%" 
            icon={Users} 
            trend={{ value: 5, isPositive: true }}
            iconColor="bg-purple-100 text-purple-600"
          />
        </div>
        
        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TrendsChart />
          <DistributionChart title="Distribución por Dimensión Dominante" />
        </div>
        
        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <DepartmentDistribution />
          </div>
          <div>
            <RecentActivityList />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
