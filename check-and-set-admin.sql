-- ============================================
-- VÉRIFIER ET DÉFINIR UN ADMIN
-- ============================================
-- Remplacez 'elitesconnect.tn@gmail.com' par votre email si différent

-- 1. Vérifier si la colonne is_admin existe
SELECT 
  column_name, 
  data_type, 
  column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'profiles' 
  AND column_name = 'is_admin';

-- 2. Vérifier l'état actuel de votre compte
SELECT 
  p.id,
  p.full_name,
  u.email as auth_email,
  p.is_admin,
  p.profile_completed
FROM public.profiles p
JOIN auth.users u ON u.id = p.id
WHERE u.email = 'elitesconnect.tn@gmail.com';

-- 3. Si is_admin est NULL ou false, le définir à true
UPDATE public.profiles
SET is_admin = true
WHERE id IN (
  SELECT id FROM auth.users WHERE email = 'elitesconnect.tn@gmail.com'
);

-- 4. Vérifier que ça a fonctionné
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
-- Déconnectez-vous et reconnectez-vous pour voir la carte Administration


