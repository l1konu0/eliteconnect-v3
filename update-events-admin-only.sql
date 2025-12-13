-- ============================================
-- RESTREINDRE LA CRÉATION D'ÉVÉNEMENTS AUX ADMINS
-- ============================================

-- ÉTAPE 1 : Ajouter un champ is_admin à la table profiles (si pas déjà fait)
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false;

-- ÉTAPE 2 : Créer un index pour améliorer les performances
CREATE INDEX IF NOT EXISTS profiles_is_admin_idx ON public.profiles(is_admin);

-- ÉTAPE 3 : Supprimer l'ancienne politique qui permettait à tous de créer
DROP POLICY IF EXISTS "Authenticated users can create events" ON public.events;

-- ÉTAPE 4 : Créer une nouvelle politique qui permet SEULEMENT aux admins de créer
CREATE POLICY "Only admins can create events"
  ON public.events FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

-- ÉTAPE 5 : Vérifier les politiques
SELECT 
  policyname,
  cmd as operation,
  with_check
FROM pg_policies 
WHERE tablename = 'events'
ORDER BY policyname;

-- ============================================
-- POUR DÉFINIR UN UTILISATEUR COMME ADMIN :
-- ============================================
-- Exécutez cette requête en remplaçant 'USER_EMAIL' par l'email de l'admin :
--
-- UPDATE public.profiles
-- SET is_admin = true
-- WHERE id IN (
--   SELECT id FROM auth.users WHERE email = 'USER_EMAIL'
-- );
--
-- OU pour définir par ID utilisateur :
--
-- UPDATE public.profiles
-- SET is_admin = true
-- WHERE id = 'USER_UUID_HERE';









