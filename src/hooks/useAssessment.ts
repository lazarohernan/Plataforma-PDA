import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { 
  naturalProfileDescriptors, 
  adaptedProfileDescriptors, 
  ProfileType,
  Descriptor
} from "@/data/assessmentDescriptors";

export const useAssessment = () => {
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
      // Otherwise add it
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
  
  // Check if can go back
  const canGoBack = profileType === "natural" 
    ? currentGroupIndex > 0 
    : true; // Can always go back in adapted profile
  
  // Count total selections for each profile
  const totalNaturalSelected = naturalSelections.length;
  const totalAdaptedSelected = adaptedSelections.length;
  
  // Get current descriptors
  const getCurrentDescriptors = (): Descriptor[] => {
    return descriptorSets[currentGroupIndex];
  };
  
  return {
    profileType,
    currentGroupIndex,
    naturalSelections,
    adaptedSelections,
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
  };
};
