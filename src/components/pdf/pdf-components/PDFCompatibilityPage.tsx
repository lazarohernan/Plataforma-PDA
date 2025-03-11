
import React from 'react';
import { Page, Text, View } from '@react-pdf/renderer';
import { styles } from './PDFStyles';
import { compatibilityData } from './PDFUtils';
import { PDFPageFooter } from './PDFPageFooter';

export const PDFCompatibilityPage = () => {
  return (
    <Page size="A4" style={styles.page}>
      <Text style={styles.pageTitle}>Compatibilidad con Roles</Text>
      <Text style={{ fontSize: 12, marginBottom: 15, color: '#4A5568' }}>
        Este análisis muestra tu nivel de compatibilidad con diferentes roles profesionales, basado en la alineación entre tu perfil conductual y los requerimientos típicos de cada posición.
      </Text>
      
      <View style={styles.compatibilitySection}>
        <Text style={styles.sectionTitle}>Compatibilidad por Rol</Text>
        
        {compatibilityData.map((item, index) => (
          <View key={index} style={styles.compatibilityRow}>
            <Text style={styles.compatibilityRole}>{item.role}</Text>
            <Text style={styles.compatibilityScore}>
              {item.score}% {item.score > 80 ? '(Alta)' : item.score > 60 ? '(Media)' : '(Baja)'}
            </Text>
          </View>
        ))}
        
        <View style={{ marginTop: 20 }}>
          <Text style={styles.sectionTitle}>Interpretación de Compatibilidad</Text>
          <Text style={{ fontSize: 12, lineHeight: 1.5, color: '#4A5568', marginBottom: 10 }}>
            La compatibilidad alta (>80%) indica que tu perfil natural se alinea muy bien con los requerimientos conductuales del rol. Esto sugiere que te sentirías cómodo y podrías desempeñarte eficazmente en estas posiciones.
          </Text>
          <Text style={{ fontSize: 12, lineHeight: 1.5, color: '#4A5568', marginBottom: 10 }}>
            La compatibilidad media (60-80%) sugiere una alineación parcial. Podrías desempeñarte bien en estos roles, pero algunas áreas requerirían adaptación o desarrollo de nuevas habilidades.
          </Text>
          <Text style={{ fontSize: 12, lineHeight: 1.5, color: '#4A5568' }}>
            La compatibilidad baja ({'<'}60%) indica que estos roles requerirían una adaptación significativa de tu parte, lo que podría resultar en mayor estrés o menor satisfacción laboral a largo plazo.
          </Text>
        </View>
      </View>

      <PDFPageFooter />
    </Page>
  );
};
