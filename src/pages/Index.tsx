
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChartPie, Users, Brain, Target, Shield } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-32">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex flex-col text-left space-y-6 max-w-2xl fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-gradient leading-tight">
              Potencia el Desarrollo de tu Talento Humano
            </h1>
            <p className="text-lg md:text-xl text-gray-600">
              Evaluación conductual científica basada en cinco dimensiones para optimizar la selección y desarrollo de tu equipo.
            </p>
            <div className="flex gap-4 mt-8">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Comenzar Evaluación
              </Button>
              <Button size="lg" variant="outline">
                Solicitar Demo
              </Button>
            </div>
          </div>
          <div className="w-full md:w-1/2 mt-8 md:mt-0">
            <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070"
                alt="Equipo profesional analizando datos"
                className="object-cover w-full h-full"
              />
            </AspectRatio>
          </div>
        </div>
      </section>

      {/* Dimensiones Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Modelo Pentadimensional
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {dimensions.map((dimension, index) => (
              <Card key={index} className="p-6 text-center card-hover">
                {dimension.icon}
                <h3 className="text-xl font-semibold mt-4 mb-2">{dimension.title}</h3>
                <p className="text-gray-600">{dimension.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios Section with Image */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Beneficios para tu Empresa
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="grid grid-cols-1 gap-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4 shrink-0">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-10 md:mt-0">
              <AspectRatio ratio={4 / 3} className="bg-muted rounded-lg overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2070"
                  alt="Equipo analizando resultados"
                  className="object-cover w-full h-full"
                />
              </AspectRatio>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Empresas que Confían en Nosotros
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8 card-hover">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 shrink-0">
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-gray-500">{testimonial.position}</p>
                    </div>
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
    description: "Identifica los candidatos ideales basándote en datos objetivos y reduce costos de contratación errónea.",
    icon: <Target className="w-6 h-6 text-primary" />,
  },
  {
    title: "Menor Rotación",
    description: "Reduce costos de rotación con mejor match cultural y posiciones adecuadas al perfil conductual.",
    icon: <Users className="w-6 h-6 text-primary" />,
  },
  {
    title: "Equipos Efectivos",
    description: "Forma equipos balanceados y de alto rendimiento aprovechando la diversidad conductual.",
    icon: <ChartPie className="w-6 h-6 text-primary" />,
  },
];

const testimonials = [
  {
    quote: "PDA nos ha permitido mejorar significativamente nuestro proceso de selección y desarrollo de talento.",
    author: "María González",
    position: "Directora de RH, TechCorp",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887",
  },
  {
    quote: "La precisión de las evaluaciones y la facilidad de uso de la plataforma han revolucionado nuestra gestión del talento.",
    author: "Carlos Rodríguez",
    position: "CEO, Innovatech",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887",
  },
];

export default Index;
