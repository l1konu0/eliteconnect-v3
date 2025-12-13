-- ============================================
-- CORRECTION FINALE POUR LE RÔLE ANON
-- ============================================
-- Le problème : SQL Editor fonctionne (admin) mais l'app (anon) ne fonctionne pas

-- ÉTAPE 1 : Voir les politiques actuelles
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
    END LOOP;
END $$;

-- ÉTAPE 3 : Vérifier que RLS est activé
ALTER TABLE public.membership_requests ENABLE ROW LEVEL SECURITY;

-- ÉTAPE 4 : Créer une politique d'insertion TRÈS PERMISSIVE
-- IMPORTANT : Ne pas spécifier TO = permet à TOUS les rôles
CREATE POLICY "insert_for_anon_and_authenticated"
  ON public.membership_requests
  FOR INSERT
  WITH CHECK (true);

-- ÉTAPE 5 : Vérifier la politique créée
SELECT '=== NOUVELLE POLITIQUE ===' as info;
SELECT 
  policyname,
  cmd as operation,
  roles,
  with_check
FROM pg_policies 
WHERE tablename = 'membership_requests';

-- ÉTAPE 6 : Créer les autres politiques
CREATE POLICY "select_for_authenticated"
  ON public.membership_requests
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "update_for_authenticated"
  ON public.membership_requests
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ÉTAPE 7 : Vérifier toutes les politiques
SELECT '=== TOUTES LES POLITIQUES ===' as info;
SELECT 
  policyname,
  cmd as operation,
  roles,
  with_check
FROM pg_policies 
WHERE tablename = 'membership_requests'
ORDER BY policyname;









