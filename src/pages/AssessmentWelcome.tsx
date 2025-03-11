
import { Button } from "@/components/ui/button";
import { Clock, Brain, ThumbsUp, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { InstructionPanel } from "@/components/atoms/InstructionPanel";
import { AssessmentLayout } from "@/components/organisms/AssessmentLayout";

const AssessmentWelcome = () => {
  return (
    <AssessmentLayout
      title="Bienvenido a su Evaluación Conductual PDA"
      subtitle="Esta evaluación le ayudará a descubrir su perfil conductual basado en cinco dimensiones clave"
      currentStep={1}
      totalSteps={10}
      showNavigation={false}
    >
      <div className="space-y-8">
        <div className="text-lg text-gray-700">
          <p>
            Está a punto de iniciar un proceso de evaluación conductual que le permitirá
            conocer mejor su estilo de comportamiento natural y adaptado. El proceso
            es sencillo y requiere que seleccione los descriptores que mejor le representan.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 mt-8">
          <div className="flex items-start p-4 bg-gray-50 rounded-lg">
            <Clock className="h-6 w-6 text-primary mt-0.5" />
            <div className="ml-4">
              <h3 className="font-medium text-gray-900">Tiempo Estimado</h3>
              <p className="text-gray-600">15-20 minutos para completar la evaluación</p>
            </div>
          </div>
          
          <div className="flex items-start p-4 bg-gray-50 rounded-lg">
            <Brain className="h-6 w-6 text-primary mt-0.5" />
            <div className="ml-4">
              <h3 className="font-medium text-gray-900">Proceso Simple</h3>
              <p className="text-gray-600">Seleccione los descriptores que mejor le representan</p>
            </div>
          </div>
          
          <div className="flex items-start p-4 bg-gray-50 rounded-lg">
            <ThumbsUp className="h-6 w-6 text-primary mt-0.5" />
            <div className="ml-4">
              <h3 className="font-medium text-gray-900">Sin Respuestas Incorrectas</h3>
              <p className="text-gray-600">No hay respuestas correctas o incorrectas, solo sea honesto</p>
            </div>
          </div>
          
          <div className="flex items-start p-4 bg-gray-50 rounded-lg">
            <AlertTriangle className="h-6 w-6 text-amber-500 mt-0.5" />
            <div className="ml-4">
              <h3 className="font-medium text-gray-900">Evite Interrupciones</h3>
              <p className="text-gray-600">Complete la evaluación sin interrupciones para mejores resultados</p>
            </div>
          </div>
        </div>

        <InstructionPanel
          title="Instrucciones para mejores resultados"
          instructions={[
            "Responda con honestidad, no hay respuestas correctas o incorrectas.",
            "Elija los descriptores que mejor le representan, no los que desearía tener.",
            "No analice demasiado cada elección, su primera impresión suele ser la más precisa.",
            "La evaluación tiene dos partes: cómo se ve a sí mismo y cómo cree que otros le ven."
          ]}
          className="my-6"
        />

        <div className="flex justify-center mt-8">
          <Button 
            size="lg" 
            className="bg-primary text-white px-8 py-6 text-lg flex items-center gap-2"
            asChild
          >
            <Link to="/assessment">
              Comenzar Evaluación
            </Link>
          </Button>
        </div>
      </div>
    </AssessmentLayout>
  );
};

export default AssessmentWelcome;
