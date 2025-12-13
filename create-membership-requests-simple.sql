-- ============================================
-- CRÉER LA TABLE MEMBERSHIP_REQUESTS - VERSION SIMPLE
-- ============================================
-- Copiez TOUT ce script et exécutez-le dans Supabase SQL Editor

-- Étape 1 : Créer la table
CREATE TABLE public.membership_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  profession_company TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'approved', 'rejected')),
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Étape 2 : Créer les index
CREATE INDEX membership_requests_status_idx ON public.membership_requests(status);
CREATE INDEX membership_requests_created_at_idx ON public.membership_requests(created_at DESC);
CREATE INDEX membership_requests_email_idx ON public.membership_requests(email);

-- Étape 3 : Activer la sécurité
ALTER TABLE public.membership_requests ENABLE ROW LEVEL SECURITY;

-- Étape 4 : Politique - N'importe qui peut créer une demande
CREATE POLICY "Anyone can create membership request"
  ON public.membership_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Étape 5 : Politique - Les utilisateurs authentifiés peuvent voir toutes les demandes
CREATE POLICY "Authenticated users can view all requests"
  ON public.membership_requests FOR SELECT
  TO authenticated
  USING (true);

-- Étape 6 : Politique - Les utilisateurs authentifiés peuvent modifier les demandes
CREATE POLICY "Authenticated users can update requests"
  ON public.membership_requests FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Étape 7 : Fonction pour updated_at
CREATE OR REPLACE FUNCTION public.update_membership_requests_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Étape 8 : Trigger pour updated_at
CREATE TRIGGER update_membership_requests_updated_at
  BEFORE UPDATE ON public.membership_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_membership_requests_updated_at();









