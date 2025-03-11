
import { useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { CompletionScreen } from "@/components/assessment/CompletionScreen";
import { TransitionScreen } from "@/components/assessment/TransitionScreen";
import { AssessmentScreen } from "@/components/assessment/AssessmentScreen";
import { useAssessment } from "@/hooks/useAssessment";

const Assessment = () => {
  const navigate = useNavigate();
  const {
    profileType,
    isTransitioning,
    isCompleted,
    currentSelections,
    currentStep,
    totalSteps,
    sections,
    handleDescriptorToggle,
    handleNext,
    handlePrevious,
    handleContinueToAdapted,
    canGoBack,
    totalNaturalSelected,
    totalAdaptedSelected,
    getCurrentDescriptors,
  } = useAssessment();
  
  // Handle finishing the assessment
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
      <CompletionScreen
        totalNaturalSelected={totalNaturalSelected}
        totalAdaptedSelected={totalAdaptedSelected}
        totalSteps={totalSteps}
        sections={sections}
        onFinish={handleFinish}
      />
    );
  }
  
  if (isTransitioning) {
    return (
      <TransitionScreen
        totalNaturalSelected={totalNaturalSelected}
        currentStep={currentStep}
        totalSteps={totalSteps}
        sections={sections}
        onContinue={handleContinueToAdapted}
        onPrevious={handlePrevious}
      />
    );
  }
  
  // Main assessment screen
  return (
    <AssessmentScreen
      profileType={profileType}
      currentDescriptors={getCurrentDescriptors()}
      selectedDescriptors={currentSelections}
      onDescriptorToggle={handleDescriptorToggle}
      currentStep={currentStep}
      totalSteps={totalSteps}
      sections={sections}
      onNext={handleNext}
      onPrevious={handlePrevious}
      canGoBack={canGoBack}
      totalSelected={currentSelections.length}
    />
  );
};

export default Assessment;
