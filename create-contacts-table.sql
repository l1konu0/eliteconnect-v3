-- ============================================
-- CRÉER LA TABLE CONTACTS - VERSION SIMPLIFIÉE
-- ============================================
-- Copiez-collez ce script dans l'éditeur SQL de Supabase
-- Dashboard > SQL Editor > New Query

-- 1. Créer la table contacts
CREATE TABLE IF NOT EXISTS public.contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT,
  phone_number TEXT,
  job_title TEXT,
  company TEXT,
  profile_picture_url TEXT,
  bio TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  website_url TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Créer les index pour améliorer les performances
CREATE INDEX IF NOT EXISTS contacts_user_id_idx ON public.contacts(user_id);
CREATE INDEX IF NOT EXISTS contacts_created_at_idx ON public.contacts(created_at DESC);

-- 3. Activer Row Level Security (RLS)
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- 4. Supprimer les politiques existantes si elles existent (pour éviter les erreurs)
DROP POLICY IF EXISTS "Anyone can view all contacts" ON public.contacts;
DROP POLICY IF EXISTS "Users can create own contacts" ON public.contacts;
DROP POLICY IF EXISTS "Users can update own contacts" ON public.contacts;
DROP POLICY IF EXISTS "Users can delete own contacts" ON public.contacts;

-- 5. Politique : Tous les utilisateurs authentifiés peuvent voir tous les contacts
CREATE POLICY "Anyone can view all contacts"
  ON public.contacts FOR SELECT
  TO authenticated
  USING (true);

-- 6. Politique : Les utilisateurs peuvent créer leurs propres contacts
CREATE POLICY "Users can create own contacts"
  ON public.contacts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- 7. Politique : Les utilisateurs peuvent modifier leurs propres contacts
CREATE POLICY "Users can update own contacts"
  ON public.contacts FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 8. Politique : Les utilisateurs peuvent supprimer leurs propres contacts
CREATE POLICY "Users can delete own contacts"
  ON public.contacts FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- 9. Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 10. Déclencher la mise à jour automatique de updated_at
DROP TRIGGER IF EXISTS update_contacts_updated_at ON public.contacts;
CREATE TRIGGER update_contacts_updated_at
  BEFORE UPDATE ON public.contacts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- VÉRIFICATION
-- ============================================
-- Pour vérifier que la table a été créée, exécutez :
-- SELECT * FROM public.contacts LIMIT 1;

