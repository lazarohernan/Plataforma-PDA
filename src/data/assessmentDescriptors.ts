import { Eje } from "../algoritmo/types";

export interface Descriptor {
  id: string;
  label: string;
  eje: Eje;
}

// Descriptores organizados según el banco de descriptores documentado
// Cada bloque contiene descriptores de al menos 3 ejes diferentes para evitar sesgos

// Descriptores para el perfil natural
export const naturalProfileDescriptors: Descriptor[][] = [
  // Bloque 1
  [
    { id: "n1_1", label: "Decidido", eje: "R" },
    { id: "n1_2", label: "Sociable", eje: "E" },
    { id: "n1_3", label: "Paciente", eje: "P" },
    { id: "n1_4", label: "Analítico", eje: "N" },
    { id: "n1_5", label: "Controlado", eje: "A" },
  ],
  // Bloque 2
  [
    { id: "n2_1", label: "Competitivo", eje: "R" },
    { id: "n2_2", label: "Comunicativo", eje: "E" },
    { id: "n2_3", label: "Constante", eje: "P" },
    { id: "n2_4", label: "Preciso", eje: "N" },
    { id: "n2_5", label: "Diplomático", eje: "A" },
  ],
  // Bloque 3
  [
    { id: "n3_1", label: "Directo", eje: "R" },
    { id: "n3_2", label: "Entusiasta", eje: "E" },
    { id: "n3_3", label: "Sereno", eje: "P" },
    { id: "n3_4", label: "Estructurado", eje: "N" },
    { id: "n3_5", label: "Discreto", eje: "A" },
  ],
  // Bloque 4
  [
    { id: "n4_1", label: "Audaz", eje: "R" },
    { id: "n4_2", label: "Persuasivo", eje: "E" },
    { id: "n4_3", label: "Metódico", eje: "P" },
    { id: "n4_4", label: "Detallista", eje: "N" },
    { id: "n4_5", label: "Ponderado", eje: "A" },
  ],
  // Bloque 5
  [
    { id: "n5_1", label: "Resolutivo", eje: "R" },
    { id: "n5_2", label: "Expresivo", eje: "E" },
    { id: "n5_3", label: "Estable", eje: "P" },
    { id: "n5_4", label: "Cauteloso", eje: "N" },
    { id: "n5_5", label: "Racional", eje: "A" },
  ],
  // Bloque 6
  [
    { id: "n6_1", label: "Dominante", eje: "R" },
    { id: "n6_2", label: "Carismático", eje: "E" },
    { id: "n6_3", label: "Tranquilo", eje: "P" },
    { id: "n6_4", label: "Disciplinado", eje: "N" },
    { id: "n6_5", label: "Objetivo", eje: "A" },
  ],
  // Bloque 7
  [
    { id: "n7_1", label: "Independiente", eje: "R" },
    { id: "n7_2", label: "Optimista", eje: "E" },
    { id: "n7_3", label: "Perseverante", eje: "P" },
    { id: "n7_4", label: "Organizado", eje: "N" },
    { id: "n7_5", label: "Imparcial", eje: "A" },
  ],
  // Bloque 8
  [
    { id: "n8_1", label: "Desafiante", eje: "R" },
    { id: "n8_2", label: "Alegre", eje: "E" },
    { id: "n8_3", label: "Confiable", eje: "P" },
    { id: "n8_4", label: "Meticuloso", eje: "N" },
    { id: "n8_5", label: "Ecuánime", eje: "A" },
  ],
  // Bloque 9
  [
    { id: "n9_1", label: "Emprendedor", eje: "R" },
    { id: "n9_2", label: "Dinámico", eje: "E" },
    { id: "n9_3", label: "Consistente", eje: "P" },
    { id: "n9_4", label: "Riguroso", eje: "N" },
    { id: "n9_5", label: "Mesurado", eje: "A" },
  ],
  // Bloque 10
  [
    { id: "n10_1", label: "Arriesgado", eje: "R" },
    { id: "n10_2", label: "Conversador", eje: "E" },
    { id: "n10_3", label: "Calmado", eje: "P" },
    { id: "n10_4", label: "Planificador", eje: "N" },
    { id: "n10_5", label: "Sensato", eje: "A" },
  ],
  // Bloque 11
  [
    { id: "n11_1", label: "Determinado", eje: "R" },
    { id: "n11_2", label: "Influyente", eje: "E" },
    { id: "n11_3", label: "Reflexivo", eje: "P" },
    { id: "n11_4", label: "Perfeccionista", eje: "N" },
    { id: "n11_5", label: "Responsable", eje: "A" },
  ],
  // Bloque 12
  [
    { id: "n12_1", label: "Enérgico", eje: "R" },
    { id: "n12_2", label: "Amigable", eje: "E" },
    { id: "n12_3", label: "Equilibrado", eje: "P" },
    { id: "n12_4", label: "Sistemático", eje: "N" },
    { id: "n12_5", label: "Juicioso", eje: "A" },
  ],
  // Bloque 13
  [
    { id: "n13_1", label: "Firme", eje: "R" },
    { id: "n13_2", label: "Animado", eje: "E" },
    { id: "n13_3", label: "Tolerante", eje: "P" },
    { id: "n13_4", label: "Cuidadoso", eje: "N" },
    { id: "n13_5", label: "Reservado", eje: "A" },
  ],
  // Bloque 14
  [
    { id: "n14_1", label: "Asertivo", eje: "R" },
    { id: "n14_2", label: "Espontáneo", eje: "E" },
    { id: "n14_3", label: "Moderado", eje: "P" },
    { id: "n14_4", label: "Formal", eje: "N" },
    { id: "n14_5", label: "Contenido", eje: "A" },
  ],
  // Bloque 15
  [
    { id: "n15_1", label: "Valiente", eje: "R" },
    { id: "n15_2", label: "Convincente", eje: "E" },
    { id: "n15_3", label: "Prudente", eje: "P" },
    { id: "n15_4", label: "Convencional", eje: "N" },
    { id: "n15_5", label: "Comedido", eje: "A" },  // Reemplazado de "Prudente" por alternativo
  ],
  // Bloque 16
  [
    { id: "n16_1", label: "Autónomo", eje: "R" },
    { id: "n16_2", label: "Motivador", eje: "E" },
    { id: "n16_3", label: "Tenaz", eje: "P" },  // Reemplazado de "Sistemático" por alternativo
    { id: "n16_4", label: "Exacto", eje: "N" },
    { id: "n16_5", label: "Reflexivo", eje: "A" },
  ],
  // Bloque 17
  [
    { id: "n17_1", label: "Confrontador", eje: "R" },
    { id: "n17_2", label: "Extrovertido", eje: "E" },
    { id: "n17_3", label: "Predecible", eje: "P" },
    { id: "n17_4", label: "Prudente", eje: "N" },
    { id: "n17_5", label: "Equilibrado", eje: "A" },
  ],
  // Bloque 18
  [
    { id: "n18_1", label: "Pionero", eje: "R" },
    { id: "n18_2", label: "Encantador", eje: "E" },
    { id: "n18_3", label: "Apacible", eje: "P" },
    { id: "n18_4", label: "Normativo", eje: "N" },
    { id: "n18_5", label: "Maduro", eje: "A" },
  ],
];

// Descriptores para el perfil adaptado (mismos descriptores pero en orden diferente)
export const adaptedProfileDescriptors: Descriptor[][] = [
  // Bloque 1
  [
    { id: "a1_1", label: "Encantador", eje: "E" },
    { id: "a1_2", label: "Analítico", eje: "N" },
    { id: "a1_3", label: "Determinado", eje: "R" },
    { id: "a1_4", label: "Equilibrado", eje: "A" },
    { id: "a1_5", label: "Paciente", eje: "P" },
  ],
  // Bloque 2
  [
    { id: "a2_1", label: "Meticuloso", eje: "N" },
    { id: "a2_2", label: "Sociable", eje: "E" },
    { id: "a2_3", label: "Controlado", eje: "A" },
    { id: "a2_4", label: "Audaz", eje: "R" },
    { id: "a2_5", label: "Constante", eje: "P" },
  ],
  // Bloque 3
  [
    { id: "a3_1", label: "Perseverante", eje: "P" },
    { id: "a3_2", label: "Competitivo", eje: "R" },
    { id: "a3_3", label: "Discreto", eje: "A" },
    { id: "a3_4", label: "Expresivo", eje: "E" },
    { id: "a3_5", label: "Detallista", eje: "N" },
  ],
  // Bloque 4
  [
    { id: "a4_1", label: "Racional", eje: "A" },
    { id: "a4_2", label: "Sereno", eje: "P" },
    { id: "a4_3", label: "Directo", eje: "R" },
    { id: "a4_4", label: "Estructurado", eje: "N" },
    { id: "a4_5", label: "Entusiasta", eje: "E" },
  ],
  // Bloque 5
  [
    { id: "a5_1", label: "Persuasivo", eje: "E" },
    { id: "a5_2", label: "Objetivo", eje: "A" },
    { id: "a5_3", label: "Cauteloso", eje: "N" },
    { id: "a5_4", label: "Estable", eje: "P" },
    { id: "a5_5", label: "Resolutivo", eje: "R" },
  ],
  // Bloque 6
  [
    { id: "a6_1", label: "Tranquilo", eje: "P" },
    { id: "a6_2", label: "Imparcial", eje: "A" },
    { id: "a6_3", label: "Carismático", eje: "E" },
    { id: "a6_4", label: "Dominante", eje: "R" },
    { id: "a6_5", label: "Disciplinado", eje: "N" },
  ],
  // Bloque 7
  [
    { id: "a7_1", label: "Organizado", eje: "N" },
    { id: "a7_2", label: "Independiente", eje: "R" },
    { id: "a7_3", label: "Mesurado", eje: "A" },
    { id: "a7_4", label: "Optimista", eje: "E" },
    { id: "a7_5", label: "Confiable", eje: "P" },
  ],
  // Bloque 8
  [
    { id: "a8_1", label: "Alegre", eje: "E" },
    { id: "a8_2", label: "Consistente", eje: "P" },
    { id: "a8_3", label: "Desafiante", eje: "R" },
    { id: "a8_4", label: "Sensato", eje: "A" },
    { id: "a8_5", label: "Riguroso", eje: "N" },
  ],
  // Bloque 9
  [
    { id: "a9_1", label: "Ecuánime", eje: "A" },
    { id: "a9_2", label: "Planificador", eje: "N" },
    { id: "a9_3", label: "Dinámico", eje: "E" },
    { id: "a9_4", label: "Calmado", eje: "P" },
    { id: "a9_5", label: "Emprendedor", eje: "R" },
  ],
  // Bloque 10
  [
    { id: "a10_1", label: "Conversador", eje: "E" },
    { id: "a10_2", label: "Responsable", eje: "A" },
    { id: "a10_3", label: "Reflexivo", eje: "P" },
    { id: "a10_4", label: "Arriesgado", eje: "R" },
    { id: "a10_5", label: "Perfeccionista", eje: "N" },
  ],
  // Bloque 11
  [
    { id: "a11_1", label: "Sistemático", eje: "N" },
    { id: "a11_2", label: "Juicioso", eje: "A" },
    { id: "a11_3", label: "Influyente", eje: "E" },
    { id: "a11_4", label: "Equilibrado", eje: "P" },
    { id: "a11_5", label: "Enérgico", eje: "R" },
  ],
  // Bloque 12
  [
    { id: "a12_1", label: "Amigable", eje: "E" },
    { id: "a12_2", label: "Firme", eje: "R" },
    { id: "a12_3", label: "Reservado", eje: "A" },
    { id: "a12_4", label: "Cuidadoso", eje: "N" },
    { id: "a12_5", label: "Tolerante", eje: "P" },
  ],
  // Bloque 13
  [
    { id: "a13_1", label: "Formal", eje: "N" },
    { id: "a13_2", label: "Animado", eje: "E" },
    { id: "a13_3", label: "Asertivo", eje: "R" },
    { id: "a13_4", label: "Contenido", eje: "A" },
    { id: "a13_5", label: "Moderado", eje: "P" },
  ],
  // Bloque 14
  [
    { id: "a14_1", label: "Espontáneo", eje: "E" },
    { id: "a14_2", label: "Circunspecto", eje: "A" },  // Reemplazado de "Prudente" por alternativo
    { id: "a14_3", label: "Convencional", eje: "N" },
    { id: "a14_4", label: "Valiente", eje: "R" },
    { id: "a14_5", label: "Prudente", eje: "P" },  // Se mantiene solo en eje P
  ],
  // Bloque 15
  [
    { id: "a15_1", label: "Convincente", eje: "E" },
    { id: "a15_2", label: "Exacto", eje: "N" },
    { id: "a15_3", label: "Ponderado", eje: "A" },  // Reemplazado de "Reflexivo" por alternativo
    { id: "a15_4", label: "Autónomo", eje: "R" },
    { id: "a15_5", label: "Metódico", eje: "P" },  // Reemplazado de "Sistemático" por alternativo
  ],
  // Bloque 16
  [
    { id: "a16_1", label: "Motivador", eje: "E" },
    { id: "a16_2", label: "Predecible", eje: "P" },
    { id: "a16_3", label: "Equilibrado", eje: "A" },
    { id: "a16_4", label: "Confrontador", eje: "R" },
    { id: "a16_5", label: "Prudente", eje: "N" },
  ],
  // Bloque 17
  [
    { id: "a17_1", label: "Normativo", eje: "N" },
    { id: "a17_2", label: "Extrovertido", eje: "E" },
    { id: "a17_3", label: "Pionero", eje: "R" },
    { id: "a17_4", label: "Maduro", eje: "A" },
    { id: "a17_5", label: "Apacible", eje: "P" },
  ],
  // Bloque 18
  [
    { id: "a18_1", label: "Decidido", eje: "R" },
    { id: "a18_2", label: "Comunicativo", eje: "E" },
    { id: "a18_3", label: "Diplomático", eje: "A" },
    { id: "a18_4", label: "Preciso", eje: "N" },
    { id: "a18_5", label: "Ordenado", eje: "P" },  // Reemplazado de "Metódico" por alternativo
  ],
];

// Parámetros de configuración según los parámetros técnicos definidos
export const MAX_SELECTIONS_PER_GROUP = 3; // Máximo de selecciones por bloque
export const RECOMMENDED_TOTAL_SELECTIONS = 25; // Selecciones recomendadas en total
export const MIN_TOTAL_SELECTIONS = 20; // Mínimo de selecciones requeridas
export const MAX_TOTAL_SELECTIONS = 40; // Máximo de selecciones permitidas

export type ProfileType = "natural" | "adapted";

// Función para obtener todos los descriptores en formato plano
export const getAllDescriptors = (profileType: ProfileType): Descriptor[] => {
  const descriptors = profileType === "natural" 
    ? naturalProfileDescriptors 
    : adaptedProfileDescriptors;
  
  return descriptors.flat();
};

// Función para aleatorizar descriptores
export const aleatorizarDescriptores = (descriptors: Descriptor[][]): Descriptor[][] => {
  // Crear una copia profunda para no modificar los originales
  const descriptorsCopy = JSON.parse(JSON.stringify(descriptors));
  
  // Aleatorizar el orden de los descriptores dentro de cada bloque
  descriptorsCopy.forEach(block => {
    for (let i = block.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [block[i], block[j]] = [block[j], block[i]];
    }
  });
  
  // Aleatorizar el orden de los bloques
  for (let i = descriptorsCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [descriptorsCopy[i], descriptorsCopy[j]] = [descriptorsCopy[j], descriptorsCopy[i]];
  }
  
  return descriptorsCopy;
};

// Función para obtener descriptores aleatorizados
export const getRandomizedDescriptors = (profileType: ProfileType): Descriptor[][] => {
  const descriptors = profileType === "natural" 
    ? naturalProfileDescriptors 
    : adaptedProfileDescriptors;
  
  return aleatorizarDescriptores(descriptors);
};

// Función para contar selecciones por eje
export const countSelectionsByAxis = (
  selectedIds: string[], 
  profileType: ProfileType
): Record<string, number> => {
  const allDescriptors = getAllDescriptors(profileType);
  const counts: Record<string, number> = { R: 0, E: 0, P: 0, N: 0, A: 0 };
  
  selectedIds.forEach(id => {
    const descriptor = allDescriptors.find(d => d.id === id);
    if (descriptor) {
      counts[descriptor.eje]++;
    }
  });
  
  return counts;
};

// Función para validar selecciones
export const validateSelections = (
  selectedIds: string[], 
  profileType: ProfileType
): { valid: boolean; warnings: string[]; errors: string[] } => {
  const warnings: string[] = [];
  const errors: string[] = [];
  
  // Validar cantidad total
  if (selectedIds.length < MIN_TOTAL_SELECTIONS) {
    errors.push(`Se requieren al menos ${MIN_TOTAL_SELECTIONS} descriptores seleccionados para un análisis preciso.`);
  }
  
  if (selectedIds.length > MAX_TOTAL_SELECTIONS) {
    warnings.push(`Has seleccionado un número elevado de descriptores (${selectedIds.length}), lo que podría afectar la precisión del perfil.`);
  }
  
  // Validar distribución por eje
  const counts = countSelectionsByAxis(selectedIds, profileType);
  const axisNames: Record<string, string> = {
    R: "Riesgo",
    E: "Extroversión",
    P: "Paciencia",
    N: "Normatividad",
    A: "Autocontrol"
  };
  
  Object.entries(counts).forEach(([axis, count]) => {
    if (count === 0) {
      warnings.push(`No has seleccionado ningún descriptor del eje ${axisNames[axis]}.`);
    } else {
      const totalForAxis = getAllDescriptors(profileType)
        .filter(d => d.eje === axis).length;
      const percentage = count / totalForAxis;
      
      if (percentage < 0.1) {
        warnings.push(`Has seleccionado muy pocos descriptores del eje ${axisNames[axis]}.`);
      }
    }
  });
  
  return {
    valid: errors.length === 0,
    warnings,
    errors
  };
};
