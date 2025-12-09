# 📦 Configuration Supabase Storage pour les Photos de Profil

## 🎯 Objectif

Créer un bucket Supabase Storage pour stocker les photos de profil des utilisateurs.

## 📋 Étapes

### 1. Créer le bucket dans Supabase

1. Allez sur votre dashboard Supabase : https://supabase.com/dashboard/project/kgwmdzrripcerpaincoo/storage/buckets
2. Cliquez sur **"New bucket"**
3. Configurez le bucket :
   - **Name** : `profile-pictures`
   - **Public bucket** : ✅ **Cochez cette option** (pour que les images soient accessibles publiquement)
   - **File size limit** : 5 MB (ou selon vos besoins)
   - **Allowed MIME types** : `image/jpeg,image/png,image/webp` (optionnel, pour limiter les types de fichiers)

4. Cliquez sur **"Create bucket"**

### 2. Configurer les politiques de sécurité (RLS)

1. Allez dans **Storage > Policies** dans votre dashboard
2. Sélectionnez le bucket `profile-pictures`
3. Cliquez sur **"New Policy"**

#### Politique 1 : Les utilisateurs peuvent uploader leur propre photo

```sql
-- Nom de la politique : "Users can upload own profile picture"
-- Opération : INSERT
-- Définition :
(bucket_id = 'profile-pictures'::text) AND ((auth.uid())::text = (storage.foldername(name))[1])
```

#### Politique 2 : Les utilisateurs peuvent voir toutes les photos (puisque le bucket est public)

```sql
-- Nom de la politique : "Anyone can view profile pictures"
-- Opération : SELECT
-- Définition :
bucket_id = 'profile-pictures'::text
```

#### Politique 3 : Les utilisateurs peuvent supprimer leur propre photo

```sql
-- Nom de la politique : "Users can delete own profile picture"
-- Opération : DELETE
-- Définition :
(bucket_id = 'profile-pictures'::text) AND ((auth.uid())::text = (storage.foldername(name))[1])
```

### 3. Alternative : Utiliser l'éditeur SQL

Si vous préférez, vous pouvez exécuter ces requêtes SQL dans l'éditeur SQL :

```sql
-- Créer le bucket (si pas déjà fait via l'interface)
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile-pictures', 'profile-pictures', true)
ON CONFLICT (id) DO NOTHING;

-- Politique : Upload de sa propre photo
CREATE POLICY "Users can upload own profile picture"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'profile-pictures' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Politique : Voir toutes les photos (bucket public)
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

## ✅ Vérification

1. Testez l'upload d'une photo depuis la page `/complete-profile`
2. Vérifiez que l'image apparaît dans le portail
3. Vérifiez dans **Storage > profile-pictures** que le fichier est bien présent

## 🔒 Sécurité

- Les photos sont stockées avec l'ID de l'utilisateur dans le nom du fichier
- Seuls les utilisateurs authentifiés peuvent uploader
- Le bucket est public pour permettre l'affichage des photos
- Chaque utilisateur ne peut uploader que dans son propre dossier (basé sur son ID)

## 📝 Notes

- Les photos sont nommées : `{user_id}-{timestamp}.{extension}`
- La taille maximale par défaut est de 5MB (configurable)
- Les formats acceptés : JPG, PNG, WebP

