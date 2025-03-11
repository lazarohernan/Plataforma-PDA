
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useState } from "react";

interface DescriptorChipProps {
  label: string;
  selected?: boolean;
  onSelect: () => void;
  className?: string;
}

export const DescriptorChip = ({
  label,
  selected = false,
  onSelect,
  className,
}: DescriptorChipProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      type="button"
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative flex items-center justify-between px-4 py-3 rounded-lg border transition-all duration-200 text-left",
        selected
          ? "bg-primary/10 border-primary text-primary font-medium shadow-sm"
          : "bg-white/70 border-gray-200 text-gray-700 hover:border-primary/50 hover:bg-primary/5",
        isHovered && !selected && "scale-[1.02]",
        selected && "scale-[1.02]",
        className
      )}
    >
      <span className="text-base">{label}</span>
      {selected && (
        <span className="ml-2 flex items-center justify-center w-5 h-5 bg-primary rounded-full text-white">
          <Check size={14} />
        </span>
      )}
    </button>
  );
};
