-- ============================================
-- SOLUTION ULTIME - CORRECTION RLS
-- ============================================

-- ÉTAPE 1 : Voir toutes les politiques actuelles
SELECT '=== POLITIQUES ACTUELLES ===' as info;
SELECT policyname, cmd, roles, qual, with_check 
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

-- ÉTAPE 3 : DÉSACTIVER TEMPORAIREMENT RLS (pour tester)
ALTER TABLE public.membership_requests DISABLE ROW LEVEL SECURITY;

-- ÉTAPE 4 : Test d'insertion SANS RLS (devrait fonctionner)
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

-- ÉTAPE 5 : Réactiver RLS
ALTER TABLE public.membership_requests ENABLE ROW LEVEL SECURITY;

-- ÉTAPE 6 : Créer une politique d'insertion SANS spécifier de rôle
-- Cela permet à TOUS les rôles (anon, authenticated, etc.) d'insérer
CREATE POLICY "insert_membership_request"
  ON public.membership_requests
  FOR INSERT
  WITH CHECK (true);

-- ÉTAPE 7 : Créer une politique de lecture pour les authentifiés
CREATE POLICY "select_membership_request"
  ON public.membership_requests
  FOR SELECT
  TO authenticated
  USING (true);

-- ÉTAPE 8 : Créer une politique de mise à jour pour les authentifiés
CREATE POLICY "update_membership_request"
  ON public.membership_requests
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ÉTAPE 9 : Vérifier les nouvelles politiques
SELECT '=== NOUVELLES POLITIQUES ===' as info;
SELECT 
  policyname,
  cmd as operation,
  roles,
  with_check
FROM pg_policies 
WHERE tablename = 'membership_requests'
ORDER BY policyname;

-- ÉTAPE 10 : Vérifier le nombre total de demandes
SELECT '=== TOTAL DE DEMANDES ===' as info;
SELECT COUNT(*) as total FROM public.membership_requests;









