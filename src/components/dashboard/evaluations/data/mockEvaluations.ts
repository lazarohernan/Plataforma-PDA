
export type Evaluation = {
  id: number;
  name: string;
  date: string;
  department: string;
  status: string;
  dimensions: Record<string, number> | null;
};

// Mock data for evaluations
export const evaluationsData: Evaluation[] = [
  {
    id: 1,
    name: "Carlos Rodríguez",
    date: "24/08/2023",
    department: "Ventas",
    status: "Completado",
    dimensions: { risk: 82, extroversion: 65, patience: 40, normativity: 55, selfControl: 60 }
  },
  {
    id: 2,
    name: "Ana Martínez",
    date: "22/08/2023",
    department: "Marketing",
    status: "Completado",
    dimensions: { risk: 45, extroversion: 85, patience: 62, normativity: 40, selfControl: 55 }
  },
  {
    id: 3,
    name: "Luis Hernández",
    date: "Pendiente",
    department: "Desarrollo",
    status: "Enviado",
    dimensions: null
  },
  {
    id: 4,
    name: "María García",
    date: "20/08/2023",
    department: "RRHH",
    status: "Completado",
    dimensions: { risk: 35, extroversion: 55, patience: 78, normativity: 82, selfControl: 70 }
  },
  {
    id: 5,
    name: "Jorge Fernández",
    date: "18/08/2023",
    department: "Ventas",
    status: "Completado",
    dimensions: { risk: 75, extroversion: 68, patience: 45, normativity: 50, selfControl: 40 }
  },
  {
    id: 6,
    name: "Sofía Gutiérrez",
    date: "Pendiente",
    department: "Marketing",
    status: "Enviado",
    dimensions: null
  },
  {
    id: 7,
    name: "Roberto Sánchez",
    date: "15/08/2023",
    department: "Finanzas",
    status: "Completado",
    dimensions: { risk: 55, extroversion: 40, patience: 60, normativity: 85, selfControl: 75 }
  },
  {
    id: 8,
    name: "Lucía Torres",
    date: "12/08/2023",
    department: "Desarrollo",
    status: "Completado",
    dimensions: { risk: 65, extroversion: 70, patience: 55, normativity: 60, selfControl: 50 }
  }
];
