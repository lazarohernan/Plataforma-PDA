
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface NavigationButtonsProps {
  onNext: () => void;
  onPrevious: () => void;
  canProceed: boolean;
  canGoBack: boolean;
  nextLabel?: string;
  previousLabel?: string;
  className?: string;
}

export const NavigationButtons = ({
  onNext,
  onPrevious,
  canProceed = true,
  canGoBack = true,
  nextLabel = "Siguiente",
  previousLabel = "Anterior",
  className,
}: NavigationButtonsProps) => {
  return (
    <div className={`flex justify-between mt-6 ${className || ""}`}>
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={!canGoBack}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        {previousLabel}
      </Button>
      
      <Button
        onClick={onNext}
        disabled={!canProceed}
        className="flex items-center gap-2 bg-primary"
      >
        {nextLabel}
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
