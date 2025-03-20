import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, LogIn } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Por favor ingresa tu correo electrónico y contraseña",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido a la plataforma PDA",
      });
      
      // Redirigir al dashboard o página principal
      navigate("/dashboard");
      
    } catch (error: unknown) {
      console.error("Error de inicio de sesión:", error);
      
      let errorMessage = "Credenciales incorrectas. Intenta nuevamente.";
      let errorTitle = "Error de inicio de sesión";
      
      if (error instanceof Error) {
        errorMessage = error.message;
        
        // Manejo específico para errores comunes de Supabase
        if (errorMessage.includes("Invalid login credentials")) {
          errorMessage = "Credenciales incorrectas. Verifica tu correo y contraseña.";
        } else if (errorMessage.includes("Email not confirmed")) {
          errorTitle = "Correo no verificado";
          errorMessage = "Por favor, verifica tu correo electrónico antes de iniciar sesión.";
        } else if (errorMessage.includes("Invalid email")) {
          errorMessage = "Formato de correo electrónico inválido.";
        } else if (errorMessage.includes("rate limit")) {
          errorMessage = "Demasiados intentos. Por favor, intenta más tarde.";
        }
      }
      
      toast({
        title: errorTitle,
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-blue-gray flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 fade-in">
        <div className="text-center">
          <Link to="/" className="inline-block">
            <h2 className="text-3xl font-bold text-gradient">PDA</h2>
            <p className="text-gray-600 mt-1">Personal Development Analysis</p>
          </Link>
        </div>

        <Card className="border border-white/20 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Iniciar Sesión</CardTitle>
            <CardDescription className="text-center">
              Ingresa tus credenciales para acceder a la plataforma
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Contraseña</Label>
                  <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit"
                className="w-full flex items-center gap-2 bg-gradient-to-r from-primary to-blue-400" 
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="animate-spin mr-2">⟳</span>
                ) : (
                  <LogIn className="h-4 w-4" />
                )}
                {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </Button>
              <div className="text-center text-sm">
                ¿No tienes una cuenta?{" "}
                <Link to="/register" className="text-primary hover:underline font-medium">
                  Regístrate
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>

        <div className="text-center text-sm text-gray-500">
          <p>© 2025 Todos los derechos reservados - Desarrollado en Honduras</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
