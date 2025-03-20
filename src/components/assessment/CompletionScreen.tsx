
import { useState, useEffect } from "react";
import { PartyPopper, CheckCircle, ThumbsUp } from "lucide-react";
import { AssessmentLayout } from "@/components/organisms/AssessmentLayout";
import FeedbackForm from "./FeedbackForm";

interface CompletionScreenProps {
  totalNaturalSelected: number;
  totalAdaptedSelected: number;
  totalSteps: number;
  sections: { name: string; steps: number }[];
  onFinish: () => void;
  resultadoId: string;
  showFeedback?: boolean;
}

export const CompletionScreen = ({
  totalNaturalSelected,
  totalAdaptedSelected,
  totalSteps,
  sections,
  onFinish,
  resultadoId,
  showFeedback = true,
}: CompletionScreenProps) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(showFeedback);
  const [userName, setUserName] = useState<string>("Participante");
  const [animationStep, setAnimationStep] = useState(0);
  
  // Obtener el nombre del usuario desde sessionStorage
  useEffect(() => {
    const storedUserName = sessionStorage.getItem('usuario_nombre');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);
  
  // Efecto para la animación
  useEffect(() => {
    if (!showFeedbackForm) {
      const timer = setTimeout(() => {
        if (animationStep < 3) {
          setAnimationStep(prev => prev + 1);
        }
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [animationStep, showFeedbackForm]);
  
  const handleFeedbackComplete = () => {
    setShowFeedbackForm(false);
  };
  
  const handleFeedbackSkip = () => {
    setShowFeedbackForm(false);
  };
  
  // Si estamos mostrando el formulario de feedback
  if (showFeedbackForm) {
    return (
      <AssessmentLayout
        title="Tu opinión es valiosa"
        subtitle="Ayúdanos a mejorar la evaluación"
        currentStep={totalSteps}
        totalSteps={totalSteps}
        sections={sections}
        showNavigation={false}
      >
        <div className="py-8">
          <FeedbackForm 
            resultadoId={resultadoId}
            onComplete={handleFeedbackComplete}
            onSkip={handleFeedbackSkip}
          />
        </div>
      </AssessmentLayout>
    );
  }
  
  // Pantalla de finalización con animación
  return (
    <AssessmentLayout
      title="¡Muchas gracias por tu participación!"
      subtitle={`Gracias ${userName} por completar la evaluación`}
      currentStep={totalSteps}
      totalSteps={totalSteps}
      sections={sections}
      showNavigation={false}
    >
      <div className="text-center py-8">
        <div className="relative inline-block mb-8">
          {/* Animación de iconos */}
          <div className={`transition-all duration-500 ${animationStep >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
            <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full">
              <PartyPopper className="h-12 w-12 text-green-600" />
            </div>
          </div>
          
          {/* Iconos adicionales que aparecen con la animación */}
          <div className={`absolute -top-2 -right-2 transition-all duration-500 ${animationStep >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
              <CheckCircle className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          
          <div className={`absolute -bottom-2 -right-2 transition-all duration-500 ${animationStep >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full">
              <ThumbsUp className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-4 animate-bounce">¡Lo has hecho genial!</h2>
        
        <p className="text-gray-600 max-w-md mx-auto mb-8">
          Gracias por compartir tus respuestas. Tu participación es muy valiosa para nuestro estudio.
        </p>
        
        <div className="space-y-3 mb-8">
          <div className="flex justify-between max-w-md mx-auto p-4 bg-gray-50 rounded-lg shadow-sm">
            <span className="text-gray-700">Cómo me veo a mí mismo</span>
            <span className="font-semibold text-primary">{totalNaturalSelected} palabras</span>
          </div>
          <div className="flex justify-between max-w-md mx-auto p-4 bg-gray-50 rounded-lg shadow-sm">
            <span className="text-gray-700">Cómo me ven los demás</span>
            <span className="font-semibold text-primary">{totalAdaptedSelected} palabras</span>
          </div>
          <div className="flex justify-between max-w-md mx-auto p-4 bg-green-50 rounded-lg shadow-sm border border-green-100">
            <span className="text-green-800">Total de palabras</span>
            <span className="font-semibold text-green-800">{totalNaturalSelected + totalAdaptedSelected}</span>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-blue-50 rounded-lg max-w-md mx-auto">
          <p className="text-blue-800 font-medium">
            ¡Evaluación completada con éxito!
          </p>
          <p className="text-blue-600 text-sm mt-2">
            Ya puedes cerrar esta ventana. ¡Gracias por tu tiempo!
          </p>
        </div>
      </div>
    </AssessmentLayout>
  );
};
