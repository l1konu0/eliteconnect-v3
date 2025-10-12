import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Navigation() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 elite-bg-gradient dark:elite-bg-gradient-dark" />
        <div className="absolute inset-0 bg-gradient-to-br from-elite-green-dark/5 via-transparent to-elite-gold/5" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <div className="animate-fade-in">
            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold text-foreground mb-8 tracking-tight">
              Elite Connect
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Système de Design Haut de Gamme
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Button 
                size="lg" 
                className="btn-elite px-8 py-4 text-lg font-medium elite-hover"
                asChild
              >
                <Link href="/">Accueil</Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="px-8 py-4 text-lg font-medium elite-border elite-hover-subtle"
                asChild
              >
                <Link href="/demo">Démonstration</Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Éléments décoratifs */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-elite-green-dark/10 rounded-full blur-xl animate-float" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-elite-gold/10 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }} />
      </section>

      {/* Navigation Cards */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Explorez le Système
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Découvrez toutes les fonctionnalités et composants disponibles dans Elite Connect.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="card-elite group">
              <CardHeader>
                <div className="w-16 h-16 bg-elite-green-dark/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-elite-green-dark/20 transition-colors duration-300">
                  <div className="w-8 h-8 bg-elite-green-dark rounded-lg" />
                </div>
                <CardTitle className="text-2xl font-serif">Page d'Accueil</CardTitle>
                <CardDescription className="text-lg">
                  Découvrez la page d'accueil d'Elite Connect avec son design luxueux et ses animations fluides.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="elite" className="w-full" asChild>
                  <Link href="/">Voir l'accueil</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="card-elite group">
              <CardHeader>
                <div className="w-16 h-16 bg-elite-gold/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-elite-gold/20 transition-colors duration-300">
                  <div className="w-8 h-8 bg-elite-gold rounded-lg" />
                </div>
                <CardTitle className="text-2xl font-serif">Démonstration</CardTitle>
                <CardDescription className="text-lg">
                  Explorez tous les composants, couleurs, typographies et animations du système de design.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="elite" className="w-full" asChild>
                  <Link href="/demo">Voir la démo</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="card-elite group">
              <CardHeader>
                <div className="w-16 h-16 bg-elite-green-light/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-elite-green-light/20 transition-colors duration-300">
                  <div className="w-8 h-8 bg-elite-green-light rounded-lg" />
                </div>
                <CardTitle className="text-2xl font-serif">Démonstration Complète</CardTitle>
                <CardDescription className="text-lg">
                  Une démonstration complète avec formulaires, galeries et tous les composants interactifs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="elite" className="w-full" asChild>
                  <Link href="/complete">Voir la démo complète</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Caractéristiques du Système
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-elite-green-dark/10 rounded-2xl flex items-center justify-center mx-auto">
                <div className="w-10 h-10 bg-elite-green-dark rounded-xl" />
              </div>
              <h3 className="font-serif text-xl font-semibold">Palette Élégante</h3>
              <p className="text-muted-foreground">
                Couleurs soigneusement sélectionnées pour un rendu luxueux et professionnel.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-elite-gold/10 rounded-2xl flex items-center justify-center mx-auto">
                <div className="w-10 h-10 bg-elite-gold rounded-xl" />
              </div>
              <h3 className="font-serif text-xl font-semibold">Typographie Premium</h3>
              <p className="text-muted-foreground">
                Playfair Display pour les titres et Inter pour le texte, optimisées pour la lisibilité.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-elite-green-light/10 rounded-2xl flex items-center justify-center mx-auto">
                <div className="w-10 h-10 bg-elite-green-light rounded-xl" />
              </div>
              <h3 className="font-serif text-xl font-semibold">Animations Fluides</h3>
              <p className="text-muted-foreground">
                Transitions et animations soigneusement calibrées pour une expérience utilisateur premium.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-elite-gray/10 rounded-2xl flex items-center justify-center mx-auto">
                <div className="w-10 h-10 bg-elite-gray rounded-xl" />
              </div>
              <h3 className="font-serif text-xl font-semibold">Mode Sombre</h3>
              <p className="text-muted-foreground">
                Support complet du mode sombre avec des couleurs adaptées pour chaque composant.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-background border-t border-border/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h3 className="font-serif text-2xl font-bold text-foreground mb-4">
              Elite Connect Design System
            </h3>
            <p className="text-muted-foreground mb-8">
              Système de design haut de gamme pour des expériences web exceptionnelles.
            </p>
            
            <div className="flex justify-center space-x-8 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors duration-300">
                Documentation
              </a>
              <a href="#" className="hover:text-foreground transition-colors duration-300">
                GitHub
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
