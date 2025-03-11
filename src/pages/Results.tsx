
import { useState } from "react";
import { AssessmentLayout } from "@/components/organisms/AssessmentLayout";
import { PDACategoryChart } from "@/components/molecules/PDACategoryChart";
import { DerivedIndicators } from "@/components/molecules/DerivedIndicators";
import { ProfileInterpretation } from "@/components/molecules/ProfileInterpretation";
import { ResultsNavigation } from "@/components/molecules/ResultsNavigation";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

// Mock data - in a real application this would come from an API or state
const mockResults = {
  natural: {
    risk: 65,
    extroversion: 82,
    patience: 45,
    normativity: 70,
    selfControl: 55,
  },
  adapted: {
    risk: 58,
    extroversion: 75,
    patience: 52,
    normativity: 78,
    selfControl: 62,
  },
  derivedIndicators: {
    energyLevel: 72,
    energyBalance: 65,
    decisionMaking: 58, // 0-100 scale: 0 = Emotional, 100 = Rational
    changeRhythm: 80,
  }
};

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
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-1 bg-white rounded-lg shadow-sm p-6">
                <PDACategoryChart 
                  naturalProfile={mockResults.natural}
                  adaptedProfile={mockResults.adapted}
                />
              </div>
              <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
                <ProfileInterpretation 
                  naturalProfile={mockResults.natural}
                  adaptedProfile={mockResults.adapted}
                />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <DerivedIndicators indicators={mockResults.derivedIndicators} />
            </div>
          </>
        );
      case "detailed":
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold mb-4">Análisis Detallado</h2>
            <p className="text-gray-600">
              Esta sección mostrará un análisis detallado de cada dimensión PDA.
              (Contenido en desarrollo)
            </p>
          </div>
        );
      case "recommendations":
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold mb-4">Recomendaciones</h2>
            <p className="text-gray-600">
              Basado en tu perfil, estas son nuestras recomendaciones para potenciar tu desarrollo.
              (Contenido en desarrollo)
            </p>
          </div>
        );
      case "compatibility":
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold mb-4">Compatibilidad con Roles</h2>
            <p className="text-gray-600">
              Descubre qué roles se alinean mejor con tu perfil conductual.
              (Contenido en desarrollo)
            </p>
          </div>
        );
      case "export":
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold mb-4">Exportar Resultados</h2>
            <p className="text-gray-600 mb-6">
              Descarga tus resultados en diferentes formatos o compártelos con otros.
            </p>
            <div className="flex flex-col gap-4 max-w-md">
              <Button 
                className="flex items-center gap-2"
                onClick={handleExportPDF}
              >
                <Download size={18} />
                Descargar informe completo (PDF)
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                Compartir resultados por email
              </Button>
            </div>
          </div>
        );
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
