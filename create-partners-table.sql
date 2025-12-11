-- ============================================
-- CRÉER LA TABLE PARTNERS POUR ELITE CONNECT
-- ============================================
-- Ce script crée la table partners pour stocker les informations des partenaires
-- Exécutez ce script dans l'éditeur SQL de Supabase

-- 1. Créer la table partners
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

-- 2. Créer les index pour améliorer les performances
CREATE INDEX IF NOT EXISTS partners_category_idx ON public.partners(category);
CREATE INDEX IF NOT EXISTS partners_is_active_idx ON public.partners(is_active);
CREATE INDEX IF NOT EXISTS partners_display_order_idx ON public.partners(display_order);

-- 3. Activer Row Level Security (RLS)
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;

-- 4. Politique : Tout le monde peut voir les partenaires actifs (même non authentifié)
CREATE POLICY "Anyone can view active partners"
  ON public.partners FOR SELECT
  TO public
  USING (is_active = true);

-- 5. Politique : Seuls les admins peuvent voir tous les partenaires (y compris inactifs)
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

-- 6. Politique : Seuls les admins peuvent créer des partenaires
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

-- 7. Politique : Seuls les admins peuvent modifier des partenaires
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

-- 8. Politique : Seuls les admins peuvent supprimer des partenaires
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

-- 9. Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION public.update_partners_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 10. Trigger pour updated_at
CREATE TRIGGER update_partners_updated_at
  BEFORE UPDATE ON public.partners
  FOR EACH ROW
  EXECUTE FUNCTION public.update_partners_updated_at();

-- ============================================
-- NOTES
-- ============================================
-- Catégories disponibles :
-- - 'strategic' : Partenaires Stratégiques
-- - 'technology' : Partenaires Technologiques
-- - 'brands' : Marques & Collaborations
-- - 'other' : Autres






