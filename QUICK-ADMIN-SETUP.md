# 🚀 Configuration Rapide Admin - 3 Étapes

## ✅ Étape 1 : Exécuter le script SQL pour ajouter le champ admin

Exécutez dans **SQL Editor** de Supabase :

```sql
-- Ajouter le champ is_admin
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false;

-- Créer un index
CREATE INDEX IF NOT EXISTS profiles_is_admin_idx ON public.profiles(is_admin);

-- Supprimer l'ancienne politique
DROP POLICY IF EXISTS "Authenticated users can create events" ON public.events;

-- Créer la nouvelle politique (admins uniquement)
CREATE POLICY "Only admins can create events"
  ON public.events FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );
```

---

## ✅ Étape 2 : Définir votre compte comme admin

### Option A : Utiliser le fichier `set-admin-by-email.sql`

1. Ouvrez le fichier `set-admin-by-email.sql`
2. Remplacez `'VOTRE_EMAIL@example.com'` par **votre email de connexion**
3. Copiez et exécutez dans **SQL Editor** de Supabase

**Exemple :**
```sql
UPDATE public.profiles
SET is_admin = true
WHERE id IN (
  SELECT id FROM auth.users WHERE email = 'votre-email@gmail.com'
);
```

### Option B : Directement dans SQL Editor

```sql
-- Remplacez 'votre-email@gmail.com' par votre email
UPDATE public.profiles
SET is_admin = true
WHERE id IN (
  SELECT id FROM auth.users WHERE email = 'votre-email@gmail.com'
);
```

---

## ✅ Étape 3 : Vérifier que ça fonctionne

1. **Déconnectez-vous** du site (si vous êtes connecté)
2. **Reconnectez-vous** avec votre email
3. Allez sur `/portal`
4. Vous devriez voir une **carte "Administration"** avec :
   - Bouton "Créer un événement"
   - Bouton "Gérer les événements"

---

## 🔍 Vérification dans Supabase

Pour vérifier que votre compte est bien admin, exécutez :

```sql
SELECT 
  p.id,
  p.full_name,
  u.email as auth_email,
  p.is_admin
FROM public.profiles p
JOIN auth.users u ON u.id = p.id
WHERE u.email = 'VOTRE_EMAIL@example.com';
```

Vous devriez voir `is_admin = true` ✅

---

## 🎯 Accès Admin

Une fois configuré, vous aurez accès à :

1. **Carte "Administration"** dans le portail (`/portal`)
   - Visible uniquement pour les admins
   - Bouton "Créer un événement"
   - Bouton "Gérer les événements"

2. **Page de création** : `/portal/events/create`
   - Accessible directement ou via le bouton admin

3. **Page de gestion** : `/portal/events`
   - Liste de tous les événements
   - Filtres et recherche

---

## ❌ Si ça ne fonctionne pas

1. **Vérifiez que le script SQL a bien été exécuté** (Étape 1)
2. **Vérifiez que votre email est correct** dans la requête UPDATE
3. **Déconnectez-vous et reconnectez-vous** pour rafraîchir la session
4. **Vérifiez dans Supabase** que `is_admin = true` pour votre profil

---

**C'est tout ! En 3 étapes, vous êtes admin ! 🎉**




