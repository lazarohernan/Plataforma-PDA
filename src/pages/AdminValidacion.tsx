import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
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
  const navigate = useNavigate();
  const { toast } = useToast();

  // Verificar si el usuario es administrador
  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          toast({
            title: "Sesión no iniciada",
            description: "Por favor inicia sesión para acceder a esta página.",
            variant: "destructive",
          });
          navigate('/login');
          return;
        }

        console.log("Usuario autenticado:", user);
        
        // Verificar si el usuario tiene metadatos de rol
        if (user.user_metadata && user.user_metadata.role === 'admin') {
          console.log("Usuario es administrador según metadatos");
          return; // Permitir acceso si es admin según metadatos
        }
        
        // Intentar obtener el rol mediante RPC
        try {
          const { data: userRole, error: rpcError } = await supabase.rpc('get_user_role');
          
          if (rpcError) {
            console.error("Error al obtener rol mediante RPC:", rpcError);
            
            // Verificar si el usuario es uno de los administradores conocidos
            const adminEmails = ['hlazaroe@gmail.com', 'dennisjoaquin@gmail.com'];
            if (adminEmails.includes(user.email || '')) {
              console.log("Usuario es administrador por email conocido");
              return; // Permitir acceso si es un email de admin conocido
            }
            
            toast({
              title: "Error al verificar permisos",
              description: `Error: ${rpcError.message}. Contacta al administrador.`,
              variant: "destructive",
            });
            navigate('/');
            return;
          }
          
          console.log("Rol obtenido mediante RPC:", userRole);
          
          if (userRole !== 1) { // 1 = Administrador
            toast({
              title: "Acceso denegado",
              description: "No tienes permisos para acceder a esta página.",
              variant: "destructive",
            });
            navigate('/');
          }
        } catch (error) {
          console.error("Excepción al verificar rol:", error);
          
          // Verificar si el usuario es uno de los administradores conocidos
          const adminEmails = ['hlazaroe@gmail.com', 'dennisjoaquin@gmail.com'];
          if (adminEmails.includes(user.email || '')) {
            console.log("Usuario es administrador por email conocido");
            return; // Permitir acceso si es un email de admin conocido
          }
          
          toast({
            title: "Error al verificar permisos",
            description: "Ocurrió un error inesperado. Contacta al administrador.",
            variant: "destructive",
          });
          navigate('/');
        }
      } catch (error) {
        console.error("Error al verificar usuario:", error);
        toast({
          title: "Error de autenticación",
          description: "No se pudo verificar tu identidad. Por favor, inicia sesión nuevamente.",
          variant: "destructive",
        });
        navigate('/login');
      }
    };

    checkUserRole();
  }, [navigate, toast]);

  // Cargar datos de usuarios de validación
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: usuariosData, error } = await supabase
          .from('usuarios_validacion')
          .select('*')
          .order('fecha_creacion', { ascending: false });

        if (error) throw error;

        setUsuarios(usuariosData || []);
        
        // Contar estados
        const completadosCount = usuariosData?.filter(u => u.estado === 'completado').length || 0;
        const pendientesCount = usuariosData?.filter(u => u.estado === 'pendiente').length || 0;
        
        setCompletados(completadosCount);
        setPendientes(pendientesCount);
      } catch (error) {
        console.error('Error al cargar usuarios:', error);
        toast({
          title: "Error",
          description: "No se pudieron cargar los datos de usuarios.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [toast]);

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
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">Cargando datos...</TableCell>
                </TableRow>
              ) : usuarios.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">No hay usuarios de validación</TableCell>
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
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
