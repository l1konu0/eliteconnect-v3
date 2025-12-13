-- ============================================
-- SOLUTION TEMPORAIRE : DÉSACTIVER RLS
-- ============================================
-- Utilisez ce script si vous voulez tester rapidement
-- ATTENTION : Cela désactive la sécurité RLS pour cette table

-- Désactiver RLS
ALTER TABLE public.membership_requests DISABLE ROW LEVEL SECURITY;

-- Vérifier que RLS est désactivé
SELECT 
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables 
WHERE tablename = 'membership_requests';

-- Test d'insertion (devrait fonctionner maintenant)
INSERT INTO public.membership_requests (
  full_name,
  profession_company,
  email,
  message,
  status
) VALUES (
  'Test SANS RLS',
  'Test Company',
  'test-norls@test.com',
  'Test avec RLS désactivé',
  'pending'
) RETURNING id, full_name, email, created_at;

-- ============================================
-- Pour réactiver RLS plus tard, exécutez :
-- ============================================
-- ALTER TABLE public.membership_requests ENABLE ROW LEVEL SECURITY;
-- 
-- Puis créez une politique :
-- CREATE POLICY "allow_all_insert"
--   ON public.membership_requests
--   FOR INSERT
--   WITH CHECK (true);









