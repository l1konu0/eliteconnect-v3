-- ============================================
-- CORRECTION DÉFINITIVE RLS - VERSION SIMPLE
-- ============================================

-- ÉTAPE 1 : Voir l'état actuel
SELECT '=== ÉTAT ACTUEL ===' as info;
SELECT 
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables 
WHERE tablename = 'membership_requests';

SELECT '=== POLITIQUES ACTUELLES ===' as info;
SELECT 
  policyname,
  cmd as operation,
  roles,
  qual as using_expr,
  with_check as with_check_expr
FROM pg_policies 
WHERE tablename = 'membership_requests';

-- ÉTAPE 2 : Supprimer TOUTES les politiques
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'membership_requests') 
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON public.membership_requests';
        RAISE NOTICE 'Politique supprimée: %', r.policyname;
    END LOOP;
END $$;

SELECT 'Toutes les politiques supprimées' as info;

-- ÉTAPE 3 : DÉSACTIVER RLS TEMPORAIREMENT
ALTER TABLE public.membership_requests DISABLE ROW LEVEL SECURITY;

SELECT 'RLS désactivé - Testez maintenant depuis l application' as info;
SELECT 'Si l insertion fonctionne, réactivez RLS avec les politiques ci-dessous' as info;

-- ÉTAPE 4 : TEST - Insérer une demande SANS RLS
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

-- ÉTAPE 5 : RÉACTIVER RLS
ALTER TABLE public.membership_requests ENABLE ROW LEVEL SECURITY;

-- ÉTAPE 6 : Créer une politique d'insertion SANS spécifier de rôle
-- Ne pas mettre TO = permet à TOUS les rôles (anon, authenticated, etc.)
CREATE POLICY "allow_all_insert"
  ON public.membership_requests
  FOR INSERT
  WITH CHECK (true);

-- ÉTAPE 7 : Vérifier la politique créée
SELECT '=== NOUVELLE POLITIQUE ===' as info;
SELECT 
  policyname,
  cmd as operation,
  roles,
  with_check
FROM pg_policies 
WHERE tablename = 'membership_requests';

-- ÉTAPE 8 : Créer les autres politiques
CREATE POLICY "allow_select_authenticated"
  ON public.membership_requests
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "allow_update_authenticated"
  ON public.membership_requests
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ÉTAPE 9 : TEST - Insérer une demande AVEC RLS
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

-- ÉTAPE 10 : Vérifier toutes les politiques
SELECT '=== TOUTES LES POLITIQUES ===' as info;
SELECT 
  policyname,
  cmd as operation,
  roles,
  with_check
FROM pg_policies 
WHERE tablename = 'membership_requests'
ORDER BY policyname;









