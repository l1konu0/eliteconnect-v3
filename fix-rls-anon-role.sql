-- ============================================
-- CORRECTION RLS POUR LE RÔLE ANON
-- ============================================
-- Le problème : SQL Editor fonctionne (admin) mais l'app ne fonctionne pas (anon)
-- Solution : Permettre explicitement l'insertion pour le rôle 'anon'

-- ÉTAPE 1 : Voir les politiques actuelles
SELECT 
  policyname,
  cmd as operation,
  roles,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'membership_requests';

-- ÉTAPE 2 : Supprimer TOUTES les politiques existantes
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

-- ÉTAPE 4 : Créer la politique d'insertion pour ANON (CRITIQUE)
-- Cette politique permet aux utilisateurs NON authentifiés d'insérer
CREATE POLICY "anon_insert_policy"
  ON public.membership_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- ÉTAPE 5 : Créer la politique d'insertion pour AUTHENTICATED
CREATE POLICY "authenticated_insert_policy"
  ON public.membership_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- ÉTAPE 6 : Politique de lecture pour les utilisateurs authentifiés
CREATE POLICY "authenticated_select_policy"
  ON public.membership_requests
  FOR SELECT
  TO authenticated
  USING (true);

-- ÉTAPE 7 : Politique de mise à jour pour les utilisateurs authentifiés
CREATE POLICY "authenticated_update_policy"
  ON public.membership_requests
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ÉTAPE 8 : Vérifier les nouvelles politiques
SELECT 
  policyname,
  cmd as operation,
  roles,
  with_check
FROM pg_policies 
WHERE tablename = 'membership_requests'
ORDER BY policyname;

-- ÉTAPE 9 : Vérifier que la table accepte les insertions depuis anon
-- (Ce test simule ce que fait l'application)
SET ROLE anon;
INSERT INTO public.membership_requests (
  full_name,
  profession_company,
  email,
  message,
  status
) VALUES (
  'Test depuis rôle ANON',
  'Test Company ANON',
  'test-anon@test.com',
  'Test avec le rôle anon (comme l application)',
  'pending'
) RETURNING id, full_name, email, created_at;
RESET ROLE;

-- ÉTAPE 10 : Vérifier que ça a fonctionné
SELECT COUNT(*) as total_demandes FROM public.membership_requests;
SELECT * FROM public.membership_requests ORDER BY created_at DESC LIMIT 3;









