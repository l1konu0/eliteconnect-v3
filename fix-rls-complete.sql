-- ============================================
-- CORRECTION COMPLÈTE RLS - VERSION FINALE
-- ============================================
-- Ce script résout définitivement le problème RLS

-- ÉTAPE 1 : Voir l'état actuel
SELECT 'État actuel des politiques:' as info;
SELECT policyname, cmd, roles FROM pg_policies WHERE tablename = 'membership_requests';

-- ÉTAPE 2 : Supprimer TOUTES les politiques (méthode complète)
DROP POLICY IF EXISTS "anon_insert_policy" ON public.membership_requests;
DROP POLICY IF EXISTS "authenticated_insert_policy" ON public.membership_requests;
DROP POLICY IF EXISTS "authenticated_select_policy" ON public.membership_requests;
DROP POLICY IF EXISTS "authenticated_update_policy" ON public.membership_requests;
DROP POLICY IF EXISTS "Allow insert for everyone" ON public.membership_requests;
DROP POLICY IF EXISTS "Anyone can create membership request" ON public.membership_requests;
DROP POLICY IF EXISTS "Allow select for authenticated" ON public.membership_requests;
DROP POLICY IF EXISTS "Allow update for authenticated" ON public.membership_requests;

-- Supprimer toutes les autres politiques qui pourraient exister
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

-- ÉTAPE 4 : Créer UNE SEULE politique d'insertion pour TOUS (anon + authenticated)
-- Syntaxe la plus simple possible
CREATE POLICY "insert_for_all"
  ON public.membership_requests
  FOR INSERT
  WITH CHECK (true);

-- ÉTAPE 5 : Politique de lecture pour les authentifiés
CREATE POLICY "select_for_authenticated"
  ON public.membership_requests
  FOR SELECT
  TO authenticated
  USING (true);

-- ÉTAPE 6 : Politique de mise à jour pour les authentifiés
CREATE POLICY "update_for_authenticated"
  ON public.membership_requests
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ÉTAPE 7 : Vérifier les politiques créées
SELECT 'Politiques après correction:' as info;
SELECT 
  policyname,
  cmd as operation,
  roles,
  with_check
FROM pg_policies 
WHERE tablename = 'membership_requests'
ORDER BY policyname;

-- ÉTAPE 8 : Test d'insertion avec le rôle anon (simule l'application)
-- Note: Cette partie peut échouer dans SQL Editor mais c'est normal
-- L'important est que la politique soit créée
SELECT 'Test d insertion (peut échouer dans SQL Editor, c est normal):' as info;




