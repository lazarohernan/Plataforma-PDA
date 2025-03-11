
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  FileText, 
  Users, 
  BarChart, 
  Briefcase, 
  Calendar as CalendarIcon, 
  Download, 
  Mail 
} from "lucide-react";
import { toast } from "sonner";

export const ReportesPanel = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [reportConfig, setReportConfig] = useState({
    includeCharts: true,
    includeRecommendations: true,
    anonymizeData: false,
    format: "pdf"
  });
  
  const handleGenerateReport = (reportType: string) => {
    toast.success(`Generando reporte de ${reportType}. Se descargará en unos momentos.`);
  };
  
  const handleScheduleReport = (reportType: string) => {
    toast.success(`Reporte de ${reportType} programado correctamente.`);
  };
  
  return (
    <Tabs defaultValue="individuales" className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Generación de Reportes</h2>
        <TabsList>
          <TabsTrigger value="individuales" className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Individuales</span>
          </TabsTrigger>
          <TabsTrigger value="equipos" className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Equipos</span>
          </TabsTrigger>
          <TabsTrigger value="estadisticos" className="flex items-center gap-1">
            <BarChart className="h-4 w-4" />
            <span className="hidden sm:inline">Estadísticos</span>
          </TabsTrigger>
          <TabsTrigger value="perfiles" className="flex items-center gap-1">
            <Briefcase className="h-4 w-4" />
            <span className="hidden sm:inline">Perfiles</span>
          </TabsTrigger>
        </TabsList>
      </div>
      
      <TabsContent value="individuales">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Reporte Individual</CardTitle>
              <CardDescription>
                Genera un reporte detallado para un colaborador específico
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="employee">Seleccionar Colaborador</Label>
                <Select>
                  <SelectTrigger id="employee">
                    <SelectValue placeholder="Seleccionar colaborador" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Colaboradores</SelectLabel>
                      <SelectItem value="maria">María Rodríguez</SelectItem>
                      <SelectItem value="juan">Juan Pérez</SelectItem>
                      <SelectItem value="ana">Ana García</SelectItem>
                      <SelectItem value="carlos">Carlos López</SelectItem>
                      <SelectItem value="sofia">Sofía Martínez</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="report-type">Tipo de Reporte</Label>
                <Select defaultValue="completo">
                  <SelectTrigger id="report-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="completo">Reporte Completo</SelectItem>
                    <SelectItem value="ejecutivo">Reporte Ejecutivo</SelectItem>
                    <SelectItem value="basico">Reporte Básico</SelectItem>
                    <SelectItem value="personalizado">Personalizado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="charts" className="flex-1">Incluir gráficos</Label>
                  <Switch 
                    id="charts" 
                    checked={reportConfig.includeCharts}
                    onCheckedChange={(checked) => setReportConfig({...reportConfig, includeCharts: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="recommendations" className="flex-1">Incluir recomendaciones</Label>
                  <Switch 
                    id="recommendations" 
                    checked={reportConfig.includeRecommendations}
                    onCheckedChange={(checked) => setReportConfig({...reportConfig, includeRecommendations: checked})}
                  />
                </div>
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="format">Formato de Exportación</Label>
                <Select 
                  defaultValue={reportConfig.format}
                  onValueChange={(value) => setReportConfig({...reportConfig, format: value})}
                >
                  <SelectTrigger id="format">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="word">Word</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => handleScheduleReport('individual')}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                Programar
              </Button>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  onClick={() => toast.success("Enlace copiado al portapapeles")}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Compartir
                </Button>
                <Button onClick={() => handleGenerateReport('individual')}>
                  <Download className="mr-2 h-4 w-4" />
                  Generar Ahora
                </Button>
              </div>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Programación</CardTitle>
              <CardDescription>
                Programa reportes periódicos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Label className="mb-2 block">Fecha de inicio</Label>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="frequency">Frecuencia</Label>
                <Select defaultValue="mensual">
                  <SelectTrigger id="frequency">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unico">Una vez</SelectItem>
                    <SelectItem value="semanal">Semanal</SelectItem>
                    <SelectItem value="quincenal">Quincenal</SelectItem>
                    <SelectItem value="mensual">Mensual</SelectItem>
                    <SelectItem value="trimestral">Trimestral</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      
      <TabsContent value="equipos">
        <Card>
          <CardHeader>
            <CardTitle>Reportes de Equipo</CardTitle>
            <CardDescription>
              Genera reportes consolidados para equipos o departamentos
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="team">Seleccionar Equipo/Departamento</Label>
              <Select>
                <SelectTrigger id="team">
                  <SelectValue placeholder="Seleccionar departamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rrhh">Recursos Humanos</SelectItem>
                  <SelectItem value="ventas">Ventas</SelectItem>
                  <SelectItem value="operaciones">Operaciones</SelectItem>
                  <SelectItem value="tecnologia">Tecnología</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="team-report-type">Tipo de Análisis</Label>
              <Select defaultValue="distribucion">
                <SelectTrigger id="team-report-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="distribucion">Distribución de Perfiles</SelectItem>
                  <SelectItem value="compatibilidad">Compatibilidad con Roles</SelectItem>
                  <SelectItem value="indicadores">Indicadores Clave</SelectItem>
                  <SelectItem value="tendencias">Tendencias del Equipo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="anonymize" className="flex-1">Anonimizar datos</Label>
              <Switch 
                id="anonymize" 
                checked={reportConfig.anonymizeData}
                onCheckedChange={(checked) => setReportConfig({...reportConfig, anonymizeData: checked})}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => handleScheduleReport('equipo')}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              Programar
            </Button>
            <Button onClick={() => handleGenerateReport('equipo')}>
              <Download className="mr-2 h-4 w-4" />
              Generar Ahora
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      
      <TabsContent value="estadisticos">
        <Card>
          <CardHeader>
            <CardTitle>Reportes Estadísticos</CardTitle>
            <CardDescription>
              Análisis cuantitativos y tendencias organizacionales
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="stat-report-type">Tipo de Análisis</Label>
              <Select defaultValue="tendencias">
                <SelectTrigger id="stat-report-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tendencias">Tendencias Temporales</SelectItem>
                  <SelectItem value="distribucion">Distribución por Departamento</SelectItem>
                  <SelectItem value="correlaciones">Correlaciones de Dimensiones</SelectItem>
                  <SelectItem value="desviaciones">Desviaciones Significativas</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="period-start">Periodo Desde</Label>
                <Select defaultValue="6-months">
                  <SelectTrigger id="period-start">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-month">Último Mes</SelectItem>
                    <SelectItem value="3-months">Últimos 3 Meses</SelectItem>
                    <SelectItem value="6-months">Últimos 6 Meses</SelectItem>
                    <SelectItem value="1-year">Último Año</SelectItem>
                    <SelectItem value="all-time">Todo el Tiempo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="granularity">Granularidad</Label>
                <Select defaultValue="monthly">
                  <SelectTrigger id="granularity">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Semanal</SelectItem>
                    <SelectItem value="monthly">Mensual</SelectItem>
                    <SelectItem value="quarterly">Trimestral</SelectItem>
                    <SelectItem value="yearly">Anual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button onClick={() => handleGenerateReport('estadístico')}>
              <Download className="mr-2 h-4 w-4" />
              Generar Ahora
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      
      <TabsContent value="perfiles">
        <Card>
          <CardHeader>
            <CardTitle>Reportes de Perfiles de Puesto</CardTitle>
            <CardDescription>
              Análisis de compatibilidad y ajuste entre perfiles y candidatos
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="position-profile">Perfil de Puesto</Label>
              <Select>
                <SelectTrigger id="position-profile">
                  <SelectValue placeholder="Seleccionar perfil" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gerente-ventas">Gerente de Ventas</SelectItem>
                  <SelectItem value="analista-rrhh">Analista de RRHH</SelectItem>
                  <SelectItem value="desarrollador">Desarrollador de Software</SelectItem>
                  <SelectItem value="director-operaciones">Director de Operaciones</SelectItem>
                  <SelectItem value="servicio-cliente">Representante de Servicio al Cliente</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="profile-report-type">Tipo de Reporte</Label>
              <Select defaultValue="gap-analysis">
                <SelectTrigger id="profile-report-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gap-analysis">Análisis de Brechas</SelectItem>
                  <SelectItem value="compatibility">Compatibilidad de Candidatos</SelectItem>
                  <SelectItem value="team-fit">Ajuste con Equipo Actual</SelectItem>
                  <SelectItem value="recommendations">Recomendaciones de Desarrollo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button onClick={() => handleGenerateReport('perfiles de puesto')}>
              <Download className="mr-2 h-4 w-4" />
              Generar Ahora
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
