
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AssessmentLayout } from "@/components/organisms/AssessmentLayout";

interface CompletionScreenProps {
  totalNaturalSelected: number;
  totalAdaptedSelected: number;
  totalSteps: number;
  sections: { name: string; steps: number }[];
  onFinish: () => void;
}

export const CompletionScreen = ({
  totalNaturalSelected,
  totalAdaptedSelected,
  totalSteps,
  sections,
  onFinish,
}: CompletionScreenProps) => {
  return (
    <AssessmentLayout
      title="¡Evaluación Completada!"
      subtitle="Gracias por completar su evaluación conductual PDA"
      currentStep={totalSteps}
      totalSteps={totalSteps}
      sections={sections}
      showNavigation={false}
    >
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
          <Check className="h-10 w-10 text-green-600" />
        </div>
        
        <h2 className="text-2xl font-bold mb-4">Sus respuestas han sido registradas</h2>
        
        <p className="text-gray-600 max-w-md mx-auto mb-8">
          Hemos recibido sus respuestas y estamos procesando su perfil conductual.
          Los resultados estarán disponibles pronto.
        </p>
        
        <div className="space-y-2 mb-8">
          <div className="flex justify-between max-w-md mx-auto p-3 bg-gray-50 rounded">
            <span>Descriptores Perfil Natural</span>
            <span className="font-semibold">{totalNaturalSelected} seleccionados</span>
          </div>
          <div className="flex justify-between max-w-md mx-auto p-3 bg-gray-50 rounded">
            <span>Descriptores Perfil Adaptado</span>
            <span className="font-semibold">{totalAdaptedSelected} seleccionados</span>
          </div>
        </div>
        
        <Button 
          onClick={onFinish}
          size="lg" 
          className="mt-6 bg-primary text-white"
        >
          Finalizar
        </Button>
      </div>
    </AssessmentLayout>
  );
};
