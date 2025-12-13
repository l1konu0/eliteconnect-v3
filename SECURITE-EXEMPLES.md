# 🔒 Exemples d'utilisation des outils de sécurité

## 1. Validation dans les formulaires

### Exemple : Page de connexion

```typescript
"use client";

import { useState } from "react";
import { validateEmail, validatePassword, logAuthAttempt } from "@/lib/security";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string[]; password?: string[] }>({});
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    // Valider l'email
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      setErrors(prev => ({ ...prev, email: emailValidation.errors }));
      return;
    }
    
    // Valider le mot de passe
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      setErrors(prev => ({ ...prev, password: passwordValidation.errors }));
      return;
    }
    
    // Tenter la connexion
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    
    // Logger l'événement
    logAuthAttempt(!error, email, {
      ip: typeof window !== 'undefined' ? window.location.hostname : undefined,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
      userId: data?.user?.id
    });
    
    if (error) {
      setErrors({ email: [error.message] });
      return;
    }
    
    // Rediriger vers le portail
    router.push("/portal");
  };
  
  // ... reste du composant
}
```

### Exemple : Formulaire de profil

```typescript
import { validateName, validatePhone, sanitizeString, logValidationError } from "@/lib/security";

const handleSubmit = async (formData: FormData) => {
  const fullName = formData.get('fullName') as string;
  const phone = formData.get('phone') as string;
  const bio = formData.get('bio') as string;
  
  // Valider le nom
  const nameValidation = validateName(fullName, 2, 100);
  if (!nameValidation.isValid) {
    logValidationError('fullName', fullName, nameValidation.errors, { userId });
    setErrors({ fullName: nameValidation.errors });
    return;
  }
  
  // Valider le téléphone (optionnel)
  if (phone) {
    const phoneValidation = validatePhone(phone);
    if (!phoneValidation.isValid) {
      logValidationError('phone', phone, phoneValidation.errors, { userId });
      setErrors({ phone: phoneValidation.errors });
      return;
    }
  }
  
  // Sanitiser la bio
  const safeBio = sanitizeString(bio || '', 5000);
  
  // Envoyer les données
  // ...
};
```

## 2. Rate Limiting dans les routes API

### Exemple : Route API avec rate limiting

```typescript
// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { withSecurity, RateLimitConfigs } from '@/lib/security';
import { validateEmail, validateName, sanitizeString } from '@/lib/security';

export const POST = withSecurity(
  async (request: NextRequest) => {
    try {
      const body = await request.json();
      
      // Valider les données
      const emailValidation = validateEmail(body.email);
      if (!emailValidation.isValid) {
        return NextResponse.json(
          { errors: emailValidation.errors },
          { status: 400 }
        );
      }
      
      const nameValidation = validateName(body.name);
      if (!nameValidation.isValid) {
        return NextResponse.json(
          { errors: nameValidation.errors },
          { status: 400 }
        );
      }
      
      // Sanitiser le message
      const safeMessage = sanitizeString(body.message || '', 5000);
      
      // Traiter la requête
      // ...
      
      return NextResponse.json({ success: true });
    } catch (error) {
      return NextResponse.json(
        { error: 'Erreur serveur' },
        { status: 500 }
      );
    }
  },
  {
    rateLimit: RateLimitConfigs.form, // 10 requêtes/minute
  }
);
```

### Exemple : Route API d'authentification avec rate limiting strict

```typescript
// app/api/auth/login/route.ts
import { withSecurity, RateLimitConfigs, logAuthAttempt } from '@/lib/security';

export const POST = withSecurity(
  async (request: NextRequest) => {
    const body = await request.json();
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    
    // Valider les données
    // ...
    
    // Tenter l'authentification
    const result = await supabase.auth.signInWithPassword({
      email: body.email,
      password: body.password,
    });
    
    // Logger
    logAuthAttempt(!result.error, body.email, {
      ip,
      userAgent: request.headers.get('user-agent'),
      userId: result.data?.user?.id
    });
    
    if (result.error) {
      return NextResponse.json(
        { error: 'Identifiants invalides' },
        { status: 401 }
      );
    }
    
    return NextResponse.json({ success: true });
  },
  {
    rateLimit: RateLimitConfigs.auth, // 5 requêtes/15 minutes
  }
);
```

## 3. Détection d'activité suspecte

### Exemple : Middleware avec détection

```typescript
// middleware.ts
import { detectSuspiciousActivity, logSecurityEvent, SecurityEventType } from '@/lib/security';

export async function middleware(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  
  // Détecter une activité suspecte
  if (detectSuspiciousActivity(ip)) {
    logSecurityEvent(
      SecurityEventType.SUSPICIOUS_ACTIVITY,
      `Tentative d'accès suspecte bloquée`,
      {
        ip,
        path: request.nextUrl.pathname,
        userAgent: request.headers.get('user-agent')
      }
    );
    
    // Bloquer la requête ou rediriger
    return NextResponse.json(
      { error: 'Accès temporairement bloqué' },
      { status: 429 }
    );
  }
  
  // Continuer avec le middleware normal
  return await updateSession(request);
}
```

## 4. Utilisation dans les Server Components

### Exemple : Validation côté serveur

```typescript
// app/portal/events/create/page.tsx (Server Component)
import { validateName, validateDate, sanitizeString } from '@/lib/security';
import { createClient } from '@/lib/supabase/server';

export default async function CreateEventPage() {
  async function createEvent(formData: FormData) {
    'use server';
    
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const startDate = formData.get('start_date') as string;
    
    // Valider le titre
    const titleValidation = validateName(title, 3, 200);
    if (!titleValidation.isValid) {
      return { errors: titleValidation.errors };
    }
    
    // Valider la date
    const dateValidation = validateDate(startDate, new Date());
    if (!dateValidation.isValid) {
      return { errors: dateValidation.errors };
    }
    
    // Sanitiser la description
    const safeDescription = sanitizeString(description || '', 10000);
    
    // Créer l'événement
    const supabase = await createClient();
    // ...
  }
  
  // ...
}
```

## 5. Logging personnalisé

### Exemple : Logger des événements spécifiques

```typescript
import { logSecurityEvent, SecurityEventType } from '@/lib/security';

// Logger une tentative d'accès non autorisé
logSecurityEvent(
  SecurityEventType.UNAUTHORIZED_ACCESS,
  'Tentative d\'accès à une ressource protégée',
  {
    userId: user?.id,
    ip: request.headers.get('x-forwarded-for'),
    path: request.nextUrl.pathname,
    attemptedAction: 'create_event'
  }
);

// Logger une tentative d'injection SQL détectée
if (input.includes('DROP TABLE') || input.includes('DELETE FROM')) {
  logSecurityEvent(
    SecurityEventType.SQL_INJECTION_ATTEMPT,
    'Tentative d\'injection SQL détectée',
    {
      input: input.substring(0, 100), // Limiter la longueur
      ip: request.headers.get('x-forwarded-for'),
      userId: user?.id
    }
  );
}
```

## 6. Intégration avec Supabase RLS

Les outils de sécurité fonctionnent en complément de RLS :

```typescript
// Même avec validation côté client, RLS protège la base de données
const { data, error } = await supabase
  .from('events')
  .insert({
    title: sanitizeString(title), // Validation côté client
    created_by: user.id
  });

// RLS vérifie que created_by = auth.uid() // Protection côté serveur
```

## 📝 Notes importantes

1. **Toujours valider côté serveur** : La validation côté client peut être contournée
2. **Utiliser RLS** : Les politiques RLS sont la dernière ligne de défense
3. **Logger les événements importants** : Aide à détecter les problèmes
4. **Rate limiting** : Protège contre les abus même si la validation échoue
5. **Sanitisation** : Toujours sanitiser avant d'afficher dans le HTML

## 🔄 Migration progressive

Vous pouvez intégrer ces outils progressivement :

1. Commencer par les nouveaux formulaires
2. Ajouter la validation aux formulaires existants
3. Ajouter le rate limiting aux routes API
4. Intégrer le logging progressivement
5. Activer la détection d'activité suspecte






