-- ============================================
-- DIAGNOSTIC COMPLET RLS
-- ============================================
-- Exécutez ce script pour voir l'état actuel

-- 1. Vérifier si RLS est activé
SELECT 
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables 
WHERE tablename = 'membership_requests';

-- 2. Voir TOUTES les politiques
SELECT 
  '=== POLITIQUES RLS ===' as section;
  
SELECT 
  policyname,
  cmd as operation,
  roles,
  qual as using_expression,
  with_check as with_check_expression
FROM pg_policies 
WHERE tablename = 'membership_requests'
ORDER BY policyname;

-- 3. Vérifier les permissions de la table
SELECT 
  '=== PERMISSIONS TABLE ===' as section;
  
SELECT 
  grantee,
  privilege_type
FROM information_schema.role_table_grants
WHERE table_name = 'membership_requests'
ORDER BY grantee, privilege_type;

-- 4. Compter les demandes
SELECT 
  '=== STATISTIQUES ===' as section;
  
SELECT 
  COUNT(*) as total_demandes,
  COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending,
  COUNT(CASE WHEN status = 'approved' THEN 1 END) as approved,
  COUNT(CASE WHEN status = 'rejected' THEN 1 END) as rejected
FROM public.membership_requests;

-- 5. Voir les 5 dernières demandes
SELECT 
  '=== DERNIÈRES DEMANDES ===' as section;
  
SELECT 
  id,
  full_name,
  email,
  status,
  created_at
FROM public.membership_requests
ORDER BY created_at DESC
LIMIT 5;








