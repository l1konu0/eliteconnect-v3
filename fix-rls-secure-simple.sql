-- ============================================
-- SOLUTION SÉCURISÉE : RLS avec politique simple
-- ============================================
-- Cette solution permet l'insertion pour tous mais bloque la lecture
-- C'est le meilleur compromis sécurité/fonctionnalité

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

-- ÉTAPE 2 : Activer RLS
ALTER TABLE public.membership_requests ENABLE ROW LEVEL SECURITY;

-- ÉTAPE 3 : Politique d'insertion - PERMET À TOUS d'insérer
-- (Visiteurs anonymes ET utilisateurs authentifiés)
CREATE POLICY "insert_for_everyone"
  ON public.membership_requests
  FOR INSERT
  WITH CHECK (true);

-- ÉTAPE 4 : Politique de lecture - BLOQUE les visiteurs anonymes
-- Seuls les utilisateurs authentifiés (admins) peuvent lire
CREATE POLICY "select_for_authenticated_only"
  ON public.membership_requests
  FOR SELECT
  TO authenticated
  USING (true);

-- ÉTAPE 5 : Politique de mise à jour - Seulement pour les authentifiés
CREATE POLICY "update_for_authenticated_only"
  ON public.membership_requests
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ÉTAPE 6 : Vérifier les politiques
SELECT '=== POLITIQUES CRÉÉES ===' as info;
SELECT 
  policyname,
  cmd as operation,
  roles,
  with_check
FROM pg_policies 
WHERE tablename = 'membership_requests'
ORDER BY policyname;

-- ÉTAPE 7 : Test
-- Cette insertion devrait fonctionner depuis l'application (rôle anon)
-- Mais la lecture depuis l'application (rôle anon) sera bloquée
-- Seuls les admins authentifiés peuvent lire









