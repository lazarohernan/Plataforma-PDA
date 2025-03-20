import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface FeedbackFormProps {
  resultadoId: string;
  onComplete: () => void;
  onSkip: () => void;
}

export default function FeedbackForm({ resultadoId, onComplete, onSkip }: FeedbackFormProps) {
  const [valoracionPrecision, setValoracionPrecision] = useState<number | null>(null);
  const [valoracionClaridad, setValoracionClaridad] = useState<number | null>(null);
  const [valoracionExperiencia, setValoracionExperiencia] = useState<number | null>(null);
  const [comentarios, setComentarios] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Si el resultadoId es temporal, guardamos el feedback localmente
      if (resultadoId === "temp-id") {
        // Guardar feedback en localStorage para referencia futura
        localStorage.setItem('pda_feedback', JSON.stringify({
          valoracion_precision: valoracionPrecision,
          valoracion_claridad: valoracionClaridad,
          valoracion_experiencia: valoracionExperiencia,
          comentarios_generales: comentarios || null,
          fecha: new Date().toISOString()
        }));
        
        toast({
          title: "¡Gracias por tu feedback!",
          description: "Tu opinión nos ayuda a mejorar la evaluación.",
        });
        
        onComplete();
        return;
      }
      
      // Si tenemos un ID real, guardamos en Supabase
      const { error } = await supabase
        .from('feedback_evaluacion')
        .insert({
          resultado_id: resultadoId,
          valoracion_precision: valoracionPrecision,
          valoracion_claridad: valoracionClaridad,
          valoracion_experiencia: valoracionExperiencia,
          comentarios_generales: comentarios || null
        });

      if (error) throw error;
      
      toast({
        title: "¡Gracias por tu feedback!",
        description: "Tu opinión nos ayuda a mejorar la evaluación.",
      });
      
      onComplete();
    } catch (error) {
      console.error('Error al enviar feedback:', error);
      toast({
        title: "Error",
        description: "No se pudo enviar tu feedback. Por favor intenta nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Tu opinión es importante</CardTitle>
        <CardDescription>
          Ayúdanos a mejorar la evaluación PDA respondiendo estas preguntas opcionales.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-3">¿Qué tan preciso consideras que fue tu perfil?</h3>
            <RadioGroup
              value={valoracionPrecision?.toString() || ""}
              onValueChange={(value) => setValoracionPrecision(parseInt(value))}
              className="flex space-x-1"
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <div key={value} className="flex flex-col items-center">
                  <RadioGroupItem value={value.toString()} id={`precision-${value}`} className="sr-only" />
                  <Label
                    htmlFor={`precision-${value}`}
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center cursor-pointer
                      ${valoracionPrecision === value ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'}
                    `}
                  >
                    {value}
                  </Label>
                  {value === 1 && <span className="text-xs mt-1">Poco</span>}
                  {value === 5 && <span className="text-xs mt-1">Mucho</span>}
                </div>
              ))}
            </RadioGroup>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">¿Qué tan claros fueron los descriptores?</h3>
            <RadioGroup
              value={valoracionClaridad?.toString() || ""}
              onValueChange={(value) => setValoracionClaridad(parseInt(value))}
              className="flex space-x-1"
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <div key={value} className="flex flex-col items-center">
                  <RadioGroupItem value={value.toString()} id={`claridad-${value}`} className="sr-only" />
                  <Label
                    htmlFor={`claridad-${value}`}
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center cursor-pointer
                      ${valoracionClaridad === value ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'}
                    `}
                  >
                    {value}
                  </Label>
                  {value === 1 && <span className="text-xs mt-1">Poco</span>}
                  {value === 5 && <span className="text-xs mt-1">Mucho</span>}
                </div>
              ))}
            </RadioGroup>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">¿Cómo calificarías tu experiencia general?</h3>
            <RadioGroup
              value={valoracionExperiencia?.toString() || ""}
              onValueChange={(value) => setValoracionExperiencia(parseInt(value))}
              className="flex space-x-1"
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <div key={value} className="flex flex-col items-center">
                  <RadioGroupItem value={value.toString()} id={`experiencia-${value}`} className="sr-only" />
                  <Label
                    htmlFor={`experiencia-${value}`}
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center cursor-pointer
                      ${valoracionExperiencia === value ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'}
                    `}
                  >
                    {value}
                  </Label>
                  {value === 1 && <span className="text-xs mt-1">Mala</span>}
                  {value === 5 && <span className="text-xs mt-1">Excelente</span>}
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="comentarios">Comentarios adicionales (opcional)</Label>
          <Textarea
            id="comentarios"
            placeholder="Comparte cualquier sugerencia o comentario que tengas sobre la evaluación..."
            value={comentarios}
            onChange={(e) => setComentarios(e.target.value)}
            rows={4}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onSkip}>
          Omitir
        </Button>
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Enviar feedback"}
        </Button>
      </CardFooter>
    </Card>
  );
}
