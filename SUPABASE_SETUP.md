# Configuration Supabase pour Elite Connect

## 📋 Prérequis

1. Un compte Supabase (gratuit) : https://supabase.com
2. Un projet Supabase créé

## 🔧 Configuration

### 1. Créer un projet Supabase

1. Allez sur https://supabase.com
2. Créez un nouveau projet
3. Notez votre **URL du projet** et votre **clé API anonyme (anon key)**

### 2. Configurer les variables d'environnement

Créez un fichier `.env.local` à la racine du projet avec :

```env
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_anon
```

**Exemple :**
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 3. Configurer la base de données Supabase

#### Créer la table `profiles`

Dans l'éditeur SQL de Supabase, exécutez cette requête :

```sql
-- Créer la table profiles
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  membership_status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Activer Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Politique : Les utilisateurs peuvent voir leur propre profil
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Politique : Les utilisateurs peuvent mettre à jour leur propre profil
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Politique : Les utilisateurs peuvent insérer leur propre profil
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Fonction pour créer automatiquement un profil lors de l'inscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Déclencher la création automatique du profil
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### 4. Configurer l'authentification Supabase

1. Allez dans **Authentication > Settings** dans votre dashboard Supabase
2. Configurez les **Site URL** :
   - Pour le développement : `http://localhost:3000`
   - Pour la production : votre URL de production
3. Configurez les **Redirect URLs** :
   - `http://localhost:3000/auth/callback`
   - `http://localhost:3000/auth/update-password`
   - Votre URL de production + `/auth/callback`
   - Votre URL de production + `/auth/update-password`

### 5. Tester l'installation

1. Redémarrez votre serveur de développement :
   ```bash
   npm run dev
   ```

2. Visitez http://localhost:3000
3. Cliquez sur "Connexion" dans le header
4. Créez un compte de test
5. Vérifiez que vous pouvez vous connecter et accéder au portail

## 🎯 Fonctionnalités implémentées

✅ **Authentification complète**
- Inscription (signup)
- Connexion (login)
- Déconnexion (logout)
- Réinitialisation de mot de passe

✅ **Portail client protégé**
- Page `/portal` accessible uniquement aux utilisateurs connectés
- Middleware de protection des routes
- Gestion des sessions

✅ **Interface utilisateur**
- Header avec état de connexion
- Menu déroulant utilisateur
- Pages d'authentification stylisées

## 📝 Notes importantes

- Les mots de passe doivent contenir au moins 6 caractères
- Les emails doivent être vérifiés (configurable dans Supabase)
- Le middleware protège automatiquement la route `/portal`
- Les profils utilisateurs sont créés automatiquement lors de l'inscription

## 🔒 Sécurité

- Row Level Security (RLS) est activé sur la table `profiles`
- Les utilisateurs ne peuvent accéder qu'à leur propre profil
- Les clés API sont publiques mais protégées par RLS

## 🚀 Prochaines étapes

Vous pouvez maintenant :
- Personnaliser le portail client
- Ajouter plus de champs au profil utilisateur
- Créer des tables supplémentaires pour les fonctionnalités membres
- Implémenter des rôles et permissions



