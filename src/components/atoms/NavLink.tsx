
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface NavLinkProps {
  to: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
}

export const NavLink = ({ to, icon: Icon, children, className }: NavLinkProps) => (
  <Link
    to={to}
    className={cn(
      "flex items-center gap-2 px-4 py-2 rounded-md transition-colors hover:bg-gray-100/10",
      className
    )}
  >
    {Icon && <Icon className="w-4 h-4" />}
    <span>{children}</span>
  </Link>
);

