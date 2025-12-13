-- ============================================
-- POLITIQUE RLS QUI FONCTIONNE
-- ============================================
-- Ce script crée une politique simple qui permet l'insertion depuis l'application

-- ÉTAPE 1 : Supprimer toutes les politiques existantes
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

-- ÉTAPE 3 : Créer une politique d'insertion TRÈS SIMPLE
-- IMPORTANT : Ne pas mettre "TO" = permet à TOUS les rôles
CREATE POLICY "insert_membership_requests"
  ON public.membership_requests
  FOR INSERT
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

-- ÉTAPE 7 : Test d'insertion (devrait fonctionner maintenant)
-- Note: Cette insertion peut échouer dans SQL Editor car vous êtes admin
-- Mais elle devrait fonctionner depuis l'application avec le rôle anon
INSERT INTO public.membership_requests (
  full_name,
  profession_company,
  email,
  message,
  status
) VALUES (
  'Test après création politique',
  'Test Company',
  'test-policy@test.com',
  'Test après création de la politique simple',
  'pending'
) RETURNING id, full_name, email, created_at;









