import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CompleteDemo() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="font-serif text-6xl font-bold text-foreground">
            Elite Connect
          </h1>
          <h2 className="font-serif text-3xl font-semibold elite-text-gradient">
            Démonstration Complète
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explorez tous les composants et fonctionnalités du système de design Elite Connect.
          </p>
        </div>

        {/* Formulaire de Contact */}
        <section className="space-y-8">
          <h3 className="font-serif text-3xl font-bold text-foreground">Formulaire de Contact</h3>
          
          <Card className="card-elite max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Demande d'Adhésion</CardTitle>
              <CardDescription>
                Remplissez ce formulaire pour soumettre votre candidature au club Elite Connect.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium">
                    Prénom
                  </Label>
                  <Input 
                    id="firstName" 
                    placeholder="Votre prénom"
                    className="input-elite"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium">
                    Nom
                  </Label>
                  <Input 
                    id="lastName" 
                    placeholder="Votre nom"
                    className="input-elite"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <Input 
                  id="email" 
                  type="email"
                  placeholder="votre@email.com"
                  className="input-elite"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="profession" className="text-sm font-medium">
                  Profession
                </Label>
                <Select>
                  <SelectTrigger className="input-elite">
                    <SelectValue placeholder="Sélectionnez votre profession" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entrepreneur">Entrepreneur</SelectItem>
                    <SelectItem value="creative">Créatif</SelectItem>
                    <SelectItem value="executive">Dirigeant</SelectItem>
                    <SelectItem value="investor">Investisseur</SelectItem>
                    <SelectItem value="other">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium">
                  Message
                </Label>
                <Textarea 
                  id="message" 
                  placeholder="Parlez-nous de vous et de votre intérêt pour Elite Connect..."
                  className="input-elite min-h-[120px]"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button variant="elite" size="lg" className="flex-1">
                  Soumettre la candidature
                </Button>
                <Button variant="elite-outline" size="lg" className="flex-1">
                  Sauvegarder comme brouillon
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Galerie de Services */}
        <section className="space-y-8">
          <h3 className="font-serif text-3xl font-bold text-foreground">Nos Services</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="card-elite group">
              <CardHeader>
                <div className="w-20 h-20 bg-elite-green-dark/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-elite-green-dark/20 transition-colors duration-300">
                  <div className="w-10 h-10 bg-elite-green-dark rounded-xl" />
                </div>
                <CardTitle>Réseau Professionnel</CardTitle>
                <CardDescription>
                  Connectez-vous avec des professionnels et créatifs d'exception dans un environnement exclusif et raffiné.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="elite-outline" className="w-full">
                  En savoir plus
                </Button>
              </CardContent>
            </Card>
            
            <Card className="card-elite group">
              <CardHeader>
                <div className="w-20 h-20 bg-elite-gold/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-elite-gold/20 transition-colors duration-300">
                  <div className="w-10 h-10 bg-elite-gold rounded-xl" />
                </div>
                <CardTitle>Événements Exclusifs</CardTitle>
                <CardDescription>
                  Accédez à des soirées privées, conférences et rencontres organisées dans les plus beaux lieux de la ville.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="elite-outline" className="w-full">
                  Découvrir
                </Button>
              </CardContent>
            </Card>
            
            <Card className="card-elite group">
              <CardHeader>
                <div className="w-20 h-20 bg-elite-green-light/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-elite-green-light/20 transition-colors duration-300">
                  <div className="w-10 h-10 bg-elite-green-light rounded-xl" />
                </div>
                <CardTitle>Espaces Premium</CardTitle>
                <CardDescription>
                  Profitez d'espaces de travail et de détente conçus avec le plus grand soin pour votre confort et votre inspiration.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="elite-outline" className="w-full">
                  Visiter
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section CTA avec Effets */}
        <section className="py-24 bg-elite-green-dark text-elite-cream rounded-3xl elite-shadow-xl">
          <div className="max-w-4xl mx-auto px-8 text-center">
            <div className="animate-fade-in">
              <h2 className="font-serif text-5xl font-bold mb-6">
                Prêt à rejoindre l'élite ?
              </h2>
              <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto">
                Soumettez votre candidature et découvrez si vous avez votre place parmi les membres d'Elite Connect.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button 
                  size="xl" 
                  className="bg-elite-cream text-elite-green-dark hover:bg-elite-cream/90 px-12 py-6 text-xl font-medium elite-hover"
                >
                  Candidater maintenant
                </Button>
                
                <Button 
                  variant="outline" 
                  size="xl"
                  className="border-elite-cream text-elite-cream hover:bg-elite-cream/10 px-12 py-6 text-xl font-medium elite-hover-subtle"
                >
                  En savoir plus
                </Button>
              </div>
            </div>
          </div>
          
          {/* Éléments décoratifs */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-elite-gold/10 rounded-full blur-xl animate-float" />
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-elite-cream/5 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }} />
        </section>

        {/* Testimonials */}
        <section className="space-y-8">
          <h3 className="font-serif text-3xl font-bold text-foreground text-center">
            Ce que disent nos membres
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="card-elite">
              <CardContent className="pt-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-12 h-12 bg-elite-green-dark rounded-full" />
                    <div>
                      <p className="font-semibold">Sarah Chen</p>
                      <p className="text-sm text-muted-foreground">Entrepreneure</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">
                    "Elite Connect m'a permis de rencontrer des personnes extraordinaires et de développer mon réseau de manière authentique."
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="card-elite">
              <CardContent className="pt-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-12 h-12 bg-elite-gold rounded-full" />
                    <div>
                      <p className="font-semibold">Marcus Johnson</p>
                      <p className="text-sm text-muted-foreground">Investisseur</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">
                    "L'ambiance et la qualité des événements sont exceptionnelles. Un véritable investissement dans mon développement professionnel."
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="card-elite">
              <CardContent className="pt-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-12 h-12 bg-elite-green-light rounded-full" />
                    <div>
                      <p className="font-semibold">Elena Rodriguez</p>
                      <p className="text-sm text-muted-foreground">Créative</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">
                    "Les espaces sont magnifiques et l'énergie créative qui s'en dégage est inspirante. Je recommande vivement."
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 border-t border-border/50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <h4 className="font-serif text-xl font-bold text-foreground">
                  Elite Connect
                </h4>
                <p className="text-muted-foreground">
                  Le club privé pour les professionnels et créatifs d'exception.
                </p>
              </div>
              
              <div className="space-y-4">
                <h5 className="font-semibold text-foreground">Services</h5>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>Réseau professionnel</p>
                  <p>Événements exclusifs</p>
                  <p>Espaces premium</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h5 className="font-semibold text-foreground">Membres</h5>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>Adhésion</p>
                  <p>Événements</p>
                  <p>Réseau</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h5 className="font-semibold text-foreground">Contact</h5>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>hello@eliteconnect.com</p>
                  <p>+33 1 23 45 67 89</p>
                  <p>Paris, France</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
              <p>&copy; 2024 Elite Connect. Tous droits réservés.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
