
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => (
  <Link to="/" className="inline-block">
    <h2 className={cn("text-3xl font-bold text-gradient", className)}>Recursos RH</h2>
  </Link>
);
