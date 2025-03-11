
import { Logo } from "@/components/atoms/Logo";
import { NavigationMenu } from "@/components/molecules/NavigationMenu";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Logo />
        <NavigationMenu />
      </div>
    </header>
  );
};

