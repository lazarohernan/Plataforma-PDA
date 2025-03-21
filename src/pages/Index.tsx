
import { Header } from "@/components/organisms/Header";
import { Badge } from "@/components/ui/badge";
import { BackgroundBoxes } from "@/components/ui/background-boxes";

const Index = () => {
  // Colores personalizados para el grid que coinciden con la paleta de la aplicación
  const customColors = [
    "#4f46e5", // Indigo
    "#6366f1", // Indigo claro
    "#8b5cf6", // Violeta
    "#a78bfa", // Violeta claro
    "#ec4899", // Rosa
  ];

  return (
    <div className="min-h-screen bg-gradient-soft relative overflow-hidden">
      <Header />
      
      {/* Fondo animado con grid */}
      <div className="absolute inset-0 z-0">
        <BackgroundBoxes 
          columns={8} 
          rows={6} 
          colorScheme="custom" 
          customColors={customColors} 
        />
      </div>
      
      <main className="container mx-auto px-4 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] relative z-10">
        <div className="text-center space-y-8 max-w-3xl fade-in">
          <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200 text-base py-2 px-4">
            Sitio en Construcción
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gradient leading-tight mt-6">
            La mejor plataforma de herramientas inteligentes para recursos humanos
          </h1>
          
          <p className="text-lg text-gray-700 mt-4">
            Estamos trabajando para traerte la mejor experiencia en evaluación y desarrollo de talento.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;
