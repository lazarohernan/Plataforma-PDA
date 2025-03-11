import { useState, useEffect } from "react";
import { AssessmentLayout } from "@/components/organisms/AssessmentLayout";
import { DescriptorGroup, Descriptor } from "@/components/molecules/DescriptorGroup";
import { InstructionPanel } from "@/components/atoms/InstructionPanel";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

// Example descriptors - in a real app, these would come from an API
const naturalProfileDescriptors: Descriptor[][] = [
  [
    { id: "n1_1", label: "Persuasivo" },
    { id: "n1_2", label: "Decidido" },
    { id: "n1_3", label: "Prudente" },
    { id: "n1_4", label: "Sociable" },
    { id: "n1_5", label: "Tolerante" },
  ],
  [
    { id: "n2_1", label: "Analítico" },
    { id: "n2_2", label: "Entusiasta" },
    { id: "n2_3", label: "Persistente" },
    { id: "n2_4", label: "Paciente" },
    { id: "n2_5", label: "Exigente" },
  ],
  [
    { id: "n3_1", label: "Metódico" },
    { id: "n3_2", label: "Audaz" },
    { id: "n3_3", label: "Comunicativo" },
    { id: "n3_4", label: "Reflexivo" },
    { id: "n3_5", label: "Comedido" },
  ],
  // More groups would be added for a real assessment
];

const adaptedProfileDescriptors: Descriptor[][] = [
  [
    { id: "a1_1", label: "Influyente" },
    { id: "a1_2", label: "Orientado a resultados" },
    { id: "a1_3", label: "Conservador" },
    { id: "a1_4", label: "Expresivo" },
    { id: "a1_5", label: "Conciliador" },
  ],
  [
    { id: "a2_1", label: "Detallista" },
    { id: "a2_2", label: "Motivador" },
    { id: "a2_3", label: "Enfocado" },
    { id: "a2_4", label: "Calmado" },
    { id: "a2_5", label: "Directo" },
  ],
  [
    { id: "a3_1", label: "Estructurado" },
    { id: "a3_2", label: "Emprendedor" },
    { id: "a3_3", label: "Sociable" },
    { id: "a3_4", label: "Cauteloso" },
    { id: "a3_5", label: "Colaborativo" },
  ],
  // More groups would be added for a real assessment
];

// Max selections recommended per group
const MAX_SELECTIONS_PER_GROUP = 2;
// Total recommended selections overall
const RECOMMENDED_TOTAL_SELECTIONS = 12;

type ProfileType = "natural" | "adapted";

const Assessment = () => {
  const navigate = useNavigate();
  const [profileType, setProfileType] = useState<ProfileType>("natural");
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [naturalSelections, setNaturalSelections] = useState<string[]>([]);
  const [adaptedSelections, setAdaptedSelections] = useState<string[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  
  // Determine which descriptor set to use based on profile type
  const descriptorSets = profileType === "natural" 
    ? naturalProfileDescriptors 
    : adaptedProfileDescriptors;
  
  // Get current selections based on profile type
  const currentSelections = profileType === "natural" 
    ? naturalSelections 
    : adaptedSelections;
  
  // Set current selections based on profile type
  const setCurrentSelections = profileType === "natural"
    ? setNaturalSelections
    : setAdaptedSelections;
  
  // Calculate current step including transition
  const totalNaturalGroups = naturalProfileDescriptors.length;
  const totalAdaptedGroups = adaptedProfileDescriptors.length;
  const totalGroups = totalNaturalGroups + totalAdaptedGroups;
  
  // Calculate current step (including transition screen)
  const currentStep = isTransitioning 
    ? totalNaturalGroups + 1 
    : profileType === "natural" 
      ? currentGroupIndex + 1 
      : totalNaturalGroups + 1 + currentGroupIndex + 1;
  
  // Total steps including transition and completion screens
  const totalSteps = totalGroups + 3; // +1 for welcome, +1 for transition, +1 for completion
  
  // Define sections for progress bar
  const sections = [
    { name: "Perfil Natural", steps: totalNaturalGroups + 1 }, // +1 for welcome
    { name: "Perfil Adaptado", steps: totalAdaptedGroups + 1 }, // +1 for transition
    { name: "Finalización", steps: 1 }
  ];
  
  // Toggle descriptor selection
  const handleDescriptorToggle = (id: string) => {
    setCurrentSelections(prev => {
      // If already selected, remove it
      if (prev.includes(id)) {
        return prev.filter(selectedId => selectedId !== id);
      }
      // Otherwise add it if not at max
      return [...prev, id];
    });
  };
  
  // Handle next button
  const handleNext = () => {
    // Check if the current group has at least one selection
    const currentGroupDescriptors = descriptorSets[currentGroupIndex];
    const hasSelectionInCurrentGroup = currentGroupDescriptors.some(
      d => currentSelections.includes(d.id)
    );
    
    if (!hasSelectionInCurrentGroup) {
      toast({
        title: "Selección requerida",
        description: "Por favor seleccione al menos un descriptor antes de continuar.",
        variant: "destructive"
      });
      return;
    }
    
    // If at the last group of natural profile
    if (profileType === "natural" && currentGroupIndex === naturalProfileDescriptors.length - 1) {
      setIsTransitioning(true);
      return;
    }
    
    // If at the last group of adapted profile
    if (profileType === "adapted" && currentGroupIndex === adaptedProfileDescriptors.length - 1) {
      setIsCompleted(true);
      return;
    }
    
    // Otherwise, go to next group
    setCurrentGroupIndex(prev => prev + 1);
  };
  
  // Handle previous button
  const handlePrevious = () => {
    // If on transition screen, go back to last natural group
    if (isTransitioning) {
      setIsTransitioning(false);
      return;
    }
    
    // If on first group of adapted profile, go back to transition
    if (profileType === "adapted" && currentGroupIndex === 0) {
      setIsTransitioning(true);
      setProfileType("natural");
      return;
    }
    
    // Otherwise, go to previous group
    if (currentGroupIndex > 0) {
      setCurrentGroupIndex(prev => prev - 1);
    }
  };
  
  // Handle continue from transition screen
  const handleContinueToAdapted = () => {
    setIsTransitioning(false);
    setProfileType("adapted");
    setCurrentGroupIndex(0);
  };
  
  // Check if can proceed
  const canProceed = true; // We'll allow proceeding even with no selections
  
  // Check if can go back
  const canGoBack = profileType === "natural" 
    ? currentGroupIndex > 0 
    : true; // Can always go back in adapted profile
  
  // Count total selections for each profile
  const totalNaturalSelected = naturalSelections.length;
  const totalAdaptedSelected = adaptedSelections.length;
  
  // Handle completion
  const handleFinish = () => {
    // In a real app, you would send data to server here
    toast({
      title: "Evaluación Completada",
      description: "Sus resultados están siendo procesados.",
    });
    
    // For demo purposes, navigate back to home
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };
  
  if (isCompleted) {
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
            onClick={handleFinish}
            size="lg" 
            className="mt-6 bg-primary text-white"
          >
            Finalizar
          </Button>
        </div>
      </AssessmentLayout>
    );
  }
  
  if (isTransitioning) {
    return (
      <AssessmentLayout
        title="Transición a Perfil Adaptado"
        subtitle="Ha completado la primera parte de la evaluación"
        currentStep={totalNaturalGroups + 2} // +1 for welcome, +1 for this transition
        totalSteps={totalSteps}
        sections={sections}
        onNext={handleContinueToAdapted}
        onPrevious={handlePrevious}
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
  }
  
  // Main assessment screen
  return (
    <AssessmentLayout
      title={profileType === "natural" ? "Perfil Natural" : "Perfil Adaptado"}
      subtitle={profileType === "natural" 
        ? "Seleccione los descriptores que mejor le describen a USTED" 
        : "Seleccione los descriptores que cree que OTROS utilizarían para describirle"}
      currentStep={currentStep}
      totalSteps={totalSteps}
      sections={sections}
      onNext={handleNext}
      onPrevious={handlePrevious}
      canProceed={canProceed}
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
          descriptors={descriptorSets[currentGroupIndex]}
          selectedDescriptors={currentSelections}
          onDescriptorToggle={handleDescriptorToggle}
          maxSelections={MAX_SELECTIONS_PER_GROUP}
        />
        
        <div className="mt-6 text-sm text-gray-500">
          <p>
            Total seleccionado: {currentSelections.length} de {RECOMMENDED_TOTAL_SELECTIONS} recomendados
          </p>
        </div>
      </div>
    </AssessmentLayout>
  );
};

export default Assessment;
