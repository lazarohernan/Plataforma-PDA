import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { TooltipProvider } from '@/components/ui/tooltip';
import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import AssessmentWelcome from './pages/AssessmentWelcome';
import Assessment from './pages/Assessment';
import Results from './pages/Results';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import DashboardEvaluations from './pages/DashboardEvaluations';
import DashboardAnalysis from './pages/DashboardAnalysis';
import PerfilesDeOPuesto from './pages/PerfilesDeOPuesto';
import PerfilPuestoCrear from './pages/PerfilPuestoCrear';
import PerfilPuestoEditar from './pages/PerfilPuestoEditar';
import PerfilPuestoComparar from './pages/PerfilPuestoComparar';
import DashboardReportes from './pages/DashboardReportes';
import AccesoEvaluacion from './pages/AccesoEvaluacion';
import AdminValidacion from './pages/AdminValidacion';

function App() {
  return (
    <div className="App">
      <TooltipProvider>
        <Router>
          <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/acceso-evaluacion" element={<AccesoEvaluacion />} />
          <Route path="/assessment-welcome" element={<AssessmentWelcome />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/results" element={<Results />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/evaluations" element={<DashboardEvaluations />} />
          <Route path="/dashboard/analysis" element={<DashboardAnalysis />} />
          <Route path="/dashboard/perfiles-puesto" element={<PerfilesDeOPuesto />} />
          <Route path="/dashboard/perfiles-puesto/crear" element={<PerfilPuestoCrear />} />
          <Route path="/dashboard/perfiles-puesto/editar/:id" element={<PerfilPuestoEditar />} />
          <Route path="/dashboard/perfiles-puesto/comparar" element={<PerfilPuestoComparar />} />
          <Route path="/dashboard/reportes" element={<DashboardReportes />} />
          <Route path="/dashboard/validacion" element={<AdminValidacion />} />
          <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </TooltipProvider>
    </div>
  );
}

export default App;
