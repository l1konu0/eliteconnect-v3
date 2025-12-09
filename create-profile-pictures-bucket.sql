-- ============================================
-- CRÉATION DU BUCKET PROFILE-PICTURES
-- ============================================
-- Exécutez ce script dans SQL Editor de Supabase
-- Dashboard > SQL Editor > New Query

-- ÉTAPE 1 : Créer le bucket profile-pictures
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'profile-pictures',
  'profile-pictures',
  true,  -- Bucket public pour permettre l'affichage des images
  5242880,  -- 5 MB en octets
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
)
ON CONFLICT (id) DO UPDATE
SET 
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];

-- ÉTAPE 2 : Supprimer les anciennes politiques si elles existent
DROP POLICY IF EXISTS "Users can upload own profile picture" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view profile pictures" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own profile picture" ON storage.objects;
DROP POLICY IF EXISTS "Users can update own profile picture" ON storage.objects;

-- ÉTAPE 3 : Activer RLS sur storage.objects (si pas déjà fait)
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- ÉTAPE 4 : Politique 1 - Les utilisateurs authentifiés peuvent uploader leur propre photo
CREATE POLICY "Users can upload own profile picture"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'profile-pictures' AND
  -- Permettre l'upload dans le dossier profiles/ avec leur user_id
  (storage.foldername(name))[1] = 'profiles'
);

-- ÉTAPE 5 : Politique 2 - Tout le monde peut voir les photos (bucket public)
CREATE POLICY "Anyone can view profile pictures"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'profile-pictures');

-- ÉTAPE 6 : Politique 3 - Les utilisateurs peuvent supprimer leur propre photo
CREATE POLICY "Users can delete own profile picture"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'profile-pictures' AND
  (storage.foldername(name))[1] = 'profiles' AND
  -- Vérifier que le nom du fichier commence par leur user_id
  (storage.foldername(name))[2] LIKE (auth.uid()::text || '-%')
);

-- ÉTAPE 7 : Politique 4 - Les utilisateurs peuvent mettre à jour leur propre photo
CREATE POLICY "Users can update own profile picture"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'profile-pictures' AND
  (storage.foldername(name))[1] = 'profiles' AND
  (storage.foldername(name))[2] LIKE (auth.uid()::text || '-%')
)
WITH CHECK (
  bucket_id = 'profile-pictures' AND
  (storage.foldername(name))[1] = 'profiles' AND
  (storage.foldername(name))[2] LIKE (auth.uid()::text || '-%')
);

-- ============================================
-- VÉRIFICATION
-- ============================================

-- Vérifier que le bucket existe
SELECT 
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
FROM storage.buckets
WHERE id = 'profile-pictures';

-- Vérifier les politiques créées
SELECT 
  policyname,
  cmd as operation,
  roles,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'objects' 
  AND schemaname = 'storage'
  AND policyname LIKE '%profile%'
ORDER BY policyname;

-- ============================================
-- MESSAGE DE SUCCÈS
-- ============================================
SELECT '✅ Bucket profile-pictures créé avec succès!' as status;
SELECT '✅ Politiques RLS configurées!' as status;

