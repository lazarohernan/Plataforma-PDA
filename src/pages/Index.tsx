
import { Header } from "@/components/organisms/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChartPie, Users, Brain, Target, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-soft">
      <Header />
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-32 pb-32">
        <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-gradient leading-tight">
            Potencia el Desarrollo de tu Talento Humano
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
            Evaluación conductual científica basada en cinco dimensiones para optimizar la selección y desarrollo de tu equipo.
          </p>
          <div className="flex flex-wrap gap-4 mt-8 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-primary to-blue-400 hover:opacity-90" asChild>
              <Link to="/assessment/welcome">
                Comenzar Evaluación
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="backdrop-blur-sm bg-white/50 border-white/20">
              Solicitar Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Dimensiones Section */}
      <section className="py-20 bg-gradient-blue backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Modelo Pentadimensional
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {dimensions.map((dimension, index) => (
              <Card key={index} className="p-6 text-center card-hover backdrop-blur-sm bg-white/70">
                {dimension.icon}
                <h3 className="text-xl font-semibold mt-4 mb-2">{dimension.title}</h3>
                <p className="text-gray-600">{dimension.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios Section */}
      <section className="py-20 bg-gradient-blue-gray backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Beneficios para tu Empresa
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex flex-col items-center text-center p-6 bg-white/50 backdrop-blur-sm rounded-lg border border-white/20">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios Section */}
      <section className="py-20 bg-gradient-soft backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Empresas que Confían en Nosotros
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8 card-hover backdrop-blur-sm bg-white/70">
                <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="ml-4">
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-gray-500">{testimonial.position}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const dimensions = [
  {
    title: "Riesgo",
    description: "Capacidad de toma de decisiones y orientación a resultados",
    icon: <Target className="w-8 h-8 text-primary mx-auto" />,
  },
  {
    title: "Extroversión",
    description: "Habilidades de comunicación e interacción social",
    icon: <Users className="w-8 h-8 text-primary mx-auto" />,
  },
  {
    title: "Paciencia",
    description: "Consistencia y estabilidad en el trabajo",
    icon: <ChartPie className="w-8 h-8 text-primary mx-auto" />,
  },
  {
    title: "Normatividad",
    description: "Adherencia a reglas y estructuras",
    icon: <Shield className="w-8 h-8 text-primary mx-auto" />,
  },
  {
    title: "Autocontrol",
    description: "Gestión emocional y toma de decisiones",
    icon: <Brain className="w-8 h-8 text-primary mx-auto" />,
  },
];

const benefits = [
  {
    title: "Mejor Selección",
    description: "Identifica los candidatos ideales basándote en datos objetivos",
    icon: <Target className="w-6 h-6 text-primary" />,
  },
  {
    title: "Menor Rotación",
    description: "Reduce costos de rotación con mejor match cultural",
    icon: <Users className="w-6 h-6 text-primary" />,
  },
  {
    title: "Equipos Efectivos",
    description: "Forma equipos balanceados y de alto rendimiento",
    icon: <ChartPie className="w-6 h-6 text-primary" />,
  },
];

const testimonials = [
  {
    quote: "PDA nos ha permitido mejorar significativamente nuestro proceso de selección y desarrollo de talento.",
    author: "María González",
    position: "Directora de RH, TechCorp",
  },
  {
    quote: "La precisión de las evaluaciones y la facilidad de uso de la plataforma han revolucionado nuestra gestión del talento.",
    author: "Carlos Rodríguez",
    position: "CEO, Innovatech",
  },
];

export default Index;
