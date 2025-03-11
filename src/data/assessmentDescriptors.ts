
export interface Descriptor {
  id: string;
  label: string;
}

// Example descriptors - in a real app, these would come from an API
export const naturalProfileDescriptors: Descriptor[][] = [
  [
    { id: "n1_1", label: "Persuasivo" },
    { id: "n1_2", label: "Decidido" },
    { id: "n1_3", label: "Prudente" },
    { id: "n1_4", label: "Sociable" },
    { id: "n1_5", label: "Tolerante" },
  ],
  [
    { id: "n2_1", label: "Analítico" },
    { id: "n2_2", label: "Entusiasta" },
    { id: "n2_3", label: "Persistente" },
    { id: "n2_4", label: "Paciente" },
    { id: "n2_5", label: "Exigente" },
  ],
  [
    { id: "n3_1", label: "Metódico" },
    { id: "n3_2", label: "Audaz" },
    { id: "n3_3", label: "Comunicativo" },
    { id: "n3_4", label: "Reflexivo" },
    { id: "n3_5", label: "Comedido" },
  ],
  // More groups would be added for a real assessment
];

export const adaptedProfileDescriptors: Descriptor[][] = [
  [
    { id: "a1_1", label: "Influyente" },
    { id: "a1_2", label: "Orientado a resultados" },
    { id: "a1_3", label: "Conservador" },
    { id: "a1_4", label: "Expresivo" },
    { id: "a1_5", label: "Conciliador" },
  ],
  [
    { id: "a2_1", label: "Detallista" },
    { id: "a2_2", label: "Motivador" },
    { id: "a2_3", label: "Enfocado" },
    { id: "a2_4", label: "Calmado" },
    { id: "a2_5", label: "Directo" },
  ],
  [
    { id: "a3_1", label: "Estructurado" },
    { id: "a3_2", label: "Emprendedor" },
    { id: "a3_3", label: "Sociable" },
    { id: "a3_4", label: "Cauteloso" },
    { id: "a3_5", label: "Colaborativo" },
  ],
  // More groups would be added for a real assessment
];

// Max selections recommended per group
export const MAX_SELECTIONS_PER_GROUP = 2;
// Total recommended selections overall
export const RECOMMENDED_TOTAL_SELECTIONS = 12;

export type ProfileType = "natural" | "adapted";
