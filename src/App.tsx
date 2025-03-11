
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Assessment from "./pages/Assessment";
import AssessmentWelcome from "./pages/AssessmentWelcome";
import Results from "./pages/Results";
import Dashboard from "./pages/Dashboard";
import DashboardEvaluations from "./pages/DashboardEvaluations";
import DashboardAnalysis from "./pages/DashboardAnalysis";
import PerfilesDeOPuesto from "./pages/PerfilesDeOPuesto";
import PerfilPuestoCrear from "./pages/PerfilPuestoCrear";
import PerfilPuestoEditar from "./pages/PerfilPuestoEditar";
import PerfilPuestoComparar from "./pages/PerfilPuestoComparar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/assessment/welcome" element={<AssessmentWelcome />} />
          <Route path="/results" element={<Results />} />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/evaluaciones" element={<DashboardEvaluations />} />
          <Route path="/dashboard/analisis" element={<DashboardAnalysis />} />
          <Route path="/dashboard/perfiles-puesto" element={<PerfilesDeOPuesto />} />
          <Route path="/dashboard/perfiles-puesto/crear" element={<PerfilPuestoCrear />} />
          <Route path="/dashboard/perfiles-puesto/editar/:id" element={<PerfilPuestoEditar />} />
          <Route path="/dashboard/perfiles-puesto/comparar/:id" element={<PerfilPuestoComparar />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
