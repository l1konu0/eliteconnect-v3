# 📋 Guide Étape par Étape - Configuration Storage

## 🎯 Objectif
Créer le bucket `profile-pictures` et configurer les politiques de sécurité.

---

## ✅ ÉTAPE 1 : Créer le bucket (Interface Supabase)

1. **Allez sur votre dashboard Supabase** :
   ```
   https://supabase.com/dashboard/project/kgwmdzrripcerpaincoo/storage/buckets
   ```

2. **Cliquez sur le bouton "New bucket"** (en haut à droite)

3. **Remplissez le formulaire** :
   - **Name** : `profile-pictures` ⚠️ (exactement comme ça, sans espaces)
   - **Public bucket** : ✅ **COCHEZ cette case** (très important !)
   - **File size limit** : `5242880` (5 MB) ou laissez vide
   - **Allowed MIME types** : `image/jpeg,image/png,image/webp,image/jpg` (optionnel)

4. **Cliquez sur "Create bucket"**

5. **Vérifiez** : Vous devriez voir `profile-pictures` dans la liste des buckets

---

## ✅ ÉTAPE 2 : Configurer les politiques (Interface Supabase)

### Méthode A : Via l'interface (Recommandé)

1. **Allez dans Storage > Policies** :
   ```
   https://supabase.com/dashboard/project/kgwmdzrripcerpaincoo/storage/policies
   ```

2. **Sélectionnez le bucket** `profile-pictures` dans le menu déroulant

3. **Créez la première politique (Upload)** :
   - Cliquez sur **"New Policy"**
   - **Policy name** : `Users can upload own profile picture`
   - **Allowed operation** : `INSERT`
   - **Target roles** : `authenticated`
   - **Policy definition** : Copiez-collez ceci :
     ```sql
     bucket_id = 'profile-pictures'
     ```
   - Cliquez sur **"Review"** puis **"Save policy"**

4. **Créez la deuxième politique (Lecture)** :
   - Cliquez sur **"New Policy"**
   - **Policy name** : `Anyone can view profile pictures`
   - **Allowed operation** : `SELECT`
   - **Target roles** : `public`
   - **Policy definition** :
     ```sql
     bucket_id = 'profile-pictures'
     ```
   - Cliquez sur **"Review"** puis **"Save policy"**

5. **Créez la troisième politique (Suppression)** :
   - Cliquez sur **"New Policy"**
   - **Policy name** : `Users can delete own profile picture`
   - **Allowed operation** : `DELETE`
   - **Target roles** : `authenticated`
   - **Policy definition** :
     ```sql
     bucket_id = 'profile-pictures'
     ```
   - Cliquez sur **"Review"** puis **"Save policy"**

6. **Créez la quatrième politique (Mise à jour)** :
   - Cliquez sur **"New Policy"**
   - **Policy name** : `Users can update own profile picture`
   - **Allowed operation** : `UPDATE`
   - **Target roles** : `authenticated`
   - **Policy definition (USING)** :
     ```sql
     bucket_id = 'profile-pictures'
     ```
   - **Policy definition (WITH CHECK)** :
     ```sql
     bucket_id = 'profile-pictures'
     ```
   - Cliquez sur **"Review"** puis **"Save policy"**

---

### Méthode B : Via SQL (Si vous préférez)

1. **Allez dans SQL Editor** :
   ```
   https://supabase.com/dashboard/project/kgwmdzrripcerpaincoo/sql/new
   ```

2. **Copiez-collez ce script** (après avoir créé le bucket via l'interface) :

```sql
-- Supprimer les anciennes politiques si elles existent
DROP POLICY IF EXISTS "Users can upload own profile picture" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view profile pictures" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own profile picture" ON storage.objects;
DROP POLICY IF EXISTS "Users can update own profile picture" ON storage.objects;

-- Politique 1 : Upload
CREATE POLICY "Users can upload own profile picture"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'profile-pictures');

-- Politique 2 : Lecture
CREATE POLICY "Anyone can view profile pictures"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'profile-pictures');

-- Politique 3 : Suppression
CREATE POLICY "Users can delete own profile picture"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'profile-pictures');

-- Politique 4 : Mise à jour
CREATE POLICY "Users can update own profile picture"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'profile-pictures')
WITH CHECK (bucket_id = 'profile-pictures');
```

3. **Cliquez sur "Run"** (ou Ctrl+Enter)

---

## ✅ ÉTAPE 3 : Vérification

1. **Vérifiez que le bucket existe** :
   - Allez dans **Storage > Buckets**
   - Vous devriez voir `profile-pictures` avec un indicateur "Public"

2. **Vérifiez les politiques** :
   - Allez dans **Storage > Policies**
   - Sélectionnez `profile-pictures`
   - Vous devriez voir 4 politiques

3. **Testez l'upload** :
   - Allez sur `/complete-profile`
   - Essayez d'uploader une image
   - Ça devrait fonctionner ! ✅

---

## 🐛 Dépannage

### Erreur : "Bucket not found"
- Vérifiez que le nom du bucket est exactement `profile-pictures` (avec tiret, sans espaces)
- Vérifiez que le bucket est bien créé dans Storage > Buckets

### Erreur : "must be owner of table objects"
- Utilisez l'interface Supabase pour créer les politiques (Méthode A)
- Ne créez pas le bucket via SQL, créez-le via l'interface

### Erreur : "Permission denied"
- Vérifiez que vous êtes connecté avec le bon compte
- Vérifiez que vous avez les droits d'administration sur le projet

### L'image ne s'affiche pas
- Vérifiez que le bucket est **public** (case cochée)
- Vérifiez que la politique "Anyone can view profile pictures" existe
- Vérifiez l'URL de l'image dans la console du navigateur

---

## ✅ C'est fait !

Une fois ces étapes terminées, vous devriez pouvoir :
- ✅ Uploader des photos de profil
- ✅ Voir les photos dans le portail
- ✅ Les photos sont stockées de manière sécurisée

🎉 **Profitez !**

