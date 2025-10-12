# Elite Connect - Guide d'Utilisation

## 🚀 Démarrage Rapide

### Installation
```bash
cd elite-connect-project
npm install
npm run dev
```

### Accès aux Démonstrations
- **Page d'accueil** : `http://localhost:3000/`
- **Démonstration complète** : `http://localhost:3000/demo`
- **Démonstration avancée** : `http://localhost:3000/complete`
- **Navigation** : `http://localhost:3000/navigation`

## 🎨 Utilisation des Classes CSS

### Classes Utilitaires Elite Connect

#### Ombres
```css
.elite-shadow      /* Ombre standard */
.elite-shadow-lg   /* Ombre large */
.elite-shadow-xl   /* Ombre extra-large */
```

#### Effets de Hover
```css
.elite-hover           /* Hover avec scale + ombre */
.elite-hover-subtle    /* Hover subtil */
```

#### Bordures
```css
.elite-border          /* Bordure claire */
.elite-border-dark     /* Bordure sombre */
```

#### Dégradés
```css
.elite-text-gradient   /* Dégradé de texte */
.elite-bg-gradient     /* Dégradé de fond clair */
.elite-bg-gradient-dark /* Dégradé de fond sombre */
```

#### Effets de Verre
```css
.elite-glass           /* Effet verre clair */
.elite-glass-dark      /* Effet verre sombre */
```

### Couleurs TailwindCSS

#### Palette Elite Connect
```css
bg-elite-black         /* #0A0A0A */
bg-elite-cream         /* #F5F5F5 */
bg-elite-gray          /* #CFCFCF */
bg-elite-green-dark    /* #1D3B2A */
bg-elite-green-light   /* #3C5F3C */
bg-elite-gold          /* #D4AF37 */
```

## 🧩 Composants

### Boutons
```tsx
// Bouton Elite standard
<Button variant="elite" size="lg">
  Bouton Elite
</Button>

// Bouton Elite avec contour
<Button variant="elite-outline" size="lg">
  Bouton Outline
</Button>

// Bouton avec effet hover personnalisé
<Button className="elite-hover">
  Bouton avec Hover
</Button>
```

### Cartes
```tsx
// Carte standard Elite Connect
<Card className="card-elite">
  <CardHeader>
    <CardTitle>Titre</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Contenu de la carte
  </CardContent>
</Card>

// Carte avec effet verre
<Card className="card-elite elite-glass">
  <CardHeader>
    <CardTitle>Titre</CardTitle>
  </CardHeader>
</Card>
```

### Inputs
```tsx
// Input avec style Elite Connect
<Input className="input-elite" placeholder="Votre texte..." />
<Textarea className="input-elite" placeholder="Votre message..." />
```

## 🎭 Animations

### Classes d'Animation
```css
animate-fade-in      /* Apparition en fondu */
animate-slide-up     /* Glissement vers le haut */
animate-slide-down   /* Glissement vers le bas */
animate-scale-in     /* Agrandissement */
animate-float        /* Flottement subtil */
```

### Utilisation
```tsx
<div className="animate-fade-in">
  Contenu avec animation
</div>

<Card className="card-elite animate-slide-up">
  Carte avec animation
</Card>
```

## 🌙 Mode Sombre

### Toggle de Thème
```tsx
import { ThemeToggle } from "@/components/theme-toggle";

// Dans votre composant
<ThemeToggle />
```

### Classes Responsives au Thème
```css
/* S'adapte automatiquement au thème */
bg-background
text-foreground
border-border

/* Classes spécifiques au mode sombre */
dark:bg-elite-black
dark:text-elite-cream
```

## 📱 Responsive Design

### Breakpoints
- `xs`: 475px
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px
- `3xl`: 1600px

### Utilisation
```tsx
<div className="text-sm md:text-base lg:text-lg">
  Texte responsive
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  Grille responsive
</div>
```

## 🎯 Bonnes Pratiques

### 1. Utilisation des Classes
- Utilisez les classes utilitaires Elite Connect pour la cohérence
- Préférez les classes composées aux styles inline
- Testez toujours en mode sombre et clair

### 2. Typographie
- Utilisez `font-serif` pour les titres
- Utilisez `font-sans` pour le texte
- Respectez la hiérarchie des tailles

### 3. Espacement
- Utilisez des espacements généreux (`space-y-8`, `py-24`)
- Maintenez la cohérence dans les marges et paddings

### 4. Animations
- Utilisez les animations avec parcimonie
- Préférez les transitions douces (300ms)
- Testez les performances sur mobile

### 5. Accessibilité
- Utilisez les classes `sr-only` pour les éléments visuels uniquement
- Maintenez un contraste suffisant
- Testez avec les lecteurs d'écran

## 🔧 Personnalisation

### Ajout de Nouvelles Couleurs
```css
/* Dans globals.css */
:root {
  --color-elite-custom: #VOTRE_COULEUR;
}

@theme inline {
  --color-elite-custom: var(--elite-custom);
}
```

### Ajout de Nouvelles Animations
```css
/* Dans globals.css */
@keyframes customAnimation {
  from { /* état initial */ }
  to { /* état final */ }
}

.animate-custom {
  animation: customAnimation 0.6s ease-in-out;
}
```

### Personnalisation des Composants
Modifiez les fichiers dans `src/components/ui/` pour adapter les composants shadcn/ui à vos besoins.

## 📚 Ressources Supplémentaires

- [Documentation TailwindCSS](https://tailwindcss.com/docs)
- [Documentation shadcn/ui](https://ui.shadcn.com/)
- [Google Fonts - Playfair Display](https://fonts.google.com/specimen/Playfair+Display)
- [Google Fonts - Inter](https://fonts.google.com/specimen/Inter)

---

*Guide créé pour Elite Connect - Système de Design Haut de Gamme*
