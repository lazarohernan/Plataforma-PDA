
import React from 'react';
import { 
  Document, 
  Page, 
  Text, 
  View, 
  StyleSheet,
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
  recommendation: {
    marginBottom: 10,
    fontSize: 12,
  },
  recommendationTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2D3748',
  },
  recommendationText: {
    fontSize: 12,
    color: '#4A5568',
    lineHeight: 1.5,
  },
  compatibilitySection: {
    marginTop: 20,
  },
  compatibilityRow: {
    flexDirection: 'row',
    marginBottom: 15,
    borderBottom: '1px solid #E2E8F0',
    paddingBottom: 10,
  },
  compatibilityRole: {
    flex: 2,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  compatibilityScore: {
    flex: 1,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2D3748',
  },
});

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

  // Helper to get textual interpretation of score
  const getInterpretation = (score: number): string => {
    if (score < 40) return "Nivel bajo";
    if (score < 70) return "Nivel moderado";
    return "Nivel alto";
  };

  // Mock compatibility data - in real app this would come from the backend
  const compatibilityData = [
    { role: "Gerente de Ventas", score: 87 },
    { role: "Director de Operaciones", score: 76 },
    { role: "Analista de Marketing", score: 68 },
    { role: "Desarrollador de Software", score: 42 },
    { role: "Representante de Servicio al Cliente", score: 91 }
  ];

  // Mock recommendations data
  const recommendations = [
    {
      title: "Desarrollo Profesional",
      text: "Basado en tu alto nivel de Riesgo y Extroversión, te recomendamos roles que permitan tomar decisiones e interactuar con personas. Considera desarrollar habilidades de liderazgo y negociación para potenciar estas fortalezas."
    },
    {
      title: "Estilo de Comunicación",
      text: "Tu perfil muestra una combinación de asertividad y sociabilidad. Adapta tu comunicación para ser más paciente con colaboradores que requieren tiempo para procesar información y tomar decisiones."
    },
    {
      title: "Gestión del Estrés",
      text: "Con tu nivel moderado de Autocontrol, te beneficiaría implementar técnicas de gestión del estrés en situaciones de alta presión, como la respiración consciente o la planificación detallada."
    }
  ];

  return (
    <Document>
      {/* Cover Page - Always present */}
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

      {/* Natural Profile Page */}
      {selectedSections.naturalProfile && (
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

          <Text style={styles.footer}>
            Evalua - Evaluación PDA © {new Date().getFullYear()}
          </Text>
          <Text 
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} 
          />
        </Page>
      )}

      {/* Adapted Profile Page */}
      {selectedSections.adaptedProfile && (
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

          <Text style={styles.footer}>
            Evalua - Evaluación PDA © {new Date().getFullYear()}
          </Text>
          <Text 
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} 
          />
        </Page>
      )}

      {/* Derived Indicators Page */}
      {selectedSections.derivedIndicators && (
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

          <Text style={styles.footer}>
            Evalua - Evaluación PDA © {new Date().getFullYear()}
          </Text>
          <Text 
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} 
          />
        </Page>
      )}
      
      {/* Recommendations Page */}
      {selectedSections.recommendations && (
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
                {naturalProfile.risk > 65 ? "\n• Oportunidades para tomar decisiones y liderar iniciativas" : 
                 naturalProfile.risk < 40 ? "\n• Estructura clara y apoyo en la toma de decisiones" : 
                 "\n• Balance entre autonomía y apoyo en la toma de decisiones"}
                
                {naturalProfile.extroversion > 65 ? "\n• Interacción frecuente con personas y oportunidades para comunicar ideas" : 
                 naturalProfile.extroversion < 40 ? "\n• Espacios para trabajo individual y concentración" : 
                 "\n• Combinación de trabajo en equipo e individual"}
                
                {naturalProfile.patience > 65 ? "\n• Estabilidad, consistencia y procesos predecibles" : 
                 naturalProfile.patience < 40 ? "\n• Variedad de tareas y proyectos dinámicos" : 
                 "\n• Cierta predictibilidad con espacio para nuevos proyectos"}
                
                {naturalProfile.normativity > 65 ? "\n• Procesos claros, reglas definidas y atención al detalle" : 
                 naturalProfile.normativity < 40 ? "\n• Flexibilidad para innovar y menos restricciones procedimentales" : 
                 "\n• Balance entre estructura y flexibilidad"}
              </Text>
            </View>
            
            <View style={styles.recommendation}>
              <Text style={styles.recommendationTitle}>Áreas de Desarrollo Profesional</Text>
              <Text style={styles.recommendationText}>
                Para potenciar tu desempeño, considera desarrollar estas habilidades:
                {naturalProfile.risk < 50 ? "\n• Toma de decisiones y asertividad" : 
                 naturalProfile.risk > 80 ? "\n• Evaluación de riesgos y consulta con otros" : ""}
                
                {naturalProfile.extroversion < 50 ? "\n• Habilidades de comunicación y networking" : 
                 naturalProfile.extroversion > 80 ? "\n• Escucha activa y empatía" : ""}
                
                {naturalProfile.patience < 50 ? "\n• Constancia y seguimiento de proyectos a largo plazo" : 
                 naturalProfile.patience > 80 ? "\n• Adaptabilidad al cambio y flexibilidad" : ""}
                
                {naturalProfile.normativity < 50 ? "\n• Organización y atención al detalle" : 
                 naturalProfile.normativity > 80 ? "\n• Pensamiento creativo y flexibilidad" : ""}
                
                {naturalProfile.selfControl < 50 ? "\n• Manejo de emociones y autoregulación" : 
                 naturalProfile.selfControl > 80 ? "\n• Expresión emocional y autenticidad" : ""}
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
      )}
      
      {/* Compatibility Page */}
      {selectedSections.compatibility && (
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
                La compatibilidad baja (<60%) indica que estos roles requerirían una adaptación significativa de tu parte, lo que podría resultar en mayor estrés o menor satisfacción laboral a largo plazo.
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
      )}
    </Document>
  );
};
