
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Users, Bot, Star } from "lucide-react";
import { ResultsCompatibilitySkeleton } from "./ResultsSkeletons";
import { ProfileData } from "@/components/molecules/PDACategoryChart";

interface ResultsCompatibilityProps {
  naturalProfile: ProfileData;
  adaptedProfile: ProfileData;
  isLoading?: boolean;
}

export const ResultsCompatibility = ({ 
  naturalProfile, 
  adaptedProfile, 
  isLoading = false 
}: ResultsCompatibilityProps) => {
  if (isLoading) {
    return <ResultsCompatibilitySkeleton />;
  }
  
  // Calcular compatibilidad de roles basado en el perfil real
  const calcularCompatibilidad = () => {
    // Calcular puntuaciones de compatibilidad basadas en el perfil real
    // Estos cálculos son simplificados y deberían ser reemplazados por algoritmos reales
    const liderazgoScore = Math.round((naturalProfile.risk * 0.4 + 
                                      naturalProfile.extroversion * 0.3 + 
                                      naturalProfile.selfControl * 0.3));
    
    const analistaScore = Math.round((naturalProfile.normativity * 0.5 + 
                                     naturalProfile.patience * 0.3 + 
                                     naturalProfile.selfControl * 0.2));
    
    const gestorScore = Math.round((naturalProfile.patience * 0.4 + 
                                   naturalProfile.normativity * 0.4 + 
                                   naturalProfile.extroversion * 0.2));
    
    return [
      { role: "Líder de Equipo", match: liderazgoScore, icon: <Users className="h-5 w-5 text-blue-600" /> },
      { role: "Analista Estratégico", match: analistaScore, icon: <Briefcase className="h-5 w-5 text-blue-600" /> },
      { role: "Gestor de Proyectos", match: gestorScore, icon: <Bot className="h-5 w-5 text-blue-600" /> }
    ].sort((a, b) => b.match - a.match); // Ordenar por compatibilidad descendente
  };
  
  const compatibleRoles = calcularCompatibilidad();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Compatibilidad con Roles</h2>
        <p className="text-gray-600 mb-6">
          A continuación se presentan los roles que mejor se alinean con tu perfil conductual, 
          basado en tus características principales y estilo de trabajo.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {compatibleRoles.map((item, index) => (
            <Card key={index} className="border border-gray-100 hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  {item.icon}
                  <CardTitle className="text-lg font-medium">{item.role}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < Math.round(item.match/20) 
                          ? 'text-yellow-500 fill-yellow-500' 
                          : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{item.match}% compatible</span>
                </div>
                <CardDescription className="mt-3">
                  Tu perfil presenta una alta afinidad con las competencias requeridas para este rol.
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-semibold mb-4">¿Cómo interpretar la compatibilidad?</h3>
        <p className="text-gray-600 mb-4">
          La compatibilidad se calcula analizando tus dimensiones PDA y comparándolas con los perfiles 
          conductuales ideales para cada rol. Una mayor compatibilidad indica que tus tendencias 
          naturales se alinean bien con las exigencias de ese rol específico.
        </p>
        <div className="p-4 bg-blue-50 rounded-md">
          <p className="text-sm text-blue-800">
            <strong>Nota:</strong> Esta evaluación es orientativa y complementa, pero no reemplaza, 
            otros factores como experiencia técnica, formación académica y habilidades específicas.
          </p>
        </div>
      </div>
    </div>
  );
};
