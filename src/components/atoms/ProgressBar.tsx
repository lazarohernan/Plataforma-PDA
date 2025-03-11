
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  sections?: { name: string; steps: number }[];
  className?: string;
}

export const ProgressBar = ({
  currentStep,
  totalSteps,
  sections,
  className,
}: ProgressBarProps) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className={cn("w-full space-y-1", className)}>
      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {sections && (
        <div className="flex justify-between text-xs text-gray-400">
          {sections.map((section, index) => {
            // Calculate section position
            const prevSectionsSteps = sections
              .slice(0, index)
              .reduce((sum, s) => sum + s.steps, 0);
            const sectionPosition = (prevSectionsSteps / totalSteps) * 100;
            
            return (
              <div 
                key={section.name}
                className="relative"
                style={{ 
                  left: `${index === 0 ? 0 : index === sections.length - 1 ? 'auto' : sectionPosition}%`,
                  right: index === sections.length - 1 ? 0 : 'auto'
                }}
              >
                <span>{section.name}</span>
              </div>
            );
          })}
        </div>
      )}
      
      <div className="flex justify-between text-xs text-gray-500">
        <span>
          Paso {currentStep} de {totalSteps}
        </span>
        <span>{Math.round(progress)}% completado</span>
      </div>
    </div>
  );
};
