
export interface PerfilPuesto {
  id: string;
  nombre: string;
  departamento: string;
  fechaCreacion: string;
  descripcion: string;
  dimensiones: {
    riesgo: {
      min: number;
      ideal: number;
      max: number;
    };
    extroversion: {
      min: number;
      ideal: number;
      max: number;
    };
    paciencia: {
      min: number;
      ideal: number;
      max: number;
    };
    normatividad: {
      min: number;
      ideal: number;
      max: number;
    };
    autocontrol: {
      min: number;
      ideal: number;
      max: number;
    };
  };
  competencias: string[];
  observaciones: string;
}

export const perfilesPuestoData: PerfilPuesto[] = [
  {
    id: "pp001",
    nombre: "Gerente de Ventas",
    departamento: "Ventas",
    fechaCreacion: "15/04/2023",
    descripcion: "Perfil ideal para líderes de equipos comerciales con enfoque en resultados y capacidad de motivación.",
    dimensiones: {
      riesgo: { min: 70, ideal: 85, max: 95 },
      extroversion: { min: 65, ideal: 80, max: 90 },
      paciencia: { min: 20, ideal: 40, max: 60 },
      normatividad: { min: 30, ideal: 50, max: 70 },
      autocontrol: { min: 60, ideal: 75, max: 90 }
    },
    competencias: ["Liderazgo", "Negociación", "Orientación a resultados", "Comunicación efectiva"],
    observaciones: "Rol que requiere alta proactividad y capacidad para trabajar bajo presión por objetivos comerciales."
  },
  {
    id: "pp002",
    nombre: "Analista de Datos",
    departamento: "Tecnología",
    fechaCreacion: "03/06/2023",
    descripcion: "Perfil orientado al análisis detallado y resolución metódica de problemas complejos.",
    dimensiones: {
      riesgo: { min: 20, ideal: 40, max: 60 },
      extroversion: { min: 30, ideal: 45, max: 65 },
      paciencia: { min: 60, ideal: 75, max: 90 },
      normatividad: { min: 75, ideal: 85, max: 95 },
      autocontrol: { min: 70, ideal: 80, max: 90 }
    },
    competencias: ["Pensamiento analítico", "Atención al detalle", "Resolución de problemas", "Organización"],
    observaciones: "Posición que valora la precisión y la capacidad de trabajo metódico con grandes volúmenes de información."
  },
  {
    id: "pp003",
    nombre: "Especialista en Marketing Digital",
    departamento: "Marketing",
    fechaCreacion: "22/08/2023",
    descripcion: "Perfil creativo con capacidad de adaptación a entornos digitales cambiantes.",
    dimensiones: {
      riesgo: { min: 50, ideal: 65, max: 80 },
      extroversion: { min: 60, ideal: 75, max: 90 },
      paciencia: { min: 40, ideal: 55, max: 70 },
      normatividad: { min: 30, ideal: 50, max: 70 },
      autocontrol: { min: 40, ideal: 60, max: 75 }
    },
    competencias: ["Creatividad", "Gestión de campañas", "Análisis de métricas", "Comunicación visual"],
    observaciones: "Rol que equilibra creatividad con capacidad analítica para optimizar estrategias de marketing."
  },
  {
    id: "pp004",
    nombre: "Desarrollador Full Stack",
    departamento: "Tecnología",
    fechaCreacion: "10/09/2023",
    descripcion: "Perfil técnico con alta capacidad de resolución de problemas y adaptación a nuevas tecnologías.",
    dimensiones: {
      riesgo: { min: 40, ideal: 60, max: 75 },
      extroversion: { min: 30, ideal: 50, max: 70 },
      paciencia: { min: 60, ideal: 75, max: 90 },
      normatividad: { min: 70, ideal: 85, max: 95 },
      autocontrol: { min: 60, ideal: 75, max: 85 }
    },
    competencias: ["Programación", "Resolución de problemas", "Aprendizaje continuo", "Trabajo en equipo"],
    observaciones: "Posición que requiere balance entre precisión técnica y flexibilidad para adaptarse a cambios tecnológicos."
  },
  {
    id: "pp005",
    nombre: "Especialista en Recursos Humanos",
    departamento: "RRHH",
    fechaCreacion: "05/10/2023",
    descripcion: "Perfil con alta empatía y capacidad para entender y gestionar relaciones interpersonales.",
    dimensiones: {
      riesgo: { min: 30, ideal: 50, max: 70 },
      extroversion: { min: 65, ideal: 80, max: 90 },
      paciencia: { min: 70, ideal: 80, max: 90 },
      normatividad: { min: 60, ideal: 75, max: 90 },
      autocontrol: { min: 70, ideal: 85, max: 95 }
    },
    competencias: ["Comunicación interpersonal", "Gestión de conflictos", "Empatía", "Planificación"],
    observaciones: "Rol centrado en las personas que requiere equilibrio entre empatía y aplicación de normativas."
  },
  {
    id: "pp006",
    nombre: "Director Financiero",
    departamento: "Finanzas",
    fechaCreacion: "18/11/2023",
    descripcion: "Perfil analítico con alta responsabilidad en la gestión económica de la organización.",
    dimensiones: {
      riesgo: { min: 30, ideal: 45, max: 60 },
      extroversion: { min: 40, ideal: 60, max: 75 },
      paciencia: { min: 60, ideal: 75, max: 85 },
      normatividad: { min: 80, ideal: 90, max: 100 },
      autocontrol: { min: 75, ideal: 85, max: 95 }
    },
    competencias: ["Análisis financiero", "Planificación estratégica", "Toma de decisiones", "Gestión de riesgos"],
    observaciones: "Posición de alta responsabilidad que requiere precisión, ética y visión estratégica."
  },
  {
    id: "pp007",
    nombre: "Coordinador de Logística",
    departamento: "Operaciones",
    fechaCreacion: "03/01/2024",
    descripcion: "Perfil organizativo con capacidad para optimizar procesos y coordinar equipos operativos.",
    dimensiones: {
      riesgo: { min: 40, ideal: 60, max: 75 },
      extroversion: { min: 50, ideal: 65, max: 80 },
      paciencia: { min: 60, ideal: 75, max: 90 },
      normatividad: { min: 70, ideal: 85, max: 95 },
      autocontrol: { min: 65, ideal: 80, max: 90 }
    },
    competencias: ["Organización", "Gestión de equipos", "Resolución de problemas", "Optimización de procesos"],
    observaciones: "Rol que requiere equilibrio entre eficiencia operativa y flexibilidad ante imprevistos."
  },
  {
    id: "pp008",
    nombre: "Ejecutivo de Atención al Cliente",
    departamento: "Servicio al Cliente",
    fechaCreacion: "20/02/2024",
    descripcion: "Perfil orientado al servicio con alta capacidad de empatía y resolución de problemas.",
    dimensiones: {
      riesgo: { min: 30, ideal: 45, max: 65 },
      extroversion: { min: 70, ideal: 85, max: 95 },
      paciencia: { min: 75, ideal: 85, max: 95 },
      normatividad: { min: 60, ideal: 75, max: 90 },
      autocontrol: { min: 70, ideal: 85, max: 95 }
    },
    competencias: ["Empatía", "Comunicación efectiva", "Resolución de conflictos", "Orientación al cliente"],
    observaciones: "Posición que prioriza la calidad de atención y la capacidad de resolución efectiva de problemas del cliente."
  }
];

export const getDimensionDominante = (dimensiones: PerfilPuesto["dimensiones"]): { nombre: string; valor: number } => {
  const valores = {
    "Riesgo": dimensiones.riesgo.ideal,
    "Extroversión": dimensiones.extroversion.ideal,
    "Paciencia": dimensiones.paciencia.ideal,
    "Normatividad": dimensiones.normatividad.ideal,
    "Autocontrol": dimensiones.autocontrol.ideal
  };

  // Encontrar la dimensión con el valor más alto
  let maxDimension = { nombre: "-", valor: 0 };
  Object.entries(valores).forEach(([nombre, valor]) => {
    if (valor > maxDimension.valor) {
      maxDimension = { nombre, valor };
    }
  });

  return maxDimension;
};

export const departamentos = [
  "Todos",
  "Ventas",
  "Marketing",
  "Tecnología",
  "RRHH",
  "Finanzas",
  "Operaciones",
  "Servicio al Cliente"
];

