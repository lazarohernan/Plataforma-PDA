
import { Header } from "@/components/organisms/Header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-soft">
      <Header />
      <main className="container mx-auto px-4 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="text-center space-y-8 max-w-3xl fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-gradient leading-tight">
            La mejor plataforma de herramientas inteligentes para recursos humanos
          </h1>
          
          <div className="flex flex-col items-center gap-8">
            <Button size="lg" className="bg-gradient-to-r from-primary to-blue-400 hover:opacity-90 min-w-[200px]" asChild>
              <Link to="/register">
                Solicitar Información
              </Link>
            </Button>
            
            <p className="text-sm text-gray-500">
              Sitio en desarrollo
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
