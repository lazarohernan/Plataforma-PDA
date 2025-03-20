import { useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { CompletionScreen } from "@/components/assessment/CompletionScreen";
import { TransitionScreen } from "@/components/assessment/TransitionScreen";
import { AssessmentScreen } from "@/components/assessment/AssessmentScreen";
import { useAssessment } from "@/hooks/useAssessment";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

const Assessment = () => {
  const navigate = useNavigate();
  const [showRestoreDialog, setShowRestoreDialog] = useState(false);
  
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
    resultadoEvaluacion,
    resultadoId,
    tieneProgresoGuardado,
    restaurarProgreso,
    guardandoResultados
  } = useAssessment();
  
  // Mostrar diálogo de restauración si hay progreso guardado
  useEffect(() => {
    if (tieneProgresoGuardado) {
      setShowRestoreDialog(true);
    }
  }, [tieneProgresoGuardado]);
  
  // Handle finishing the assessment
  const handleFinish = () => {
    if (!resultadoEvaluacion) {
      toast.error("Error al procesar los resultados. Por favor intente nuevamente.");
      return;
    }
    
    // Guardar resultados en sessionStorage para referencia futura
    sessionStorage.setItem('pda_resultados_actuales', JSON.stringify(resultadoEvaluacion));
    
    // Guardar el nombre del usuario en sessionStorage para mostrarlo en la pantalla final
    const codigoAcceso = sessionStorage.getItem('codigo_acceso');
    const usuarioValidacionId = sessionStorage.getItem('usuario_validacion_id');
    
    if (codigoAcceso && usuarioValidacionId) {
      // Intentar obtener el nombre del usuario
      try {
        const fetchUserName = async () => {
          try {
            const { data, error } = await supabase
              .from('usuarios_validacion')
              .select('nombre')
              .eq('id', usuarioValidacionId)
              .single();
            
            if (error) {
              console.error('Error al obtener nombre de usuario:', error);
              return;
            }
            
            if (data && data.nombre && data.nombre !== 'Pendiente') {
              sessionStorage.setItem('usuario_nombre', data.nombre);
            }
          } catch (error) {
            console.error('Error al obtener nombre de usuario:', error);
          }
        };
        
        fetchUserName();
      } catch (error) {
        console.error('Error general:', error);
      }
    }
    
    // No redirigimos a ninguna página, simplemente mostramos la pantalla de finalización
    toast.success("Evaluación completada con éxito.");
  };
  
  // Manejar restauración de progreso
  const handleRestoreProgress = () => {
    restaurarProgreso();
    setShowRestoreDialog(false);
  };
  
  // Manejar inicio de nueva evaluación
  const handleStartNew = () => {
    setShowRestoreDialog(false);
  };
  
  // Mostrar indicador de carga mientras se guardan los resultados
  if (guardandoResultados) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
        <h2 className="text-xl font-semibold mb-2">Guardando resultados...</h2>
        <p className="text-gray-500">Por favor espera mientras procesamos tu evaluación.</p>
      </div>
    );
  }
  
  if (isCompleted) {
    return (
      <CompletionScreen
        totalNaturalSelected={totalNaturalSelected}
        totalAdaptedSelected={totalAdaptedSelected}
        totalSteps={totalSteps}
        sections={sections}
        onFinish={handleFinish}
        resultadoId={resultadoId || "temp-id"} // Usar un ID temporal si no hay uno real
        showFeedback={true} // Siempre mostrar el formulario de feedback
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
    <>
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
      
      {/* Diálogo para restaurar progreso */}
      <Dialog open={showRestoreDialog} onOpenChange={setShowRestoreDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Progreso guardado encontrado</DialogTitle>
            <DialogDescription>
              Hemos detectado que tienes una evaluación en progreso. ¿Deseas continuar donde lo dejaste o comenzar una nueva evaluación?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={handleStartNew}>
              Comenzar nueva evaluación
            </Button>
            <Button onClick={handleRestoreProgress}>
              Continuar evaluación anterior
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Assessment;
