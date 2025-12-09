-- ============================================
-- INSÉRER LES PARTENAIRES EXISTANTS DANS LA BASE DE DONNÉES
-- ============================================
-- Ce script insère les partenaires qui étaient en dur dans le code
-- Exécutez ce script dans SQL Editor de Supabase APRÈS avoir créé la table

-- IMPORTANT : Exécutez d'abord create-partners-table.sql si vous ne l'avez pas encore fait

-- Partenaires Stratégiques
-- On insère seulement si le partenaire n'existe pas déjà
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

-- ============================================
-- NOTES
-- ============================================
-- Les partenaires sont maintenant dans la base de données
-- Vous pouvez les modifier depuis /portal/partners/manage
-- - Ajouter des logos (upload)
-- - Ajouter des sites web
-- - Ajouter des descriptions
-- - Modifier les noms
-- - Activer/désactiver

