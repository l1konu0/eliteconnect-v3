# 🚀 Guide de Configuration Supabase - Elite Connect

## ✅ Étape 1 : Vérifier les variables d'environnement

Le fichier `.env.local` a été créé avec vos clés Supabase :
- ✅ Project URL : `https://kgwmdzrripcerpaincoo.supabase.co`
- ✅ Publishable Key : configurée

**⚠️ Important** : Assurez-vous que la clé dans `.env.local` est bien la clé **"anon public"** (pas "service_role"). Elle doit commencer par `eyJ...` dans la plupart des cas.

Pour vérifier/corriger :
1. Allez sur https://supabase.com/dashboard/project/kgwmdzrripcerpaincoo/settings/api
2. Dans "Project API keys", copiez la clé **"anon public"**
3. Remplacez dans `.env.local` si nécessaire

---

## ✅ Étape 2 : Configurer la base de données

### Option A : Utiliser le fichier SQL fourni (Recommandé)

1. Allez sur votre dashboard Supabase : https://supabase.com/dashboard/project/kgwmdzrripcerpaincoo
2. Cliquez sur **"SQL Editor"** dans le menu de gauche
3. Cliquez sur **"New Query"**
4. Ouvrez le fichier `supabase-setup.sql` dans votre projet
5. Copiez tout le contenu et collez-le dans l'éditeur SQL
6. Cliquez sur **"Run"** (ou Ctrl+Enter)

### Option B : Copier-coller manuellement

Exécutez cette requête dans l'éditeur SQL de Supabase :

```sql
-- Créer la table profiles
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  membership_status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Activer Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Politiques de sécurité
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Fonction pour créer automatiquement un profil
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

-- Déclencher la création automatique
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

---

## ✅ Étape 3 : Configurer l'authentification

1. Allez sur **Authentication > Settings** dans votre dashboard Supabase
2. Configurez les **Site URL** :
   - Pour le développement : `http://localhost:3000`
   - Pour la production : votre URL de production (ex: `https://votre-site.com`)
3. Configurez les **Redirect URLs** (ajoutez chaque ligne) :
   ```
   http://localhost:3000/auth/callback
   http://localhost:3000/auth/update-password
   ```
   (Ajoutez aussi vos URLs de production si vous en avez)

---

## ✅ Étape 4 : Tester la connexion

1. **Redémarrez le serveur** (si ce n'est pas déjà fait) :
   ```bash
   npm run dev
   ```

2. **Testez l'inscription** :
   - Allez sur http://localhost:3000/signup
   - Créez un compte de test
   - Vérifiez que vous recevez un email de confirmation (si activé)

3. **Testez la connexion** :
   - Allez sur http://localhost:3000/login
   - Connectez-vous avec votre compte
   - Vous devriez être redirigé vers `/portal`

4. **Vérifiez le portail** :
   - Vous devriez voir votre profil dans le portail
   - Vérifiez que vos informations s'affichent correctement

---

## 🔍 Vérification dans Supabase

Pour vérifier que tout fonctionne :

1. **Vérifier les utilisateurs** :
   - Dashboard > Authentication > Users
   - Vous devriez voir les utilisateurs créés

2. **Vérifier les profils** :
   - Dashboard > Table Editor > profiles
   - Vous devriez voir les profils créés automatiquement

3. **Vérifier les logs** :
   - Dashboard > Logs > API Logs
   - Vérifiez qu'il n'y a pas d'erreurs

---

## 🐛 Résolution de problèmes

### Erreur : "Invalid API key"
- Vérifiez que vous utilisez la clé **"anon public"** (pas "service_role")
- Vérifiez que le fichier `.env.local` est bien à la racine du projet
- Redémarrez le serveur après modification

### Erreur : "relation 'profiles' does not exist"
- Exécutez le script SQL dans l'éditeur SQL de Supabase
- Vérifiez que la table a bien été créée dans Table Editor

### Erreur : "Row Level Security policy violation"
- Vérifiez que les politiques RLS ont bien été créées
- Vérifiez que l'utilisateur est bien connecté

### L'utilisateur n'est pas redirigé vers /portal
- Vérifiez que le middleware fonctionne
- Vérifiez les logs du navigateur (F12 > Console)
- Vérifiez les logs Supabase

---

## 📝 Pages disponibles

Une fois configuré, vous avez accès à :

- **`/login`** - Page de connexion
- **`/signup`** - Page d'inscription  
- **`/portal`** - Portail membre (protégé, nécessite connexion)
- **`/auth/reset-password`** - Réinitialisation du mot de passe

---

## ✨ Prochaines étapes

Une fois la configuration terminée, vous pouvez :

1. Personnaliser le portail membre
2. Ajouter plus de champs au profil utilisateur
3. Créer des tables supplémentaires (événements, investissements, etc.)
4. Implémenter des rôles et permissions
5. Ajouter des fonctionnalités membres

---

**Besoin d'aide ?** Consultez le fichier `SUPABASE_SETUP.md` pour plus de détails.

