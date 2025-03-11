
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, User, Building, UserPlus } from "lucide-react";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
            <CardTitle className="text-2xl text-center">Crear Cuenta</CardTitle>
            <CardDescription className="text-center">
              Regístrate para comenzar a evaluar a tu equipo
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Nombre completo</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  id="fullName"
                  placeholder="Tu nombre completo"
                  className="pl-10"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Empresa</Label>
              <div className="relative">
                <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  id="company"
                  placeholder="Nombre de tu empresa"
                  className="pl-10"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
            </div>
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
              <Label htmlFor="password">Contraseña</Label>
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
            <Button className="w-full flex items-center gap-2 bg-gradient-to-r from-primary to-blue-400" size="lg">
              <UserPlus className="h-4 w-4" />
              Crear Cuenta
            </Button>
            <div className="text-center text-sm">
              ¿Ya tienes una cuenta?{" "}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Iniciar Sesión
              </Link>
            </div>
          </CardFooter>
        </Card>

        <div className="text-center text-sm text-gray-500">
          <p>© 2023 PDA International. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
