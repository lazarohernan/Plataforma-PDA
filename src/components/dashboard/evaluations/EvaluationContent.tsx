
import { EvaluationsTable } from "./EvaluationsTable";
import { EvaluationPageHeader } from "./EvaluationPageHeader";
import { AccessibilityInfo } from "./AccessibilityInfo";

export const EvaluationContent = () => {
  return (
    <div className="space-y-6" role="main" aria-labelledby="page-title">
      <EvaluationPageHeader />
      <EvaluationsTable />
      <AccessibilityInfo />
    </div>
  );
};
