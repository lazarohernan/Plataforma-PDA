
import { DescriptorChip } from "@/components/atoms/DescriptorChip";
import { useState, useEffect } from "react";

export interface Descriptor {
  id: string;
  label: string;
}

interface DescriptorGroupProps {
  descriptors: Descriptor[];
  selectedDescriptors: string[];
  onDescriptorToggle: (id: string) => void;
  maxSelections?: number;
}

export const DescriptorGroup = ({
  descriptors,
  selectedDescriptors,
  onDescriptorToggle,
  maxSelections = Infinity,
}: DescriptorGroupProps) => {
  const [localSelectedCount, setLocalSelectedCount] = useState(0);

  useEffect(() => {
    const count = descriptors.filter(d => selectedDescriptors.includes(d.id)).length;
    setLocalSelectedCount(count);
  }, [descriptors, selectedDescriptors]);

  const handleSelect = (id: string) => {
    const isSelected = selectedDescriptors.includes(id);
    
    // If not selected and already at max, don't allow selection
    if (!isSelected && localSelectedCount >= maxSelections) {
      return;
    }
    
    onDescriptorToggle(id);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {descriptors.map((descriptor) => (
          <DescriptorChip
            key={descriptor.id}
            label={descriptor.label}
            selected={selectedDescriptors.includes(descriptor.id)}
            onSelect={() => handleSelect(descriptor.id)}
          />
        ))}
      </div>
      
      {maxSelections < Infinity && (
        <div className="text-sm text-gray-500 mt-2">
          {localSelectedCount} de {maxSelections} descriptores seleccionados
        </div>
      )}
    </div>
  );
};
