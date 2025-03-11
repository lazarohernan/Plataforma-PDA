
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
                <TooltipContent className="max-w-[250px]">
                  <p>El nivel de energía indica tu disposición y capacidad para manejar distintas actividades.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <CardDescription>
              {indicators.energyLevel < 40 ? 'Bajo' : indicators.energyLevel < 70 ? 'Medio' : 'Alto'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Horizontal meter */}
            <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 rounded-full transition-all duration-1000 ease-out"
                style={{ width: percentageValue(indicators.energyLevel) }}
              />
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
                <TooltipContent className="max-w-[250px]">
                  <p>Muestra qué tan balanceada está tu energía entre diferentes ámbitos de acción.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <CardDescription>
              {indicators.energyBalance < 40 ? 'Desbalanceado' : indicators.energyBalance < 70 ? 'Moderado' : 'Balanceado'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Balance visualization */}
            <div className="relative h-8 w-full bg-gray-100 rounded">
              <div 
                className="absolute top-0 bottom-0 left-1/2 w-1 bg-gray-300 transform -translate-x-1/2"
              />
              <div 
                className="absolute top-0 bottom-0 bg-blue-500 opacity-50 rounded transition-all duration-1000"
                style={{ 
                  left: indicators.energyBalance < 50 ? percentageValue(indicators.energyBalance) : '50%',
                  width: indicators.energyBalance < 50 
                    ? percentageValue(50 - indicators.energyBalance) 
                    : percentageValue(indicators.energyBalance - 50)
                }}
              />
              <div 
                className="absolute top-1/2 h-4 w-4 bg-blue-600 rounded-full transform -translate-y-1/2 transition-all duration-1000 z-10"
                style={{ 
                  left: percentageValue(indicators.energyBalance) 
                }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs">Desbalanceado</span>
              <span className="text-xs">Balanceado</span>
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
                <TooltipContent className="max-w-[250px]">
                  <p>Indica tu estilo predominante al momento de tomar decisiones.</p>
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
                <TooltipContent className="max-w-[250px]">
                  <p>Refleja tu velocidad y disposición para adaptarte a nuevos entornos y situaciones.</p>
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
