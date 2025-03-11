
import { ReactNode } from "react";
import { Header } from "@/components/organisms/Header";
import { Card } from "@/components/ui/card";
import { NavigationButtons } from "@/components/molecules/NavigationButtons";
import { ProgressBar } from "@/components/atoms/ProgressBar";

interface AssessmentLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  currentStep: number;
  totalSteps: number;
  sections?: { name: string; steps: number }[];
  onNext?: () => void;
  onPrevious?: () => void;
  canProceed?: boolean;
  canGoBack?: boolean;
  showNavigation?: boolean;
  nextLabel?: string;
  previousLabel?: string;
}

export const AssessmentLayout = ({
  children,
  title,
  subtitle,
  currentStep,
  totalSteps,
  sections,
  onNext,
  onPrevious,
  canProceed = true,
  canGoBack = true,
  showNavigation = true,
  nextLabel,
  previousLabel,
}: AssessmentLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-soft">
      <Header minimal />
      
      {/* Added proper spacing with pt-24 (padding-top) to account for the fixed header */}
      <div className="container mx-auto px-4 py-8 pt-24">
        <Card className="max-w-4xl mx-auto p-6 md:p-8 backdrop-blur-sm bg-white/90 shadow-sm border border-gray-100">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{title}</h1>
            {subtitle && <p className="mt-2 text-gray-600">{subtitle}</p>}
          </div>
          
          <div className="mb-6">
            <ProgressBar 
              currentStep={currentStep} 
              totalSteps={totalSteps} 
              sections={sections}
            />
          </div>
          
          <div className="my-8">{children}</div>
          
          {showNavigation && onNext && onPrevious && (
            <NavigationButtons
              onNext={onNext}
              onPrevious={onPrevious}
              canProceed={canProceed}
              canGoBack={canGoBack}
              nextLabel={nextLabel}
              previousLabel={previousLabel}
            />
          )}
        </Card>
      </div>
    </div>
  );
};
