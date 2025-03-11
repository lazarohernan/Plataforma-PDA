
import { ReportesPageHeader } from "./ReportesPageHeader";
import { ReportesPanel } from "./ReportesPanel";
import { ReportesHistorial } from "./ReportesHistorial";
import { ReportesAccessibilityInfo } from "./ReportesAccessibilityInfo";

export const ReportesContent = () => {
  return (
    <div className="flex flex-col h-full p-6 space-y-6 overflow-hidden" role="main" aria-labelledby="reportes-title">
      <ReportesPageHeader />
      
      <div className="flex-1 overflow-auto min-h-0 space-y-6">
        <ReportesPanel />
        <ReportesHistorial />
      </div>
      
      <ReportesAccessibilityInfo />
    </div>
  );
};
