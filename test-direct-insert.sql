-- ============================================
-- TEST DIRECT D'INSERTION
-- ============================================
-- Exécutez ce script pour tester si l'insertion fonctionne directement

-- Test 1 : Insérer une demande de test
INSERT INTO public.membership_requests (
  full_name,
  profession_company,
  email,
  message,
  status
) VALUES (
  'Test Direct SQL',
  'Test Company Direct',
  'test-direct@example.com',
  'Test d insertion directe depuis SQL Editor',
  'pending'
) RETURNING *;

-- Test 2 : Vérifier toutes les demandes
SELECT 
  id,
  full_name,
  email,
  profession_company,
  status,
  created_at
FROM public.membership_requests 
ORDER BY created_at DESC;

-- Test 3 : Compter les demandes
SELECT COUNT(*) as total_requests FROM public.membership_requests;

-- Test 4 : Vérifier les politiques RLS
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'membership_requests';








