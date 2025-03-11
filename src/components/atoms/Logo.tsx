
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export const Logo = ({
  className
}: LogoProps) => (
  <Link to="/" className="inline-block">
    <div className={cn("flex items-center justify-center", className)}>
      <div className="bg-white rounded-full p-1 flex items-center justify-center">
        <div className="bg-[#1A365D] rounded-full w-6 h-6 flex items-center justify-center text-white font-bold text-xs">
          RH
        </div>
      </div>
    </div>
  </Link>
);
