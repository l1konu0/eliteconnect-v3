-- ============================================
-- CORRECTION RLS - VERSION FINALE QUI FONCTIONNE
-- ============================================
-- Exécutez ce script COMPLET dans SQL Editor

-- ÉTAPE 1 : Supprimer TOUTES les politiques existantes
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'membership_requests') 
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON public.membership_requests';
    END LOOP;
END $$;

-- ÉTAPE 2 : Désactiver RLS temporairement
ALTER TABLE public.membership_requests DISABLE ROW LEVEL SECURITY;

-- ÉTAPE 3 : Réactiver RLS
ALTER TABLE public.membership_requests ENABLE ROW LEVEL SECURITY;

-- ÉTAPE 4 : Créer UNE politique d'insertion SIMPLE (sans spécifier de rôle = pour tous)
CREATE POLICY "allow_insert_all"
  ON public.membership_requests
  FOR INSERT
  WITH CHECK (true);

-- ÉTAPE 5 : Créer une politique de lecture pour les authentifiés
CREATE POLICY "allow_select_authenticated"
  ON public.membership_requests
  FOR SELECT
  TO authenticated
  USING (true);

-- ÉTAPE 6 : Créer une politique de mise à jour pour les authentifiés
CREATE POLICY "allow_update_authenticated"
  ON public.membership_requests
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ÉTAPE 7 : Vérifier les politiques créées
SELECT 
  'Politiques créées:' as info,
  policyname,
  cmd as operation,
  roles,
  with_check
FROM pg_policies 
WHERE tablename = 'membership_requests'
ORDER BY policyname;

-- ÉTAPE 8 : Test d'insertion simple (sans SET ROLE)
INSERT INTO public.membership_requests (
  full_name,
  profession_company,
  email,
  message,
  status
) VALUES (
  'Test après correction RLS',
  'Test Company',
  'test-rls-fix@test.com',
  'Test après correction des politiques RLS',
  'pending'
) RETURNING id, full_name, email, created_at;








