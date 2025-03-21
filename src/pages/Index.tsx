
import { Header } from "@/components/organisms/Header";
import { Badge } from "@/components/ui/badge";
import { BackgroundBoxes } from "@/components/ui/background-boxes";

const Index = () => {
  // Colores personalizados para los boxes que coinciden con la paleta de la aplicación
  const customBoxes = [
    {
      value: 0,
      size: 300,
      x: 10,
      y: 30,
      color: "#4f46e5", // Indigo
    },
    {
      value: 1,
      size: 400,
      x: 30,
      y: 60,
      color: "#8b5cf6", // Violeta
    },
    {
      value: 2,
      size: 200,
      x: 60,
      y: 20,
      color: "#ec4899", // Rosa
    },
    {
      value: 3,
      size: 350,
      x: 80,
      y: 70,
      color: "#10b981", // Verde
    },
    {
      value: 4,
      size: 450,
      x: 50,
      y: 50,
      color: "#3b82f6", // Azul
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-soft relative overflow-hidden">
      <Header />
      
      {/* Fondo animado con cajas */}
      <div className="absolute inset-0 z-0">
        <BackgroundBoxes boxes={customBoxes} />
      </div>
      
      <main className="container mx-auto px-4 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] relative z-10">
        <div className="text-center space-y-8 max-w-3xl fade-in backdrop-blur-sm bg-white/30 p-8 rounded-2xl shadow-lg">
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
