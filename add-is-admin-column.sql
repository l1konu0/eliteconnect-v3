-- ============================================
-- AJOUTER LA COLONNE is_admin À LA TABLE profiles
-- ============================================
-- Exécutez ce script AVANT de définir un utilisateur comme admin

-- 1. Ajouter la colonne is_admin
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false;

-- 2. Créer un index pour améliorer les performances
CREATE INDEX IF NOT EXISTS profiles_is_admin_idx ON public.profiles(is_admin);

-- 3. Vérifier que la colonne a été créée
SELECT 
  column_name, 
  data_type, 
  column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'profiles' 
  AND column_name = 'is_admin';

-- Si vous voyez la colonne dans les résultats, c'est bon ! ✅


