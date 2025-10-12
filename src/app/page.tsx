import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header avec toggle de thème */}
      <header className="absolute top-0 left-0 right-0 z-20 p-6">
        <div className="max-w-6xl mx-auto flex justify-end">
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background avec effet de verre */}
        <div className="absolute inset-0 elite-bg-gradient dark:elite-bg-gradient-dark" />
        <div className="absolute inset-0 bg-gradient-to-br from-elite-green-dark/5 via-transparent to-elite-gold/5" />
        
        {/* Contenu principal */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <div className="animate-fade-in">
            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold text-foreground mb-8 tracking-tight">
              Elite
              <span className="block elite-text-gradient">Connect</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Rejoignez le club privé exclusif inspiré de Soho House. 
              Un espace raffiné pour les professionnels et créatifs d'exception.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                size="lg" 
                className="btn-elite px-8 py-4 text-lg font-medium elite-hover"
              >
                Demander l'adhésion
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="px-8 py-4 text-lg font-medium elite-border elite-hover-subtle"
              >
                Découvrir l'univers
              </Button>
            </div>
          </div>
        </div>
        
        {/* Éléments décoratifs */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-elite-green-dark/10 rounded-full blur-xl animate-float" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-elite-gold/10 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }} />
      </section>

      {/* Section Features */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              L'excellence à chaque détail
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Découvrez les avantages exclusifs qui font d'Elite Connect 
              le club privé le plus convoité.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="card-elite group">
              <CardHeader>
                <div className="w-16 h-16 bg-elite-green-dark/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-elite-green-dark/20 transition-colors duration-300">
                  <div className="w-8 h-8 bg-elite-green-dark rounded-lg" />
                </div>
                <CardTitle className="text-2xl font-serif">Réseau Premium</CardTitle>
                <CardDescription className="text-lg">
                  Connectez-vous avec des professionnels et créatifs d'exception 
                  dans un environnement exclusif et raffiné.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="card-elite group">
              <CardHeader>
                <div className="w-16 h-16 bg-elite-gold/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-elite-gold/20 transition-colors duration-300">
                  <div className="w-8 h-8 bg-elite-gold rounded-lg" />
                </div>
                <CardTitle className="text-2xl font-serif">Événements Exclusifs</CardTitle>
                <CardDescription className="text-lg">
                  Accédez à des soirées privées, conférences et rencontres 
                  organisées dans les plus beaux lieux de la ville.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="card-elite group">
              <CardHeader>
                <div className="w-16 h-16 bg-elite-green-light/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-elite-green-light/20 transition-colors duration-300">
                  <div className="w-8 h-8 bg-elite-green-light rounded-lg" />
                </div>
                <CardTitle className="text-2xl font-serif">Espaces Uniques</CardTitle>
                <CardDescription className="text-lg">
                  Profitez d'espaces de travail et de détente conçus 
                  avec le plus grand soin pour votre confort et votre inspiration.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Section CTA */}
      <section className="py-24 bg-elite-green-dark text-elite-cream">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
            Prêt à rejoindre l'élite ?
          </h2>
          <p className="text-xl mb-12 opacity-90">
            Soumettez votre candidature et découvrez si vous avez 
            votre place parmi les membres d'Elite Connect.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              className="bg-elite-cream text-elite-green-dark hover:bg-elite-cream/90 px-8 py-4 text-lg font-medium elite-hover"
            >
              Candidater maintenant
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-elite-cream text-elite-cream hover:bg-elite-cream/10 px-8 py-4 text-lg font-medium elite-hover-subtle"
            >
              En savoir plus
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-background border-t border-border/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h3 className="font-serif text-2xl font-bold text-foreground mb-4">
              Elite Connect
            </h3>
            <p className="text-muted-foreground mb-8">
              Le club privé pour les professionnels et créatifs d'exception.
            </p>
            
            <div className="flex justify-center space-x-8 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors duration-300">
                Confidentialité
              </a>
              <a href="#" className="hover:text-foreground transition-colors duration-300">
                Conditions
              </a>
              <a href="#" className="hover:text-foreground transition-colors duration-300">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}