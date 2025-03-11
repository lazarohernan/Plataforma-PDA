
// Helper to get dominant dimension
export const getDominantDimension = (dimensions: Record<string, number> | null) => {
  if (!dimensions) return { name: "-", value: 0 };
  
  type DimensionType = keyof typeof dimensions;
  const entries = Object.entries(dimensions) as [DimensionType, number][];
  const sorted = [...entries].sort((a, b) => b[1] - a[1]);
  
  const dominantDimName = sorted[0][0];
  const dimensionNameMap: Record<string, string> = {
    risk: "Riesgo",
    extroversion: "Extroversión",
    patience: "Paciencia",
    normativity: "Normatividad",
    selfControl: "Autocontrol"
  };
  
  return { 
    name: dimensionNameMap[dominantDimName] || dominantDimName, 
    value: sorted[0][1]
  };
};

// Helper to get color for status badges
export const getStatusColor = (status: string) => {
  switch (status) {
    case "Completado":
      return "bg-green-100 text-green-700";
    case "Enviado":
      return "bg-blue-100 text-blue-700";
    case "Pendiente":
      return "bg-amber-100 text-amber-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};
