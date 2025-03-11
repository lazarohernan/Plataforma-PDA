import { useState } from "react";
import { AssessmentLayout } from "@/components/organisms/AssessmentLayout";
import { ResultsNavigation } from "@/components/molecules/ResultsNavigation";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { mockResults } from "@/models/results";
import { ResultsSummary } from "@/components/results/ResultsSummary";
import { ResultsDetailedAnalysis } from "@/components/results/ResultsDetailedAnalysis";
import { ResultsRecommendations } from "@/components/results/ResultsRecommendations";
import { ResultsCompatibility } from "@/components/results/ResultsCompatibility";
import { ResultsExport } from "@/components/results/ResultsExport";
import { GeneratePDF } from "@/components/pdf/GeneratePDF";

type ResultSection = "summary" | "detailed" | "recommendations" | "compatibility" | "export";

const Results = () => {
  const [activeSection, setActiveSection] = useState<ResultSection>("summary");

  const handleExportPDF = () => {
    console.log("Export handler is now in GeneratePDF component");
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
      subtitle="Visualiza e interpreta tu perfil conductual con información detallada y recomendaciones personalizadas."
      currentStep={0}  // Not used in results page
      totalSteps={0}   // Not used in results page
      showNavigation={false}
    >
      <div className="mb-8 fade-in">
        <ResultsNavigation 
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
      </div>
      
      <div className="fade-in">
        {renderActiveSection()}
      </div>
      
      <div className="mt-8 flex flex-wrap gap-3 justify-end">
        <GeneratePDF 
          naturalProfile={mockResults.natural}
          adaptedProfile={mockResults.adapted}
          derivedIndicators={mockResults.derivedIndicators}
        />
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
        >
          <Share2 size={16} />
          Compartir Resultados
        </Button>
      </div>
    </AssessmentLayout>
  );
};

export default Results;
