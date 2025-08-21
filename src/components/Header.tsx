import { Button } from "@/components/ui/button";
import { PenSquare, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-3 text-foreground hover:text-primary transition-colors"
        >
          <BookOpen className="h-6 w-6" />
          <span className="font-semibold text-lg">Histórias Profissionais</span>
        </Link>
        
        <nav className="flex items-center space-x-4">
          <Link 
            to="/historias" 
            className="text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            Explorar Histórias
          </Link>
          <Link 
            to="/login"
            className="text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            Entrar
          </Link>
          <Button asChild size="sm" className="shadow-soft">
            <Link to="/escrever" className="flex items-center gap-2">
              <PenSquare className="h-4 w-4" />
              Escrever História
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};