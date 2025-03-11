
import React, { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { ResultsPDF } from './ResultsPDF';
import { ProfileData, DerivedIndicatorsData } from '@/models/results';
import { toast } from 'sonner';

interface GeneratePDFProps {
  naturalProfile: ProfileData;
  adaptedProfile: ProfileData;
  derivedIndicators: DerivedIndicatorsData;
  selectedSections?: {
    naturalProfile: boolean;
    adaptedProfile: boolean;
    derivedIndicators: boolean;
    recommendations: boolean;
    compatibility: boolean;
  };
  className?: string;
}

export const GeneratePDF = ({ 
  naturalProfile, 
  adaptedProfile, 
  derivedIndicators,
  selectedSections = {
    naturalProfile: true,
    adaptedProfile: true,
    derivedIndicators: true,
    recommendations: true,
    compatibility: false
  },
  className 
}: GeneratePDFProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  // Helper function to generate a better file name
  const getFileName = () => {
    const date = new Date().toISOString().slice(0, 10);
    return `Informe-PDA-${date}.pdf`;
  };

  return (
    <PDFDownloadLink
      document={
        <ResultsPDF 
          naturalProfile={naturalProfile} 
          adaptedProfile={adaptedProfile} 
          derivedIndicators={derivedIndicators}
          selectedSections={selectedSections}
        />
      }
      fileName={getFileName()}
      className={className}
      onClick={() => {
        setIsGenerating(true);
        toast.success("El informe se descargará en unos segundos");
      }}
    >
      {({ loading }) => (
        <Button 
          variant="default" 
          className="flex items-center gap-2 w-full"
          disabled={loading || isGenerating}
        >
          <Download size={16} />
          {loading || isGenerating ? 'Generando PDF...' : 'Exportar informe PDF personalizado'}
        </Button>
      )}
    </PDFDownloadLink>
  );
};
