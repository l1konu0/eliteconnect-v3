-- ============================================
-- CORRECTION SIMPLE DES POLITIQUES RLS
-- ============================================
-- Exécutez ce script COMPLET dans SQL Editor

-- 1. Supprimer TOUTES les politiques
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'membership_requests') 
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON public.membership_requests';
    END LOOP;
END $$;

-- 2. Vérifier que RLS est activé
ALTER TABLE public.membership_requests ENABLE ROW LEVEL SECURITY;

-- 3. Créer la politique d'insertion (CRITIQUE : anon ET authenticated)
CREATE POLICY "Allow insert for everyone"
  ON public.membership_requests
  FOR INSERT
  TO anon, authenticated, public
  WITH CHECK (true);

-- 4. Créer la politique de lecture (pour les utilisateurs authentifiés)
CREATE POLICY "Allow select for authenticated"
  ON public.membership_requests
  FOR SELECT
  TO authenticated
  USING (true);

-- 5. Créer la politique de mise à jour (pour les utilisateurs authentifiés)
CREATE POLICY "Allow update for authenticated"
  ON public.membership_requests
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 6. Vérifier les politiques créées
SELECT 
  policyname,
  cmd as operation,
  roles,
  with_check
FROM pg_policies 
WHERE tablename = 'membership_requests'
ORDER BY policyname;

-- 7. TEST : Insérer une demande de test
INSERT INTO public.membership_requests (
  full_name,
  profession_company,
  email,
  message,
  status
) VALUES (
  'Test Final RLS',
  'Test Company Final',
  'test-final@test.com',
  'Test après correction finale des politiques RLS',
  'pending'
) RETURNING id, full_name, email, created_at;

-- 8. Vérifier que l'insertion a fonctionné
SELECT COUNT(*) as total_demandes FROM public.membership_requests;









