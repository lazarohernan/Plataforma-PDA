
import React from 'react';
import { 
  Document, 
  Page, 
  Text, 
  View, 
  StyleSheet, 
  Image,
  PDFViewer 
} from '@react-pdf/renderer';
import { ProfileData, DerivedIndicatorsData } from '@/models/results';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#fff',
  },
  coverPage: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    padding: 40,
    backgroundColor: '#f9fafc',
  },
  coverTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1A365D',
    textAlign: 'center',
  },
  coverSubtitle: {
    fontSize: 18,
    marginBottom: 40,
    color: '#4A5568',
    textAlign: 'center',
  },
  coverDate: {
    fontSize: 14,
    color: '#718096',
    position: 'absolute',
    bottom: 40,
    textAlign: 'center',
  },
  pageTitle: {
    fontSize: 20,
    marginBottom: 20,
    color: '#1A365D',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  profileGrid: {
    flexDirection: 'row',
    marginBottom: 15,
    borderBottom: '1px solid #E2E8F0',
    paddingBottom: 10,
  },
  profileColumn: {
    flex: 1,
  },
  profileLabel: {
    fontSize: 12,
    color: '#718096',
    marginBottom: 3,
  },
  profileValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  indicatorsSection: {
    marginTop: 20,
    marginBottom: 20,
  },
  indicatorRow: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingBottom: 5,
    borderBottom: '1px solid #E2E8F0',
  },
  indicatorLabel: {
    flex: 2,
    fontSize: 12,
    color: '#4A5568',
  },
  indicatorValue: {
    flex: 1,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    color: '#A0AEC0',
    fontSize: 10,
    paddingTop: 10,
    borderTop: '1px solid #E2E8F0',
  },
  pageNumber: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    fontSize: 10,
    color: '#A0AEC0',
  },
});

interface ResultsPDFProps {
  naturalProfile: ProfileData;
  adaptedProfile: ProfileData;
  derivedIndicators: DerivedIndicatorsData;
}

export const ResultsPDF = ({ 
  naturalProfile, 
  adaptedProfile, 
  derivedIndicators 
}: ResultsPDFProps) => {
  const currentDate = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Helper to get textual interpretation of score
  const getInterpretation = (score: number): string => {
    if (score < 40) return "Nivel bajo";
    if (score < 70) return "Nivel moderado";
    return "Nivel alto";
  };

  return (
    <Document>
      {/* Cover Page */}
      <Page size="A4" style={styles.coverPage}>
        <Text style={styles.coverTitle}>Informe de Evaluación PDA</Text>
        <Text style={styles.coverSubtitle}>
          Análisis completo de perfil conductual y recomendaciones personalizadas
        </Text>
        <View style={{ marginTop: 40 }}>
          <Text style={{ fontSize: 14, color: '#4A5568', textAlign: 'center' }}>
            Este informe presenta los resultados de tu evaluación PDA,
            mostrando tus tendencias conductuales naturales y adaptadas,
            así como indicadores derivados y recomendaciones.
          </Text>
        </View>
        <Text style={styles.coverDate}>Generado el {currentDate}</Text>
      </Page>

      {/* Main Profile Page */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.pageTitle}>Perfil PDA</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Perfil Natural</Text>
          <Text style={{ fontSize: 12, marginBottom: 10, color: '#4A5568' }}>
            Tu perfil natural representa tus tendencias de comportamiento innatas.
          </Text>
          
          <View style={styles.profileGrid}>
            <View style={styles.profileColumn}>
              <Text style={styles.profileLabel}>Riesgo</Text>
              <Text style={styles.profileValue}>
                {naturalProfile.risk} - {getInterpretation(naturalProfile.risk)}
              </Text>
            </View>
            <View style={styles.profileColumn}>
              <Text style={styles.profileLabel}>Extroversión</Text>
              <Text style={styles.profileValue}>
                {naturalProfile.extroversion} - {getInterpretation(naturalProfile.extroversion)}
              </Text>
            </View>
          </View>
          
          <View style={styles.profileGrid}>
            <View style={styles.profileColumn}>
              <Text style={styles.profileLabel}>Paciencia</Text>
              <Text style={styles.profileValue}>
                {naturalProfile.patience} - {getInterpretation(naturalProfile.patience)}
              </Text>
            </View>
            <View style={styles.profileColumn}>
              <Text style={styles.profileLabel}>Normatividad</Text>
              <Text style={styles.profileValue}>
                {naturalProfile.normativity} - {getInterpretation(naturalProfile.normativity)}
              </Text>
            </View>
          </View>
          
          <View style={styles.profileGrid}>
            <View style={styles.profileColumn}>
              <Text style={styles.profileLabel}>Autocontrol</Text>
              <Text style={styles.profileValue}>
                {naturalProfile.selfControl} - {getInterpretation(naturalProfile.selfControl)}
              </Text>
            </View>
            <View style={styles.profileColumn}></View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Perfil Adaptado</Text>
          <Text style={{ fontSize: 12, marginBottom: 10, color: '#4A5568' }}>
            Tu perfil adaptado representa cómo modificas tu comportamiento en tu entorno actual.
          </Text>
          
          <View style={styles.profileGrid}>
            <View style={styles.profileColumn}>
              <Text style={styles.profileLabel}>Riesgo</Text>
              <Text style={styles.profileValue}>
                {adaptedProfile.risk} - {getInterpretation(adaptedProfile.risk)}
              </Text>
            </View>
            <View style={styles.profileColumn}>
              <Text style={styles.profileLabel}>Extroversión</Text>
              <Text style={styles.profileValue}>
                {adaptedProfile.extroversion} - {getInterpretation(adaptedProfile.extroversion)}
              </Text>
            </View>
          </View>
          
          <View style={styles.profileGrid}>
            <View style={styles.profileColumn}>
              <Text style={styles.profileLabel}>Paciencia</Text>
              <Text style={styles.profileValue}>
                {adaptedProfile.patience} - {getInterpretation(adaptedProfile.patience)}
              </Text>
            </View>
            <View style={styles.profileColumn}>
              <Text style={styles.profileLabel}>Normatividad</Text>
              <Text style={styles.profileValue}>
                {adaptedProfile.normativity} - {getInterpretation(adaptedProfile.normativity)}
              </Text>
            </View>
          </View>
          
          <View style={styles.profileGrid}>
            <View style={styles.profileColumn}>
              <Text style={styles.profileLabel}>Autocontrol</Text>
              <Text style={styles.profileValue}>
                {adaptedProfile.selfControl} - {getInterpretation(adaptedProfile.selfControl)}
              </Text>
            </View>
            <View style={styles.profileColumn}></View>
          </View>
        </View>
        
        <View style={styles.indicatorsSection}>
          <Text style={styles.sectionTitle}>Indicadores Derivados</Text>
          <Text style={{ fontSize: 12, marginBottom: 10, color: '#4A5568' }}>
            Estos indicadores son calculados a partir de las dimensiones principales de tu perfil.
          </Text>
          
          <View style={styles.indicatorRow}>
            <Text style={styles.indicatorLabel}>Nivel de Energía</Text>
            <Text style={styles.indicatorValue}>
              {derivedIndicators.energyLevel}
              {derivedIndicators.energyLevel < 40 ? ' - Bajo' : 
               derivedIndicators.energyLevel < 70 ? ' - Medio' : ' - Alto'}
            </Text>
          </View>
          
          <View style={styles.indicatorRow}>
            <Text style={styles.indicatorLabel}>Equilibrio de Energía</Text>
            <Text style={styles.indicatorValue}>
              {derivedIndicators.energyBalance}
              {derivedIndicators.energyBalance < 40 ? ' - Desbalanceado' : 
               derivedIndicators.energyBalance < 70 ? ' - Moderado' : ' - Balanceado'}
            </Text>
          </View>
          
          <View style={styles.indicatorRow}>
            <Text style={styles.indicatorLabel}>Toma de Decisiones</Text>
            <Text style={styles.indicatorValue}>
              {derivedIndicators.decisionMaking}
              {derivedIndicators.decisionMaking < 40 ? ' - Emocional' : 
               derivedIndicators.decisionMaking < 60 ? ' - Equilibrado' : ' - Racional'}
            </Text>
          </View>
          
          <View style={styles.indicatorRow}>
            <Text style={styles.indicatorLabel}>Ritmo de Cambio</Text>
            <Text style={styles.indicatorValue}>
              {derivedIndicators.changeRhythm}
              {derivedIndicators.changeRhythm < 40 ? ' - Conservador' : 
               derivedIndicators.changeRhythm < 70 ? ' - Moderado' : ' - Dinámico'}
            </Text>
          </View>
        </View>

        <Text style={styles.footer}>
          Evalua - Evaluación PDA © {new Date().getFullYear()}
        </Text>
        <Text 
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} 
        />
      </Page>
    </Document>
  );
};
