/**
 * Módulo de cálculo de valores crudos para el algoritmo pentadimensional PDA
 */

import { Descriptor, Eje, ValoresCrudos } from './types';

/**
 * Calcula los valores crudos para cada eje basado en los descriptores seleccionados
 * 
 * @param descriptoresSeleccionados - Array de IDs de descriptores seleccionados
 * @param todosLosDescriptores - Array de todos los descriptores disponibles
 * @returns Objeto con los valores crudos para cada eje
 */
export function calcularValoresCrudos(
  descriptoresSeleccionados: string[],
  todosLosDescriptores: Descriptor[]
): ValoresCrudos {
  // Inicializar contadores para cada eje
  const conteo: Record<Eje, number> = {
    R: 0,
    E: 0,
    P: 0,
    N: 0,
    A: 0
  };
  
  // Contar descriptores seleccionados por eje
  descriptoresSeleccionados.forEach(id => {
    const descriptor = todosLosDescriptores.find(d => d.id === id);
    if (descriptor) {
      conteo[descriptor.eje]++;
    }
  });
  
  return {
    R: conteo.R,
    E: conteo.E,
    P: conteo.P,
    N: conteo.N,
    A: conteo.A
  };
}

/**
 * Verifica si hay descriptores contradictorios seleccionados
 * Esta función identifica patrones de selección que podrían indicar
 * inconsistencias en las respuestas
 * 
 * @param descriptoresSeleccionados - Array de IDs de descriptores seleccionados
 * @param todosLosDescriptores - Array de todos los descriptores disponibles
 * @returns Número de contradicciones detectadas
 */
export function detectarContradicciones(
  descriptoresSeleccionados: string[],
  todosLosDescriptores: Descriptor[]
): number {
  // Mapeo de descriptores seleccionados por eje
  const seleccionadosPorEje: Record<Eje, string[]> = {
    R: [],
    E: [],
    P: [],
    N: [],
    A: []
  };
  
  // Agrupar descriptores seleccionados por eje
  descriptoresSeleccionados.forEach(id => {
    const descriptor = todosLosDescriptores.find(d => d.id === id);
    if (descriptor) {
      seleccionadosPorEje[descriptor.eje].push(id);
    }
  });
  
  // Detectar contradicciones basadas en patrones conocidos
  let contradicciones = 0;
  
  // Contradicción 1: Alto Riesgo (R) y alta Normatividad (N)
  // Estos ejes son conceptualmente opuestos
  if (seleccionadosPorEje.R.length > 5 && seleccionadosPorEje.N.length > 5) {
    contradicciones += Math.min(seleccionadosPorEje.R.length, seleccionadosPorEje.N.length) * 0.5;
  }
  
  // Contradicción 2: Alta Extroversión (E) y alta Paciencia (P)
  // Estos ejes también tienden a ser opuestos
  if (seleccionadosPorEje.E.length > 5 && seleccionadosPorEje.P.length > 5) {
    contradicciones += Math.min(seleccionadosPorEje.E.length, seleccionadosPorEje.P.length) * 0.5;
  }
  
  // Contradicción 3: Selección excesiva en todos los ejes
  // Indica posible falta de discriminación
  const totalSeleccionado = descriptoresSeleccionados.length;
  const totalDisponible = todosLosDescriptores.length;
  if (totalSeleccionado > totalDisponible * 0.7) {
    contradicciones += 5;
  }
  
  return contradicciones;
}

/**
 * Calcula la distribución de selecciones por eje
 * Útil para análisis de patrones de respuesta
 * 
 * @param valoresCrudos - Valores crudos calculados
 * @returns Objeto con porcentajes de distribución
 */
export function calcularDistribucion(valoresCrudos: ValoresCrudos): Record<Eje, number> {
  const total = Object.values(valoresCrudos).reduce((sum, val) => sum + val, 0);
  
  if (total === 0) {
    return { R: 0, E: 0, P: 0, N: 0, A: 0 };
  }
  
  return {
    R: (valoresCrudos.R / total) * 100,
    E: (valoresCrudos.E / total) * 100,
    P: (valoresCrudos.P / total) * 100,
    N: (valoresCrudos.N / total) * 100,
    A: (valoresCrudos.A / total) * 100
  };
}

/**
 * Verifica si la selección cumple con los criterios recomendados
 * 
 * @param valoresCrudos - Valores crudos calculados
 * @param minRecomendado - Mínimo de selecciones recomendado
 * @param maxRecomendado - Máximo de selecciones recomendado
 * @returns Objeto con información de validez
 */
export function validarSeleccion(
  valoresCrudos: ValoresCrudos,
  minRecomendado: number = 10,
  maxRecomendado: number = 20
): { valido: boolean; mensaje: string } {
  const total = Object.values(valoresCrudos).reduce((sum, val) => sum + val, 0);
  
  if (total < minRecomendado) {
    return {
      valido: false,
      mensaje: `Se recomienda seleccionar al menos ${minRecomendado} descriptores. Actualmente: ${total}`
    };
  }
  
  if (total > maxRecomendado) {
    return {
      valido: false,
      mensaje: `Se recomienda seleccionar como máximo ${maxRecomendado} descriptores. Actualmente: ${total}`
    };
  }
  
  // Verificar distribución equilibrada (al menos 1 selección por eje)
  const ejesVacios = Object.entries(valoresCrudos)
    .filter(([_, valor]) => valor === 0)
    .map(([eje, _]) => eje);
  
  if (ejesVacios.length > 0) {
    return {
      valido: false,
      mensaje: `Se recomienda seleccionar al menos un descriptor para cada eje. Ejes sin selección: ${ejesVacios.join(', ')}`
    };
  }
  
  return {
    valido: true,
    mensaje: 'La selección cumple con los criterios recomendados'
  };
}
