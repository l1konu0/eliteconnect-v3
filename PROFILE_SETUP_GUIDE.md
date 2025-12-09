# 🎯 Guide de Configuration du Profil Complet

## ✅ Ce qui a été créé

### 1. Page de complétion du profil (`/complete-profile`)
- Formulaire pour compléter le profil après validation de l'email
- Upload de photo de profil
- Champs : Nom, Email, Métier, Entreprise, Téléphone, Bio

### 2. Portail membre amélioré (`/portal`)
- Affichage de toutes les informations du profil
- Photo de profil visible
- Redirection automatique vers `/complete-profile` si le profil n'est pas complété

### 3. Base de données étendue
- Script SQL pour ajouter les nouveaux champs
- Gestion automatique du statut de complétion

## 📋 Étapes de configuration

### Étape 1 : Mettre à jour la base de données

1. Allez sur votre dashboard Supabase : https://supabase.com/dashboard/project/kgwmdzrripcerpaincoo
2. Ouvrez **SQL Editor** > **New Query**
3. Copiez le contenu du fichier `supabase-setup-extended.sql`
4. Collez et exécutez le script

**OU** exécutez cette requête :

```sql
-- Ajouter les nouveaux champs
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS job_title TEXT,
ADD COLUMN IF NOT EXISTS company TEXT,
ADD COLUMN IF NOT EXISTS phone_number TEXT,
ADD COLUMN IF NOT EXISTS profile_picture_url TEXT,
ADD COLUMN IF NOT EXISTS bio TEXT,
ADD COLUMN IF NOT EXISTS profile_completed BOOLEAN DEFAULT FALSE;
```

### Étape 2 : Créer le bucket Storage pour les photos

1. Allez sur **Storage** dans votre dashboard Supabase
2. Cliquez sur **"New bucket"**
3. Configurez :
   - **Name** : `profile-pictures`
   - **Public bucket** : ✅ **Cochez**
   - **File size limit** : 5 MB
4. Créez le bucket

### Étape 3 : Configurer les politiques Storage

Suivez les instructions dans le fichier `STORAGE_SETUP.md` pour configurer les politiques de sécurité.

**OU** exécutez ce script SQL :

```sql
-- Politique : Upload de sa propre photo
CREATE POLICY "Users can upload own profile picture"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'profile-pictures' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Politique : Voir toutes les photos
CREATE POLICY "Anyone can view profile pictures"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'profile-pictures');

-- Politique : Supprimer sa propre photo
CREATE POLICY "Users can delete own profile picture"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'profile-pictures' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
```

## 🔄 Flux utilisateur

1. **Inscription** (`/signup`)
   - L'utilisateur crée un compte
   - Reçoit un email de confirmation

2. **Validation de l'email**
   - L'utilisateur clique sur le lien dans l'email
   - Son compte est confirmé

3. **Connexion** (`/login`)
   - L'utilisateur se connecte avec son email et mot de passe

4. **Complétion du profil** (`/complete-profile`)
   - Si le profil n'est pas complété, redirection automatique
   - L'utilisateur remplit :
     - Photo de profil (optionnel mais recommandé)
     - Nom complet
     - Métier/Poste
     - Entreprise
     - Numéro de téléphone
     - Bio (optionnel)

5. **Portail membre** (`/portal`)
   - Une fois le profil complété, accès au portail
   - Affichage de toutes les informations
   - Possibilité de modifier le profil

## 📝 Champs du profil

| Champ | Obligatoire | Description |
|-------|-------------|-------------|
| `full_name` | ✅ | Nom complet |
| `email` | ✅ | Email (depuis auth.users) |
| `job_title` | ✅ | Métier/Poste |
| `company` | ✅ | Entreprise/Organisation |
| `phone_number` | ✅ | Numéro de téléphone |
| `profile_picture_url` | ❌ | URL de la photo de profil |
| `bio` | ❌ | Description/Bio |
| `profile_completed` | Auto | Statut de complétion (true/false) |

## 🎨 Pages disponibles

- **`/signup`** - Inscription
- **`/login`** - Connexion
- **`/complete-profile`** - Complétion du profil (nouveau)
- **`/portal`** - Portail membre (amélioré)

## 🔒 Sécurité

- ✅ Row Level Security (RLS) activé
- ✅ Les utilisateurs ne peuvent modifier que leur propre profil
- ✅ Les photos sont stockées avec l'ID utilisateur
- ✅ Validation des types de fichiers (images uniquement)
- ✅ Limite de taille (5MB)

## 🐛 Résolution de problèmes

### Erreur : "bucket 'profile-pictures' not found"
→ Créez le bucket dans Storage (voir Étape 2)

### Erreur : "new row violates row-level security policy"
→ Vérifiez que les politiques RLS sont bien configurées

### La photo ne s'affiche pas
→ Vérifiez que le bucket est public
→ Vérifiez que l'URL est correcte dans la base de données

### Redirection en boucle
→ Vérifiez que `profile_completed` est bien mis à `true` après la complétion

## ✨ Prochaines améliorations possibles

- [ ] Édition du profil depuis le portail
- [ ] Suppression de la photo de profil
- [ ] Validation du format de téléphone
- [ ] Prévisualisation de la photo avant upload
- [ ] Recadrage/redimensionnement automatique de la photo

---

**Tout est prêt !** Suivez les étapes ci-dessus pour finaliser la configuration. 🚀

