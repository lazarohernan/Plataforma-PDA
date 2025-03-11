
import React from 'react';
import { Page, Text, View } from '@react-pdf/renderer';
import { styles } from './PDFStyles';
import { ProfileData } from '@/models/results';
import { getInterpretation } from './PDFUtils';
import { PDFPageFooter } from './PDFPageFooter';

interface PDFNaturalProfilePageProps {
  naturalProfile: ProfileData;
}

export const PDFNaturalProfilePage = ({ naturalProfile }: PDFNaturalProfilePageProps) => {
  return (
    <Page size="A4" style={styles.page}>
      <Text style={styles.pageTitle}>Perfil Natural</Text>
      <Text style={{ fontSize: 12, marginBottom: 15, color: '#4A5568' }}>
        Tu perfil natural representa tus tendencias de comportamiento innatas, reflejando tu forma natural de responder a situaciones.
      </Text>
      
      <View style={styles.section}>
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
        <Text style={styles.sectionTitle}>Interpretación del Perfil Natural</Text>
        <Text style={{ fontSize: 12, lineHeight: 1.5, color: '#4A5568' }}>
          Tu perfil natural indica una persona con {naturalProfile.risk > 70 ? "alta disposición a tomar riesgos" : naturalProfile.risk > 40 ? "disposición moderada a tomar riesgos" : "baja disposición a tomar riesgos"} y {naturalProfile.extroversion > 70 ? "alta sociabilidad" : naturalProfile.extroversion > 40 ? "sociabilidad moderada" : "baja sociabilidad"}. 
          
          Muestras un nivel {naturalProfile.patience > 70 ? "alto" : naturalProfile.patience > 40 ? "moderado" : "bajo"} de paciencia, lo que sugiere que {naturalProfile.patience > 70 ? "prefieres entornos estables y predecibles" : naturalProfile.patience > 40 ? "puedes adaptarte a diferentes ritmos de trabajo" : "prefieres entornos dinámicos con variedad de actividades"}.
          
          Tu nivel {naturalProfile.normativity > 70 ? "alto" : naturalProfile.normativity > 40 ? "moderado" : "bajo"} de normatividad indica que {naturalProfile.normativity > 70 ? "valoras las reglas y procedimientos establecidos" : naturalProfile.normativity > 40 ? "puedes equilibrar el seguimiento de reglas con cierta flexibilidad" : "prefieres entornos con mayor libertad y menos restricciones"}.
          
          Finalmente, tu nivel {naturalProfile.selfControl > 70 ? "alto" : naturalProfile.selfControl > 40 ? "moderado" : "bajo"} de autocontrol sugiere que {naturalProfile.selfControl > 70 ? "mantienes tus emociones bajo control incluso en situaciones difíciles" : naturalProfile.selfControl > 40 ? "generalmente manejas bien tus emociones, aunque puedes expresarlas en ciertas situaciones" : "expresas tus emociones abiertamente y de manera natural"}.
        </Text>
      </View>

      <PDFPageFooter />
    </Page>
  );
};
