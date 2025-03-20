/**
 * Punto de entrada principal para el algoritmo pentadimensional PDA
 * Este módulo exporta todas las funcionalidades del algoritmo
 */

// Importar funcionalidades necesarias
import { Descriptor, Perfil, PerfilPuesto, ResultadoEvaluacion } from './types';
import { 
  calcularValoresCrudos, 
  detectarContradicciones, 
  calcularDistribucion, 
  validarSeleccion 
} from './calculadora';
import { 
  normalizar, 
  desnormalizar, 
  calcularIntensidades, 
  calcularParametrosNormalizacion, 
  PARAMETROS_NORMALIZACION_DEFAULT 
} from './normalizacion';
import { 
  calcularNivelEnergia, 
  calcularEquilibrioEnergetico, 
  calcularTomaDecisiones, 
  calcularModificacionPerfil, 
  calcularIntensidadPerfil, 
  calcularConsistencia, 
  calcularIndicadores, 
  interpretarNivelEnergia, 
  interpretarEquilibrioEnergetico, 
  interpretarTomaDecisiones 
} from './indicadores';
import { 
  calcularDistanciaEuclidiana, 
  calcularDistanciaMaxima, 
  calcularIndiceCompatibilidad, 
  calcularCompatibilidadPorEje, 
  calcularDistanciaPonderada, 
  calcularDistanciaPonderadaMaxima, 
  calcularIndiceCompatibilidadCompetencia, 
  calcularCompatibilidadPorCompetencia, 
  calcularCompatibilidad, 
  interpretarCompatibilidad, 
  identificarFortalezasYAreas, 
  generarRecomendaciones 
} from './compatibilidad';

// Re-exportar todas las funcionalidades
export * from './types';
export {
  calcularValoresCrudos,
  detectarContradicciones,
  calcularDistribucion,
  validarSeleccion,
  normalizar,
  desnormalizar,
  calcularIntensidades,
  calcularParametrosNormalizacion,
  PARAMETROS_NORMALIZACION_DEFAULT,
  calcularNivelEnergia,
  calcularEquilibrioEnergetico,
  calcularTomaDecisiones,
  calcularModificacionPerfil,
  calcularIntensidadPerfil,
  calcularConsistencia,
  calcularIndicadores,
  interpretarNivelEnergia,
  interpretarEquilibrioEnergetico,
  interpretarTomaDecisiones,
  calcularDistanciaEuclidiana,
  calcularDistanciaMaxima,
  calcularIndiceCompatibilidad,
  calcularCompatibilidadPorEje,
  calcularDistanciaPonderada,
  calcularDistanciaPonderadaMaxima,
  calcularIndiceCompatibilidadCompetencia,
  calcularCompatibilidadPorCompetencia,
  calcularCompatibilidad,
  interpretarCompatibilidad,
  identificarFortalezasYAreas,
  generarRecomendaciones
};

/**
 * Procesa una evaluación completa, desde los descriptores seleccionados
 * hasta el resultado final con perfiles e indicadores
 * 
 * @param descriptoresNaturalSeleccionados - IDs de descriptores seleccionados para el perfil natural
 * @param descriptoresAdaptadoSeleccionados - IDs de descriptores seleccionados para el perfil adaptado
 * @param todosLosDescriptores - Array de todos los descriptores disponibles
 * @param tiempoCompletado - Tiempo de completado en segundos
 * @param perfilPuesto - Perfil de puesto para análisis de compatibilidad (opcional)
 * @returns Resultado completo de la evaluación
 */
export function procesarEvaluacion(
  descriptoresNaturalSeleccionados: string[],
  descriptoresAdaptadoSeleccionados: string[],
  todosLosDescriptores: Descriptor[],
  tiempoCompletado: number = 600,
  perfilPuesto?: PerfilPuesto
): ResultadoEvaluacion {
  // Calcular valores crudos
  const valoresCrudosNatural = calcularValoresCrudos(
    descriptoresNaturalSeleccionados,
    todosLosDescriptores
  );
  
  const valoresCrudosAdaptado = calcularValoresCrudos(
    descriptoresAdaptadoSeleccionados,
    todosLosDescriptores
  );
  
  // Detectar contradicciones
  const contradiccionesNatural = detectarContradicciones(
    descriptoresNaturalSeleccionados,
    todosLosDescriptores
  );
  
  const contradiccionesAdaptado = detectarContradicciones(
    descriptoresAdaptadoSeleccionados,
    todosLosDescriptores
  );
  
  const contradicciones = contradiccionesNatural + contradiccionesAdaptado;
  
  // Normalizar perfiles
  const perfilNatural = normalizar(valoresCrudosNatural);
  const perfilAdaptado = normalizar(valoresCrudosAdaptado);
  
  // Calcular indicadores
  const indicadores = calcularIndicadores(
    perfilNatural,
    perfilAdaptado,
    contradicciones,
    tiempoCompletado
  );
  
  // Crear resultado base
  const resultado: ResultadoEvaluacion = {
    perfilNatural,
    perfilAdaptado,
    indicadores
  };
  
  // Añadir compatibilidad si se proporciona perfil de puesto
  if (perfilPuesto) {
    resultado.compatibilidad = calcularCompatibilidad(perfilNatural, perfilPuesto);
  }
  
  return resultado;
}

/**
 * Versión simplificada para procesar una evaluación con valores ya normalizados
 * Útil para pruebas y demostraciones
 * 
 * @param perfilNatural - Perfil natural normalizado
 * @param perfilAdaptado - Perfil adaptado normalizado
 * @param perfilPuesto - Perfil de puesto para análisis de compatibilidad (opcional)
 * @returns Resultado de la evaluación
 */
export function procesarPerfilesNormalizados(
  perfilNatural: Perfil,
  perfilAdaptado: Perfil,
  perfilPuesto?: PerfilPuesto
): ResultadoEvaluacion {
  // Calcular indicadores
  const indicadores = calcularIndicadores(perfilNatural, perfilAdaptado);
  
  // Crear resultado base
  const resultado: ResultadoEvaluacion = {
    perfilNatural,
    perfilAdaptado,
    indicadores
  };
  
  // Añadir compatibilidad si se proporciona perfil de puesto
  if (perfilPuesto) {
    resultado.compatibilidad = calcularCompatibilidad(perfilNatural, perfilPuesto);
  }
  
  return resultado;
}
