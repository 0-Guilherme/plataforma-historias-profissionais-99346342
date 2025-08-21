import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Clock, Heart, MessageCircle, User } from "lucide-react";

const Stories = () => {
  // Mock data for stories
  const stories = [
    {
      id: 1,
      title: "De desenvolvedor para líder de produto: minha jornada de 5 anos",
      excerpt: "Como a curiosidade sobre o negócio me levou a descobrir uma paixão inesperada pela estratégia de produto...",
      author: "Carlos Silva",
      readTime: "8 min",
      tags: ["Transição de Carreira", "Liderança", "Produto"],
      likes: 47,
      comments: 12,
      publishedAt: "2 dias atrás"
    },
    {
      id: 2,
      title: "Aos 45, mudei completamente de área e nunca me arrependi",
      excerpt: "Deixei uma carreira consolidada no direito para seguir minha paixão por design. Aqui está o que aprendi...",
      author: "Ana Santos",
      readTime: "12 min", 
      tags: ["Mudança de Carreira", "Design", "Coragem"],
      likes: 89,
      comments: 28,
      publishedAt: "5 dias atrás"
    },
    {
      id: 3,
      title: "Como o fracasso da minha startup me tornou um empreendedor melhor",
      excerpt: "Perdemos tudo em 18 meses. Mas as lições que aprendi valeram cada momento difícil...",
      author: "Rafael Costa",
      readTime: "10 min",
      tags: ["Empreendedorismo", "Fracasso", "Aprendizado"],
      likes: 156,
      comments: 45,
      publishedAt: "1 semana atrás"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container px-4 py-12 mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Histórias da Comunidade
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Jornadas reais de profissionais que transformaram suas carreiras
            </p>
          </div>

          <div className="space-y-8">
            {stories.map((story) => (
              <Card key={story.id} className="shadow-soft border-0 hover:shadow-elegant transition-shadow cursor-pointer">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h2 className="text-2xl font-semibold text-foreground hover:text-primary transition-colors mb-3 leading-tight">
                        {story.title}
                      </h2>
                      <p className="text-reading-subtitle leading-relaxed mb-4">
                        {story.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {story.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{story.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{story.readTime} de leitura</span>
                      </div>
                      <span>{story.publishedAt}</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        <span>{story.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        <span>{story.comments}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="px-8">
              Carregar mais histórias
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stories;