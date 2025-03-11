
import { PDACategoryChart } from "@/components/molecules/PDACategoryChart";
import { DerivedIndicators } from "@/components/molecules/DerivedIndicators";
import { ProfileInterpretation } from "@/components/molecules/ProfileInterpretation";

interface ResultsSummaryProps {
  naturalProfile: {
    risk: number;
    extroversion: number;
    patience: number;
    normativity: number;
    selfControl: number;
  };
  adaptedProfile: {
    risk: number;
    extroversion: number;
    patience: number;
    normativity: number;
    selfControl: number;
  };
  derivedIndicators: {
    energyLevel: number;
    energyBalance: number;
    decisionMaking: number; 
    changeRhythm: number;
  };
}

export const ResultsSummary = ({ 
  naturalProfile, 
  adaptedProfile, 
  derivedIndicators 
}: ResultsSummaryProps) => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-1 bg-white rounded-lg shadow-sm p-6">
          <PDACategoryChart 
            naturalProfile={naturalProfile}
            adaptedProfile={adaptedProfile}
          />
        </div>
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
          <ProfileInterpretation 
            naturalProfile={naturalProfile}
            adaptedProfile={adaptedProfile}
          />
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <DerivedIndicators indicators={derivedIndicators} />
      </div>
    </>
  );
};
