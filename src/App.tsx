import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { TooltipProvider } from '@/components/ui/tooltip';
import { PrivateRoute } from '@/components/auth/PrivateRoute';
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
            {/* Rutas públicas */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/acceso-evaluacion" element={<AccesoEvaluacion />} />
            
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
            
            {/* Rutas del dashboard (protegidas) */}
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
            <Route path="/dashboard/perfiles-puesto/crear" element={
              <PrivateRoute>
                <PerfilPuestoCrear />
              </PrivateRoute>
            } />
            <Route path="/dashboard/perfiles-puesto/editar/:id" element={
              <PrivateRoute>
                <PerfilPuestoEditar />
              </PrivateRoute>
            } />
            <Route path="/dashboard/perfiles-puesto/comparar" element={
              <PrivateRoute>
                <PerfilPuestoComparar />
              </PrivateRoute>
            } />
            <Route path="/dashboard/reportes" element={
              <PrivateRoute>
                <DashboardReportes />
              </PrivateRoute>
            } />
            <Route path="/dashboard/validacion" element={
              <PrivateRoute>
                <AdminValidacion />
              </PrivateRoute>
            } />
            
            {/* Ruta 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </TooltipProvider>
    </div>
  );
}

export default App;
