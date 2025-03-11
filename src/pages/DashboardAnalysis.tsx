
import { useState } from "react";
import { 
  Download, 
  Mail, 
  Printer, 
  UserPlus, 
  Filter 
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { PDACategoryChart } from "@/components/molecules/PDACategoryChart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { mockResults } from "@/models/results";

const DashboardAnalysis = () => {
  const [selectedProfile1, setSelectedProfile1] = useState("profile1");
  const [selectedProfile2, setSelectedProfile2] = useState("profile2");
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Análisis Comparativo</h1>
            <p className="text-gray-500">Compara perfiles para análisis de compatibilidad y equipos</p>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter size={16} />
              Filtros
            </Button>
            <Button className="flex items-center gap-2">
              <UserPlus size={16} />
              Añadir Perfil
            </Button>
          </div>
        </div>
        
        {/* Profile Selection */}
        <Card>
          <CardHeader className="pb-2">
            <h2 className="text-lg font-semibold">Seleccionar Perfiles para Comparar</h2>
            <p className="text-sm text-gray-500">
              Selecciona dos perfiles para visualizar su comparación y análisis de compatibilidad
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Perfil 1
                </label>
                <Select value={selectedProfile1} onValueChange={setSelectedProfile1}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar perfil" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="profile1">Carlos Rodríguez (Ventas)</SelectItem>
                    <SelectItem value="profile2">Ana Martínez (Marketing)</SelectItem>
                    <SelectItem value="profile3">Jorge Fernández (Ventas)</SelectItem>
                    <SelectItem value="profile4">María García (RRHH)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Perfil 2
                </label>
                <Select value={selectedProfile2} onValueChange={setSelectedProfile2}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar perfil" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="profile1">Carlos Rodríguez (Ventas)</SelectItem>
                    <SelectItem value="profile2">Ana Martínez (Marketing)</SelectItem>
                    <SelectItem value="profile3">Jorge Fernández (Ventas)</SelectItem>
                    <SelectItem value="profile4">María García (RRHH)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Comparison Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <h2 className="text-lg font-semibold">Perfil 1: Ana Martínez</h2>
              <p className="text-sm text-gray-500">Marketing • Evaluado el 22/08/2023</p>
            </CardHeader>
            <CardContent>
              <PDACategoryChart 
                naturalProfile={mockResults.natural} 
                adaptedProfile={mockResults.adapted}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <h2 className="text-lg font-semibold">Perfil 2: Jorge Fernández</h2>
              <p className="text-sm text-gray-500">Ventas • Evaluado el 18/08/2023</p>
            </CardHeader>
            <CardContent>
              <PDACategoryChart 
                naturalProfile={{
                  risk: 75,
                  extroversion: 68,
                  patience: 45,
                  normativity: 50,
                  selfControl: 40
                }} 
                adaptedProfile={{
                  risk: 80,
                  extroversion: 70,
                  patience: 40,
                  normativity: 45,
                  selfControl: 35
                }}
              />
            </CardContent>
          </Card>
        </div>
        
        {/* Compatibility Analysis */}
        <Card>
          <CardHeader className="pb-2">
            <h2 className="text-lg font-semibold">Análisis de Compatibilidad</h2>
            <p className="text-sm text-gray-500">
              Evaluación de compatibilidad basada en dimensiones PDA e indicadores derivados
            </p>
          </CardHeader>
          <CardContent>
            <div className="p-6 bg-gray-50 rounded-lg border border-gray-100 text-center">
              <div className="mx-auto w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <span className="text-3xl font-bold text-blue-600">72%</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Compatibilidad Moderada-Alta</h3>
              <p className="text-gray-600 max-w-xl mx-auto">
                Estos perfiles muestran una buena compatibilidad en sus estilos de trabajo. 
                Ambos tienen enfoques complementarios que pueden beneficiar al equipo, 
                especialmente en entornos orientados a resultados.
              </p>
              
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download size={16} />
                  Exportar Análisis
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Mail size={16} />
                  Compartir por Email
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Printer size={16} />
                  Imprimir
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DashboardAnalysis;
