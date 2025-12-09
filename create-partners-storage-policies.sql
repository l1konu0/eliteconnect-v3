-- ============================================
-- POLITIQUES STORAGE POUR LES LOGOS DE PARTENAIRES
-- ============================================
-- Exécutez ce script APRÈS avoir créé le bucket "partner-logos" dans Supabase Storage
-- Dashboard > Storage > New bucket > Nom: "partner-logos" > Public: ✅

-- 1. Politique : Tout le monde peut lire les logos (bucket public)
DROP POLICY IF EXISTS "Anyone can view partner logos" ON storage.objects;
CREATE POLICY "Anyone can view partner logos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'partner-logos');

-- 2. Politique : Seuls les admins peuvent uploader des logos
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

-- 3. Politique : Seuls les admins peuvent modifier des logos
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

-- 4. Politique : Seuls les admins peuvent supprimer des logos
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

-- ============================================
-- NOTES
-- ============================================
-- 1. Créez d'abord le bucket "partner-logos" dans Storage (Dashboard > Storage)
-- 2. Activez "Public bucket" pour que les images soient accessibles publiquement
-- 3. Exécutez ensuite ce script dans SQL Editor

