-- ============================================
-- CORRIGER LES CONTRAINTES POUR PERMETTRE LA SUPPRESSION D'UTILISATEURS
-- ============================================
-- Ce script corrige les contraintes de clé étrangère pour permettre
-- la suppression d'utilisateurs dans Supabase

-- ============================================
-- 1. CORRIGER LA TABLE PROFILES
-- ============================================
-- La table profiles référence auth.users(id) comme clé primaire
-- On doit ajouter ON DELETE CASCADE

-- Supprimer l'ancienne contrainte
ALTER TABLE IF EXISTS public.profiles 
  DROP CONSTRAINT IF EXISTS profiles_id_fkey;

-- Recréer avec CASCADE
ALTER TABLE IF EXISTS public.profiles 
  ADD CONSTRAINT profiles_id_fkey 
  FOREIGN KEY (id) 
  REFERENCES auth.users(id) 
  ON DELETE CASCADE;

-- ============================================
-- 2. CORRIGER LA TABLE MEMBERSHIP_REQUESTS
-- ============================================
-- La colonne reviewed_by référence auth.users(id) sans CASCADE
-- On doit ajouter ON DELETE SET NULL (car reviewed_by peut être NULL)

-- Supprimer l'ancienne contrainte
ALTER TABLE IF EXISTS public.membership_requests 
  DROP CONSTRAINT IF EXISTS membership_requests_reviewed_by_fkey;

-- Recréer avec SET NULL (si l'utilisateur est supprimé, on garde la demande mais reviewed_by devient NULL)
ALTER TABLE IF EXISTS public.membership_requests 
  ADD CONSTRAINT membership_requests_reviewed_by_fkey 
  FOREIGN KEY (reviewed_by) 
  REFERENCES auth.users(id) 
  ON DELETE SET NULL;

-- ============================================
-- 3. VÉRIFIER LES AUTRES TABLES
-- ============================================
-- Les tables suivantes ont déjà ON DELETE CASCADE (pas besoin de modification) :
-- - contacts (user_id)
-- - event_rsvps (user_id)
-- - event_photos (uploaded_by)
-- - event_invitations (invited_by, invited_user_id)
-- - events (created_by)

-- ============================================
-- 4. VÉRIFICATION
-- ============================================
-- Pour vérifier que les contraintes sont correctes, exécutez :
-- 
-- SELECT 
--   tc.table_name, 
--   kcu.column_name, 
--   ccu.table_name AS foreign_table_name,
--   ccu.column_name AS foreign_column_name,
--   rc.delete_rule
-- FROM information_schema.table_constraints AS tc 
-- JOIN information_schema.key_column_usage AS kcu
--   ON tc.constraint_name = kcu.constraint_name
-- JOIN information_schema.constraint_column_usage AS ccu
--   ON ccu.constraint_name = tc.constraint_name
-- JOIN information_schema.referential_constraints AS rc
--   ON rc.constraint_name = tc.constraint_name
-- WHERE tc.constraint_type = 'FOREIGN KEY' 
--   AND ccu.table_name = 'users'
--   AND tc.table_schema = 'public'
-- ORDER BY tc.table_name, kcu.column_name;

-- ============================================
-- 5. TEST DE SUPPRESSION
-- ============================================
-- Après avoir exécuté ce script, vous devriez pouvoir supprimer un utilisateur
-- depuis le dashboard Supabase sans erreur.
-- 
-- Note : Toutes les données liées à l'utilisateur seront automatiquement supprimées
-- grâce aux contraintes CASCADE, sauf membership_requests.reviewed_by qui sera mis à NULL.

