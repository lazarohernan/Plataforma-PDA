/**
 * Módulo de cálculo de indicadores derivados para el algoritmo pentadimensional PDA
 */

import { Perfil, IndicadoresDerivados } from './types';
import { calcularIntensidades } from './normalizacion';

/**
 * Calcula el nivel de energía de un perfil
 * Representa el quantum total de energía disponible/utilizada
 * Se calcula como la suma de los valores de los ejes R, E, P y N
 * 
 * @param perfil - Perfil normalizado
 * @returns Nivel de energía
 */
export function calcularNivelEnergia(perfil: Perfil): number {
  return perfil.R + perfil.E + perfil.P + perfil.N;
}

/**
 * Calcula el equilibrio energético entre dos perfiles
 * Expresa la diferencia percibida entre energía demandada y disponible
 * 
 * @param perfilAdaptado - Perfil adaptado normalizado
 * @param perfilNatural - Perfil natural normalizado
 * @returns Equilibrio energético
 */
export function calcularEquilibrioEnergetico(
  perfilAdaptado: Perfil,
  perfilNatural: Perfil
): number {
  const energiaAdaptado = calcularNivelEnergia(perfilAdaptado);
  const energiaNatural = calcularNivelEnergia(perfilNatural);
  
  return energiaAdaptado - energiaNatural;
}

/**
 * Calcula el indicador de toma de decisiones
 * Evalúa el estilo decisorio basado en la relación entre Riesgo y Normatividad
 * 
 * @param perfil - Perfil normalizado
 * @returns Indicador de toma de decisiones
 */
export function calcularTomaDecisiones(perfil: Perfil): number {
  return perfil.R - perfil.N;
}

/**
 * Calcula la modificación del perfil
 * Mide la capacidad de adaptación conductual
 * 
 * @param perfilNatural - Perfil natural normalizado
 * @param perfilAdaptado - Perfil adaptado normalizado
 * @returns Modificación del perfil
 */
export function calcularModificacionPerfil(
  perfilNatural: Perfil,
  perfilAdaptado: Perfil
): number {
  return (
    Math.abs(perfilNatural.R - perfilAdaptado.R) +
    Math.abs(perfilNatural.E - perfilAdaptado.E) +
    Math.abs(perfilNatural.P - perfilAdaptado.P) +
    Math.abs(perfilNatural.N - perfilAdaptado.N) +
    Math.abs(perfilNatural.A - perfilAdaptado.A)
  );
}

/**
 * Calcula la intensidad del perfil
 * Define la intensidad global del perfil
 * 
 * @param perfil - Perfil normalizado
 * @returns Intensidad del perfil
 */
export function calcularIntensidadPerfil(perfil: Perfil): number {
  const intensidades = calcularIntensidades(perfil);
  
  return (
    intensidades.R +
    intensidades.E +
    intensidades.P +
    intensidades.N +
    intensidades.A
  );
}

/**
 * Calcula el indicador de consistencia
 * Evalúa la coherencia de las respuestas
 * 
 * @param perfilNatural - Perfil natural normalizado
 * @param perfilAdaptado - Perfil adaptado normalizado
 * @param contradicciones - Número de contradicciones detectadas
 * @param tiempoCompletado - Tiempo de completado en segundos
 * @returns Indicador de consistencia (0-100)
 */
export function calcularConsistencia(
  perfilNatural: Perfil,
  perfilAdaptado: Perfil,
  contradicciones: number,
  tiempoCompletado: number
): number {
  // Factores de consistencia
  
  // 1. Coherencia entre perfiles (40%)
  // Si hay mucha diferencia entre perfiles, puede ser normal
  // Si hay poca diferencia, debería haber coherencia en patrones
  const modificacion = calcularModificacionPerfil(perfilNatural, perfilAdaptado);
  const coherenciaPerfiles = modificacion > 60 ? 40 : (40 - (60 - modificacion) * 0.4);
  
  // 2. Contradicciones internas (30%)
  // Penaliza por contradicciones detectadas
  const penalizacionContradicciones = Math.min(30, contradicciones * 5);
  const coherenciaInterna = 30 - penalizacionContradicciones;
  
  // 3. Tiempo de completado (20%)
  // Muy rápido o muy lento puede indicar problemas
  // Rango óptimo: entre 5 y 15 minutos (300-900 segundos)
  let coherenciaTiempo = 20;
  if (tiempoCompletado < 300) {
    // Penalización por completado demasiado rápido
    coherenciaTiempo = 20 * (tiempoCompletado / 300);
  } else if (tiempoCompletado > 900) {
    // Penalización por completado demasiado lento
    coherenciaTiempo = 20 * (1 - Math.min(1, (tiempoCompletado - 900) / 900));
  }
  
  // 4. Intensidad de perfiles (10%)
  // Perfiles extremos en todos los ejes pueden indicar problemas
  const intensidadNatural = calcularIntensidadPerfil(perfilNatural);
  const intensidadAdaptado = calcularIntensidadPerfil(perfilAdaptado);
  const intensidadPromedio = (intensidadNatural + intensidadAdaptado) / 2;
  
  // Penalizar intensidades muy altas (>8) o muy bajas (<2)
  let coherenciaIntensidad = 10;
  if (intensidadPromedio > 8) {
    coherenciaIntensidad = 10 * (1 - Math.min(1, (intensidadPromedio - 8) / 2));
  } else if (intensidadPromedio < 2) {
    coherenciaIntensidad = 10 * (intensidadPromedio / 2);
  }
  
  // Calcular consistencia total
  const consistenciaTotal = coherenciaPerfiles + coherenciaInterna + coherenciaTiempo + coherenciaIntensidad;
  
  // Normalizar a escala 0-100 y redondear
  return Math.round(consistenciaTotal);
}

/**
 * Calcula todos los indicadores derivados
 * 
 * @param perfilNatural - Perfil natural normalizado
 * @param perfilAdaptado - Perfil adaptado normalizado
 * @param contradicciones - Número de contradicciones detectadas
 * @param tiempoCompletado - Tiempo de completado en segundos
 * @returns Objeto con todos los indicadores derivados
 */
export function calcularIndicadores(
  perfilNatural: Perfil,
  perfilAdaptado: Perfil,
  contradicciones: number = 0,
  tiempoCompletado: number = 600
): IndicadoresDerivados {
  return {
    nivelEnergia: calcularNivelEnergia(perfilNatural),
    equilibrioEnergetico: calcularEquilibrioEnergetico(perfilAdaptado, perfilNatural),
    tomaDecisiones: calcularTomaDecisiones(perfilNatural),
    modificacionPerfil: calcularModificacionPerfil(perfilNatural, perfilAdaptado),
    intensidadPerfil: calcularIntensidadPerfil(perfilNatural),
    consistencia: calcularConsistencia(perfilNatural, perfilAdaptado, contradicciones, tiempoCompletado)
  };
}

/**
 * Interpreta el nivel de energía
 * 
 * @param nivelEnergia - Valor del nivel de energía
 * @returns Interpretación textual
 */
export function interpretarNivelEnergia(nivelEnergia: number): string {
  if (nivelEnergia > 240) {
    return "Nivel de energía muy alto. Indica una persona muy activa y dinámica, con alta capacidad de acción.";
  } else if (nivelEnergia > 220) {
    return "Nivel de energía alto. Indica una persona activa, con buena capacidad de acción y dinamismo.";
  } else if (nivelEnergia > 180) {
    return "Nivel de energía moderado. Indica una persona con capacidad de acción equilibrada.";
  } else if (nivelEnergia > 160) {
    return "Nivel de energía bajo. Indica una persona que tiende a conservar su energía y ser selectiva en sus acciones.";
  } else {
    return "Nivel de energía muy bajo. Indica una persona que conserva mucho su energía y puede mostrar poca actividad externa.";
  }
}

/**
 * Interpreta el equilibrio energético
 * 
 * @param equilibrioEnergetico - Valor del equilibrio energético
 * @returns Interpretación textual
 */
export function interpretarEquilibrioEnergetico(equilibrioEnergetico: number): string {
  if (equilibrioEnergetico > 30) {
    return "Percepción de sobreexigencia muy alta. La persona siente que el entorno le demanda mucha más energía de la que naturalmente dispone.";
  } else if (equilibrioEnergetico > 15) {
    return "Percepción de sobreexigencia moderada. La persona siente que el entorno le demanda más energía de la que naturalmente dispone.";
  } else if (equilibrioEnergetico >= -15) {
    return "Equilibrio energético. La persona siente que la energía que el entorno le demanda es similar a la que naturalmente dispone.";
  } else if (equilibrioEnergetico >= -30) {
    return "Percepción de subutilización moderada. La persona siente que el entorno le demanda menos energía de la que naturalmente dispone.";
  } else {
    return "Percepción de subutilización muy alta. La persona siente que el entorno le demanda mucha menos energía de la que naturalmente dispone.";
  }
}

/**
 * Interpreta el indicador de toma de decisiones
 * 
 * @param tomaDecisiones - Valor del indicador de toma de decisiones
 * @returns Interpretación textual
 */
export function interpretarTomaDecisiones(tomaDecisiones: number): string {
  if (tomaDecisiones > 20) {
    return "Decisor orientado al riesgo. Tiende a tomar decisiones rápidas, asumiendo riesgos y con menor análisis previo.";
  } else if (tomaDecisiones > 5) {
    return "Decisor moderadamente orientado al riesgo. Tiende a equilibrar la rapidez con cierto nivel de análisis.";
  } else if (tomaDecisiones >= -5) {
    return "Decisor balanceado. Equilibra bien el análisis con la acción en la toma de decisiones.";
  } else if (tomaDecisiones >= -20) {
    return "Decisor moderadamente orientado a la seguridad. Tiende a analizar bien las situaciones antes de decidir.";
  } else {
    return "Decisor orientado a la seguridad. Prioriza el análisis exhaustivo y la minimización de riesgos antes de tomar decisiones.";
  }
}
