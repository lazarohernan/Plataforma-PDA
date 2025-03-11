
import React from 'react';
import { Page, Text, View } from '@react-pdf/renderer';
import { styles } from './PDFStyles';
import { ProfileData } from '@/models/results';
import { 
  recommendations, 
  getWorkEnvironmentRecommendations, 
  getDevelopmentAreas 
} from './PDFUtils';
import { PDFPageFooter } from './PDFPageFooter';

interface PDFRecommendationsPageProps {
  naturalProfile: ProfileData;
}

export const PDFRecommendationsPage = ({ 
  naturalProfile 
}: PDFRecommendationsPageProps) => {
  const workEnvironmentRecs = getWorkEnvironmentRecommendations(naturalProfile);
  const developmentAreas = getDevelopmentAreas(naturalProfile);

  return (
    <Page size="A4" style={styles.page}>
      <Text style={styles.pageTitle}>Recomendaciones Personalizadas</Text>
      <Text style={{ fontSize: 12, marginBottom: 15, color: '#4A5568' }}>
        Basadas en tu perfil conductual, estas recomendaciones te ayudarán a potenciar tus fortalezas y gestionar áreas de oportunidad.
      </Text>
      
      <View style={styles.section}>
        {recommendations.map((rec, index) => (
          <View key={index} style={styles.recommendation}>
            <Text style={styles.recommendationTitle}>{rec.title}</Text>
            <Text style={styles.recommendationText}>{rec.text}</Text>
          </View>
        ))}
        
        <View style={styles.recommendation}>
          <Text style={styles.recommendationTitle}>Entorno de Trabajo Ideal</Text>
          <Text style={styles.recommendationText}>
            Basado en tu perfil, florecerás en un entorno que combine:
            {workEnvironmentRecs.map((rec, index) => (
              `\n${rec}`
            ))}
          </Text>
        </View>
        
        <View style={styles.recommendation}>
          <Text style={styles.recommendationTitle}>Áreas de Desarrollo Profesional</Text>
          <Text style={styles.recommendationText}>
            Para potenciar tu desempeño, considera desarrollar estas habilidades:
            {developmentAreas.map((area, index) => (
              `\n${area}`
            ))}
          </Text>
        </View>
      </View>

      <PDFPageFooter />
    </Page>
  );
};
