
import { useState } from "react";
import { AssessmentLayout } from "@/components/organisms/AssessmentLayout";
import { ResultsNavigation } from "@/components/molecules/ResultsNavigation";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { mockResults } from "@/models/results";
import { ResultsSummary } from "@/components/results/ResultsSummary";
import { ResultsDetailedAnalysis } from "@/components/results/ResultsDetailedAnalysis";
import { ResultsRecommendations } from "@/components/results/ResultsRecommendations";
import { ResultsCompatibility } from "@/components/results/ResultsCompatibility";
import { ResultsExport } from "@/components/results/ResultsExport";

type ResultSection = "summary" | "detailed" | "recommendations" | "compatibility" | "export";

const Results = () => {
  const [activeSection, setActiveSection] = useState<ResultSection>("summary");

  const handleExportPDF = () => {
    // In a real application, this would trigger PDF generation
    console.log("Exporting results to PDF...");
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "summary":
        return (
          <ResultsSummary 
            naturalProfile={mockResults.natural}
            adaptedProfile={mockResults.adapted}
            derivedIndicators={mockResults.derivedIndicators}
          />
        );
      case "detailed":
        return <ResultsDetailedAnalysis />;
      case "recommendations":
        return <ResultsRecommendations />;
      case "compatibility":
        return <ResultsCompatibility />;
      case "export":
        return <ResultsExport onExportPDF={handleExportPDF} />;
      default:
        return null;
    }
  };

  return (
    <AssessmentLayout
      title="Resultados de tu Evaluación PDA"
      subtitle="Visualiza e interpreta tu perfil conductual"
      currentStep={0}  // Not used in results page
      totalSteps={0}   // Not used in results page
      showNavigation={false}
    >
      <div className="mb-8">
        <ResultsNavigation 
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
      </div>
      
      {renderActiveSection()}
      
      <div className="mt-8 flex justify-end">
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={handleExportPDF}
        >
          <Download size={16} />
          Exportar PDF
        </Button>
      </div>
    </AssessmentLayout>
  );
};

export default Results;
