
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DownloadCloud, Eye, Share2, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Datos de ejemplo para el historial de reportes
const reportesHistorialData = [
  {
    id: "rep1",
    nombre: "Reporte Individual - María Rodríguez",
    tipo: "Individual",
    fecha: "12/05/2023",
    formato: "PDF",
    estado: "Completado"
  },
  {
    id: "rep2",
    nombre: "Análisis de Equipo - Departamento de Ventas",
    tipo: "Equipo",
    fecha: "10/05/2023",
    formato: "Excel",
    estado: "Completado"
  },
  {
    id: "rep3",
    nombre: "Tendencias Trimestrales - Q1 2023",
    tipo: "Estadístico",
    fecha: "01/04/2023",
    formato: "PDF",
    estado: "Completado"
  },
  {
    id: "rep4",
    nombre: "Reporte Ejecutivo Mensual",
    tipo: "Estadístico",
    fecha: "13/05/2023",
    formato: "PDF",
    estado: "Pendiente"
  },
  {
    id: "rep5",
    nombre: "Compatibilidad - Desarrollador Senior",
    tipo: "Perfil",
    fecha: "11/05/2023",
    formato: "PDF",
    estado: "Completado"
  }
];

export const ReportesHistorial = () => {
  const handleDownload = (id: string) => {
    toast.success("Descargando reporte...");
  };
  
  const handleView = (id: string) => {
    toast.success("Abriendo vista previa del reporte...");
  };
  
  const handleShare = (id: string) => {
    toast.success("Enlace del reporte copiado al portapapeles");
  };
  
  const handleDelete = (id: string) => {
    toast.success("Reporte eliminado correctamente");
  };
  
  // Helper para obtener el color de la badge según el estado
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Completado":
        return "success";
      case "Pendiente":
        return "secondary";
      case "Fallido":
        return "destructive";
      default:
        return "default";
    }
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Historial de Reportes</h2>
        <Button variant="outline" size="sm">
          Ver todos
        </Button>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Formato</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reportesHistorialData.map((reporte) => (
              <TableRow key={reporte.id}>
                <TableCell className="font-medium">{reporte.nombre}</TableCell>
                <TableCell>{reporte.tipo}</TableCell>
                <TableCell>{reporte.fecha}</TableCell>
                <TableCell>{reporte.formato}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(reporte.estado) as any}>
                    {reporte.estado}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    {reporte.estado === "Completado" && (
                      <>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleView(reporte.id)}
                        >
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">Ver</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDownload(reporte.id)}
                        >
                          <DownloadCloud className="h-4 w-4" />
                          <span className="sr-only">Descargar</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleShare(reporte.id)}
                        >
                          <Share2 className="h-4 w-4" />
                          <span className="sr-only">Compartir</span>
                        </Button>
                      </>
                    )}
                    
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDelete(reporte.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Eliminar</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
