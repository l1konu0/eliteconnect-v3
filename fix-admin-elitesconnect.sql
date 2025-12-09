-- ============================================
-- CORRIGER LE STATUT ADMIN POUR elitesconnect.tn@gmail.com
-- ============================================

-- Étape 1 : Vérifier que la colonne is_admin existe, sinon la créer
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'profiles' 
    AND column_name = 'is_admin'
  ) THEN
    ALTER TABLE public.profiles 
    ADD COLUMN is_admin BOOLEAN DEFAULT false;
    
    CREATE INDEX IF NOT EXISTS profiles_is_admin_idx ON public.profiles(is_admin);
    
    RAISE NOTICE 'Colonne is_admin créée avec succès';
  ELSE
    RAISE NOTICE 'Colonne is_admin existe déjà';
  END IF;
END $$;

-- Étape 2 : Vérifier l'état actuel
SELECT 
  p.id,
  p.full_name,
  u.email as auth_email,
  p.is_admin,
  p.profile_completed,
  u.email_confirmed_at
FROM public.profiles p
JOIN auth.users u ON u.id = p.id
WHERE u.email = 'elitesconnect.tn@gmail.com';

-- Étape 3 : Définir is_admin = true
UPDATE public.profiles
SET is_admin = true
WHERE id IN (
  SELECT id FROM auth.users WHERE email = 'elitesconnect.tn@gmail.com'
);

-- Étape 4 : Vérifier que ça a fonctionné
SELECT 
  p.id,
  p.full_name,
  u.email as auth_email,
  p.is_admin,
  p.profile_completed
FROM public.profiles p
JOIN auth.users u ON u.id = p.id
WHERE u.email = 'elitesconnect.tn@gmail.com';

-- Si vous voyez is_admin = true, c'est bon ! ✅
-- IMPORTANT : Déconnectez-vous et reconnectez-vous pour voir la carte Administration


