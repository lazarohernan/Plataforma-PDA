
import { InstructionPanel } from "@/components/atoms/InstructionPanel";
import { AssessmentLayout } from "@/components/organisms/AssessmentLayout";
import { DescriptorGroup } from "@/components/molecules/DescriptorGroup";
import { 
  MAX_SELECTIONS_PER_GROUP, 
  RECOMMENDED_TOTAL_SELECTIONS, 
  ProfileType,
  Descriptor
} from "@/data/assessmentDescriptors";

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
  // Títulos y subtítulos más amigables según el grupo actual
  const getTitles = () => {
    if (profileType === "natural") {
      const titles = [
        { title: "¿Cómo te ves a ti mismo?", subtitle: "Selecciona las palabras que mejor te describen" },
        { title: "Sobre tu personalidad", subtitle: "Elige las palabras que reflejan cómo eres realmente" },
        { title: "Tus características", subtitle: "Marca las palabras con las que más te identificas" }
      ];
      return titles[Math.min(currentStep - 1, titles.length - 1)];
    } else {
      const titles = [
        { title: "¿Cómo crees que te ven los demás?", subtitle: "Selecciona palabras que otros usarían para describirte" },
        { title: "En tu entorno laboral", subtitle: "¿Qué dirían tus compañeros o jefes sobre ti?" },
        { title: "Tu imagen externa", subtitle: "¿Cómo te perciben las personas que te conocen?" }
      ];
      return titles[Math.min(currentStep - sections[0].steps - 1, titles.length - 1)];
    }
  };
  
  const { title, subtitle } = getTitles();
  
  return (
    <AssessmentLayout
      title={title}
      subtitle={subtitle}
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
          title="Instrucciones"
          instructions={[
            "Selecciona todas las palabras que consideres apropiadas.",
            "No pienses demasiado, confía en tu primera impresión.",
            "No hay respuestas correctas o incorrectas, solo tus preferencias personales."
          ]}
          className="mb-6"
        />
        
        <DescriptorGroup
          descriptors={currentDescriptors}
          selectedDescriptors={selectedDescriptors}
          onDescriptorToggle={onDescriptorToggle}
          maxSelections={Infinity} // Eliminamos la restricción de selecciones por grupo
        />
        
        <div className="mt-6">
          <p className="text-sm text-gray-500">
            Has seleccionado {totalSelected} {totalSelected === 1 ? "palabra" : "palabras"}
            {totalSelected > 0 && totalSelected < 5 ? " - Selecciona algunas más para obtener mejores resultados" : ""}
            {totalSelected >= RECOMMENDED_TOTAL_SELECTIONS ? " - ¡Excelente selección!" : ""}
          </p>
        </div>
      </div>
    </AssessmentLayout>
  );
};
