/**
 * Módulo de análisis de compatibilidad para el algoritmo pentadimensional PDA
 */

import { Perfil, PerfilPuesto, Competencia, ResultadoCompatibilidad, Eje } from './types';

/**
 * Calcula la distancia euclidiana entre dos perfiles
 * 
 * @param perfil1 - Primer perfil
 * @param perfil2 - Segundo perfil
 * @returns Distancia euclidiana
 */
export function calcularDistanciaEuclidiana(perfil1: Perfil, perfil2: Perfil): number {
  return Math.sqrt(
    Math.pow(perfil1.R - perfil2.R, 2) +
    Math.pow(perfil1.E - perfil2.E, 2) +
    Math.pow(perfil1.P - perfil2.P, 2) +
    Math.pow(perfil1.N - perfil2.N, 2) +
    Math.pow(perfil1.A - perfil2.A, 2)
  );
}

/**
 * Calcula la distancia euclidiana máxima posible entre dos perfiles
 * Considerando que cada eje puede variar entre 0 y 100
 * 
 * @returns Distancia euclidiana máxima
 */
export function calcularDistanciaMaxima(): number {
  // Distancia máxima: √(5 * 100²) = √50000 ≈ 223.6
  return Math.sqrt(5 * Math.pow(100, 2));
}

/**
 * Calcula el índice de compatibilidad entre un perfil y un perfil de puesto
 * 
 * @param perfil - Perfil de la persona
 * @param perfilPuesto - Perfil del puesto
 * @returns Índice de compatibilidad (0-100)
 */
export function calcularIndiceCompatibilidad(
  perfil: Perfil,
  perfilPuesto: Perfil
): number {
  const distancia = calcularDistanciaEuclidiana(perfil, perfilPuesto);
  const distanciaMaxima = calcularDistanciaMaxima();
  
  // Fórmula: IC = 100 - (20 * Distancia_Normalizada)
  // Donde Distancia_Normalizada = Distancia / Distancia_Máxima
  const indiceCompatibilidad = 100 - (20 * (distancia / distanciaMaxima));
  
  // Limitar el índice entre 0 y 100
  return Math.max(0, Math.min(100, Math.round(indiceCompatibilidad)));
}

/**
 * Calcula la compatibilidad por eje entre un perfil y un perfil de puesto
 * 
 * @param perfil - Perfil de la persona
 * @param perfilPuesto - Perfil del puesto
 * @returns Objeto con compatibilidad por eje (0-100)
 */
export function calcularCompatibilidadPorEje(
  perfil: Perfil,
  perfilPuesto: Perfil
): Record<Eje, number> {
  // Calcular la diferencia absoluta por eje y convertirla a compatibilidad
  const diferenciaR = Math.abs(perfil.R - perfilPuesto.R);
  const diferenciaE = Math.abs(perfil.E - perfilPuesto.E);
  const diferenciaP = Math.abs(perfil.P - perfilPuesto.P);
  const diferenciaN = Math.abs(perfil.N - perfilPuesto.N);
  const diferenciaA = Math.abs(perfil.A - perfilPuesto.A);
  
  // Convertir diferencia a compatibilidad (0-100)
  // Fórmula: Compatibilidad = 100 - (Diferencia)
  return {
    R: Math.max(0, 100 - diferenciaR),
    E: Math.max(0, 100 - diferenciaE),
    P: Math.max(0, 100 - diferenciaP),
    N: Math.max(0, 100 - diferenciaN),
    A: Math.max(0, 100 - diferenciaA)
  };
}

/**
 * Calcula la distancia euclidiana ponderada entre un perfil y un perfil de puesto
 * según los pesos definidos para una competencia
 * 
 * @param perfil - Perfil de la persona
 * @param perfilPuesto - Perfil del puesto
 * @param pesos - Pesos para cada eje
 * @returns Distancia euclidiana ponderada
 */
export function calcularDistanciaPonderada(
  perfil: Perfil,
  perfilPuesto: Perfil,
  pesos: Record<Eje, number>
): number {
  return Math.sqrt(
    pesos.R * Math.pow(perfil.R - perfilPuesto.R, 2) +
    pesos.E * Math.pow(perfil.E - perfilPuesto.E, 2) +
    pesos.P * Math.pow(perfil.P - perfilPuesto.P, 2) +
    pesos.N * Math.pow(perfil.N - perfilPuesto.N, 2) +
    pesos.A * Math.pow(perfil.A - perfilPuesto.A, 2)
  );
}

/**
 * Calcula la distancia ponderada máxima posible según los pesos definidos
 * 
 * @param pesos - Pesos para cada eje
 * @returns Distancia ponderada máxima
 */
export function calcularDistanciaPonderadaMaxima(pesos: Record<Eje, number>): number {
  return Math.sqrt(
    pesos.R * Math.pow(100, 2) +
    pesos.E * Math.pow(100, 2) +
    pesos.P * Math.pow(100, 2) +
    pesos.N * Math.pow(100, 2) +
    pesos.A * Math.pow(100, 2)
  );
}

/**
 * Calcula el índice de compatibilidad por competencia
 * 
 * @param perfil - Perfil de la persona
 * @param perfilPuesto - Perfil del puesto
 * @param competencia - Competencia con pesos para cada eje
 * @returns Índice de compatibilidad para la competencia (0-100)
 */
export function calcularIndiceCompatibilidadCompetencia(
  perfil: Perfil,
  perfilPuesto: Perfil,
  competencia: Competencia
): number {
  const distancia = calcularDistanciaPonderada(perfil, perfilPuesto, competencia.pesos);
  const distanciaMaxima = calcularDistanciaPonderadaMaxima(competencia.pesos);
  
  // Fórmula: ICC = 100 - (20 * Distancia_Ponderada_Normalizada)
  const indiceCompatibilidad = 100 - (20 * (distancia / distanciaMaxima));
  
  // Limitar el índice entre 0 y 100
  return Math.max(0, Math.min(100, Math.round(indiceCompatibilidad)));
}

/**
 * Calcula la compatibilidad por competencia para todas las competencias de un puesto
 * 
 * @param perfil - Perfil de la persona
 * @param perfilPuesto - Perfil del puesto
 * @param competencias - Array de competencias del puesto
 * @returns Objeto con índices de compatibilidad por competencia
 */
export function calcularCompatibilidadPorCompetencia(
  perfil: Perfil,
  perfilPuesto: Perfil,
  competencias: Competencia[]
): Record<string, number> {
  const resultado: Record<string, number> = {};
  
  competencias.forEach(competencia => {
    resultado[competencia.id] = calcularIndiceCompatibilidadCompetencia(
      perfil,
      perfilPuesto,
      competencia
    );
  });
  
  return resultado;
}

/**
 * Calcula el resultado completo de compatibilidad entre un perfil y un puesto
 * 
 * @param perfil - Perfil de la persona
 * @param perfilPuesto - Perfil del puesto
 * @returns Resultado de compatibilidad completo
 */
export function calcularCompatibilidad(
  perfil: Perfil,
  perfilPuesto: PerfilPuesto
): ResultadoCompatibilidad {
  return {
    indiceCompatibilidad: calcularIndiceCompatibilidad(perfil, perfilPuesto.perfil),
    compatibilidadPorEje: calcularCompatibilidadPorEje(perfil, perfilPuesto.perfil),
    compatibilidadPorCompetencia: calcularCompatibilidadPorCompetencia(
      perfil,
      perfilPuesto.perfil,
      perfilPuesto.competencias
    )
  };
}

/**
 * Interpreta el nivel de compatibilidad
 * 
 * @param indiceCompatibilidad - Índice de compatibilidad (0-100)
 * @returns Interpretación textual
 */
export function interpretarCompatibilidad(indiceCompatibilidad: number): string {
  if (indiceCompatibilidad >= 90) {
    return "Compatibilidad excelente. Ajuste óptimo entre el perfil de la persona y los requerimientos del puesto.";
  } else if (indiceCompatibilidad >= 80) {
    return "Compatibilidad muy alta. Muy buen ajuste entre el perfil de la persona y los requerimientos del puesto.";
  } else if (indiceCompatibilidad >= 70) {
    return "Compatibilidad alta. Buen ajuste entre el perfil de la persona y los requerimientos del puesto.";
  } else if (indiceCompatibilidad >= 60) {
    return "Compatibilidad media. Ajuste aceptable entre el perfil de la persona y los requerimientos del puesto.";
  } else if (indiceCompatibilidad >= 50) {
    return "Compatibilidad moderada. Algunos aspectos del perfil se ajustan a los requerimientos del puesto.";
  } else if (indiceCompatibilidad >= 40) {
    return "Compatibilidad baja. Pocos aspectos del perfil se ajustan a los requerimientos del puesto.";
  } else {
    return "Compatibilidad muy baja. El perfil de la persona difiere significativamente de los requerimientos del puesto.";
  }
}

/**
 * Identifica las fortalezas y áreas de mejora basadas en la compatibilidad por eje
 * 
 * @param compatibilidadPorEje - Objeto con compatibilidad por eje
 * @returns Objeto con fortalezas y áreas de mejora
 */
export function identificarFortalezasYAreas(
  compatibilidadPorEje: Record<Eje, number>
): { fortalezas: Eje[]; areas: Eje[] } {
  const fortalezas: Eje[] = [];
  const areas: Eje[] = [];
  
  // Identificar fortalezas (compatibilidad >= 70) y áreas de mejora (compatibilidad < 50)
  Object.entries(compatibilidadPorEje).forEach(([eje, compatibilidad]) => {
    if (compatibilidad >= 70) {
      fortalezas.push(eje as Eje);
    } else if (compatibilidad < 50) {
      areas.push(eje as Eje);
    }
  });
  
  return { fortalezas, areas };
}

/**
 * Genera recomendaciones de desarrollo basadas en áreas de mejora
 * 
 * @param areas - Array de ejes que representan áreas de mejora
 * @returns Array de recomendaciones
 */
export function generarRecomendaciones(areas: Eje[]): string[] {
  const recomendaciones: string[] = [];
  
  areas.forEach(eje => {
    switch (eje) {
      case 'R':
        recomendaciones.push("Desarrollar habilidades para la toma de decisiones y gestión de riesgos.");
        recomendaciones.push("Practicar la asertividad y la capacidad de enfrentar situaciones difíciles.");
        break;
      case 'E':
        recomendaciones.push("Fortalecer habilidades de comunicación y networking.");
        recomendaciones.push("Buscar oportunidades para desarrollar influencia e impacto interpersonal.");
        break;
      case 'P':
        recomendaciones.push("Trabajar en la constancia y seguimiento de proyectos a largo plazo.");
        recomendaciones.push("Desarrollar mayor tolerancia a la rutina y actividades que requieren persistencia.");
        break;
      case 'N':
        recomendaciones.push("Mejorar habilidades de análisis, planificación y atención al detalle.");
        recomendaciones.push("Desarrollar mayor disciplina y adherencia a procedimientos establecidos.");
        break;
      case 'A':
        recomendaciones.push("Fortalecer el autocontrol emocional y la objetividad en situaciones de presión.");
        recomendaciones.push("Trabajar en habilidades de diplomacia y manejo de conflictos.");
        break;
    }
  });
  
  return recomendaciones;
}
