
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
  className?: string;
}

export const GeneratePDF = ({ 
  naturalProfile, 
  adaptedProfile, 
  derivedIndicators,
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
          variant="outline" 
          className="flex items-center gap-2"
          disabled={loading || isGenerating}
        >
          <Download size={16} />
          {loading || isGenerating ? 'Generando PDF...' : 'Exportar PDF'}
        </Button>
      )}
    </PDFDownloadLink>
  );
};
