-- ============================================
-- CORRIGER LES POLITIQUES RLS POUR MEMBERSHIP_REQUESTS
-- ============================================
-- Exécutez ce script dans SQL Editor de Supabase

-- 1. Supprimer toutes les politiques existantes
DROP POLICY IF EXISTS "Anyone can create membership request" ON public.membership_requests;
DROP POLICY IF EXISTS "Authenticated users can view all requests" ON public.membership_requests;
DROP POLICY IF EXISTS "Authenticated users can update requests" ON public.membership_requests;
DROP POLICY IF EXISTS "Users can create own contacts" ON public.membership_requests;

-- 2. Recréer la politique d'insertion (IMPORTANT : permet aux utilisateurs non authentifiés)
CREATE POLICY "Anyone can create membership request"
  ON public.membership_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- 3. Politique pour voir les demandes
CREATE POLICY "Authenticated users can view all requests"
  ON public.membership_requests FOR SELECT
  TO authenticated
  USING (true);

-- 4. Politique pour modifier les demandes
CREATE POLICY "Authenticated users can update requests"
  ON public.membership_requests FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 5. Test d'insertion
INSERT INTO public.membership_requests (
  full_name,
  profession_company,
  email,
  message,
  status
) VALUES (
  'Test depuis SQL',
  'Test Company',
  'test@example.com',
  'Test de vérification des politiques',
  'pending'
) RETURNING *;

-- 6. Vérifier les résultats
SELECT * FROM public.membership_requests ORDER BY created_at DESC LIMIT 10;








