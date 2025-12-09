-- ============================================
-- CRÉATION DU BUCKET PROFILE-PICTURES (VERSION SÉCURISÉE)
-- ============================================
-- Cette version fonctionne avec les permissions standard
-- Exécutez ce script dans SQL Editor de Supabase

-- ÉTAPE 1 : Créer le bucket (si pas déjà fait via l'interface)
-- Note: Cette commande peut échouer si vous n'avez pas les permissions
-- Dans ce cas, créez le bucket via l'interface Supabase (Storage > Buckets > New bucket)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'profile-pictures',
  'profile-pictures',
  true,
  5242880,  -- 5 MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
)
ON CONFLICT (id) DO NOTHING;

-- ÉTAPE 2 : Supprimer les anciennes politiques si elles existent
DROP POLICY IF EXISTS "Users can upload own profile picture" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view profile pictures" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own profile picture" ON storage.objects;
DROP POLICY IF EXISTS "Users can update own profile picture" ON storage.objects;

-- ÉTAPE 3 : Créer les politiques RLS
-- Ces politiques fonctionnent avec les permissions standard

-- Politique 1 : Upload (INSERT)
CREATE POLICY "Users can upload own profile picture"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'profile-pictures'
);

-- Politique 2 : Lecture (SELECT) - Bucket public
CREATE POLICY "Anyone can view profile pictures"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'profile-pictures');

-- Politique 3 : Suppression (DELETE)
CREATE POLICY "Users can delete own profile picture"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'profile-pictures');

-- Politique 4 : Mise à jour (UPDATE)
CREATE POLICY "Users can update own profile picture"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'profile-pictures')
WITH CHECK (bucket_id = 'profile-pictures');

-- ============================================
-- VÉRIFICATION
-- ============================================
SELECT '✅ Script exécuté! Vérifiez que le bucket existe dans Storage > Buckets' as status;

