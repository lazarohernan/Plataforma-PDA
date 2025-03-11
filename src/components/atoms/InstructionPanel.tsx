
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";

interface InstructionPanelProps {
  title: string;
  instructions: string | string[];
  className?: string;
}

export const InstructionPanel = ({
  title,
  instructions,
  className,
}: InstructionPanelProps) => {
  const instructionArray = Array.isArray(instructions) ? instructions : [instructions];

  return (
    <div className={cn("bg-blue-50/80 rounded-lg p-4 border border-blue-100", className)}>
      <div className="flex items-start">
        <div className="flex-shrink-0 mt-0.5">
          <Info className="h-5 w-5 text-primary" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-primary">{title}</h3>
          <div className="mt-2 text-sm text-gray-600">
            {instructionArray.map((instruction, index) => (
              <p key={index} className={index > 0 ? "mt-1" : ""}>
                {instruction}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
