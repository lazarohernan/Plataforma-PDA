import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AssessmentLayout } from "@/components/organisms/AssessmentLayout";
import { ResultsNavigation } from "@/components/molecules/ResultsNavigation";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { ResultsSummary } from "@/components/results/ResultsSummary";
import { ResultsDetailedAnalysis } from "@/components/results/ResultsDetailedAnalysis";
import { ResultsRecommendations } from "@/components/results/ResultsRecommendations";
import { ResultsCompatibility } from "@/components/results/ResultsCompatibility";
import { ResultsExport } from "@/components/results/ResultsExport";
import { GeneratePDF } from "@/components/pdf/GeneratePDF";
import { toast } from "sonner";
import { ResultadoEvaluacion } from "@/algoritmo";

// Definir tipos para los resultados en formato UI
interface ProfileData {
  risk: number;
  extroversion: number;
  patience: number;
  normativity: number;
  selfControl: number;
}

interface DerivedIndicatorsData {
  energyLevel: number;
  energyBalance: number;
  decisionMaking: number;
  changeRhythm: number;
}

interface ResultadosUI {
  natural: ProfileData;
  adapted: ProfileData;
  derivedIndicators: DerivedIndicatorsData;
}

// Función para convertir el formato del algoritmo al formato de la UI
const convertirResultadoParaUI = (resultado: ResultadoEvaluacion): ResultadosUI => {
  return {
    natural: {
      risk: resultado.perfilNatural.R,
      extroversion: resultado.perfilNatural.E,
      patience: resultado.perfilNatural.P,
      normativity: resultado.perfilNatural.N,
      selfControl: resultado.perfilNatural.A
    },
    adapted: {
      risk: resultado.perfilAdaptado.R,
      extroversion: resultado.perfilAdaptado.E,
      patience: resultado.perfilAdaptado.P,
      normativity: resultado.perfilAdaptado.N,
      selfControl: resultado.perfilAdaptado.A
    },
    derivedIndicators: {
      energyLevel: resultado.indicadores.nivelEnergia,
      energyBalance: resultado.indicadores.equilibrioEnergetico,
      decisionMaking: resultado.indicadores.tomaDecisiones,
      changeRhythm: resultado.indicadores.modificacionPerfil
    }
  };
};

type ResultSection = "summary" | "detailed" | "recommendations" | "compatibility" | "export";

const Results = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<ResultSection>("summary");
  const [resultados, setResultados] = useState<ResultadosUI | null>(null);
  const [cargando, setCargando] = useState<boolean>(true);
  
  // Cargar resultados al montar el componente
  useEffect(() => {
    // Siempre iniciar con estado de carga
    setCargando(true);
    
    // Función para procesar los resultados con un retraso para mostrar los skeletons
    const procesarResultados = (resultadosString: string) => {
      try {
        const resultadosAlgoritmo = JSON.parse(resultadosString);
        const resultadosUI = convertirResultadoParaUI(resultadosAlgoritmo);
        
        // Guardar los resultados inmediatamente
        setResultados(resultadosUI);
        
        // Pero mantener el estado de carga por un momento para mostrar los skeletons
        setTimeout(() => {
          setCargando(false);
        }, 1500); // Retraso de 1.5 segundos para mostrar los skeletons
        
        return true;
      } catch (error) {
        console.error("Error al parsear resultados:", error);
        return false;
      }
    };
    
    // Intentar cargar resultados de sessionStorage (resultados actuales)
    const resultadosString = sessionStorage.getItem('pda_resultados_actuales');
    
    if (resultadosString && procesarResultados(resultadosString)) {
      return;
    }
    
    // Si no hay resultados actuales, intentar cargar de localStorage (resultados guardados)
    const resultadosGuardadosString = localStorage.getItem('pda_resultados');
    
    if (resultadosGuardadosString && procesarResultados(resultadosGuardadosString)) {
      return;
    }
    
    // Si no hay resultados, mostrar mensaje y redirigir
    toast.error("No se encontraron resultados. Redirigiendo a la evaluación...");
    setTimeout(() => {
      navigate("/assessment");
    }, 2000);
  }, [navigate]);

  const handleShareResults = () => {
    // Generar un ID único para compartir
    const shareId = Math.random().toString(36).substring(2, 10);
    
    // En una implementación real, aquí se guardarían los resultados en la base de datos
    // con el ID generado para compartir
    
    // Simular copia al portapapeles
    navigator.clipboard.writeText(`https://example.com/shared-results/${shareId}`)
      .then(() => {
        toast.success("Enlace de resultados copiado al portapapeles");
      })
      .catch(() => {
        toast.error("No se pudo copiar el enlace al portapapeles");
      });
  };

  const renderActiveSection = () => {
    if (!resultados && !cargando) {
      return <div className="py-12 text-center">No se encontraron resultados.</div>;
    }
    
    switch (activeSection) {
      case "summary":
        return (
          <ResultsSummary 
            naturalProfile={resultados?.natural || { risk: 0, extroversion: 0, patience: 0, normativity: 0, selfControl: 0 }}
            adaptedProfile={resultados?.adapted || { risk: 0, extroversion: 0, patience: 0, normativity: 0, selfControl: 0 }}
            derivedIndicators={resultados?.derivedIndicators || { energyLevel: 0, energyBalance: 0, decisionMaking: 0, changeRhythm: 0 }}
            isLoading={cargando}
          />
        );
      case "detailed":
        return <ResultsDetailedAnalysis 
          naturalProfile={resultados?.natural || { risk: 0, extroversion: 0, patience: 0, normativity: 0, selfControl: 0 }}
          adaptedProfile={resultados?.adapted || { risk: 0, extroversion: 0, patience: 0, normativity: 0, selfControl: 0 }}
          isLoading={cargando} 
        />;
      case "recommendations":
        return <ResultsRecommendations 
          naturalProfile={resultados?.natural || { risk: 0, extroversion: 0, patience: 0, normativity: 0, selfControl: 0 }}
          adaptedProfile={resultados?.adapted || { risk: 0, extroversion: 0, patience: 0, normativity: 0, selfControl: 0 }}
          isLoading={cargando} 
        />;
      case "compatibility":
        return <ResultsCompatibility 
          naturalProfile={resultados?.natural || { risk: 0, extroversion: 0, patience: 0, normativity: 0, selfControl: 0 }}
          adaptedProfile={resultados?.adapted || { risk: 0, extroversion: 0, patience: 0, normativity: 0, selfControl: 0 }}
          isLoading={cargando} 
        />;
      case "export":
        return <ResultsExport 
          naturalProfile={resultados?.natural || { risk: 0, extroversion: 0, patience: 0, normativity: 0, selfControl: 0 }}
          adaptedProfile={resultados?.adapted || { risk: 0, extroversion: 0, patience: 0, normativity: 0, selfControl: 0 }}
          derivedIndicators={resultados?.derivedIndicators || { energyLevel: 0, energyBalance: 0, decisionMaking: 0, changeRhythm: 0 }}
          isLoading={cargando} 
        />;
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
      
      {!cargando && resultados && (
        <div className="mt-8 flex flex-wrap gap-3 justify-end">
          {activeSection !== "export" && (
            <>
              <GeneratePDF 
                naturalProfile={resultados.natural}
                adaptedProfile={resultados.adapted}
                derivedIndicators={resultados.derivedIndicators}
              />
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={handleShareResults}
              >
                <Share2 size={16} />
                Compartir Resultados
              </Button>
            </>
          )}
        </div>
      )}
    </AssessmentLayout>
  );
};

export default Results;
