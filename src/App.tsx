import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AuthProvider } from '@/components/auth/AuthProvider';
import { PrivateRoute } from '@/components/auth/PrivateRoute';
import Index from './pages/Index';
import Login from './pages/Login';
import Assessment from './pages/Assessment';
import AssessmentWelcome from './pages/AssessmentWelcome';
import Results from './pages/Results';
import NotFound from './pages/NotFound';
import AccesoEvaluacion from './pages/AccesoEvaluacion';
import Dashboard from './pages/Dashboard';
import DashboardEvaluations from './pages/DashboardEvaluations';
import DashboardAnalysis from './pages/DashboardAnalysis';
import PerfilesDeOPuesto from './pages/PerfilesDeOPuesto';
import DashboardReportes from './pages/DashboardReportes';
import AdminValidacion from './pages/AdminValidacion';

function AppRoutes() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/acceso-evaluacion" element={<AccesoEvaluacion />} />
      
      {/* Redirigir registro a la página principal */}
      <Route path="/register" element={<Navigate to="/" replace />} />
      
      {/* Rutas protegidas que requieren autenticación */}
      <Route path="/assessment-welcome" element={
        <PrivateRoute>
          <AssessmentWelcome />
        </PrivateRoute>
      } />
      <Route path="/assessment" element={
        <PrivateRoute>
          <Assessment />
        </PrivateRoute>
      } />
      <Route path="/results" element={
        <PrivateRoute>
          <Results />
        </PrivateRoute>
      } />
      
      {/* Rutas del dashboard */}
      <Route path="/dashboard" element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      } />
      <Route path="/dashboard/evaluations" element={
        <PrivateRoute>
          <DashboardEvaluations />
        </PrivateRoute>
      } />
      <Route path="/dashboard/analysis" element={
        <PrivateRoute>
          <DashboardAnalysis />
        </PrivateRoute>
      } />
      <Route path="/dashboard/perfiles-puesto" element={
        <PrivateRoute>
          <PerfilesDeOPuesto />
        </PrivateRoute>
      } />
      <Route path="/dashboard/reportes" element={
        <PrivateRoute>
          <DashboardReportes />
        </PrivateRoute>
      } />
      
      {/* Ruta protegida que requiere rol de administrador */}
      <Route path="/dashboard/validacion" element={
        <PrivateRoute requireAdmin>
          <AdminValidacion />
        </PrivateRoute>
      } />
      
      {/* Ruta 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <div className="App">
      <TooltipProvider>
        <Router>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </Router>
      </TooltipProvider>
    </div>
  );
}

export default App;
