
import { ResultsRecommendationsSkeleton } from "./ResultsSkeletons";
import { ProfileData } from "@/components/molecules/PDACategoryChart";

interface ResultsRecommendationsProps {
  naturalProfile: ProfileData;
  adaptedProfile: ProfileData;
  isLoading?: boolean;
}

export const ResultsRecommendations = ({ 
  naturalProfile, 
  adaptedProfile, 
  isLoading = false 
}: ResultsRecommendationsProps) => {
  if (isLoading) {
    return <ResultsRecommendationsSkeleton />;
  }
  
  // Generar recomendaciones basadas en el perfil real
  const generarRecomendaciones = () => {
    const recomendaciones = [];
    
    // Recomendaciones basadas en el perfil de riesgo
    if (naturalProfile.risk > 70) {
      recomendaciones.push("Tu alta disposición al riesgo es una fortaleza para roles de liderazgo. Considera desarrollar habilidades complementarias de análisis para balancear tus decisiones.");
    } else if (naturalProfile.risk < 40) {
      recomendaciones.push("Tu perfil cauteloso te permite tomar decisiones bien fundamentadas. Podrías beneficiarte de técnicas para aumentar tu confianza en situaciones que requieren decisiones rápidas.");
    }
    
    // Recomendaciones basadas en extroversión
    if (naturalProfile.extroversion > 70) {
      recomendaciones.push("Tu naturaleza extrovertida facilita la comunicación y el trabajo en equipo. Considera desarrollar habilidades de escucha activa para complementar tu estilo comunicativo.");
    } else if (naturalProfile.extroversion < 40) {
      recomendaciones.push("Tu estilo reflexivo te permite analizar situaciones con profundidad. Podrías beneficiarte de técnicas para comunicar tus ideas con mayor asertividad en entornos grupales.");
    }
    
    // Recomendaciones basadas en paciencia
    if (naturalProfile.patience > 70) {
      recomendaciones.push("Tu alta paciencia te permite mantener la calma en situaciones de presión. Considera desarrollar habilidades para gestionar proyectos con plazos ajustados.");
    } else if (naturalProfile.patience < 40) {
      recomendaciones.push("Tu dinamismo te permite adaptarte rápidamente a cambios. Podrías beneficiarte de técnicas de mindfulness para momentos que requieren atención sostenida.");
    }
    
    // Si no hay recomendaciones específicas, agregar una genérica
    if (recomendaciones.length === 0) {
      recomendaciones.push("Tu perfil muestra un buen equilibrio entre las diferentes dimensiones. Considera desarrollar habilidades específicas relacionadas con tus objetivos profesionales.");
    }
    
    return recomendaciones;
  };
  
  const recomendaciones = generarRecomendaciones();
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-semibold mb-4">Recomendaciones</h2>
      <p className="text-gray-600 mb-4">
        Basado en tu perfil, estas son nuestras recomendaciones para potenciar tu desarrollo:
      </p>
      
      <ul className="space-y-3 mt-4">
        {recomendaciones.map((recomendacion, index) => (
          <li key={index} className="bg-gray-50 p-4 rounded-md">
            <p className="text-gray-700">{recomendacion}</p>
          </li>
        ))}
      </ul>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-md">
        <p className="text-sm text-blue-800">
          <strong>Nota:</strong> Estas recomendaciones son orientativas y se basan en tu perfil conductual. 
          Para un plan de desarrollo más personalizado, considera consultar con un profesional.
        </p>
      </div>
    </div>
  );
};
