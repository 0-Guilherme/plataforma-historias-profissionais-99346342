import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Header } from "@/components/Header";
import { BookOpen, Mail, User, Lock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Bem-vinda à comunidade!",
      description: "Sua conta foi criada com sucesso. Agora você pode começar a explorar e compartilhar histórias.",
    });
    
    setIsLoading(false);
    // In a real app, redirect to dashboard or home
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <div className="container px-4 py-12 mx-auto flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary-subtle rounded-2xl flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Junte-se à comunidade
            </h1>
            <p className="text-reading-subtitle max-w-sm mx-auto">
              Compartilhe sua jornada, inspire o futuro
            </p>
          </div>

          <Card className="shadow-elegant border-0">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-semibold text-center">Criar conta</CardTitle>
              <CardDescription className="text-center">
                Preencha os dados abaixo para começar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2 font-medium">
                    <User className="h-4 w-4" />
                    Nome completo
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Como você gostaria de ser chamada?"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="h-12 transition-all focus:ring-2 focus:ring-primary/20"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2 font-medium">
                    <Mail className="h-4 w-4" />
                    E-mail
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="h-12 transition-all focus:ring-2 focus:ring-primary/20"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="flex items-center gap-2 font-medium">
                    <Lock className="h-4 w-4" />
                    Criar senha
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Mínimo 8 caracteres"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="h-12 transition-all focus:ring-2 focus:ring-primary/20"
                    required
                    minLength={8}
                  />
                </div>

                <Alert className="border-primary/20 bg-primary-subtle/50">
                  <AlertDescription className="text-sm">
                    Ao criar sua conta, você concorda em fazer parte de uma comunidade respeitosa e empática.
                  </AlertDescription>
                </Alert>

                <Button 
                  type="submit" 
                  className="w-full h-12 text-base font-medium shadow-soft"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "Criando conta..."
                  ) : (
                    <>
                      Criar conta
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Já tem uma conta?{" "}
                  <Link 
                    to="/login" 
                    className="font-medium text-primary hover:text-primary-hover transition-colors"
                  >
                    Faça login
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
              Valorizamos sua privacidade. Suas informações são protegidas e nunca serão compartilhadas sem seu consentimento.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;