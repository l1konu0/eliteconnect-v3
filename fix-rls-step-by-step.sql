-- ============================================
-- CORRECTION RLS ÉTAPE PAR ÉTAPE
-- ============================================
-- Exécutez ce script ÉTAPE PAR ÉTAPE dans SQL Editor

-- ============================================
-- ÉTAPE 1 : Voir l'état actuel
-- ============================================
SELECT '=== ÉTAT ACTUEL ===' as info;
SELECT 
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables 
WHERE tablename = 'membership_requests';

SELECT '=== POLITIQUES ACTUELLES ===' as info;
SELECT policyname, cmd, roles 
FROM pg_policies 
WHERE tablename = 'membership_requests';

-- ============================================
-- ÉTAPE 2 : Supprimer TOUTES les politiques
-- ============================================
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'membership_requests') 
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON public.membership_requests';
    END LOOP;
END $$;

SELECT 'Toutes les politiques supprimées' as info;

-- ============================================
-- ÉTAPE 3 : DÉSACTIVER RLS TEMPORAIREMENT
-- ============================================
ALTER TABLE public.membership_requests DISABLE ROW LEVEL SECURITY;

SELECT 'RLS désactivé' as info;

-- ============================================
-- ÉTAPE 4 : TESTER L'INSERTION SANS RLS
-- ============================================
-- Si cette insertion fonctionne, c'est bien un problème de politique RLS
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
  'Test avec RLS désactivé - devrait fonctionner',
  'pending'
) RETURNING id, full_name, email, created_at;

SELECT 'Si vous voyez cette ligne, l insertion a fonctionné SANS RLS' as info;

-- ============================================
-- ÉTAPE 5 : RÉACTIVER RLS
-- ============================================
ALTER TABLE public.membership_requests ENABLE ROW LEVEL SECURITY;

SELECT 'RLS réactivé' as info;

-- ============================================
-- ÉTAPE 6 : CRÉER UNE POLITIQUE D'INSERTION PERMISSIVE
-- ============================================
-- Cette politique permet à TOUS (anon, authenticated, etc.) d'insérer
CREATE POLICY "allow_insert_membership_requests"
  ON public.membership_requests
  FOR INSERT
  TO public
  WITH CHECK (true);

SELECT 'Politique d insertion créée' as info;

-- ============================================
-- ÉTAPE 7 : CRÉER LES AUTRES POLITIQUES
-- ============================================
CREATE POLICY "allow_select_membership_requests"
  ON public.membership_requests
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "allow_update_membership_requests"
  ON public.membership_requests
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

SELECT 'Toutes les politiques créées' as info;

-- ============================================
-- ÉTAPE 8 : VÉRIFIER LES POLITIQUES
-- ============================================
SELECT '=== NOUVELLES POLITIQUES ===' as info;
SELECT 
  policyname,
  cmd as operation,
  roles,
  with_check
FROM pg_policies 
WHERE tablename = 'membership_requests'
ORDER BY policyname;

-- ============================================
-- ÉTAPE 9 : TESTER L'INSERTION AVEC RLS
-- ============================================
-- Cette insertion devrait maintenant fonctionner avec RLS activé
INSERT INTO public.membership_requests (
  full_name,
  profession_company,
  email,
  message,
  status
) VALUES (
  'Test AVEC RLS',
  'Test Company',
  'test-with-rls@test.com',
  'Test avec RLS activé et politique créée',
  'pending'
) RETURNING id, full_name, email, created_at;

SELECT 'Si vous voyez cette ligne, l insertion a fonctionné AVEC RLS' as info;

-- ============================================
-- ÉTAPE 10 : VÉRIFIER LE RÉSULTAT
-- ============================================
SELECT '=== TOTAL DE DEMANDES ===' as info;
SELECT COUNT(*) as total FROM public.membership_requests;

SELECT '=== DERNIÈRES DEMANDES ===' as info;
SELECT id, full_name, email, status, created_at
FROM public.membership_requests
ORDER BY created_at DESC
LIMIT 5;









