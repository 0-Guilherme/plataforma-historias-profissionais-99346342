import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { ArrowRight, Heart, Users, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      {/* Hero Section */}
      <section className="container px-4 py-20 mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          <div className="space-y-8">
            <h1 className="text-5xl font-bold text-foreground leading-tight">
              Compartilhe sua jornada,
              <br />
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                inspire o futuro
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Uma plataforma onde profissionais compartilham suas histórias de carreira 
              de forma autêntica para orientar e inspirar outros em suas jornadas.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-lg px-8 py-6 shadow-elegant">
                <Link to="/cadastro" className="flex items-center gap-2">
                  Junte-se à comunidade
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                <Link to="/historias" className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Explorar histórias
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src={heroImage}
              alt="Profissionais compartilhando experiências em um ambiente colaborativo"
              className="rounded-2xl shadow-elegant w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent rounded-2xl" />
          </div>
        </div>
      </section>
      
      {/* Features Grid */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-0 shadow-soft bg-card/80 backdrop-blur">
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 bg-primary-subtle rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Histórias Autênticas</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Compartilhe experiências reais de transições, desafios superados e aprendizados valiosos.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-soft bg-card/80 backdrop-blur">
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 bg-accent-subtle rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Comunidade Empática</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Conecte-se com profissionais que entendem sua jornada e estão prontos para apoiar.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-soft bg-card/80 backdrop-blur">
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-6 w-6 text-success" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Foco na Leitura</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Interface minimalista e tipografia otimizada para uma experiência de leitura excepcional.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-gradient-content py-16">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Pronto para compartilhar sua história?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Cada jornada profissional tem lições valiosas. 
            Sua experiência pode ser exatamente o que alguém precisa ouvir hoje.
          </p>
          <Button asChild size="lg" className="text-lg px-8 py-6 shadow-elegant">
            <Link to="/escrever" className="flex items-center gap-2">
              Começar a escrever
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;