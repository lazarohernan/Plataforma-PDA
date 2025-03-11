
import React from 'react';
import { Page, Text, View } from '@react-pdf/renderer';
import { styles } from './PDFStyles';

interface PDFCoverPageProps {
  currentDate: string;
}

export const PDFCoverPage = ({ currentDate }: PDFCoverPageProps) => {
  return (
    <Page size="A4" style={styles.coverPage}>
      <Text style={styles.coverTitle}>Informe de Evaluación PDA</Text>
      <Text style={styles.coverSubtitle}>
        Análisis personalizado de perfil conductual
      </Text>
      <View style={{ marginTop: 40 }}>
        <Text style={{ fontSize: 14, color: '#4A5568', textAlign: 'center' }}>
          Este informe presenta los resultados de tu evaluación PDA,
          mostrando tus tendencias conductuales y ofreciendo
          recomendaciones personalizadas.
        </Text>
      </View>
      <Text style={styles.coverDate}>Generado el {currentDate}</Text>
    </Page>
  );
};
