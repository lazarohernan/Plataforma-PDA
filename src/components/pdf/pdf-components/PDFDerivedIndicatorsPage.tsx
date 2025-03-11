
import React from 'react';
import { Page, Text, View } from '@react-pdf/renderer';
import { styles } from './PDFStyles';
import { DerivedIndicatorsData } from '@/models/results';
import { PDFPageFooter } from './PDFPageFooter';

interface PDFDerivedIndicatorsPageProps {
  derivedIndicators: DerivedIndicatorsData;
}

export const PDFDerivedIndicatorsPage = ({ 
  derivedIndicators 
}: PDFDerivedIndicatorsPageProps) => {
  return (
    <Page size="A4" style={styles.page}>
      <Text style={styles.pageTitle}>Indicadores Derivados</Text>
      <Text style={{ fontSize: 12, marginBottom: 15, color: '#4A5568' }}>
        Estos indicadores se calculan a partir del análisis de tus dimensiones principales y ofrecen información adicional sobre tus tendencias conductuales.
      </Text>
      
      <View style={styles.indicatorsSection}>
        <View style={styles.indicatorRow}>
          <Text style={styles.indicatorLabel}>Nivel de Energía</Text>
          <Text style={styles.indicatorValue}>
            {derivedIndicators.energyLevel}
            {derivedIndicators.energyLevel < 40 ? ' - Bajo' : 
             derivedIndicators.energyLevel < 70 ? ' - Medio' : ' - Alto'}
          </Text>
        </View>
        
        <View style={{ marginBottom: 15 }}>
          <Text style={{ fontSize: 12, color: '#4A5568', lineHeight: 1.5 }}>
            {derivedIndicators.energyLevel < 40 ?
              "Tu nivel de energía es relativamente bajo, lo que sugiere que prefieres entornos tranquilos y actividades que no requieran un gran gasto energético constante. Puede que necesites períodos de recuperación después de interacciones sociales intensas o actividades demandantes." :
              derivedIndicators.energyLevel < 70 ?
              "Tu nivel de energía es moderado, lo que te permite mantener un ritmo constante de actividad sin agotarte rápidamente. Sabes cuándo acelerar y cuándo conservar energía según lo requiera la situación." :
              "Tu nivel de energía es alto, lo que te permite mantener un ritmo intenso de actividad durante períodos prolongados. Tiendes a buscar estimulación y puedes manejar múltiples tareas o proyectos simultáneamente."
            }
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
        
        <View style={{ marginBottom: 15 }}>
          <Text style={{ fontSize: 12, color: '#4A5568', lineHeight: 1.5 }}>
            {derivedIndicators.energyBalance < 40 ?
              "Tu equilibrio de energía muestra cierto desbalance, lo que puede indicar que concentras tu energía de manera desproporcionada en ciertas áreas mientras descuidas otras. Esto puede generar tensión o fatiga en determinados contextos." :
              derivedIndicators.energyBalance < 70 ?
              "Tu equilibrio de energía es moderado, distribuyendo tus recursos energéticos de manera relativamente equitativa entre diferentes actividades y responsabilidades. Sin embargo, en situaciones de presión puedes tender a desequilibrarte." :
              "Tu equilibrio de energía está bien balanceado, lo que te permite distribuir eficazmente tus recursos entre diferentes actividades y áreas de tu vida. Esto te ayuda a mantener un rendimiento consistente sin agotarte en un área específica."
            }
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
        
        <View style={{ marginBottom: 15 }}>
          <Text style={{ fontSize: 12, color: '#4A5568', lineHeight: 1.5 }}>
            {derivedIndicators.decisionMaking < 40 ?
              "Tu estilo de toma de decisiones tiende a ser más emocional e intuitivo. Confías en tus sentimientos y primeras impresiones, lo que te permite responder rápidamente a situaciones, aunque a veces puedas reconsiderar tus decisiones posteriormente." :
              derivedIndicators.decisionMaking < 60 ?
              "Tu estilo de toma de decisiones muestra un equilibrio entre lo racional y lo emocional. Consideras tanto los hechos objetivos como tus intuiciones y sentimientos, lo que te permite tomar decisiones que integran múltiples perspectivas." :
              "Tu estilo de toma de decisiones tiende a ser más racional y analítico. Prefieres basar tus decisiones en datos, hechos y análisis lógico, lo que puede llevarte a decisiones más consistentes pero a veces puede ralentizar el proceso."
            }
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
        
        <View style={{ marginBottom: 15 }}>
          <Text style={{ fontSize: 12, color: '#4A5568', lineHeight: 1.5 }}>
            {derivedIndicators.changeRhythm < 40 ?
              "Tu ritmo de cambio es más conservador, lo que significa que prefieres mantener estabilidad y continuidad. Puedes adaptarte a los cambios pero necesitas tiempo para procesarlos y te sientes más cómodo cuando los cambios son graduales y bien planificados." :
              derivedIndicators.changeRhythm < 70 ?
              "Tu ritmo de cambio es moderado, permitiéndote adaptarte a nuevas situaciones sin resistencia excesiva, pero también valorando cierta estabilidad. Puedes manejar cambios cuando son necesarios mientras mantienes continuidad en áreas importantes." :
              "Tu ritmo de cambio es dinámico, lo que te permite adaptarte rápidamente a nuevas situaciones, ideas o métodos. Tiendes a aburrirte con la rutina y buscas activamente variedad, nuevos desafíos y formas de hacer las cosas."
            }
          </Text>
        </View>
      </View>

      <PDFPageFooter />
    </Page>
  );
};
