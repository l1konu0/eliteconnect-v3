# 🗂️ Configuration du Bucket Storage pour les Logos de Partenaires

## ❌ Erreur : "Bucket not found"

Cette erreur signifie que le bucket `partner-logos` n'existe pas encore dans Supabase Storage.

---

## ✅ Solution : Créer le bucket

### Étape 1 : Créer le bucket dans Supabase

1. Allez dans votre **Supabase Dashboard**
2. Cliquez sur **Storage** dans le menu de gauche
3. Cliquez sur **"New bucket"** ou **"Create bucket"**
4. Remplissez les informations :
   - **Name** : `partner-logos`
   - **Public bucket** : ✅ **ACTIVEZ** (très important !)
   - **File size limit** : Laissez par défaut ou mettez `5 MB` (pour les logos)
   - **Allowed MIME types** : Laissez vide ou ajoutez `image/*` pour n'accepter que les images
5. Cliquez sur **"Create bucket"**

### Étape 2 : Configurer les politiques Storage

1. Allez dans **SQL Editor** dans Supabase
2. Exécutez le script `create-partners-storage-policies.sql`

**OU** copiez-collez directement ceci :

```sql
-- Politique : Tout le monde peut lire les logos
DROP POLICY IF EXISTS "Anyone can view partner logos" ON storage.objects;
CREATE POLICY "Anyone can view partner logos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'partner-logos');

-- Politique : Seuls les admins peuvent uploader des logos
DROP POLICY IF EXISTS "Only admins can upload partner logos" ON storage.objects;
CREATE POLICY "Only admins can upload partner logos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'partner-logos' AND
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid()
    AND profiles.is_admin = true
  )
);

-- Politique : Seuls les admins peuvent modifier des logos
DROP POLICY IF EXISTS "Only admins can update partner logos" ON storage.objects;
CREATE POLICY "Only admins can update partner logos"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'partner-logos' AND
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid()
    AND profiles.is_admin = true
  )
)
WITH CHECK (
  bucket_id = 'partner-logos' AND
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid()
    AND profiles.is_admin = true
  )
);

-- Politique : Seuls les admins peuvent supprimer des logos
DROP POLICY IF EXISTS "Only admins can delete partner logos" ON storage.objects;
CREATE POLICY "Only admins can delete partner logos"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'partner-logos' AND
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid()
    AND profiles.is_admin = true
  )
);
```

### Étape 3 : Vérifier

1. Allez dans **Storage** > **partner-logos**
2. Vous devriez voir le bucket vide (normal, vous n'avez pas encore uploadé de logos)
3. Essayez de modifier un partenaire depuis `/portal/partners/manage`
4. L'upload de logo devrait maintenant fonctionner ! ✅

---

## ⚠️ Important

- Le bucket **DOIT** être **public** pour que les logos s'affichent sur le site
- Si vous ne voyez pas l'option "Public bucket", assurez-vous d'être dans la bonne section Storage
- Le nom du bucket doit être exactement `partner-logos` (sensible à la casse)

---

## 🔍 Vérification rapide

Pour vérifier que le bucket existe, allez dans :
- **Storage** > Vous devriez voir `partner-logos` dans la liste

Si vous ne le voyez pas, créez-le avec les étapes ci-dessus.

---

**Une fois le bucket créé, vous pourrez uploader des logos pour vos partenaires ! 🎉**







