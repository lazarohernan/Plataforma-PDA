
import { EvaluationsTable } from "./EvaluationsTable";
import { EvaluationPageHeader } from "./EvaluationPageHeader";
import { AccessibilityInfo } from "./AccessibilityInfo";

export const EvaluationContent = () => {
  return (
    <div className="flex flex-col h-full p-6 space-y-6 overflow-hidden" role="main" aria-labelledby="page-title">
      <EvaluationPageHeader />
      <div className="flex-1 overflow-auto min-h-0">
        <EvaluationsTable />
      </div>
      <AccessibilityInfo />
    </div>
  );
};
