
import { AssessmentLayout } from "@/components/organisms/AssessmentLayout";
import { InstructionPanel } from "@/components/atoms/InstructionPanel";
import { RECOMMENDED_TOTAL_SELECTIONS } from "@/data/assessmentDescriptors";
import { Sparkles } from "lucide-react";

interface TransitionScreenProps {
  totalNaturalSelected: number;
  currentStep: number;
  totalSteps: number;
  sections: { name: string; steps: number }[];
  onContinue: () => void;
  onPrevious: () => void;
}

export const TransitionScreen = ({
  totalNaturalSelected,
  currentStep,
  totalSteps,
  sections,
  onContinue,
  onPrevious,
}: TransitionScreenProps) => {
  return (
    <AssessmentLayout
      title="¡Muy bien! Ya vamos a la mitad"
      subtitle="Ahora veamos cómo te perciben los demás"
      currentStep={currentStep}
      totalSteps={totalSteps}
      sections={sections}
      onNext={onContinue}
      onPrevious={onPrevious}
      canProceed={true}
      canGoBack={true}
      nextLabel="Continuar a la siguiente parte"
    >
      <div className="space-y-6 py-4">
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full">
            <Sparkles className="h-10 w-10 text-yellow-500" />
          </div>
        </div>
        
        <div className="text-lg text-gray-700 text-center">
          <p>
            ¡Genial! Ya nos contaste cómo te ves a ti mismo.
          </p>
          <p className="mt-4">
            Ahora vamos a explorar una perspectiva diferente: <strong>cómo crees que te ven los demás</strong>.
          </p>
        </div>
        
        <InstructionPanel
          title="En esta segunda parte"
          instructions={[
            "Piensa en cómo te describirían tus compañeros, amigos o familia.",
            "Selecciona las palabras que crees que usarían para hablar de ti.",
            "Esta perspectiva es igual de importante que la primera."
          ]}
        />
        
        <div className="p-4 bg-green-50 rounded-lg border border-green-100 mt-6">
          <p className="text-sm text-green-800 text-center">
            <strong>¡Vas muy bien!</strong> Has seleccionado {totalNaturalSelected} palabras hasta ahora.
            {totalNaturalSelected < 10 
              ? " Recuerda que cuantas más palabras selecciones, más completo será tu perfil." 
              : " Estás haciendo un gran trabajo seleccionando palabras que te describen."}
          </p>
        </div>
      </div>
    </AssessmentLayout>
  );
};
