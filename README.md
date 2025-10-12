# Elite Connect - Système de Design

## 🎨 Vue d'ensemble

Elite Connect est un système de design haut de gamme inspiré de Soho House, conçu pour créer des expériences web luxueuses, minimalistes et immersives. Le système utilise TailwindCSS v4 et shadcn/ui pour offrir une base solide et cohérente.

## 🖤 Direction Artistique

### Ambiance
- **Luxe discret** : Élégance sans ostentation
- **Sobriété** : Design épuré et fonctionnel
- **Calme** : Expérience utilisateur apaisante
- **Élégance** : Finitions soignées et attention aux détails

### Palette de Couleurs

#### Couleurs Principales
- **Noir profond** : `#0A0A0A` - Fond principal sombre
- **Blanc cassé** : `#F5F5F5` - Fond principal clair
- **Gris doux** : `#CFCFCF` - Texte secondaire et bordures

#### Couleurs d'Accent
- **Vert profond** : `#1D3B2A` - Couleur primaire
- **Vert clair** : `#3C5F3C` - Couleur d'accent et hover
- **Doré discret** : `#D4AF37` - Éléments premium (optionnel)

### Typographie

#### Polices Principales
- **Titres** : `Playfair Display` (sérif élégant)
- **Texte** : `Inter` (lisible, moderne)
- **Monospace** : `JetBrains Mono` (code)

#### Hiérarchie Typographique
```css
h1: 4xl-9xl (responsive)
h2: 3xl-5xl (responsive)
h3: 2xl-4xl (responsive)
h4: xl-3xl (responsive)
h5: lg-2xl (responsive)
h6: base-xl (responsive)
p: base-lg (responsive)
```

## 🛠️ Configuration Technique

### Structure des Fichiers
```
src/
├── app/
│   ├── globals.css          # Styles globaux et variables CSS
│   ├── layout.tsx           # Configuration des polices
│   └── page.tsx             # Page d'accueil démo
├── components/
│   └── ui/                  # Composants shadcn/ui personnalisés
│       ├── button.tsx       # Boutons Elite Connect
│       └── card.tsx         # Cartes Elite Connect
└── lib/
    └── utils.ts             # Utilitaires TailwindCSS
```

### Configuration TailwindCSS
- **Mode sombre** : `darkMode: "class"`
- **Rayons** : `0.75rem` (base), avec variations
- **Ombres** : Système d'ombres personnalisées `elite-*`
- **Animations** : Transitions fluides (300ms)

## 🎯 Classes Utilitaires

### Ombres Elite Connect
```css
.elite-shadow      /* Ombre standard */
.elite-shadow-lg   /* Ombre large */
.elite-shadow-xl   /* Ombre extra-large */
```

### Effets de Hover
```css
.elite-hover           /* Hover avec scale + ombre */
.elite-hover-subtle    /* Hover subtil */
```

### Bordures
```css
.elite-border          /* Bordure claire */
.elite-border-dark     /* Bordure sombre */
```

### Dégradés
```css
.elite-text-gradient   /* Dégradé de texte */
.elite-bg-gradient     /* Dégradé de fond clair */
.elite-bg-gradient-dark /* Dégradé de fond sombre */
```

### Effets de Verre
```css
.elite-glass           /* Effet verre clair */
.elite-glass-dark      /* Effet verre sombre */
```

## 🧩 Composants Personnalisés

### Boutons
```tsx
<Button variant="elite" size="lg">
  Bouton Elite
</Button>

<Button variant="elite-outline" size="lg">
  Bouton Outline Elite
</Button>
```

### Cartes
```tsx
<Card className="card-elite">
  <CardHeader>
    <CardTitle>Titre de la carte</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
</Card>
```

## 🎨 Animations

### Animations Disponibles
- `animate-fade-in` : Apparition en fondu
- `animate-slide-up` : Glissement vers le haut
- `animate-slide-down` : Glissement vers le bas
- `animate-scale-in` : Agrandissement
- `animate-float` : Flottement subtil

## 🌙 Mode Sombre

Le système supporte le mode sombre avec des variables CSS automatiques :
- Fond : Noir profond (`#0A0A0A`)
- Texte : Blanc cassé (`#F5F5F5`)
- Accents : Verts adaptés au contraste

## 📱 Responsive Design

- **Mobile First** : Design adaptatif
- **Breakpoints** : xs, sm, md, lg, xl, 2xl, 3xl
- **Typographie** : Tailles responsives automatiques

## 🚀 Utilisation

### Installation
```bash
npm install
npm run dev
```

### Ajout de Composants
```bash
npx shadcn@latest add [component-name]
```

### Personnalisation
Les composants shadcn/ui sont pré-configurés avec le style Elite Connect. Pour les personnaliser davantage, modifiez les fichiers dans `src/components/ui/`.

## 🎯 Bonnes Pratiques

1. **Utilisez les classes utilitaires** Elite Connect pour la cohérence
2. **Respectez la hiérarchie typographique** définie
3. **Appliquez les animations** avec parcimonie
4. **Testez en mode sombre** et clair
5. **Maintenez les espacements** généreux pour l'élégance

## 📚 Ressources

- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Playfair Display Font](https://fonts.google.com/specimen/Playfair+Display)
- [Inter Font](https://fonts.google.com/specimen/Inter)

---

*Système de design créé pour Elite Connect - Club Privé Exclusif*