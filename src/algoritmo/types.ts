/**
 * Tipos y interfaces para el algoritmo pentadimensional PDA
 */

/**
 * Representa un descriptor conductual
 */
export interface Descriptor {
  id: string;
  label: string;
  eje: Eje;
}

/**
 * Ejes dimensionales del modelo PDA
 * R: Riesgo - Proactividad en entornos percibidos como desfavorables
 * E: Extroversión - Proactividad en entornos percibidos como favorables
 * P: Paciencia - Adaptación pasiva en entornos percibidos como favorables
 * N: Normatividad - Adaptación pasiva en entornos percibidos como desfavorables
 * A: Autocontrol - Gestión emocional y autocontrol
 */
export type Eje = 'R' | 'E' | 'P' | 'N' | 'A';

/**
 * Tipo de perfil (natural o adaptado)
 */
export type ProfileType = 'natural' | 'adapted';

/**
 * Valores crudos para cada eje
 */
export interface ValoresCrudos {
  R: number;
  E: number;
  P: number;
  N: number;
  A: number;
}

/**
 * Perfil pentadimensional normalizado
 */
export interface Perfil {
  R: number; // Riesgo
  E: number; // Extroversión
  P: number; // Paciencia
  N: number; // Normatividad
  A: number; // Autocontrol
}

/**
 * Parámetros de normalización para cada eje
 */
export interface ParametrosNormalizacion {
  R: { media: number; desviacionEstandar: number };
  E: { media: number; desviacionEstandar: number };
  P: { media: number; desviacionEstandar: number };
  N: { media: number; desviacionEstandar: number };
  A: { media: number; desviacionEstandar: number };
}

/**
 * Indicadores derivados del perfil
 */
export interface IndicadoresDerivados {
  nivelEnergia: number;              // Suma de R, E, P, N
  equilibrioEnergetico: number;      // Diferencia entre perfiles
  tomaDecisiones: number;            // R - N
  modificacionPerfil: number;        // Suma de diferencias absolutas
  intensidadPerfil: number;          // Suma de intensidades
  consistencia: number;              // Indicador de consistencia
}

/**
 * Perfil de puesto para análisis de compatibilidad
 */
export interface PerfilPuesto {
  id: string;
  nombre: string;
  descripcion: string;
  perfil: Perfil;
  competencias: Competencia[];
}

/**
 * Competencia con pesos para cada eje
 */
export interface Competencia {
  id: string;
  nombre: string;
  descripcion: string;
  pesos: {
    R: number;
    E: number;
    P: number;
    N: number;
    A: number;
  };
}

/**
 * Resultado de compatibilidad entre perfil y puesto
 */
export interface ResultadoCompatibilidad {
  indiceCompatibilidad: number;
  compatibilidadPorEje: {
    R: number;
    E: number;
    P: number;
    N: number;
    A: number;
  };
  compatibilidadPorCompetencia: {
    [competenciaId: string]: number;
  };
}

/**
 * Resultado completo de la evaluación
 */
export interface ResultadoEvaluacion {
  perfilNatural: Perfil;
  perfilAdaptado: Perfil;
  indicadores: IndicadoresDerivados;
  compatibilidad?: ResultadoCompatibilidad;
}
