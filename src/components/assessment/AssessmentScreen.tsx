
import { InstructionPanel } from "@/components/atoms/InstructionPanel";
import { AssessmentLayout } from "@/components/organisms/AssessmentLayout";
import { DescriptorGroup } from "@/components/molecules/DescriptorGroup";
import { MAX_SELECTIONS_PER_GROUP, RECOMMENDED_TOTAL_SELECTIONS, ProfileType } from "@/data/assessmentDescriptors";
import { Descriptor } from "@/data/assessmentDescriptors";

interface AssessmentScreenProps {
  profileType: ProfileType;
  currentDescriptors: Descriptor[];
  selectedDescriptors: string[];
  onDescriptorToggle: (id: string) => void;
  currentStep: number;
  totalSteps: number;
  sections: { name: string; steps: number }[];
  onNext: () => void;
  onPrevious: () => void;
  canGoBack: boolean;
  totalSelected: number;
}

export const AssessmentScreen = ({
  profileType,
  currentDescriptors,
  selectedDescriptors,
  onDescriptorToggle,
  currentStep,
  totalSteps,
  sections,
  onNext,
  onPrevious,
  canGoBack,
  totalSelected,
}: AssessmentScreenProps) => {
  return (
    <AssessmentLayout
      title={profileType === "natural" ? "Perfil Natural" : "Perfil Adaptado"}
      subtitle={profileType === "natural" 
        ? "Seleccione los descriptores que mejor le describen a USTED" 
        : "Seleccione los descriptores que cree que OTROS utilizarían para describirle"}
      currentStep={currentStep}
      totalSteps={totalSteps}
      sections={sections}
      onNext={onNext}
      onPrevious={onPrevious}
      canProceed={true}
      canGoBack={canGoBack}
    >
      <div className="space-y-6">
        <InstructionPanel
          title={profileType === "natural" 
            ? "Seleccione los descriptores que MEJOR LE REPRESENTAN" 
            : "Seleccione los descriptores que OTROS USARÍAN para describirle"}
          instructions={[
            `Recomendamos seleccionar hasta ${MAX_SELECTIONS_PER_GROUP} descriptores por grupo.`,
            `En total, se recomienda seleccionar aproximadamente ${RECOMMENDED_TOTAL_SELECTIONS} descriptores.`,
            "No hay respuestas correctas o incorrectas, seleccione los que mejor representen su comportamiento habitual."
          ]}
          className="mb-6"
        />
        
        <DescriptorGroup
          descriptors={currentDescriptors}
          selectedDescriptors={selectedDescriptors}
          onDescriptorToggle={onDescriptorToggle}
          maxSelections={MAX_SELECTIONS_PER_GROUP}
        />
        
        <div className="mt-6 text-sm text-gray-500">
          <p>
            Total seleccionado: {totalSelected} de {RECOMMENDED_TOTAL_SELECTIONS} recomendados
          </p>
        </div>
      </div>
    </AssessmentLayout>
  );
};
