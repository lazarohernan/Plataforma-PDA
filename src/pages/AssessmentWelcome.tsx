
import { Button } from "@/components/ui/button";
import { Clock, Brain, ThumbsUp, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { InstructionPanel } from "@/components/atoms/InstructionPanel";
import { AssessmentLayout } from "@/components/organisms/AssessmentLayout";

const AssessmentWelcome = () => {
  return (
    <AssessmentLayout
      title="¡Bienvenido a tu Cuestionario Personal!"
      subtitle="Descubre más sobre ti y tus fortalezas"
      currentStep={1}
      totalSteps={8} // Actualizado para reflejar el nuevo número total de pasos
      showNavigation={false}
    >
      <div className="space-y-8">
        <div className="text-lg text-gray-700 text-center max-w-2xl mx-auto">
          <p>
            Estás a punto de iniciar un breve cuestionario que te ayudará a conocerte mejor.
            Solo necesitas seleccionar las palabras que sientes que te describen mejor.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 max-w-3xl mx-auto">
          <div className="flex items-start p-5 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <Clock className="h-6 w-6 text-primary mt-0.5" />
            <div className="ml-4">
              <h3 className="font-medium text-gray-900">Rápido y Sencillo</h3>
              <p className="text-gray-600">Solo tomará unos 5-10 minutos de tu tiempo</p>
            </div>
          </div>
          
          <div className="flex items-start p-5 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <Brain className="h-6 w-6 text-primary mt-0.5" />
            <div className="ml-4">
              <h3 className="font-medium text-gray-900">Conoce tus Fortalezas</h3>
              <p className="text-gray-600">Descubre aspectos interesantes sobre tu personalidad</p>
            </div>
          </div>
          
          <div className="flex items-start p-5 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <ThumbsUp className="h-6 w-6 text-primary mt-0.5" />
            <div className="ml-4">
              <h3 className="font-medium text-gray-900">Sin Respuestas Incorrectas</h3>
              <p className="text-gray-600">Solo tus preferencias personales, no hay respuestas buenas o malas</p>
            </div>
          </div>
          
          <div className="flex items-start p-5 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <Heart className="h-6 w-6 text-rose-500 mt-0.5" />
            <div className="ml-4">
              <h3 className="font-medium text-gray-900">Responde con Sinceridad</h3>
              <p className="text-gray-600">Cuanto más sincero seas, mejores serán los resultados</p>
            </div>
          </div>
        </div>

        <InstructionPanel
          title="¿Cómo funciona?"
          instructions={[
            "Primero te preguntaremos cómo te ves a ti mismo.",
            "Después, cómo crees que te ven los demás.",
            "Selecciona todas las palabras que consideres apropiadas.",
            "Al final, recibirás un perfil personalizado con tus resultados."
          ]}
          className="my-6 max-w-2xl mx-auto"
        />

        <div className="flex justify-center mt-10">
          <Button 
            size="lg" 
            className="bg-primary text-white px-10 py-7 text-xl flex items-center gap-2 rounded-xl shadow-lg hover:shadow-xl transition-all"
            asChild
          >
            <Link to="/assessment">
              ¡Comenzar ahora!
            </Link>
          </Button>
        </div>
      </div>
    </AssessmentLayout>
  );
};

export default AssessmentWelcome;
