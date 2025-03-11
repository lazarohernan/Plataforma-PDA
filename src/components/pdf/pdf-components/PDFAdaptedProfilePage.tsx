
import React from 'react';
import { Page, Text, View } from '@react-pdf/renderer';
import { styles } from './PDFStyles';
import { ProfileData } from '@/models/results';
import { getInterpretation } from './PDFUtils';
import { PDFPageFooter } from './PDFPageFooter';

interface PDFAdaptedProfilePageProps {
  naturalProfile: ProfileData;
  adaptedProfile: ProfileData;
}

export const PDFAdaptedProfilePage = ({ 
  naturalProfile, 
  adaptedProfile 
}: PDFAdaptedProfilePageProps) => {
  return (
    <Page size="A4" style={styles.page}>
      <Text style={styles.pageTitle}>Perfil Adaptado</Text>
      <Text style={{ fontSize: 12, marginBottom: 15, color: '#4A5568' }}>
        Tu perfil adaptado representa cómo modificas tu comportamiento natural para responder a las demandas de tu entorno actual.
      </Text>
      
      <View style={styles.section}>
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
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Análisis de Adaptación</Text>
        <Text style={{ fontSize: 12, lineHeight: 1.5, color: '#4A5568', marginBottom: 10 }}>
          La comparación entre tu perfil natural y adaptado revela tus estrategias de adaptación al entorno actual:
        </Text>
        
        {Math.abs(naturalProfile.risk - adaptedProfile.risk) > 10 && (
          <Text style={{ fontSize: 12, marginBottom: 8, color: '#4A5568' }}>
            • <Text style={{ fontWeight: 'bold' }}>Riesgo:</Text> {adaptedProfile.risk > naturalProfile.risk ? 
              "Estás asumiendo una postura más orientada al riesgo de lo que sería natural para ti." : 
              "Estás siendo más cauteloso de lo que sería natural para ti."} (Diferencia: {Math.abs(naturalProfile.risk - adaptedProfile.risk)} puntos)
          </Text>
        )}
        
        {Math.abs(naturalProfile.extroversion - adaptedProfile.extroversion) > 10 && (
          <Text style={{ fontSize: 12, marginBottom: 8, color: '#4A5568' }}>
            • <Text style={{ fontWeight: 'bold' }}>Extroversión:</Text> {adaptedProfile.extroversion > naturalProfile.extroversion ? 
              "Estás mostrándote más social y comunicativo de lo que sería natural para ti." : 
              "Estás conteniendo tu expresividad social más de lo que sería natural para ti."} (Diferencia: {Math.abs(naturalProfile.extroversion - adaptedProfile.extroversion)} puntos)
          </Text>
        )}
        
        {Math.abs(naturalProfile.patience - adaptedProfile.patience) > 10 && (
          <Text style={{ fontSize: 12, marginBottom: 8, color: '#4A5568' }}>
            • <Text style={{ fontWeight: 'bold' }}>Paciencia:</Text> {adaptedProfile.patience > naturalProfile.patience ? 
              "Estás mostrando más paciencia y constancia de lo que sería natural para ti." : 
              "Estás actuando con mayor dinamismo y menor constancia de lo que sería natural para ti."} (Diferencia: {Math.abs(naturalProfile.patience - adaptedProfile.patience)} puntos)
          </Text>
        )}
        
        {Math.abs(naturalProfile.normativity - adaptedProfile.normativity) > 10 && (
          <Text style={{ fontSize: 12, marginBottom: 8, color: '#4A5568' }}>
            • <Text style={{ fontWeight: 'bold' }}>Normatividad:</Text> {adaptedProfile.normativity > naturalProfile.normativity ? 
              "Estás siendo más adherente a normas y procedimientos de lo que sería natural para ti." : 
              "Estás siendo más flexible con las normas de lo que sería natural para ti."} (Diferencia: {Math.abs(naturalProfile.normativity - adaptedProfile.normativity)} puntos)
          </Text>
        )}
        
        {Math.abs(naturalProfile.selfControl - adaptedProfile.selfControl) > 10 && (
          <Text style={{ fontSize: 12, marginBottom: 8, color: '#4A5568' }}>
            • <Text style={{ fontWeight: 'bold' }}>Autocontrol:</Text> {adaptedProfile.selfControl > naturalProfile.selfControl ? 
              "Estás ejerciendo un mayor control sobre tus emociones de lo que sería natural para ti." : 
              "Estás expresando más abiertamente tus emociones de lo que sería natural para ti."} (Diferencia: {Math.abs(naturalProfile.selfControl - adaptedProfile.selfControl)} puntos)
          </Text>
        )}
      </View>

      <PDFPageFooter />
    </Page>
  );
};
