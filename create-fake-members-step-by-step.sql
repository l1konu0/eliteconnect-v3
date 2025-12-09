-- ============================================
-- CRÉER 5 MEMBRES FICTIFS - ÉTAPE PAR ÉTAPE
-- ============================================
-- IMPORTANT : Vous DEVEZ créer les utilisateurs dans Authentication AVANT d'exécuter ce script
-- 
-- ÉTAPE 1 : Créer les utilisateurs dans Supabase Dashboard
-- ============================================
-- 1. Allez dans Supabase Dashboard > Authentication > Users
-- 2. Cliquez sur "Add user" ou "Invite user"
-- 3. Créez 5 utilisateurs avec ces emails (vous pouvez utiliser n'importe quel mot de passe) :
--
--    Email: ahmed.benali@eliteconnect.tn
--    Email: sarah.trabelsi@eliteconnect.tn
--    Email: karim.mezghani@eliteconnect.tn
--    Email: leila.hamdi@eliteconnect.tn
--    Email: youssef.khelifi@eliteconnect.tn
--
-- 4. Après avoir créé chaque utilisateur, notez son ID (visible dans la liste)
--
-- ÉTAPE 2 : Récupérer les IDs des utilisateurs
-- ============================================
-- Exécutez cette requête pour voir les IDs des utilisateurs que vous venez de créer :
--
-- SELECT id, email FROM auth.users 
-- WHERE email IN (
--   'ahmed.benali@eliteconnect.tn',
--   'sarah.trabelsi@eliteconnect.tn',
--   'karim.mezghani@eliteconnect.tn',
--   'leila.hamdi@eliteconnect.tn',
--   'youssef.khelifi@eliteconnect.tn'
-- );
--
-- Copiez les IDs et remplacez-les dans le script ci-dessous

-- ============================================
-- ÉTAPE 3 : Insérer les profils (REMPLACEZ LES IDs)
-- ============================================
-- Remplacez les UUIDs ci-dessous par les vrais IDs des utilisateurs créés

-- Membre 1 : Ahmed Benali
INSERT INTO public.profiles (
  id,
  full_name,
  job_title,
  company,
  phone_number,
  bio,
  profile_picture_url,
  profile_completed,
  membership_status
) 
SELECT 
  u.id, -- Utilise l'ID de l'utilisateur créé
  'Ahmed Benali',
  'CEO & Founder',
  'TechInnovate Tunisia',
  '+216 98 123 456',
  'Entrepreneur passionné par l''innovation technologique et l''impact social. Fondateur de plusieurs startups dans le secteur fintech.',
  'https://ui-avatars.com/api/?name=Ahmed+Benali&size=200&background=D4AF37&color=0A0A0A&bold=true',
  true,
  'active'
FROM auth.users u
WHERE u.email = 'ahmed.benali@eliteconnect.tn'
ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  job_title = EXCLUDED.job_title,
  company = EXCLUDED.company,
  phone_number = EXCLUDED.phone_number,
  bio = EXCLUDED.bio,
  profile_picture_url = EXCLUDED.profile_picture_url,
  profile_completed = EXCLUDED.profile_completed,
  membership_status = EXCLUDED.membership_status;

-- Membre 2 : Sarah Trabelsi
INSERT INTO public.profiles (
  id,
  full_name,
  job_title,
  company,
  phone_number,
  bio,
  profile_picture_url,
  profile_completed,
  membership_status
) 
SELECT 
  u.id,
  'Sarah Trabelsi',
  'Investment Director',
  'Mediterranean Ventures',
  '+216 98 234 567',
  'Directrice d''investissement spécialisée dans les startups tech et les entreprises à fort potentiel de croissance en Afrique du Nord.',
  'https://ui-avatars.com/api/?name=Sarah+Trabelsi&size=200&background=D4AF37&color=0A0A0A&bold=true',
  true,
  'active'
FROM auth.users u
WHERE u.email = 'sarah.trabelsi@eliteconnect.tn'
ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  job_title = EXCLUDED.job_title,
  company = EXCLUDED.company,
  phone_number = EXCLUDED.phone_number,
  bio = EXCLUDED.bio,
  profile_picture_url = EXCLUDED.profile_picture_url,
  profile_completed = EXCLUDED.profile_completed,
  membership_status = EXCLUDED.membership_status;

-- Membre 3 : Karim Mezghani
INSERT INTO public.profiles (
  id,
  full_name,
  job_title,
  company,
  phone_number,
  bio,
  profile_picture_url,
  profile_completed,
  membership_status
) 
SELECT 
  u.id,
  'Karim Mezghani',
  'Senior Business Consultant',
  'Elite Consulting Group',
  '+216 98 345 678',
  'Consultant en stratégie d''entreprise avec plus de 15 ans d''expérience. Expert en transformation digitale et optimisation opérationnelle.',
  'https://ui-avatars.com/api/?name=Karim+Mezghani&size=200&background=D4AF37&color=0A0A0A&bold=true',
  true,
  'active'
FROM auth.users u
WHERE u.email = 'karim.mezghani@eliteconnect.tn'
ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  job_title = EXCLUDED.job_title,
  company = EXCLUDED.company,
  phone_number = EXCLUDED.phone_number,
  bio = EXCLUDED.bio,
  profile_picture_url = EXCLUDED.profile_picture_url,
  profile_completed = EXCLUDED.profile_completed,
  membership_status = EXCLUDED.membership_status;

-- Membre 4 : Leila Hamdi
INSERT INTO public.profiles (
  id,
  full_name,
  job_title,
  company,
  phone_number,
  bio,
  profile_picture_url,
  profile_completed,
  membership_status
) 
SELECT 
  u.id,
  'Leila Hamdi',
  'Marketing Director',
  'Brand Excellence Tunisia',
  '+216 98 456 789',
  'Directrice marketing avec une expertise en branding et communication stratégique. Passionnée par la création de marques fortes et durables.',
  'https://ui-avatars.com/api/?name=Leila+Hamdi&size=200&background=D4AF37&color=0A0A0A&bold=true',
  true,
  'active'
FROM auth.users u
WHERE u.email = 'leila.hamdi@eliteconnect.tn'
ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  job_title = EXCLUDED.job_title,
  company = EXCLUDED.company,
  phone_number = EXCLUDED.phone_number,
  bio = EXCLUDED.bio,
  profile_picture_url = EXCLUDED.profile_picture_url,
  profile_completed = EXCLUDED.profile_completed,
  membership_status = EXCLUDED.membership_status;

-- Membre 5 : Youssef Khelifi
INSERT INTO public.profiles (
  id,
  full_name,
  job_title,
  company,
  phone_number,
  bio,
  profile_picture_url,
  profile_completed,
  membership_status
) 
SELECT 
  u.id,
  'Youssef Khelifi',
  'Real Estate Developer',
  'Premium Properties Tunisia',
  '+216 98 567 890',
  'Développeur immobilier spécialisé dans les projets haut de gamme. Expert en investissement immobilier et développement urbain durable.',
  'https://ui-avatars.com/api/?name=Youssef+Khelifi&size=200&background=D4AF37&color=0A0A0A&bold=true',
  true,
  'active'
FROM auth.users u
WHERE u.email = 'youssef.khelifi@eliteconnect.tn'
ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  job_title = EXCLUDED.job_title,
  company = EXCLUDED.company,
  phone_number = EXCLUDED.phone_number,
  bio = EXCLUDED.bio,
  profile_picture_url = EXCLUDED.profile_picture_url,
  profile_completed = EXCLUDED.profile_completed,
  membership_status = EXCLUDED.membership_status;

-- ============================================
-- VÉRIFICATION
-- ============================================
-- Vérifier que les profils ont été créés
SELECT 
  p.id,
  p.full_name,
  p.job_title,
  p.company,
  p.profile_picture_url,
  p.profile_completed,
  u.email
FROM public.profiles p
JOIN auth.users u ON u.id = p.id
WHERE p.full_name IN ('Ahmed Benali', 'Sarah Trabelsi', 'Karim Mezghani', 'Leila Hamdi', 'Youssef Khelifi')
ORDER BY p.full_name;


