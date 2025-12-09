-- ============================================
-- SOLUTION ULTIME - TEST MULTIPLE APPROCHES
-- ============================================

-- ÉTAPE 1 : Supprimer TOUTES les politiques
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'membership_requests') 
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON public.membership_requests';
    END LOOP;
END $$;

-- ÉTAPE 2 : S'assurer que RLS est activé
ALTER TABLE public.membership_requests ENABLE ROW LEVEL SECURITY;

-- ÉTAPE 3 : Créer une politique d'insertion avec TOUS les rôles possibles
-- Cette approche spécifie explicitement anon, authenticated ET public
CREATE POLICY "insert_membership_requests_all_roles"
  ON public.membership_requests
  FOR INSERT
  TO anon, authenticated, public
  WITH CHECK (true);

-- ÉTAPE 4 : Vérifier la politique
SELECT '=== POLITIQUE CRÉÉE ===' as info;
SELECT 
  policyname,
  cmd as operation,
  roles,
  with_check
FROM pg_policies 
WHERE tablename = 'membership_requests';

-- ÉTAPE 5 : Créer les autres politiques
CREATE POLICY "select_membership_requests"
  ON public.membership_requests
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "update_membership_requests"
  ON public.membership_requests
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ÉTAPE 6 : Vérifier toutes les politiques
SELECT '=== TOUTES LES POLITIQUES ===' as info;
SELECT 
  policyname,
  cmd as operation,
  roles,
  with_check
FROM pg_policies 
WHERE tablename = 'membership_requests'
ORDER BY policyname;

-- ÉTAPE 7 : Vérifier les permissions de la table
SELECT '=== PERMISSIONS TABLE ===' as info;
SELECT 
  grantee,
  privilege_type
FROM information_schema.role_table_grants
WHERE table_name = 'membership_requests'
ORDER BY grantee, privilege_type;




