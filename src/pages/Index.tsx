
import { Header } from "@/components/organisms/Header";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-soft">
      <Header />
      <main className="container mx-auto px-4 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="text-center space-y-8 max-w-3xl fade-in">
          <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200 text-base py-2 px-4">
            Sitio en Construcción
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gradient leading-tight mt-6">
            La mejor plataforma de herramientas inteligentes para recursos humanos
          </h1>
          
          <p className="text-lg text-gray-600 mt-4">
            Estamos trabajando para traerte la mejor experiencia en evaluación y desarrollo de talento.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;
