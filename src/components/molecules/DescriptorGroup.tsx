
import { DescriptorChip } from "@/components/atoms/DescriptorChip";
import { useState, useEffect, useMemo } from "react";
import { Descriptor } from "@/data/assessmentDescriptors";

interface DescriptorGroupProps {
  descriptors: Descriptor[];
  selectedDescriptors: string[];
  onDescriptorToggle: (id: string) => void;
  maxSelections?: number;
}

// Función para dividir los descriptores en filas con cantidades variables
const splitIntoVariableRows = (descriptors: Descriptor[], screenWidth: number = 1024): Descriptor[][] => {
  const rows: Descriptor[][] = [];
  let currentIndex = 0;
  
  // Mínimo absoluto de descriptores por fila
  const MIN_DESCRIPTORS_PER_ROW = 2;
  
  while (currentIndex < descriptors.length) {
    // Generar un número aleatorio para el tamaño de la fila
    const randomFactor = Math.random();
    let rowSize: number;
    
    // Determinamos el tamaño de la fila basado en el ancho de pantalla
    if (screenWidth < 640) { // Móvil
      rowSize = randomFactor < 0.6 ? 2 : 3; // Más pequeño para móviles
    } else if (screenWidth < 1024) { // Tablet
      rowSize = randomFactor < 0.3 ? 3 : (randomFactor < 0.7 ? 4 : 5);
    } else { // Desktop
      rowSize = randomFactor < 0.2 ? 4 : (randomFactor < 0.5 ? 5 : (randomFactor < 0.8 ? 6 : 7));
    }
    
    // Aseguramos que no excedamos el número total de descriptores
    rowSize = Math.min(rowSize, descriptors.length - currentIndex);
    
    // Caso especial: si quedan menos de MIN_DESCRIPTORS_PER_ROW descriptores y ya tenemos filas
    if (rowSize < MIN_DESCRIPTORS_PER_ROW && rows.length > 0 && currentIndex + rowSize === descriptors.length) {
      // Añadir los descriptores restantes a la última fila en lugar de crear una nueva
      const lastRowIndex = rows.length - 1;
      const lastRow = [...rows[lastRowIndex]];
      const remainingDescriptors = descriptors.slice(currentIndex);
      rows[lastRowIndex] = [...lastRow, ...remainingDescriptors];
      break; // Salimos del bucle porque ya hemos procesado todos los descriptores
    }
    
    // Aseguramos que cada fila tenga al menos MIN_DESCRIPTORS_PER_ROW elementos
    // excepto si es la última fila y no hay suficientes descriptores restantes
    if (rowSize < MIN_DESCRIPTORS_PER_ROW && currentIndex + MIN_DESCRIPTORS_PER_ROW <= descriptors.length) {
      rowSize = MIN_DESCRIPTORS_PER_ROW;
    }
    
    // Añadimos la fila con el tamaño calculado
    rows.push(descriptors.slice(currentIndex, currentIndex + rowSize));
    currentIndex += rowSize;
  }
  
  // Verificación final: si la última fila tiene solo un descriptor, moverlo a la penúltima
  if (rows.length > 1) {
    const lastRowIndex = rows.length - 1;
    if (rows[lastRowIndex].length === 1) {
      const lastDescriptor = rows[lastRowIndex][0];
      rows[lastRowIndex - 1].push(lastDescriptor);
      rows.pop(); // Eliminar la última fila
    }
  }
  
  return rows;
};

export const DescriptorGroup = ({
  descriptors,
  selectedDescriptors,
  onDescriptorToggle,
  maxSelections = Infinity,
}: DescriptorGroupProps) => {
  const [localSelectedCount, setLocalSelectedCount] = useState(0);
  const [windowWidth, setWindowWidth] = useState<number | undefined>(undefined);
  
  // Efecto para detectar el ancho de la ventana
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    // Establecer el ancho inicial
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
    }
    
    // Limpiar el event listener
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  useEffect(() => {
    const count = descriptors.filter(d => selectedDescriptors.includes(d.id)).length;
    setLocalSelectedCount(count);
  }, [descriptors, selectedDescriptors]);

  // Dividir los descriptores en filas con tamaños variables
  const descriptorRows = useMemo(() => {
    return splitIntoVariableRows(descriptors, windowWidth);
  }, [descriptors, windowWidth]);

  const handleSelect = (id: string) => {
    const isSelected = selectedDescriptors.includes(id);
    
    // If not selected and already at max, don't allow selection
    if (!isSelected && localSelectedCount >= maxSelections) {
      return;
    }
    
    onDescriptorToggle(id);
  };

  return (
    <div className="space-y-6">
      {descriptorRows.map((row, rowIndex) => {
        // Determinar si debemos usar CSS Grid o Flexbox según el tamaño de pantalla
        const isMobile = windowWidth !== undefined && windowWidth < 640;
        
        return (
          <div 
            key={`row-${rowIndex}`}
            className={isMobile ? "flex flex-wrap gap-2 justify-center" : ""}
            style={!isMobile ? { 
              display: 'grid', 
              gridTemplateColumns: `repeat(${row.length}, 1fr)`,
              gap: '0.75rem'
            } : undefined}
          >
            {row.map((descriptor) => (
              <DescriptorChip
                key={descriptor.id}
                label={descriptor.label}
                selected={selectedDescriptors.includes(descriptor.id)}
                onSelect={() => handleSelect(descriptor.id)}
                eje={descriptor.eje}
                className={isMobile ? "flex-1 min-w-[45%] max-w-[48%] mb-2" : ""}
              />
            ))}
          </div>
        );
      })}
      
      {maxSelections < Infinity && (
        <div className="text-sm text-gray-500 mt-2">
          {localSelectedCount} de {maxSelections} descriptores seleccionados
        </div>
      )}
    </div>
  );
};
