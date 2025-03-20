
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Info, Gauge, Scale, Brain, FastForward } from "lucide-react";

interface DerivedIndicatorsProps {
  indicators: {
    energyLevel: number;
    energyBalance: number;
    decisionMaking: number;
    changeRhythm: number;
  };
}

export const DerivedIndicators = ({ indicators }: DerivedIndicatorsProps) => {
  // Helper function to convert a 0-100 value to a percentage for CSS
  const percentageValue = (value: number) => `${value}%`;
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Indicadores Derivados</h2>
        <p className="text-sm text-gray-500 mt-2 md:mt-0">
          Estos indicadores son calculados a partir de las dimensiones principales de tu perfil
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Energy Level */}
        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Gauge className="h-5 w-5 text-blue-600" />
                Nivel de Energía
              </CardTitle>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-gray-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-[300px] p-4 bg-white shadow-lg rounded-md border border-gray-200">
                  <h4 className="font-semibold text-blue-600 mb-1">Nivel de Energía</h4>
                  <p className="text-gray-700">Indica tu disposición y capacidad para manejar distintas actividades simultáneamente. Un nivel alto sugiere dinamismo y capacidad para gestionar múltiples tareas, mientras que un nivel bajo indica preferencia por enfocarse en pocas actividades con mayor profundidad.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <CardDescription>
              {indicators.energyLevel < 40 ? 'Bajo' : indicators.energyLevel < 70 ? 'Medio' : 'Alto'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Horizontal meter - Improved version */}
            <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden relative">
              {/* Fondo con gradiente */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600 opacity-20 rounded-full" />
              
              {/* Marcas de referencia */}
              <div className="absolute inset-0 flex justify-between items-center px-2">
                <div className="h-2 w-0.5 bg-gray-300"></div>
                <div className="h-2 w-0.5 bg-gray-300"></div>
                <div className="h-2 w-0.5 bg-gray-300"></div>
                <div className="h-2 w-0.5 bg-gray-300"></div>
                <div className="h-2 w-0.5 bg-gray-300"></div>
              </div>
              
              {/* Barra de progreso con gradiente */}
              <div 
                className="h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                style={{ 
                  width: percentageValue(indicators.energyLevel),
                  background: `linear-gradient(90deg, 
                    ${indicators.energyLevel < 30 ? '#60A5FA' : '#3B82F6'} 0%, 
                    ${indicators.energyLevel < 60 ? '#2563EB' : '#1D4ED8'} 50%, 
                    ${indicators.energyLevel < 80 ? '#1E40AF' : '#1E3A8A'} 100%)`
                }}
              >
                {/* Efecto de brillo */}
                <div className="absolute top-0 h-1/2 w-full bg-white opacity-20"></div>
              </div>
              
              {/* Valor numérico */}
              <div className="absolute top-0 right-2 text-xs font-medium mt-0.5 text-gray-600">
                {indicators.energyLevel}/100
              </div>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs">Bajo</span>
              <span className="text-xs">Alto</span>
            </div>
          </CardContent>
        </Card>
        
        {/* Energy Balance */}
        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Scale className="h-5 w-5 text-blue-600" />
                Equilibrio de Energía
              </CardTitle>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-gray-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-[300px] p-4 bg-white shadow-lg rounded-md border border-gray-200">
                  <h4 className="font-semibold text-blue-600 mb-1">Equilibrio de Energía</h4>
                  <p className="text-gray-700">Refleja la distribución de tu energía entre diferentes áreas de tu vida. Un valor alto indica una distribución equilibrada entre trabajo, relaciones personales y desarrollo individual. Un valor bajo sugiere concentración de energía en áreas específicas, lo que puede generar desequilibrios.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <CardDescription>
              {indicators.energyBalance < 40 ? 'Desbalanceado' : indicators.energyBalance < 70 ? 'Moderado' : 'Balanceado'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Balance visualization - Enhanced version */}
            <div className="relative h-12 w-full bg-gray-100 rounded-lg shadow-inner">
              {/* Gradiente de fondo mejorado */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 opacity-25 rounded-lg"></div>
              
              {/* Línea central */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 transform -translate-y-1/2"></div>
              
              {/* Marcadores de balance */}
              <div className="absolute top-0 bottom-0 left-1/4 w-0.5 bg-gray-300"></div>
              <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gray-300"></div>
              <div className="absolute top-0 bottom-0 left-3/4 w-0.5 bg-gray-300"></div>
              
              {/* Indicador principal */}
              <div 
                className="absolute top-1/2 transform -translate-y-1/2 transition-all duration-1000"
                style={{ left: percentageValue(indicators.energyBalance) }}
              >
                <div className="h-6 w-6 rounded-full border-2 border-white bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-white"></div>
                </div>
              </div>
              
              {/* Etiqueta dinámica */}
              <div 
                className={`absolute bottom-0 transform -translate-x-1/2 text-xs font-medium px-2 py-0.5 rounded-t-md transition-all duration-500 ${
                  indicators.energyBalance < 40 ? 'bg-red-500 text-white' : 
                  indicators.energyBalance < 70 ? 'bg-yellow-400 text-gray-800' : 
                  'bg-green-500 text-white'
                }`}
                style={{ left: percentageValue(indicators.energyBalance) }}
              >
                {indicators.energyBalance < 40 ? 'Desbalanceado' : 
                 indicators.energyBalance < 70 ? 'Moderado' : 
                 'Balanceado'}
              </div>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs text-red-500">Desbalanceado</span>
              <span className="text-xs text-green-500">Balanceado</span>
            </div>
          </CardContent>
        </Card>
        
        {/* Decision Making */}
        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Brain className="h-5 w-5 text-blue-600" />
                Toma de Decisiones
              </CardTitle>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-gray-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-[300px] p-4 bg-white shadow-lg rounded-md border border-gray-200">
                  <h4 className="font-semibold text-blue-600 mb-1">Toma de Decisiones</h4>
                  <p className="text-gray-700">Revela tu estilo predominante al enfrentar decisiones. Un valor alto indica un enfoque más racional y analítico, basado en datos y lógica. Un valor bajo sugiere un estilo más intuitivo y emocional, donde las sensaciones y percepciones juegan un papel importante en tus decisiones.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <CardDescription>
              {indicators.decisionMaking < 40 ? 'Emocional' : indicators.decisionMaking < 60 ? 'Equilibrado' : 'Racional'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Spectrum visualization */}
            <div className="relative h-3 w-full bg-gradient-to-r from-pink-500 to-blue-500 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 bottom-0 w-3 h-3 bg-white border-2 border-gray-700 rounded-full transform -translate-x-1/2 transition-all duration-1000"
                style={{ left: percentageValue(indicators.decisionMaking) }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs">Emocional</span>
              <span className="text-xs">Racional</span>
            </div>
          </CardContent>
        </Card>
        
        {/* Change Rhythm */}
        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <FastForward className="h-5 w-5 text-blue-600" />
                Ritmo de Cambio
              </CardTitle>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-gray-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-[300px] p-4 bg-white shadow-lg rounded-md border border-gray-200">
                  <h4 className="font-semibold text-blue-600 mb-1">Ritmo de Cambio</h4>
                  <p className="text-gray-700">Mide tu velocidad y disposición para adaptarte a nuevos entornos y situaciones. Un valor alto indica una persona dinámica que se adapta rápidamente a los cambios y busca nuevas experiencias. Un valor bajo sugiere una preferencia por la estabilidad, rutinas establecidas y un enfoque más cauteloso ante los cambios.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <CardDescription>
              {indicators.changeRhythm < 40 ? 'Conservador' : indicators.changeRhythm < 70 ? 'Moderado' : 'Dinámico'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Speedometer-like visualization */}
            <div className="relative h-14 overflow-hidden">
              <div className="absolute bottom-0 left-0 right-0 h-28 w-28 mx-auto bg-gradient-to-t from-gray-100 to-transparent rounded-full"></div>
              <div 
                className="absolute bottom-0 h-1 bg-blue-600 left-1/2 origin-bottom transition-all duration-1000"
                style={{ 
                  width: '2px', 
                  height: '50%',
                  transform: `translateX(-50%) rotate(${(indicators.changeRhythm / 100 * 180) - 90}deg)`
                }}
              >
                <div className="absolute top-0 h-2 w-2 bg-blue-600 rounded-full transform -translate-x-1/2"></div>
              </div>
              <div className="absolute bottom-0 w-full flex justify-between px-2">
                <span className="text-xs">Lento</span>
                <span className="text-xs">Rápido</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
