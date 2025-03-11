
import { ProfileData } from "@/components/molecules/PDACategoryChart";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { mockResults } from "@/models/results";

export const ResultsDetailedAnalysis = () => {
  const naturalProfile = mockResults.natural;
  const adaptedProfile = mockResults.adapted;
  
  // Dimension info with colors and labels
  const dimensions = [
    { id: "risk", name: "Riesgo", color: "#D32F2F", description: "Mide tu disposición a tomar decisiones, liderar e influir en otros." },
    { id: "extroversion", name: "Extroversión", color: "#FFC107", description: "Refleja tu orientación hacia las relaciones interpersonales y comunicación." },
    { id: "patience", name: "Paciencia", color: "#388E3C", description: "Indica tu ritmo de actividad y preferencia por ambientes estables o cambiantes." },
    { id: "normativity", name: "Normatividad", color: "#1976D2", description: "Evalúa tu orientación hacia las reglas, procedimientos y estructura." },
    { id: "selfControl", name: "Autocontrol", color: "#7B1FA2", description: "Mide tu tendencia a expresar o contener emociones y reacciones." }
  ];
  
  // Helper function to determine trend
  const getTrend = (natural: number, adapted: number) => {
    const diff = adapted - natural;
    if (Math.abs(diff) < 5) return { icon: <Minus className="h-4 w-4 text-gray-400" />, text: "Sin cambio significativo" };
    if (diff > 0) return { icon: <ArrowUpRight className="h-4 w-4 text-green-600" />, text: "En aumento" };
    return { icon: <ArrowDownRight className="h-4 w-4 text-red-600" />, text: "En disminución" };
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold mb-4">Análisis Detallado</h2>
        <p className="text-gray-600 mb-6">
          Esta sección te permite explorar en profundidad cada dimensión de tu perfil PDA,
          mostrando tanto tu tendencia natural como tu comportamiento adaptado.
        </p>
        
        <Accordion type="single" collapsible defaultValue="risk" className="w-full">
          {dimensions.map((dimension) => {
            const naturalScore = naturalProfile[dimension.id as keyof ProfileData];
            const adaptedScore = adaptedProfile[dimension.id as keyof ProfileData];
            const trend = getTrend(naturalScore, adaptedScore);
            
            return (
              <AccordionItem key={dimension.id} value={dimension.id} className="border rounded-md mb-4 overflow-hidden">
                <AccordionTrigger className="py-4 px-5 hover:no-underline hover:bg-gray-50">
                  <div className="flex items-center gap-3 text-left w-full">
                    <div 
                      className="w-4 h-4 rounded-full flex-shrink-0" 
                      style={{ backgroundColor: dimension.color }}
                    />
                    <div className="flex-grow">
                      <span className="font-semibold text-lg">{dimension.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>Natural: <strong>{naturalScore}</strong></span>
                      <span className="mx-1">•</span>
                      <span>Adaptado: <strong>{adaptedScore}</strong></span>
                    </div>
                  </div>
                </AccordionTrigger>
                
                <AccordionContent className="pb-4 px-6 pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="col-span-2">
                      <div className="space-y-4">
                        <p className="text-gray-700">{dimension.description}</p>
                        
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-medium">Tendencia:</span>
                          <div className="flex items-center gap-1">
                            {trend.icon}
                            <span>{trend.text}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <h4 className="font-medium mt-3">Interpretación:</h4>
                          <div className="bg-gray-50 p-4 rounded-md">
                            <p className="text-sm">
                              {naturalScore > 70 ? (
                                `Tu alta puntuación en ${dimension.name} sugiere que esta es una característica dominante en tu perfil conductual. 
                                Esto puede manifestarse como una fortaleza natural en situaciones que requieren esta dimensión.`
                              ) : naturalScore < 40 ? (
                                `Tu baja puntuación en ${dimension.name} indica que esta dimensión no es predominante en tu comportamiento natural. 
                                Esto puede resultar en un enfoque diferente a situaciones que típicamente requieren esta característica.`
                              ) : (
                                `Tu puntuación moderada en ${dimension.name} sugiere un equilibrio en esta dimensión. 
                                Puedes adaptarte según la situación, sin que este rasgo domine excesivamente tu comportamiento.`
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3">Comparativa:</h4>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-medium mb-1">Perfil Natural</p>
                          <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full transition-all duration-1000 ease-out"
                              style={{ 
                                width: `${naturalScore}%`, 
                                backgroundColor: dimension.color,
                                opacity: 0.8
                              }}
                            />
                          </div>
                          <p className="text-right text-xs mt-1 text-gray-500">{naturalScore}%</p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium mb-1">Perfil Adaptado</p>
                          <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full transition-all duration-1000 ease-out"
                              style={{ 
                                width: `${adaptedScore}%`, 
                                backgroundColor: dimension.color,
                                opacity: 0.5
                              }}
                            />
                          </div>
                          <p className="text-right text-xs mt-1 text-gray-500">{adaptedScore}%</p>
                        </div>
                        
                        {Math.abs(naturalScore - adaptedScore) > 10 && (
                          <div className="p-3 bg-blue-50 rounded-md mt-4">
                            <p className="text-sm text-blue-800">
                              <strong>Nota:</strong> La diferencia entre tu perfil natural y adaptado sugiere que estás
                              {adaptedScore > naturalScore ? " aumentando" : " disminuyendo"} este comportamiento 
                              en tu entorno actual, lo que podría generar cierto estrés adaptativo.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
};
