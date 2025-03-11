
import { PerfilPuestoTable } from "./PerfilPuestoTable";
import { PerfilPuestoPageHeader } from "./PerfilPuestoPageHeader";
import { PerfilPuestoAccessibilityInfo } from "./PerfilPuestoAccessibilityInfo";

export const PerfilPuestoContent = () => {
  return (
    <div className="flex flex-col h-full p-6 space-y-6 overflow-hidden" role="main" aria-labelledby="page-title">
      <PerfilPuestoPageHeader />
      <div className="flex-1 overflow-auto min-h-0">
        <PerfilPuestoTable />
      </div>
      <PerfilPuestoAccessibilityInfo />
    </div>
  );
};
