import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export default function AccesoEvaluacion() {
  const [codigoAcceso, setCodigoAcceso] = useState('');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [edad, setEdad] = useState('');
  const [sectorProfesional, setSectorProfesional] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Obtener código de acceso de la URL si existe
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const codigo = params.get('codigo');
    if (codigo) {
      setCodigoAcceso(codigo);
      toast({
        title: "Código detectado",
        description: "Se ha detectado un código de acceso en la URL.",
      });
    }
  }, [toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!codigoAcceso || !nombre) {
      toast({
        title: "Campos requeridos",
        description: "Por favor ingresa tu código de acceso y nombre para continuar.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Verificar si el código de acceso existe y está disponible
      const { data: evaluacionData, error: evaluacionError } = await supabase
        .from('evaluaciones')
        .select('*')
        .eq('codigo_acceso', codigoAcceso)
        .eq('estado', 'pendiente')
        .single();

      if (evaluacionError || !evaluacionData) {
        toast({
          title: "Código inválido",
          description: "El código de acceso ingresado no es válido o ya ha sido utilizado.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Actualizar el estado de la evaluación a 'en_progreso'
      const { error: updateError } = await supabase
        .from('evaluaciones')
        .update({
          estado: 'en_progreso',
          metadatos: {
            nombre_participante: nombre,
            email_participante: email || null,
            edad_participante: edad ? parseInt(edad) : null,
            sector_profesional: sectorProfesional || null,
            fecha_inicio: new Date().toISOString()
          }
        })
        .eq('id', evaluacionData.id);

      if (updateError) {
        throw updateError;
      }

      // Guardar el ID de la evaluación en sessionStorage para usarlo durante la evaluación
      sessionStorage.setItem('evaluacion_id', evaluacionData.id);
      sessionStorage.setItem('codigo_acceso', codigoAcceso);

      // Redirigir a la página de bienvenida de la evaluación
      navigate('/assessment-welcome');
      
    } catch (error) {
      console.error('Error al verificar código de acceso:', error);
      toast({
        title: "Error",
        description: "Ocurrió un error al procesar tu solicitud. Por favor intenta nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Evaluación PDA</CardTitle>
          <CardDescription className="text-center">
            Ingresa tu código de acceso para comenzar la evaluación
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="codigoAcceso">Código de acceso</Label>
                <Input
                  id="codigoAcceso"
                  placeholder="Ingresa el código proporcionado"
                  value={codigoAcceso}
                  onChange={(e) => setCodigoAcceso(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre</Label>
                <Input
                  id="nombre"
                  placeholder="Tu nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico (opcional)</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edad">Edad (opcional)</Label>
                  <Input
                    id="edad"
                    type="number"
                    placeholder="Edad"
                    min="18"
                    max="99"
                    value={edad}
                    onChange={(e) => setEdad(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sectorProfesional">Sector profesional (opcional)</Label>
                  <Input
                    id="sectorProfesional"
                    placeholder="Ej: Tecnología"
                    value={sectorProfesional}
                    onChange={(e) => setSectorProfesional(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Procesando..." : "Comenzar evaluación"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
