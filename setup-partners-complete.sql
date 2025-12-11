-- ============================================
-- CONFIGURATION COMPLÈTE DES PARTENAIRES
-- ============================================
-- Exécutez ce script ENTIER dans SQL Editor de Supabase
-- Il crée la table ET insère les partenaires existants

-- ============================================
-- ÉTAPE 1 : CRÉER LA TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS public.partners (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- 'strategic', 'technology', 'brands', 'other'
  logo_url TEXT, -- URL de l'image dans Supabase Storage
  website_url TEXT,
  description TEXT,
  display_order INTEGER DEFAULT 0, -- Pour ordonner l'affichage
  is_active BOOLEAN DEFAULT true, -- Pour activer/désactiver un partenaire
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS partners_category_idx ON public.partners(category);
CREATE INDEX IF NOT EXISTS partners_is_active_idx ON public.partners(is_active);
CREATE INDEX IF NOT EXISTS partners_display_order_idx ON public.partners(display_order);

-- Activer Row Level Security (RLS)
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;

-- Politique : Tout le monde peut voir les partenaires actifs (même non authentifié)
DROP POLICY IF EXISTS "Anyone can view active partners" ON public.partners;
CREATE POLICY "Anyone can view active partners"
  ON public.partners FOR SELECT
  TO public
  USING (is_active = true);

-- Politique : Seuls les admins peuvent voir tous les partenaires (y compris inactifs)
DROP POLICY IF EXISTS "Admins can view all partners" ON public.partners;
CREATE POLICY "Admins can view all partners"
  ON public.partners FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

-- Politique : Seuls les admins peuvent créer des partenaires
DROP POLICY IF EXISTS "Only admins can create partners" ON public.partners;
CREATE POLICY "Only admins can create partners"
  ON public.partners FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

-- Politique : Seuls les admins peuvent modifier des partenaires
DROP POLICY IF EXISTS "Only admins can update partners" ON public.partners;
CREATE POLICY "Only admins can update partners"
  ON public.partners FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

-- Politique : Seuls les admins peuvent supprimer des partenaires
DROP POLICY IF EXISTS "Only admins can delete partners" ON public.partners;
CREATE POLICY "Only admins can delete partners"
  ON public.partners FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

-- Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION public.update_partners_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour updated_at
DROP TRIGGER IF EXISTS update_partners_updated_at ON public.partners;
CREATE TRIGGER update_partners_updated_at
  BEFORE UPDATE ON public.partners
  FOR EACH ROW
  EXECUTE FUNCTION public.update_partners_updated_at();

-- ============================================
-- ÉTAPE 2 : INSÉRER LES PARTENAIRES EXISTANTS
-- ============================================

-- Partenaires Stratégiques
INSERT INTO public.partners (name, category, logo_url, website_url, description, display_order, is_active)
SELECT * FROM (VALUES
  ('Partner Name 1', 'strategic', NULL, NULL, NULL, 1, true),
  ('Partner Name 2', 'strategic', NULL, NULL, NULL, 2, true),
  ('Partner Name 3', 'strategic', NULL, NULL, NULL, 3, true),
  ('Partner Name 4', 'strategic', NULL, NULL, NULL, 4, true)
) AS v(name, category, logo_url, website_url, description, display_order, is_active)
WHERE NOT EXISTS (
  SELECT 1 FROM public.partners 
  WHERE partners.name = v.name AND partners.category = v.category
);

-- Partenaires Technologiques
INSERT INTO public.partners (name, category, logo_url, website_url, description, display_order, is_active)
SELECT * FROM (VALUES
  ('Tech Partner 1', 'technology', NULL, NULL, NULL, 1, true),
  ('Tech Partner 2', 'technology', NULL, NULL, NULL, 2, true),
  ('Tech Partner 3', 'technology', NULL, NULL, NULL, 3, true),
  ('Tech Partner 4', 'technology', NULL, NULL, NULL, 4, true),
  ('Tech Partner 5', 'technology', NULL, NULL, NULL, 5, true),
  ('Tech Partner 6', 'technology', NULL, NULL, NULL, 6, true)
) AS v(name, category, logo_url, website_url, description, display_order, is_active)
WHERE NOT EXISTS (
  SELECT 1 FROM public.partners 
  WHERE partners.name = v.name AND partners.category = v.category
);

-- Marques & Collaborations
INSERT INTO public.partners (name, category, logo_url, website_url, description, display_order, is_active)
SELECT * FROM (VALUES
  ('Brand 1', 'brands', NULL, NULL, NULL, 1, true),
  ('Brand 2', 'brands', NULL, NULL, NULL, 2, true),
  ('Brand 3', 'brands', NULL, NULL, NULL, 3, true),
  ('Brand 4', 'brands', NULL, NULL, NULL, 4, true)
) AS v(name, category, logo_url, website_url, description, display_order, is_active)
WHERE NOT EXISTS (
  SELECT 1 FROM public.partners 
  WHERE partners.name = v.name AND partners.category = v.category
);

-- ============================================
-- ÉTAPE 3 : VÉRIFICATION
-- ============================================

-- Vérifier que les partenaires ont été insérés
SELECT 
  id,
  name,
  category,
  logo_url,
  website_url,
  is_active,
  display_order
FROM public.partners
ORDER BY category, display_order;

-- Vous devriez voir 14 partenaires au total ✅






