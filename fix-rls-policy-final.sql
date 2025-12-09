-- ============================================
-- CORRIGER LES POLITIQUES RLS - VERSION FINALE
-- ============================================
-- Ce script corrige le problème "new row violates row-level security policy"
-- Exécutez-le dans SQL Editor de Supabase

-- ÉTAPE 1 : Supprimer TOUTES les politiques existantes
DROP POLICY IF EXISTS "Anyone can create membership request" ON public.membership_requests;
DROP POLICY IF EXISTS "Authenticated users can view all requests" ON public.membership_requests;
DROP POLICY IF EXISTS "Authenticated users can update requests" ON public.membership_requests;
DROP POLICY IF EXISTS "Users can create own contacts" ON public.membership_requests;

-- ÉTAPE 2 : Désactiver temporairement RLS pour tester (optionnel, pour debug)
-- ALTER TABLE public.membership_requests DISABLE ROW LEVEL SECURITY;

-- ÉTAPE 3 : Recréer la politique d'insertion (CRITIQUE : doit permettre anon)
-- Cette politique permet à TOUS (même non connectés) de créer une demande
CREATE POLICY "Anyone can create membership request"
  ON public.membership_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- ÉTAPE 4 : Politique pour voir les demandes (utilisateurs authentifiés)
CREATE POLICY "Authenticated users can view all requests"
  ON public.membership_requests FOR SELECT
  TO authenticated
  USING (true);

-- ÉTAPE 5 : Politique pour modifier (utilisateurs authentifiés)
CREATE POLICY "Authenticated users can update requests"
  ON public.membership_requests FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ÉTAPE 6 : Vérifier les politiques créées
SELECT 
  policyname,
  cmd,
  roles,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'membership_requests';

-- ÉTAPE 7 : Test d'insertion (devrait fonctionner maintenant)
INSERT INTO public.membership_requests (
  full_name,
  profession_company,
  email,
  message,
  status
) VALUES (
  'Test après correction RLS',
  'Test Company',
  'test-rls@test.com',
  'Test après correction des politiques',
  'pending'
) RETURNING *;

-- ÉTAPE 8 : Vérifier que ça a fonctionné
SELECT * FROM public.membership_requests ORDER BY created_at DESC LIMIT 5;




