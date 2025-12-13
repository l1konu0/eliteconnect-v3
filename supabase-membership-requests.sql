-- ============================================
-- TABLE POUR LES DEMANDES D'ADHÉSION
-- ============================================
-- Créez cette table dans Supabase pour stocker les demandes d'invitation

CREATE TABLE IF NOT EXISTS public.membership_requests (
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

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS membership_requests_status_idx ON public.membership_requests(status);
CREATE INDEX IF NOT EXISTS membership_requests_created_at_idx ON public.membership_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS membership_requests_email_idx ON public.membership_requests(email);

-- Activer Row Level Security
ALTER TABLE public.membership_requests ENABLE ROW LEVEL SECURITY;

-- Politique : N'importe qui peut créer une demande (pas besoin d'être authentifié)
CREATE POLICY "Anyone can create membership request"
  ON public.membership_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Politique : Seuls les administrateurs peuvent voir toutes les demandes
-- (Pour l'instant, on permet à tous les utilisateurs authentifiés de voir)
-- Vous pouvez restreindre cela plus tard avec des rôles
CREATE POLICY "Authenticated users can view all requests"
  ON public.membership_requests FOR SELECT
  TO authenticated
  USING (true);

-- Politique : Seuls les administrateurs peuvent modifier les demandes
-- (Pour l'instant, on permet à tous les utilisateurs authentifiés)
-- Vous pouvez restreindre cela plus tard avec des rôles
CREATE POLICY "Authenticated users can update requests"
  ON public.membership_requests FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Fonction pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION public.update_membership_requests_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour updated_at
DROP TRIGGER IF EXISTS update_membership_requests_updated_at ON public.membership_requests;
CREATE TRIGGER update_membership_requests_updated_at
  BEFORE UPDATE ON public.membership_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_membership_requests_updated_at();









