import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { 
  Save, 
  Send, 
  Bold, 
  Italic, 
  List, 
  Link as LinkIcon, 
  Quote,
  Lightbulb,
  X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const WriteStory = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: [] as string[]
  });
  const [newTag, setNewTag] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "História publicada com sucesso!",
      description: "Sua história já está disponível para a comunidade.",
    });
    
    setIsLoading(false);
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Rascunho salvo",
      description: "Suas alterações foram salvas automaticamente.",
    });
    
    setIsSaving(false);
  };

  const addTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newTag.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(newTag.trim())) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, newTag.trim()]
        }));
      }
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const suggestedStructure = [
    {
      title: "Onde você estava antes?",
      description: "Contextualize sua situação inicial"
    },
    {
      title: "O desafio que enfrentou",
      description: "Qual foi o momento de mudança ou dificuldade?"
    },
    {
      title: "O ponto de virada",
      description: "Como você superou ou transformou a situação?"
    },
    {
      title: "Principais aprendizados",
      description: "Que lições você levaria para sempre?"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container px-4 py-8 mx-auto">
        <div className="max-w-4xl mx-auto">
          {/* Header with actions */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Publique sua história
              </h1>
              <p className="text-reading-subtitle">
                Compartilhe sua jornada profissional para inspirar outros
              </p>
            </div>
            
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={handleSaveDraft}
                disabled={isSaving}
                className="flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                {isSaving ? "Salvando..." : "Salvar rascunho"}
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={isLoading || !formData.title.trim() || !formData.content.trim()}
                className="flex items-center gap-2 shadow-soft"
              >
                <Send className="h-4 w-4" />
                {isLoading ? "Publicando..." : "Publicar"}
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Writing area */}
            <div className="lg:col-span-3 space-y-6">
              {/* Title */}
              <div className="space-y-3">
                <Label htmlFor="title" className="text-lg font-medium">
                  Título da sua história
                </Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Ex: Como mudei de carreira aos 35 anos e descobri minha paixão"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="text-xl h-14 font-medium placeholder:text-muted-foreground/60"
                />
              </div>

              {/* Formatting toolbar */}
              <Card className="border shadow-soft">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Button variant="ghost" size="sm" className="p-2">
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="p-2">
                      <Italic className="h-4 w-4" />
                    </Button>
                    <div className="w-px h-6 bg-border mx-2" />
                    <Button variant="ghost" size="sm" className="p-2">
                      <List className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="p-2">
                      <LinkIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="p-2">
                      <Quote className="h-4 w-4" />
                    </Button>
                  </div>

                  <Textarea
                    placeholder="Comece contando onde você estava antes da mudança...

Dica: Seja autêntico e específico. Os leitores se conectam com detalhes reais e emoções genuínas."
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    className="min-h-[400px] text-base leading-relaxed resize-none border-0 p-0 focus-visible:ring-0 placeholder:text-muted-foreground/60 font-serif"
                  />
                </CardContent>
              </Card>

              {/* Tags */}
              <div className="space-y-3">
                <Label htmlFor="tags" className="text-lg font-medium">
                  Tags (categorias)
                </Label>
                <Input
                  id="tags"
                  type="text"
                  placeholder="Ex: Transição de Carreira, Liderança, Startup... (pressione Enter)"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={addTag}
                  className="h-12"
                />
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formData.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-sm py-1 px-3">
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="ml-2 hover:text-destructive transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar with structure guide */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Lightbulb className="h-5 w-5 text-accent" />
                    <h3 className="font-semibold">Estrutura sugerida</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {suggestedStructure.map((section, index) => (
                      <div key={index} className="space-y-2">
                        <h4 className="font-medium text-sm text-foreground">
                          {section.title}
                        </h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {section.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-primary-subtle rounded-lg">
                    <p className="text-xs text-reading-subtitle leading-relaxed">
                      <strong>Dica:</strong> Histórias autênticas e específicas 
                      conectam mais com os leitores do que conselhos genéricos.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteStory;