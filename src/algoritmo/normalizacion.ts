/**
 * Módulo de normalización para el algoritmo pentadimensional PDA
 */

import { ValoresCrudos, Perfil, ParametrosNormalizacion, Eje } from './types';

/**
 * Parámetros de normalización por defecto
 * Estos valores deberían ser ajustados basados en datos empíricos
 * de una muestra representativa
 */
export const PARAMETROS_NORMALIZACION_DEFAULT: ParametrosNormalizacion = {
  R: { media: 5, desviacionEstandar: 1.5 },
  E: { media: 5, desviacionEstandar: 1.5 },
  P: { media: 5, desviacionEstandar: 1.5 },
  N: { media: 5, desviacionEstandar: 1.5 },
  A: { media: 5, desviacionEstandar: 1.5 }
};

/**
 * Normaliza los valores crudos a una escala estándar (valores-C)
 * con media 50 y desviación estándar 10
 * 
 * @param valoresCrudos - Valores crudos calculados
 * @param parametros - Parámetros de normalización (opcional)
 * @returns Perfil normalizado
 */
export function normalizar(
  valoresCrudos: ValoresCrudos,
  parametros: ParametrosNormalizacion = PARAMETROS_NORMALIZACION_DEFAULT
): Perfil {
  return {
    R: normalizarEje(valoresCrudos.R, parametros.R),
    E: normalizarEje(valoresCrudos.E, parametros.E),
    P: normalizarEje(valoresCrudos.P, parametros.P),
    N: normalizarEje(valoresCrudos.N, parametros.N),
    A: normalizarEje(valoresCrudos.A, parametros.A)
  };
}

/**
 * Normaliza un valor crudo para un eje específico
 * 
 * @param valorCrudo - Valor crudo del eje
 * @param parametros - Parámetros de normalización para el eje
 * @returns Valor normalizado (valor-C)
 */
function normalizarEje(
  valorCrudo: number,
  parametros: { media: number; desviacionEstandar: number }
): number {
  // Fórmula: Valor-C = 50 + 10 * [(VC - Media) / DS]
  const valorNormalizado = 50 + 10 * ((valorCrudo - parametros.media) / parametros.desviacionEstandar);
  
  // Limitar el valor entre 0 y 100
  return Math.max(0, Math.min(100, Math.round(valorNormalizado)));
}

/**
 * Desnormaliza un perfil para obtener los valores crudos aproximados
 * Útil para análisis y depuración
 * 
 * @param perfil - Perfil normalizado
 * @param parametros - Parámetros de normalización
 * @returns Valores crudos aproximados
 */
export function desnormalizar(
  perfil: Perfil,
  parametros: ParametrosNormalizacion = PARAMETROS_NORMALIZACION_DEFAULT
): ValoresCrudos {
  return {
    R: desnormalizarEje(perfil.R, parametros.R),
    E: desnormalizarEje(perfil.E, parametros.E),
    P: desnormalizarEje(perfil.P, parametros.P),
    N: desnormalizarEje(perfil.N, parametros.N),
    A: desnormalizarEje(perfil.A, parametros.A)
  };
}

/**
 * Desnormaliza un valor normalizado para un eje específico
 * 
 * @param valorNormalizado - Valor normalizado (valor-C)
 * @param parametros - Parámetros de normalización para el eje
 * @returns Valor crudo aproximado
 */
function desnormalizarEje(
  valorNormalizado: number,
  parametros: { media: number; desviacionEstandar: number }
): number {
  // Fórmula inversa: VC = ((Valor-C - 50) / 10) * DS + Media
  const valorCrudo = ((valorNormalizado - 50) / 10) * parametros.desviacionEstandar + parametros.media;
  
  // Redondear y asegurar que no sea negativo
  return Math.max(0, Math.round(valorCrudo));
}

/**
 * Calcula la intensidad de cada eje en un perfil
 * La intensidad se define como la desviación absoluta de la media (50)
 * dividida por la desviación estándar (10)
 * 
 * @param perfil - Perfil normalizado
 * @returns Objeto con intensidades por eje
 */
export function calcularIntensidades(perfil: Perfil): Record<Eje, number> {
  return {
    R: Math.abs(perfil.R - 50) / 10,
    E: Math.abs(perfil.E - 50) / 10,
    P: Math.abs(perfil.P - 50) / 10,
    N: Math.abs(perfil.N - 50) / 10,
    A: Math.abs(perfil.A - 50) / 10
  };
}

/**
 * Ajusta los parámetros de normalización basados en datos empíricos
 * Esta función debería ser utilizada durante la calibración del sistema
 * con datos reales de una muestra representativa
 * 
 * @param muestras - Array de valores crudos de múltiples evaluaciones
 * @returns Parámetros de normalización ajustados
 */
export function calcularParametrosNormalizacion(muestras: ValoresCrudos[]): ParametrosNormalizacion {
  if (muestras.length === 0) {
    return PARAMETROS_NORMALIZACION_DEFAULT;
  }
  
  // Calcular medias
  const sumas: ValoresCrudos = muestras.reduce(
    (acc, muestra) => ({
      R: acc.R + muestra.R,
      E: acc.E + muestra.E,
      P: acc.P + muestra.P,
      N: acc.N + muestra.N,
      A: acc.A + muestra.A
    }),
    { R: 0, E: 0, P: 0, N: 0, A: 0 }
  );
  
  const medias: ValoresCrudos = {
    R: sumas.R / muestras.length,
    E: sumas.E / muestras.length,
    P: sumas.P / muestras.length,
    N: sumas.N / muestras.length,
    A: sumas.A / muestras.length
  };
  
  // Calcular desviaciones estándar
  const sumasCuadrados: ValoresCrudos = muestras.reduce(
    (acc, muestra) => ({
      R: acc.R + Math.pow(muestra.R - medias.R, 2),
      E: acc.E + Math.pow(muestra.E - medias.E, 2),
      P: acc.P + Math.pow(muestra.P - medias.P, 2),
      N: acc.N + Math.pow(muestra.N - medias.N, 2),
      A: acc.A + Math.pow(muestra.A - medias.A, 2)
    }),
    { R: 0, E: 0, P: 0, N: 0, A: 0 }
  );
  
  const desviacionesEstandar: ValoresCrudos = {
    R: Math.sqrt(sumasCuadrados.R / muestras.length),
    E: Math.sqrt(sumasCuadrados.E / muestras.length),
    P: Math.sqrt(sumasCuadrados.P / muestras.length),
    N: Math.sqrt(sumasCuadrados.N / muestras.length),
    A: Math.sqrt(sumasCuadrados.A / muestras.length)
  };
  
  // Evitar divisiones por cero
  const ajustarDesviacion = (desviacion: number) => desviacion > 0 ? desviacion : 1;
  
  return {
    R: { media: medias.R, desviacionEstandar: ajustarDesviacion(desviacionesEstandar.R) },
    E: { media: medias.E, desviacionEstandar: ajustarDesviacion(desviacionesEstandar.E) },
    P: { media: medias.P, desviacionEstandar: ajustarDesviacion(desviacionesEstandar.P) },
    N: { media: medias.N, desviacionEstandar: ajustarDesviacion(desviacionesEstandar.N) },
    A: { media: medias.A, desviacionEstandar: ajustarDesviacion(desviacionesEstandar.A) }
  };
}
