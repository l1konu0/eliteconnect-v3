# 🔐 Guide de Configuration Admin - Système d'Événements

## ✅ Modifications effectuées

### 1. **Base de données**
- ✅ Ajout du champ `is_admin` dans la table `profiles`
- ✅ Modification des politiques RLS : seuls les admins peuvent créer des événements
- ✅ Suppression des boutons "Créer un événement" pour les membres normaux

### 2. **Pages modifiées**
- ✅ `/portal/events/create` - Vérifie maintenant si l'utilisateur est admin
- ✅ `/portal/events` - Bouton "Créer un événement" retiré
- ✅ `/portal` - Bouton "Créer un événement" retiré de la carte Événements

---

## 🚀 Configuration

### Étape 1 : Exécuter le script SQL

Exécutez le script `update-events-admin-only.sql` dans SQL Editor de Supabase :

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

### Étape 2 : Définir un utilisateur comme admin

#### Option A : Par email (recommandé)

```sql
UPDATE public.profiles
SET is_admin = true
WHERE id IN (
  SELECT id FROM auth.users WHERE email = 'votre-email@example.com'
);
```

**Remplacez `'votre-email@example.com'` par l'email de l'administrateur.**

#### Option B : Par ID utilisateur

1. Trouvez l'ID de l'utilisateur dans Supabase :
   - Allez dans **Authentication** > **Users**
   - Copiez l'UUID de l'utilisateur

2. Exécutez :

```sql
UPDATE public.profiles
SET is_admin = true
WHERE id = 'UUID_DE_L_UTILISATEUR';
```

#### Option C : Définir plusieurs admins

```sql
-- Par emails
UPDATE public.profiles
SET is_admin = true
WHERE id IN (
  SELECT id FROM auth.users 
  WHERE email IN ('admin1@example.com', 'admin2@example.com')
);
```

---

## ✅ Vérification

### Vérifier qu'un utilisateur est admin :

```sql
SELECT 
  p.id,
  p.full_name,
  p.email,
  p.is_admin,
  u.email as auth_email
FROM public.profiles p
JOIN auth.users u ON u.id = p.id
WHERE p.is_admin = true;
```

### Vérifier les politiques RLS :

```sql
SELECT 
  policyname,
  cmd as operation,
  with_check
FROM pg_policies 
WHERE tablename = 'events'
ORDER BY policyname;
```

Vous devriez voir la politique `"Only admins can create events"`.

---

## 🎯 Utilisation

### Pour créer un événement (admin uniquement) :

1. Connectez-vous avec un compte admin
2. Allez sur `/portal/events/create` (lien direct, car le bouton n'est plus visible pour les membres)
3. Créez l'événement

### Pour les membres normaux :

- ✅ Peuvent voir tous les événements publiés
- ✅ Peuvent s'inscrire aux événements (RSVP)
- ✅ Peuvent voir la liste des participants
- ❌ **NE PEUVENT PAS** créer d'événements

---

## 🔒 Sécurité

- ✅ La vérification se fait à deux niveaux :
  1. **Frontend** : La page vérifie si l'utilisateur est admin avant d'afficher le formulaire
  2. **Backend (RLS)** : Supabase bloque l'insertion si l'utilisateur n'est pas admin

- ✅ Même si quelqu'un essaie d'accéder directement à `/portal/events/create`, il sera redirigé s'il n'est pas admin.

---

## 📝 Notes

- Le champ `is_admin` est `false` par défaut pour tous les nouveaux utilisateurs
- Vous pouvez définir plusieurs administrateurs
- Pour retirer les droits admin, exécutez : `UPDATE public.profiles SET is_admin = false WHERE id = 'UUID';`

---

**Configuration terminée !** 🎉




