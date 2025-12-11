-- ============================================
-- CRÉER 5 MEMBRES FICTIFS - VERSION SIMPLIFIÉE
-- ============================================
-- Cette version crée directement les profils sans nécessiter
-- de créer d'abord les utilisateurs dans Authentication
-- 
-- ATTENTION : Cette méthode crée des profils "orphelins" qui ne seront
-- pas liés à des comptes d'authentification réels.
-- Pour des membres fonctionnels, utilisez create-fake-members.sql

-- Générer des UUIDs pour les membres fictifs
DO $$
DECLARE
  member1_id UUID := gen_random_uuid();
  member2_id UUID := gen_random_uuid();
  member3_id UUID := gen_random_uuid();
  member4_id UUID := gen_random_uuid();
  member5_id UUID := gen_random_uuid();
BEGIN
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
  ) VALUES (
    member1_id,
    'Ahmed Benali',
    'CEO & Founder',
    'TechInnovate Tunisia',
    '+216 98 123 456',
    'Entrepreneur passionné par l''innovation technologique et l''impact social. Fondateur de plusieurs startups dans le secteur fintech.',
    'https://ui-avatars.com/api/?name=Ahmed+Benali&size=200&background=D4AF37&color=0A0A0A&bold=true',
    true,
    'active'
  ) ON CONFLICT (id) DO NOTHING;

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
  ) VALUES (
    member2_id,
    'Sarah Trabelsi',
    'Investment Director',
    'Mediterranean Ventures',
    '+216 98 234 567',
    'Directrice d''investissement spécialisée dans les startups tech et les entreprises à fort potentiel de croissance en Afrique du Nord.',
    'https://ui-avatars.com/api/?name=Sarah+Trabelsi&size=200&background=D4AF37&color=0A0A0A&bold=true',
    true,
    'active'
  ) ON CONFLICT (id) DO NOTHING;

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
  ) VALUES (
    member3_id,
    'Karim Mezghani',
    'Senior Business Consultant',
    'Elite Consulting Group',
    '+216 98 345 678',
    'Consultant en stratégie d''entreprise avec plus de 15 ans d''expérience. Expert en transformation digitale et optimisation opérationnelle.',
    'https://ui-avatars.com/api/?name=Karim+Mezghani&size=200&background=D4AF37&color=0A0A0A&bold=true',
    true,
    'active'
  ) ON CONFLICT (id) DO NOTHING;

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
  ) VALUES (
    member4_id,
    'Leila Hamdi',
    'Marketing Director',
    'Brand Excellence Tunisia',
    '+216 98 456 789',
    'Directrice marketing avec une expertise en branding et communication stratégique. Passionnée par la création de marques fortes et durables.',
    'https://ui-avatars.com/api/?name=Leila+Hamdi&size=200&background=D4AF37&color=0A0A0A&bold=true',
    true,
    'active'
  ) ON CONFLICT (id) DO NOTHING;

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
  ) VALUES (
    member5_id,
    'Youssef Khelifi',
    'Real Estate Developer',
    'Premium Properties Tunisia',
    '+216 98 567 890',
    'Développeur immobilier spécialisé dans les projets haut de gamme. Expert en investissement immobilier et développement urbain durable.',
    'https://ui-avatars.com/api/?name=Youssef+Khelifi&size=200&background=D4AF37&color=0A0A0A&bold=true',
    true,
    'active'
  ) ON CONFLICT (id) DO NOTHING;

  RAISE NOTICE '5 membres fictifs créés avec succès!';
END $$;

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






