
import { ProfileData } from '@/models/results';

// Helper to get textual interpretation of score
export const getInterpretation = (score: number): string => {
  if (score < 40) return "Nivel bajo";
  if (score < 70) return "Nivel moderado";
  return "Nivel alto";
};

// Mock compatibility data - in real app this would come from the backend
export const compatibilityData = [
  { role: "Gerente de Ventas", score: 87 },
  { role: "Director de Operaciones", score: 76 },
  { role: "Analista de Marketing", score: 68 },
  { role: "Desarrollador de Software", score: 42 },
  { role: "Representante de Servicio al Cliente", score: 91 }
];

// Mock recommendations data
export const recommendations = [
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

// Helper for generating work environment recommendations based on profile
export const getWorkEnvironmentRecommendations = (profile: ProfileData): string[] => {
  const recommendations = [];
  
  if (profile.risk > 65) {
    recommendations.push("• Oportunidades para tomar decisiones y liderar iniciativas");
  } else if (profile.risk < 40) {
    recommendations.push("• Estructura clara y apoyo en la toma de decisiones");
  } else {
    recommendations.push("• Balance entre autonomía y apoyo en la toma de decisiones");
  }
  
  if (profile.extroversion > 65) {
    recommendations.push("• Interacción frecuente con personas y oportunidades para comunicar ideas");
  } else if (profile.extroversion < 40) {
    recommendations.push("• Espacios para trabajo individual y concentración");
  } else {
    recommendations.push("• Combinación de trabajo en equipo e individual");
  }
  
  if (profile.patience > 65) {
    recommendations.push("• Estabilidad, consistencia y procesos predecibles");
  } else if (profile.patience < 40) {
    recommendations.push("• Variedad de tareas y proyectos dinámicos");
  } else {
    recommendations.push("• Cierta predictibilidad con espacio para nuevos proyectos");
  }
  
  if (profile.normativity > 65) {
    recommendations.push("• Procesos claros, reglas definidas y atención al detalle");
  } else if (profile.normativity < 40) {
    recommendations.push("• Flexibilidad para innovar y menos restricciones procedimentales");
  } else {
    recommendations.push("• Balance entre estructura y flexibilidad");
  }
  
  return recommendations;
};

// Helper for generating development areas based on profile
export const getDevelopmentAreas = (profile: ProfileData): string[] => {
  const areas = [];
  
  if (profile.risk < 50) {
    areas.push("• Toma de decisiones y asertividad");
  } else if (profile.risk > 80) {
    areas.push("• Evaluación de riesgos y consulta con otros");
  }
  
  if (profile.extroversion < 50) {
    areas.push("• Habilidades de comunicación y networking");
  } else if (profile.extroversion > 80) {
    areas.push("• Escucha activa y empatía");
  }
  
  if (profile.patience < 50) {
    areas.push("• Constancia y seguimiento de proyectos a largo plazo");
  } else if (profile.patience > 80) {
    areas.push("• Adaptabilidad al cambio y flexibilidad");
  }
  
  if (profile.normativity < 50) {
    areas.push("• Organización y atención al detalle");
  } else if (profile.normativity > 80) {
    areas.push("• Pensamiento creativo y flexibilidad");
  }
  
  if (profile.selfControl < 50) {
    areas.push("• Manejo de emociones y autoregulación");
  } else if (profile.selfControl > 80) {
    areas.push("• Expresión emocional y autenticidad");
  }
  
  return areas;
};

// Helper component for page footer
export const PDFFooter = () => {
  const currentYear = new Date().getFullYear();
  return `Evalua - Evaluación PDA © ${currentYear}`;
};
