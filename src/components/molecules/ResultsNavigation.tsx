
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  List, 
  Lightbulb, 
  Users, 
  FileDown,
  ChevronRight
} from "lucide-react";

type ResultSection = "summary" | "detailed" | "recommendations" | "compatibility" | "export";

interface ResultsNavigationProps {
  activeSection: ResultSection;
  onSectionChange: (section: ResultSection) => void;
  className?: string;
}

export const ResultsNavigation = ({
  activeSection,
  onSectionChange,
  className
}: ResultsNavigationProps) => {
  const sections = [
    {
      id: "summary" as ResultSection,
      label: "Resumen de Perfil",
      icon: <LayoutDashboard className="h-5 w-5" />
    },
    {
      id: "detailed" as ResultSection,
      label: "Análisis Detallado",
      icon: <List className="h-5 w-5" />
    },
    {
      id: "recommendations" as ResultSection,
      label: "Recomendaciones",
      icon: <Lightbulb className="h-5 w-5" />
    },
    {
      id: "compatibility" as ResultSection,
      label: "Compatibilidad con Roles",
      icon: <Users className="h-5 w-5" />
    },
    {
      id: "export" as ResultSection,
      label: "Exportar Resultados",
      icon: <FileDown className="h-5 w-5" />
    }
  ];
  
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => onSectionChange(section.id)}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
            "hover:bg-gray-100",
            activeSection === section.id
              ? "bg-primary text-white hover:bg-primary/90"
              : "bg-white text-gray-700 border border-gray-200"
          )}
        >
          {section.icon}
          <span className="hidden sm:inline">{section.label}</span>
          {activeSection === section.id && <ChevronRight className="h-4 w-4 ml-1" />}
        </button>
      ))}
    </div>
  );
};
