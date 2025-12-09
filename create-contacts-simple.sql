-- ============================================
-- CRÉER LA TABLE CONTACTS - VERSION SIMPLE
-- ============================================
-- Copiez TOUT ce script et exécutez-le dans Supabase SQL Editor

-- Étape 1 : Créer la table contacts
CREATE TABLE public.contacts (
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
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Étape 2 : Créer les index
CREATE INDEX contacts_user_id_idx ON public.contacts(user_id);
CREATE INDEX contacts_created_at_idx ON public.contacts(created_at DESC);

-- Étape 3 : Activer la sécurité
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Étape 4 : Créer les politiques de sécurité
CREATE POLICY "Anyone can view all contacts"
  ON public.contacts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create own contacts"
  ON public.contacts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own contacts"
  ON public.contacts FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own contacts"
  ON public.contacts FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Étape 5 : Fonction pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Étape 6 : Trigger pour updated_at
CREATE TRIGGER update_contacts_updated_at
  BEFORE UPDATE ON public.contacts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

