
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface PerfilPuestoDimensionSliderProps {
  title: string;
  color: string;
  minValue: number;
  idealValue: number;
  maxValue: number;
  onMinChange: (value: number) => void;
  onIdealChange: (value: number) => void;
  onMaxChange: (value: number) => void;
  description: string;
}

export const PerfilPuestoDimensionSlider = ({
  title,
  color,
  minValue,
  idealValue,
  maxValue,
  onMinChange,
  onIdealChange,
  onMaxChange,
  description
}: PerfilPuestoDimensionSliderProps) => {
  // Estado local para manejar cambios antes de propagarlos
  const [minLocal, setMinLocal] = useState(minValue);
  const [idealLocal, setIdealLocal] = useState(idealValue);
  const [maxLocal, setMaxLocal] = useState(maxValue);
  
  // Manejadores de cambios
  const handleMinChange = (value: number[]) => {
    const newValue = value[0];
    if (newValue <= idealLocal) {
      setMinLocal(newValue);
      onMinChange(newValue);
    }
  };
  
  const handleIdealChange = (value: number[]) => {
    const newValue = value[0];
    if (newValue >= minLocal && newValue <= maxLocal) {
      setIdealLocal(newValue);
      onIdealChange(newValue);
    }
  };
  
  const handleMaxChange = (value: number[]) => {
    const newValue = value[0];
    if (newValue >= idealLocal) {
      setMaxLocal(newValue);
      onMaxChange(newValue);
    }
  };
  
  return (
    <div className="p-5 border border-gray-100 rounded-lg bg-white">
      <div className="flex items-center gap-2 mb-3">
        <div 
          className="w-4 h-4 rounded-full" 
          style={{ backgroundColor: color }}
          aria-hidden="true"
        ></div>
        <Label className="text-base font-semibold">{title}</Label>
      </div>
      
      <p className="text-sm text-gray-600 mb-5">
        {description}
      </p>
      
      <div className="mb-6">
        <div className="flex justify-between mb-1">
          <Label className="text-sm">Valor Mínimo Aceptable</Label>
          <span className="text-sm font-medium">{minLocal}%</span>
        </div>
        <Slider 
          defaultValue={[minLocal]}
          min={0}
          max={100}
          step={1}
          onValueChange={handleMinChange}
          className="pt-2"
          aria-label={`Mínimo aceptable para ${title}`}
        />
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between mb-1">
          <Label className="text-sm font-medium">Valor Ideal</Label>
          <span className="text-sm font-medium">{idealLocal}%</span>
        </div>
        <Slider 
          defaultValue={[idealLocal]}
          min={0}
          max={100}
          step={1}
          onValueChange={handleIdealChange}
          className="pt-2"
          aria-label={`Valor ideal para ${title}`}
        />
      </div>
      
      <div className="mb-2">
        <div className="flex justify-between mb-1">
          <Label className="text-sm">Valor Máximo Aceptable</Label>
          <span className="text-sm font-medium">{maxLocal}%</span>
        </div>
        <Slider 
          defaultValue={[maxLocal]}
          min={0}
          max={100}
          step={1}
          onValueChange={handleMaxChange}
          className="pt-2"
          aria-label={`Máximo aceptable para ${title}`}
        />
      </div>
      
      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="flex justify-between text-xs text-gray-500">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
};
