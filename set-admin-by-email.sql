-- ============================================
-- DÉFINIR UN UTILISATEUR COMME ADMIN PAR EMAIL
-- ============================================
-- Remplacez 'VOTRE_EMAIL@example.com' par votre email de connexion

UPDATE public.profiles
SET is_admin = true
WHERE id IN (
  SELECT id FROM auth.users WHERE email = 'VOTRE_EMAIL@example.com'
);

-- Vérifier que ça a fonctionné
SELECT 
  p.id,
  p.full_name,
  u.email as auth_email,
  p.is_admin
FROM public.profiles p
JOIN auth.users u ON u.id = p.id
WHERE u.email = 'VOTRE_EMAIL@example.com';

-- Si vous voyez is_admin = true, c'est bon ! ✅








