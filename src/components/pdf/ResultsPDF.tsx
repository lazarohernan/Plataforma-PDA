
import React from 'react';
import { Document, Page } from '@react-pdf/renderer';
import { ProfileData, DerivedIndicatorsData } from '@/models/results';
import { PDFCoverPage } from './pdf-components/PDFCoverPage';
import { PDFNaturalProfilePage } from './pdf-components/PDFNaturalProfilePage';
import { PDFAdaptedProfilePage } from './pdf-components/PDFAdaptedProfilePage';
import { PDFDerivedIndicatorsPage } from './pdf-components/PDFDerivedIndicatorsPage';
import { PDFRecommendationsPage } from './pdf-components/PDFRecommendationsPage';
import { PDFCompatibilityPage } from './pdf-components/PDFCompatibilityPage';

interface ResultsPDFProps {
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
}

export const ResultsPDF = ({ 
  naturalProfile, 
  adaptedProfile, 
  derivedIndicators,
  selectedSections = {
    naturalProfile: true,
    adaptedProfile: true,
    derivedIndicators: true,
    recommendations: true,
    compatibility: false
  }
}: ResultsPDFProps) => {
  const currentDate = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Document>
      {/* Cover Page - Always present */}
      <PDFCoverPage currentDate={currentDate} />

      {/* Natural Profile Page */}
      {selectedSections.naturalProfile && (
        <PDFNaturalProfilePage 
          naturalProfile={naturalProfile} 
        />
      )}

      {/* Adapted Profile Page */}
      {selectedSections.adaptedProfile && (
        <PDFAdaptedProfilePage 
          naturalProfile={naturalProfile}
          adaptedProfile={adaptedProfile} 
        />
      )}

      {/* Derived Indicators Page */}
      {selectedSections.derivedIndicators && (
        <PDFDerivedIndicatorsPage 
          derivedIndicators={derivedIndicators} 
        />
      )}
      
      {/* Recommendations Page */}
      {selectedSections.recommendations && (
        <PDFRecommendationsPage 
          naturalProfile={naturalProfile}
        />
      )}
      
      {/* Compatibility Page */}
      {selectedSections.compatibility && (
        <PDFCompatibilityPage />
      )}
    </Document>
  );
};
