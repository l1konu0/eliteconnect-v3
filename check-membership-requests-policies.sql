-- ============================================
-- VÉRIFIER ET CORRIGER LES POLITIQUES RLS
-- ============================================
-- Exécutez ce script si les demandes ne s'enregistrent pas

-- 1. Vérifier les politiques existantes
SELECT * FROM pg_policies WHERE tablename = 'membership_requests';

-- 2. Supprimer les politiques existantes (si nécessaire)
DROP POLICY IF EXISTS "Anyone can create membership request" ON public.membership_requests;
DROP POLICY IF EXISTS "Authenticated users can view all requests" ON public.membership_requests;
DROP POLICY IF EXISTS "Authenticated users can update requests" ON public.membership_requests;

-- 3. Recréer les politiques correctement
-- IMPORTANT : Cette politique permet à TOUS (même non authentifiés) de créer une demande
CREATE POLICY "Anyone can create membership request"
  ON public.membership_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- 4. Politique pour voir les demandes (utilisateurs authentifiés)
CREATE POLICY "Authenticated users can view all requests"
  ON public.membership_requests FOR SELECT
  TO authenticated
  USING (true);

-- 5. Politique pour modifier les demandes (utilisateurs authentifiés)
CREATE POLICY "Authenticated users can update requests"
  ON public.membership_requests FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 6. Test d'insertion directe
INSERT INTO public.membership_requests (
  full_name,
  profession_company,
  email,
  message,
  status
) VALUES (
  'Test Direct',
  'Test Company',
  'test@test.com',
  'Test depuis SQL Editor',
  'pending'
);

-- 7. Vérifier que l'insertion a fonctionné
SELECT * FROM public.membership_requests ORDER BY created_at DESC LIMIT 5;








