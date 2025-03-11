
import { AssessmentLayout } from "@/components/organisms/AssessmentLayout";
import { InstructionPanel } from "@/components/atoms/InstructionPanel";
import { RECOMMENDED_TOTAL_SELECTIONS } from "@/data/assessmentDescriptors";

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
      title="Transición a Perfil Adaptado"
      subtitle="Ha completado la primera parte de la evaluación"
      currentStep={currentStep}
      totalSteps={totalSteps}
      sections={sections}
      onNext={onContinue}
      onPrevious={onPrevious}
      canProceed={true}
      canGoBack={true}
      nextLabel="Continuar con Perfil Adaptado"
    >
      <div className="space-y-6 py-4">
        <div className="text-lg text-gray-700">
          <p>
            Ha completado la evaluación de su <strong>Perfil Natural</strong>, que describe cómo 
            se ve a sí mismo y cómo prefiere comportarse naturalmente.
          </p>
          <p className="mt-4">
            Ahora continuaremos con su <strong>Perfil Adaptado</strong>, que describe cómo 
            cree que los demás lo perciben y cómo adapta su comportamiento en su entorno actual.
          </p>
        </div>
        
        <InstructionPanel
          title="Instrucciones para la siguiente sección"
          instructions={[
            "En la siguiente sección, seleccione los descriptores que cree que OTROS utilizarían para describirle.",
            "Piense en cómo se comporta en su entorno laboral o social actual.",
            "Considere cómo otras personas perciben su comportamiento en situaciones cotidianas."
          ]}
        />
        
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 mt-6">
          <p className="text-sm text-blue-800">
            <strong>Nota:</strong> Ha seleccionado {totalNaturalSelected} descriptores para su Perfil Natural. 
            {totalNaturalSelected < RECOMMENDED_TOTAL_SELECTIONS / 2 
              ? " Puede ser beneficioso seleccionar más descriptores para un perfil más completo." 
              : " Excelente cantidad de descriptores para un perfil preciso."}
          </p>
        </div>
      </div>
    </AssessmentLayout>
  );
};
