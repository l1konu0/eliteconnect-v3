import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DesignSystemDemo() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="font-serif text-5xl font-bold text-foreground">
            Système de Design
          </h1>
          <h2 className="font-serif text-3xl font-semibold elite-text-gradient">
            Elite Connect
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez tous les composants et styles disponibles dans notre système de design haut de gamme.
          </p>
        </div>

        {/* Palette de Couleurs */}
        <section className="space-y-8">
          <h3 className="font-serif text-3xl font-bold text-foreground">Palette de Couleurs</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="space-y-2">
              <div className="w-full h-24 bg-elite-black rounded-lg elite-shadow"></div>
              <p className="text-sm font-medium">Elite Black</p>
              <p className="text-xs text-muted-foreground">#0A0A0A</p>
            </div>
            
            <div className="space-y-2">
              <div className="w-full h-24 bg-elite-cream rounded-lg elite-shadow"></div>
              <p className="text-sm font-medium">Elite Cream</p>
              <p className="text-xs text-muted-foreground">#F5F5F5</p>
            </div>
            
            <div className="space-y-2">
              <div className="w-full h-24 bg-elite-gray rounded-lg elite-shadow"></div>
              <p className="text-sm font-medium">Elite Gray</p>
              <p className="text-xs text-muted-foreground">#CFCFCF</p>
            </div>
            
            <div className="space-y-2">
              <div className="w-full h-24 bg-elite-green-dark rounded-lg elite-shadow"></div>
              <p className="text-sm font-medium">Elite Green Dark</p>
              <p className="text-xs text-muted-foreground">#1D3B2A</p>
            </div>
            
            <div className="space-y-2">
              <div className="w-full h-24 bg-elite-green-light rounded-lg elite-shadow"></div>
              <p className="text-sm font-medium">Elite Green Light</p>
              <p className="text-xs text-muted-foreground">#3C5F3C</p>
            </div>
            
            <div className="space-y-2">
              <div className="w-full h-24 bg-elite-gold rounded-lg elite-shadow"></div>
              <p className="text-sm font-medium">Elite Gold</p>
              <p className="text-xs text-muted-foreground">#D4AF37</p>
            </div>
          </div>
        </section>

        {/* Typographie */}
        <section className="space-y-8">
          <h3 className="font-serif text-3xl font-bold text-foreground">Typographie</h3>
          
          <div className="space-y-6">
            <div>
              <h1 className="font-serif text-6xl font-bold text-foreground mb-2">Heading 1</h1>
              <p className="text-sm text-muted-foreground">Playfair Display - 6xl - Bold</p>
            </div>
            
            <div>
              <h2 className="font-serif text-4xl font-semibold text-foreground mb-2">Heading 2</h2>
              <p className="text-sm text-muted-foreground">Playfair Display - 4xl - Semibold</p>
            </div>
            
            <div>
              <h3 className="font-serif text-3xl font-medium text-foreground mb-2">Heading 3</h3>
              <p className="text-sm text-muted-foreground">Playfair Display - 3xl - Medium</p>
            </div>
            
            <div>
              <p className="text-lg text-foreground mb-2">
                Paragraphe de texte avec Inter. Cette police moderne et lisible offre une excellente expérience de lecture sur tous les supports. Elle est parfaitement adaptée pour les contenus longs et les interfaces utilisateur.
              </p>
              <p className="text-sm text-muted-foreground">Inter - lg - Regular</p>
            </div>
          </div>
        </section>

        {/* Boutons */}
        <section className="space-y-8">
          <h3 className="font-serif text-3xl font-bold text-foreground">Boutons</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="font-serif text-xl font-semibold text-foreground">Variantes</h4>
              <div className="space-y-3">
                <Button variant="default" className="w-full">Default</Button>
                <Button variant="elite" className="w-full">Elite</Button>
                <Button variant="elite-outline" className="w-full">Elite Outline</Button>
                <Button variant="secondary" className="w-full">Secondary</Button>
                <Button variant="outline" className="w-full">Outline</Button>
                <Button variant="ghost" className="w-full">Ghost</Button>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-serif text-xl font-semibold text-foreground">Tailles</h4>
              <div className="space-y-3">
                <Button size="sm" className="w-full">Small</Button>
                <Button size="default" className="w-full">Default</Button>
                <Button size="lg" className="w-full">Large</Button>
                <Button size="xl" className="w-full">Extra Large</Button>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-serif text-xl font-semibold text-foreground">États</h4>
              <div className="space-y-3">
                <Button className="w-full">Normal</Button>
                <Button className="w-full" disabled>Disabled</Button>
                <Button className="w-full elite-hover">Avec Hover</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Cartes */}
        <section className="space-y-8">
          <h3 className="font-serif text-3xl font-bold text-foreground">Cartes</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="card-elite">
              <CardHeader>
                <CardTitle>Carte Standard</CardTitle>
                <CardDescription>
                  Une carte avec le style Elite Connect par défaut, incluant les ombres et transitions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Contenu de la carte avec espacement généreux et typographie soignée.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-elite elite-glass">
              <CardHeader>
                <CardTitle>Effet Verre</CardTitle>
                <CardDescription>
                  Carte avec effet de verre pour un rendu moderne et sophistiqué.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  L'effet de verre ajoute de la profondeur et de l'élégance.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-elite bg-elite-green-dark text-elite-cream">
              <CardHeader>
                <CardTitle className="text-elite-cream">Carte Sombre</CardTitle>
                <CardDescription className="text-elite-cream/80">
                  Carte avec fond vert profond pour les sections importantes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-elite-cream/80">
                  Parfait pour les call-to-action et les sections premium.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Animations */}
        <section className="space-y-8">
          <h3 className="font-serif text-3xl font-bold text-foreground">Animations</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="card-elite animate-fade-in">
              <CardHeader>
                <CardTitle>Fade In</CardTitle>
                <CardDescription>Apparition en fondu</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="card-elite animate-slide-up">
              <CardHeader>
                <CardTitle>Slide Up</CardTitle>
                <CardDescription>Glissement vers le haut</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="card-elite animate-scale-in">
              <CardHeader>
                <CardTitle>Scale In</CardTitle>
                <CardDescription>Agrandissement</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="card-elite animate-float">
              <CardHeader>
                <CardTitle>Float</CardTitle>
                <CardDescription>Flottement subtil</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Effets Spéciaux */}
        <section className="space-y-8">
          <h3 className="font-serif text-3xl font-bold text-foreground">Effets Spéciaux</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h4 className="font-serif text-xl font-semibold text-foreground">Dégradés</h4>
              
              <div className="space-y-4">
                <div className="p-8 rounded-2xl elite-bg-gradient elite-shadow">
                  <h5 className="font-serif text-lg font-semibold text-foreground mb-2">Dégradé Clair</h5>
                  <p className="text-muted-foreground">Fond avec dégradé élégant</p>
                </div>
                
                <div className="p-8 rounded-2xl elite-bg-gradient-dark elite-shadow">
                  <h5 className="font-serif text-lg font-semibold text-elite-cream mb-2">Dégradé Sombre</h5>
                  <p className="text-elite-cream/80">Fond sombre avec dégradé</p>
                </div>
                
                <div className="p-8 rounded-2xl bg-background elite-shadow">
                  <h5 className="font-serif text-lg font-semibold elite-text-gradient mb-2">Texte Dégradé</h5>
                  <p className="text-muted-foreground">Titre avec dégradé de texte</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h4 className="font-serif text-xl font-semibold text-foreground">Ombres</h4>
              
              <div className="space-y-4">
                <div className="p-8 rounded-2xl bg-card elite-shadow">
                  <h5 className="font-serif text-lg font-semibold text-foreground mb-2">Ombre Standard</h5>
                  <p className="text-muted-foreground">shadow-elite</p>
                </div>
                
                <div className="p-8 rounded-2xl bg-card elite-shadow-lg">
                  <h5 className="font-serif text-lg font-semibold text-foreground mb-2">Ombre Large</h5>
                  <p className="text-muted-foreground">shadow-elite-lg</p>
                </div>
                
                <div className="p-8 rounded-2xl bg-card elite-shadow-xl">
                  <h5 className="font-serif text-lg font-semibold text-foreground mb-2">Ombre Extra Large</h5>
                  <p className="text-muted-foreground">shadow-elite-xl</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-border/50 text-center">
          <h3 className="font-serif text-2xl font-bold text-foreground mb-4">
            Elite Connect Design System
          </h3>
          <p className="text-muted-foreground">
            Système de design haut de gamme pour des expériences web exceptionnelles.
          </p>
        </footer>
      </div>
    </div>
  );
}
