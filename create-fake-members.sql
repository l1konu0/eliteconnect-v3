-- ============================================
-- CRÉER 5 MEMBRES FICTIFS POUR ELITE CONNECT
-- ============================================
-- Ce script crée des profils fictifs avec des photos de profil
-- Exécutez ce script dans SQL Editor de Supabase

-- IMPORTANT : Vous devez d'abord créer les utilisateurs dans Authentication > Users
-- Ensuite, utilisez leurs IDs dans ce script

-- ============================================
-- ÉTAPE 1 : Créer les utilisateurs dans Authentication
-- ============================================
-- Allez dans Supabase Dashboard > Authentication > Users
-- Créez 5 utilisateurs avec ces emails :
-- 1. ahmed.benali@eliteconnect.tn
-- 2. sarah.trabelsi@eliteconnect.tn
-- 3. karim.mezghani@eliteconnect.tn
-- 4. leila.hamdi@eliteconnect.tn
-- 5. youssef.khelifi@eliteconnect.tn
--
-- Notez les IDs de chaque utilisateur créé

-- ============================================
-- ÉTAPE 2 : Insérer les profils (remplacez les IDs)
-- ============================================
-- Remplacez les UUIDs ci-dessous par les vrais IDs des utilisateurs créés

-- Membre 1 : Ahmed Benali - CEO Tech Startup
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
) VALUES (
  'REMPLACEZ_PAR_ID_UTILISATEUR_1', -- Remplacez par l'ID de ahmed.benali@eliteconnect.tn
  'Ahmed Benali',
  'CEO & Founder',
  'TechInnovate Tunisia',
  '+216 98 123 456',
  'Entrepreneur passionné par l''innovation technologique et l''impact social. Fondateur de plusieurs startups dans le secteur fintech.',
  'https://ui-avatars.com/api/?name=Ahmed+Benali&size=200&background=D4AF37&color=0A0A0A&bold=true',
  true,
  'active'
) ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  job_title = EXCLUDED.job_title,
  company = EXCLUDED.company,
  phone_number = EXCLUDED.phone_number,
  bio = EXCLUDED.bio,
  profile_picture_url = EXCLUDED.profile_picture_url,
  profile_completed = EXCLUDED.profile_completed,
  membership_status = EXCLUDED.membership_status;

-- Membre 2 : Sarah Trabelsi - Investment Director
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
) VALUES (
  'REMPLACEZ_PAR_ID_UTILISATEUR_2', -- Remplacez par l'ID de sarah.trabelsi@eliteconnect.tn
  'Sarah Trabelsi',
  'Investment Director',
  'Mediterranean Ventures',
  '+216 98 234 567',
  'Directrice d''investissement spécialisée dans les startups tech et les entreprises à fort potentiel de croissance en Afrique du Nord.',
  'https://ui-avatars.com/api/?name=Sarah+Trabelsi&size=200&background=D4AF37&color=0A0A0A&bold=true',
  true,
  'active'
) ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  job_title = EXCLUDED.job_title,
  company = EXCLUDED.company,
  phone_number = EXCLUDED.phone_number,
  bio = EXCLUDED.bio,
  profile_picture_url = EXCLUDED.profile_picture_url,
  profile_completed = EXCLUDED.profile_completed,
  membership_status = EXCLUDED.membership_status;

-- Membre 3 : Karim Mezghani - Business Consultant
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
) VALUES (
  'REMPLACEZ_PAR_ID_UTILISATEUR_3', -- Remplacez par l'ID de karim.mezghani@eliteconnect.tn
  'Karim Mezghani',
  'Senior Business Consultant',
  'Elite Consulting Group',
  '+216 98 345 678',
  'Consultant en stratégie d''entreprise avec plus de 15 ans d''expérience. Expert en transformation digitale et optimisation opérationnelle.',
  'https://ui-avatars.com/api/?name=Karim+Mezghani&size=200&background=D4AF37&color=0A0A0A&bold=true',
  true,
  'active'
) ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  job_title = EXCLUDED.job_title,
  company = EXCLUDED.company,
  phone_number = EXCLUDED.phone_number,
  bio = EXCLUDED.bio,
  profile_picture_url = EXCLUDED.profile_picture_url,
  profile_completed = EXCLUDED.profile_completed,
  membership_status = EXCLUDED.membership_status;

-- Membre 4 : Leila Hamdi - Marketing Director
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
) VALUES (
  'REMPLACEZ_PAR_ID_UTILISATEUR_4', -- Remplacez par l'ID de leila.hamdi@eliteconnect.tn
  'Leila Hamdi',
  'Marketing Director',
  'Brand Excellence Tunisia',
  '+216 98 456 789',
  'Directrice marketing avec une expertise en branding et communication stratégique. Passionnée par la création de marques fortes et durables.',
  'https://ui-avatars.com/api/?name=Leila+Hamdi&size=200&background=D4AF37&color=0A0A0A&bold=true',
  true,
  'active'
) ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  job_title = EXCLUDED.job_title,
  company = EXCLUDED.company,
  phone_number = EXCLUDED.phone_number,
  bio = EXCLUDED.bio,
  profile_picture_url = EXCLUDED.profile_picture_url,
  profile_completed = EXCLUDED.profile_completed,
  membership_status = EXCLUDED.membership_status;

-- Membre 5 : Youssef Khelifi - Real Estate Developer
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
) VALUES (
  'REMPLACEZ_PAR_ID_UTILISATEUR_5', -- Remplacez par l'ID de youssef.khelifi@eliteconnect.tn
  'Youssef Khelifi',
  'Real Estate Developer',
  'Premium Properties Tunisia',
  '+216 98 567 890',
  'Développeur immobilier spécialisé dans les projets haut de gamme. Expert en investissement immobilier et développement urbain durable.',
  'https://ui-avatars.com/api/?name=Youssef+Khelifi&size=200&background=D4AF37&color=0A0A0A&bold=true',
  true,
  'active'
) ON CONFLICT (id) DO UPDATE SET
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
  id,
  full_name,
  job_title,
  company,
  profile_picture_url,
  profile_completed,
  membership_status
FROM public.profiles
WHERE full_name IN ('Ahmed Benali', 'Sarah Trabelsi', 'Karim Mezghani', 'Leila Hamdi', 'Youssef Khelifi')
ORDER BY full_name;

-- ============================================
-- NOTES
-- ============================================
-- Les photos de profil utilisent ui-avatars.com qui génère des avatars
-- basés sur les noms avec les couleurs Elite Connect (or #D4AF37)
-- 
-- Pour utiliser de vraies photos :
-- 1. Upload les photos dans Supabase Storage (bucket profile-pictures)
-- 2. Remplacez les URLs ui-avatars.com par les URLs publiques des photos


