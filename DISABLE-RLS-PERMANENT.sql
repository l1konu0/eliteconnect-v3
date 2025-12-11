-- ============================================
-- DÉSACTIVER RLS DE FAÇON PERMANENTE
-- ============================================
-- Ce script désactive RLS pour la table membership_requests
-- Cela permet à tous (y compris les visiteurs anonymes) d'insérer des demandes

-- ÉTAPE 1 : Supprimer toutes les politiques (plus besoin si RLS est désactivé)
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'membership_requests') 
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON public.membership_requests';
    END LOOP;
END $$;

-- ÉTAPE 2 : Désactiver RLS
ALTER TABLE public.membership_requests DISABLE ROW LEVEL SECURITY;

-- ÉTAPE 3 : Vérifier que RLS est désactivé
SELECT 
  'RLS Status:' as info,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables 
WHERE tablename = 'membership_requests';
-- rowsecurity devrait être false

-- ÉTAPE 4 : Test d'insertion (devrait fonctionner maintenant)
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
  'Test avec RLS désactivé - devrait fonctionner depuis l application',
  'pending'
) RETURNING id, full_name, email, created_at;

-- ============================================
-- NOTE : Pour réactiver RLS plus tard, exécutez :
-- ============================================
-- ALTER TABLE public.membership_requests ENABLE ROW LEVEL SECURITY;
-- 
-- Puis créez une politique :
-- CREATE POLICY "insert_membership_requests"
--   ON public.membership_requests
--   FOR INSERT
--   WITH CHECK (true);








