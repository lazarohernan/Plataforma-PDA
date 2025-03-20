import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { TooltipProvider } from '@/components/ui/tooltip';
import { PrivateRoute } from '@/components/auth/PrivateRoute';
import Index from './pages/Index';
import Login from './pages/Login';
import Assessment from './pages/Assessment';
import Results from './pages/Results';
import NotFound from './pages/NotFound';
import AccesoEvaluacion from './pages/AccesoEvaluacion';

function App() {
  return (
    <div className="App">
      <TooltipProvider>
        <Router>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/acceso-evaluacion" element={<AccesoEvaluacion />} />
            
            {/* Redirigir registro a la página principal */}
            <Route path="/register" element={<Navigate to="/" replace />} />
            
            {/* Rutas protegidas que requieren autenticación */}
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
            
            {/* Redirigir todas las rutas del dashboard a la página principal */}
            <Route path="/dashboard/*" element={<Navigate to="/" replace />} />
            
            {/* Ruta 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </TooltipProvider>
    </div>
  );
}

export default App;
