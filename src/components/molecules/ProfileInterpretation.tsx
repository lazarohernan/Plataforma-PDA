
import { useState } from "react";
import { ProfileData } from "./PDACategoryChart";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ProfileInterpretationProps {
  naturalProfile: ProfileData;
  adaptedProfile: ProfileData;
}

export const ProfileInterpretation = ({
  naturalProfile,
  adaptedProfile
}: ProfileInterpretationProps) => {
  const [expanded, setExpanded] = useState<string | boolean>("risk");
  
  // Helper function to get interpretation text based on score
  const getInterpretationText = (dimension: string, score: number) => {
    // These would be more detailed in a real application
    if (score < 40) return "Nivel bajo";
    if (score < 70) return "Nivel moderado";
    return "Nivel alto";
  };
  
  // Helper function to get work implication text
  const getWorkImplication = (dimension: string, score: number) => {
    // These would be more detailed and specific in a real application
    switch (dimension) {
      case "risk":
        return score > 70 
          ? "Te sientes cómodo tomando decisiones y asumiendo riesgos calculados. Prefieres entornos donde puedas liderar e influir en las decisiones."
          : "Prefieres analizar cuidadosamente antes de actuar. Te desempeñas mejor en entornos con cierta estructura y apoyo.";
      case "extroversion":
        return score > 70 
          ? "Disfrutas el trabajo en equipo y los entornos sociales. Tienes facilidad para establecer relaciones y comunicarte efectivamente."
          : "Prefieres entornos de trabajo más tranquilos donde puedas concentrarte. Comunicas de forma más selectiva y reflexiva.";
      case "patience":
        return score > 70 
          ? "Te adaptas bien a rutinas y procesos establecidos. Aportas estabilidad y consistencia a los equipos de trabajo."
          : "Prefieres la variedad y los entornos dinámicos. Te adaptas rápidamente a cambios y nuevas situaciones.";
      case "normativity":
        return score > 70 
          ? "Te desempeñas mejor en entornos con reglas claras y procesos definidos. Eres meticuloso y atento a los detalles."
          : "Prefieres entornos flexibles donde puedas aplicar criterio propio y experimentar con diferentes enfoques.";
      case "selfControl":
        return score > 70 
          ? "Manejas bien la presión y mantienes la calma en situaciones de estrés. Prefieres enfoques lógicos y estructurados."
          : "Eres espontáneo y expresivo. Aportas entusiasmo y energía emocional a los equipos.";
      default:
        return "";
    }
  };
  
  // Dimension info with colors and labels
  const dimensions = [
    { id: "risk", name: "Riesgo", color: "#D32F2F" },
    { id: "extroversion", name: "Extroversión", color: "#FFC107" },
    { id: "patience", name: "Paciencia", color: "#388E3C" },
    { id: "normativity", name: "Normatividad", color: "#1976D2" },
    { id: "selfControl", name: "Autocontrol", color: "#7B1FA2" }
  ];
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-2">Tu Perfil PDA</h2>
      
      <p className="text-gray-700 mb-6">
        Tu perfil PDA revela tus tendencias conductuales naturales y cómo te adaptas a tu entorno actual.
        Cada dimensión proporciona información valiosa sobre tu estilo de trabajo y relaciones interpersonales.
      </p>
      
      <Accordion type="single" collapsible defaultValue="risk" className="w-full">
        {dimensions.map((dimension) => {
          const naturalScore = naturalProfile[dimension.id as keyof ProfileData];
          const adaptedScore = adaptedProfile[dimension.id as keyof ProfileData];
          
          return (
            <AccordionItem key={dimension.id} value={dimension.id} className="border-b border-gray-200">
              <AccordionTrigger className="py-4 hover:no-underline">
                <div className="flex items-center gap-2 text-left">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: dimension.color }}
                  />
                  <span className="font-semibold">{dimension.name}</span>
                  <div className="ml-2 px-2 py-0.5 bg-gray-100 rounded text-sm">
                    {naturalScore}
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4 px-4">
                <div className="space-y-3">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Perfil Natural: </span>
                    {getInterpretationText(dimension.id, naturalScore)}
                    {naturalScore !== adaptedScore && (
                      <>
                        <span className="mx-2">•</span>
                        <span className="font-semibold">Perfil Adaptado: </span>
                        {getInterpretationText(dimension.id, adaptedScore)}
                      </>
                    )}
                  </p>
                  
                  <div className="mt-2">
                    <h4 className="text-sm font-semibold mb-1">En el entorno laboral:</h4>
                    <p className="text-sm text-gray-600">
                      {getWorkImplication(dimension.id, naturalScore)}
                    </p>
                  </div>
                  
                  {Math.abs(naturalScore - adaptedScore) > 10 && (
                    <div className="mt-2 p-3 bg-blue-50 rounded-md">
                      <h4 className="text-sm font-semibold mb-1">Adaptación:</h4>
                      <p className="text-sm text-gray-600">
                        La diferencia entre tu perfil natural y adaptado sugiere que estás 
                        {adaptedScore > naturalScore ? " incrementando" : " disminuyendo"} 
                        este comportamiento en tu entorno actual.
                      </p>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};
