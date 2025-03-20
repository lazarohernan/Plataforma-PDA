import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Share, Copy, Mail, QrCode } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { useAdmin } from '@/hooks/useAdmin';
import { Database } from '@/types/supabase';

type UsuarioValidacion = Database['public']['Tables']['usuarios_validacion']['Row'];

export default function AdminValidacion() {
  const [usuarios, setUsuarios] = useState<UsuarioValidacion[]>([]);
  const [totalObjetivo, setTotalObjetivo] = useState(150);
  const [completados, setCompletados] = useState(0);
  const [pendientes, setPendientes] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isGeneratingCode, setIsGeneratingCode] = useState(false);
  const [nuevoCodigoAcceso, setNuevoCodigoAcceso] = useState('');
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [codigoSeleccionado, setCodigoSeleccionado] = useState('');
  const [emailTo, setEmailTo] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAdmin, loading: adminLoading } = useAdmin();

  // Verificar si el usuario es administrador
  useEffect(() => {
    if (adminLoading) return; // Esperar a que se cargue el estado de admin
    
    if (!isAdmin) {
      toast({
        title: "Acceso denegado",
        description: "No tienes permisos para acceder a esta página.",
        variant: "destructive",
      });
      navigate('/dashboard');
    }
  }, [isAdmin, adminLoading, navigate, toast]);

  // Cargar datos de usuarios de validación
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Primero verificar si la tabla existe
        const { error: tableCheckError } = await supabase
          .from('usuarios_validacion')
          .select('id')
          .limit(1);
        
        // Si hay un error, puede ser que la tabla no exista
        if (tableCheckError) {
          console.error('Error al verificar tabla usuarios_validacion:', tableCheckError);
          
          // Mostrar mensaje informativo al usuario
          toast({
            title: "Información",
            description: "La tabla de validación no está configurada. Esto no afecta tu acceso como administrador.",
            variant: "default",
          });
          
          // Continuar con una lista vacía
          setUsuarios([]);
          setIsLoading(false);
          return;
        }
        
        // Intentar cargar los datos
        const { data: usuariosData, error } = await supabase
          .from('usuarios_validacion')
          .select('*')
          .order('fecha_creacion', { ascending: false });

        if (error) {
          console.error('Error al cargar usuarios:', error);
          setUsuarios([]);
        } else {
          setUsuarios(usuariosData || []);
          
          // Contar estados
          const completadosCount = usuariosData?.filter(u => u.estado === 'completado').length || 0;
          const pendientesCount = usuariosData?.filter(u => u.estado === 'pendiente').length || 0;
          
          setCompletados(completadosCount);
          setPendientes(pendientesCount);
        }
      } catch (error) {
        console.error('Error al cargar usuarios:', error);
        toast({
          title: "Error",
          description: "No se pudieron cargar los datos de usuarios. Esto no afecta tu acceso como administrador.",
          variant: "destructive",
        });
        setUsuarios([]);
      } finally {
        setIsLoading(false);
      }
    };

    // Solo cargar datos si el usuario es administrador
    if (!adminLoading && isAdmin) {
      fetchData();
    }
  }, [toast, isAdmin, adminLoading]);

  // Generar código de acceso aleatorio
  const generarCodigoAcceso = async () => {
    setIsGeneratingCode(true);
    
    try {
      // Generar código alfanumérico aleatorio
      const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let codigo = '';
      for (let i = 0; i < 8; i++) {
        codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
      }
      
      // Crear nuevo usuario de validación con el código
      const { data, error } = await supabase
        .from('usuarios_validacion')
        .insert({
          nombre: 'Pendiente',
          codigo_acceso: codigo,
          estado: 'pendiente'
        })
        .select()
        .single();

      if (error) throw error;
      
      setNuevoCodigoAcceso(codigo);
      
      // Actualizar la lista de usuarios
      setUsuarios(prevUsuarios => [data, ...prevUsuarios]);
      setPendientes(prev => prev + 1);
      
      toast({
        title: "Código generado",
        description: `Nuevo código de acceso: ${codigo}`,
      });
    } catch (error) {
      console.error('Error al generar código:', error);
      toast({
        title: "Error",
        description: "No se pudo generar el código de acceso.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingCode(false);
    }
  };

  // Exportar datos a CSV
  const exportarDatos = async () => {
    try {
      // Obtener todos los datos necesarios
      const { data: usuariosData, error: usuariosError } = await supabase
        .from('usuarios_validacion')
        .select(`
          *,
          resultados_evaluacion (*)
        `);

      if (usuariosError) throw usuariosError;

      // Formatear datos para CSV
      const csvData = usuariosData.map(usuario => {
        const resultado = usuario.resultados_evaluacion;
        return {
          id: usuario.id,
          nombre: usuario.nombre,
          email: usuario.email || '',
          edad: usuario.edad || '',
          sector_profesional: usuario.sector_profesional || '',
          estado: usuario.estado,
          fecha_creacion: usuario.fecha_creacion,
          fecha_evaluacion: usuario.fecha_evaluacion || '',
          perfil_natural: resultado ? JSON.stringify(resultado.perfil_natural) : '',
          perfil_adaptado: resultado ? JSON.stringify(resultado.perfil_adaptado) : '',
          indicadores: resultado ? JSON.stringify(resultado.indicadores) : ''
        };
      });

      // Convertir a CSV
      const headers = Object.keys(csvData[0]).join(',');
      const rows = csvData.map(row => Object.values(row).join(','));
      const csv = [headers, ...rows].join('\n');

      // Descargar archivo
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.setAttribute('hidden', '');
      a.setAttribute('href', url);
      a.setAttribute('download', `datos_validacion_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error al exportar datos:', error);
      toast({
        title: "Error",
        description: "No se pudieron exportar los datos.",
        variant: "destructive",
      });
    }
  };

  // Formatear fecha
  const formatearFecha = (fechaStr: string | null) => {
    if (!fechaStr) return '-';
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Funciones para compartir
  const copyToClipboard = () => {
    const shareableLink = `${window.location.origin}/acceso-evaluacion?codigo=${codigoSeleccionado}`;
    navigator.clipboard.writeText(shareableLink);
    toast({
      title: "Enlace copiado",
      description: "El enlace ha sido copiado al portapapeles.",
    });
  };

  const handleSendEmail = () => {
    if (!emailTo) {
      toast({
        title: "Error",
        description: "Por favor ingresa un correo electrónico válido.",
        variant: "destructive",
      });
      return;
    }

    const shareableLink = `${window.location.origin}/acceso-evaluacion?codigo=${codigoSeleccionado}`;
    const subject = encodeURIComponent("Invitación para realizar evaluación PDA");
    const body = encodeURIComponent(
      `Hola,\n\nHas sido invitado a realizar una evaluación PDA. Por favor accede al siguiente enlace:\n\n${shareableLink}\n\nCódigo de acceso: ${codigoSeleccionado}\n\nGracias.`
    );
    
    window.open(`mailto:${emailTo}?subject=${subject}&body=${body}`);
    
    toast({
      title: "Correo preparado",
      description: "Se ha abierto tu cliente de correo con el mensaje preparado.",
    });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Panel de Validación PDA</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Tarjeta de progreso */}
        <Card>
          <CardHeader>
            <CardTitle>Progreso de validación</CardTitle>
            <CardDescription>Objetivo: {totalObjetivo} evaluaciones</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={(completados / totalObjetivo) * 100} className="h-4 mb-2" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{completados} completadas</span>
              <span>Faltan {totalObjetivo - completados}</span>
            </div>
          </CardContent>
        </Card>
        
        {/* Tarjeta de estadísticas */}
        <Card>
          <CardHeader>
            <CardTitle>Estadísticas</CardTitle>
            <CardDescription>Resumen de evaluaciones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total evaluaciones:</span>
                <span className="font-medium">{usuarios.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Completadas:</span>
                <span className="font-medium">{completados}</span>
              </div>
              <div className="flex justify-between">
                <span>Pendientes:</span>
                <span className="font-medium">{pendientes}</span>
              </div>
              <div className="flex justify-between">
                <span>Tasa de finalización:</span>
                <span className="font-medium">
                  {usuarios.length > 0 ? Math.round((completados / usuarios.length) * 100) : 0}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Tarjeta de generación de códigos */}
        <Card>
          <CardHeader>
            <CardTitle>Generar código de acceso</CardTitle>
            <CardDescription>Crea un nuevo código para evaluación</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {nuevoCodigoAcceso && (
              <div className="p-3 bg-muted rounded-md">
                <Label>Último código generado:</Label>
                <div className="font-mono text-lg font-bold">{nuevoCodigoAcceso}</div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              onClick={generarCodigoAcceso} 
              disabled={isGeneratingCode}
              className="w-full"
            >
              {isGeneratingCode ? "Generando..." : "Generar nuevo código"}
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* Acciones */}
      <div className="flex justify-end mb-6">
        <Button onClick={exportarDatos} variant="outline" className="mr-2">
          Exportar datos
        </Button>
        <Button onClick={() => setTotalObjetivo(prev => prev + 50)}>
          Aumentar objetivo (+50)
        </Button>
      </div>
      
      {/* Tabla de usuarios */}
      <Card>
        <CardHeader>
          <CardTitle>Usuarios de validación</CardTitle>
          <CardDescription>Lista de todos los códigos de acceso generados</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha creación</TableHead>
                <TableHead>Fecha evaluación</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">Cargando datos...</TableCell>
                </TableRow>
              ) : usuarios.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">No hay usuarios de validación</TableCell>
                </TableRow>
              ) : (
                usuarios.map(usuario => (
                  <TableRow key={usuario.id}>
                    <TableCell className="font-mono">{usuario.codigo_acceso}</TableCell>
                    <TableCell>{usuario.nombre}</TableCell>
                    <TableCell>{usuario.email || '-'}</TableCell>
                    <TableCell>
                      <Badge variant={usuario.estado === 'completado' ? 'default' : 'outline'}>
                        {usuario.estado}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatearFecha(usuario.fecha_creacion)}</TableCell>
                    <TableCell>{formatearFecha(usuario.fecha_evaluacion)}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setCodigoSeleccionado(usuario.codigo_acceso);
                          setIsShareDialogOpen(true);
                        }}
                        className="flex items-center gap-1"
                      >
                        <Share className="h-4 w-4" />
                        <span>Compartir</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal de compartir */}
      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Compartir enlace de evaluación</DialogTitle>
            <DialogDescription>
              Comparte este enlace con el participante para que pueda acceder a la evaluación.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex items-center space-x-2 mt-4">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link">Enlace</Label>
              <Input
                id="link"
                readOnly
                value={`${window.location.origin}/acceso-evaluacion?codigo=${codigoSeleccionado}`}
              />
            </div>
            <Button size="sm" className="px-3" onClick={copyToClipboard}>
              <span className="sr-only">Copiar</span>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="mt-6">
            <Tabs defaultValue="qr">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="qr">Código QR</TabsTrigger>
                <TabsTrigger value="email">Correo</TabsTrigger>
              </TabsList>
              <TabsContent value="qr" className="flex justify-center py-4">
                {/* QR Code Component */}
                <div className="p-4 bg-white border rounded-md flex flex-col items-center">
                  <QrCode className="h-32 w-32 text-primary" />
                  <p className="mt-4 text-sm text-center">
                    Código de acceso: <span className="font-mono font-bold">{codigoSeleccionado}</span>
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="email">
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input
                      id="email"
                      placeholder="usuario@ejemplo.com"
                      value={emailTo}
                      onChange={(e) => setEmailTo(e.target.value)}
                    />
                  </div>
                  <Button onClick={handleSendEmail} className="w-full">
                    Enviar por correo
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <DialogFooter className="sm:justify-start mt-4">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cerrar
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
