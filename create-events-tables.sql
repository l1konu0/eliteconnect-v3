-- ============================================
-- SCHÉMA BASE DE DONNÉES - SYSTÈME D'ÉVÉNEMENTS
-- ============================================
-- Exécutez ce script dans SQL Editor de Supabase

-- ============================================
-- TABLE 1: events (Événements)
-- ============================================
CREATE TABLE IF NOT EXISTS public.events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  
  -- Informations de base
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT NOT NULL DEFAULT 'networking', -- networking, private_dining, conference, workshop, etc.
  
  -- Date et heure
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE,
  timezone TEXT DEFAULT 'Africa/Tunis',
  
  -- Localisation
  location_name TEXT NOT NULL,
  location_address TEXT,
  location_city TEXT,
  location_country TEXT DEFAULT 'Tunisia',
  is_online BOOLEAN DEFAULT false,
  online_link TEXT, -- URL pour événements en ligne
  
  -- Gestion des invitations
  visibility TEXT NOT NULL DEFAULT 'private', -- public, private, invite_only
  max_attendees INTEGER,
  has_waitlist BOOLEAN DEFAULT true,
  
  -- Informations supplémentaires
  dress_code TEXT,
  agenda TEXT, -- Programme de l'événement
  special_instructions TEXT,
  cover_image_url TEXT, -- Image de couverture
  
  -- Statut
  status TEXT NOT NULL DEFAULT 'draft', -- draft, published, cancelled, completed
  
  -- Métadonnées
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS events_created_by_idx ON public.events(created_by);
CREATE INDEX IF NOT EXISTS events_start_date_idx ON public.events(start_date);
CREATE INDEX IF NOT EXISTS events_status_idx ON public.events(status);
CREATE INDEX IF NOT EXISTS events_event_type_idx ON public.events(event_type);
CREATE INDEX IF NOT EXISTS events_location_city_idx ON public.events(location_city);

-- ============================================
-- TABLE 2: event_rsvps (Inscriptions aux événements)
-- ============================================
CREATE TABLE IF NOT EXISTS public.event_rsvps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  
  -- Statut de l'inscription
  status TEXT NOT NULL DEFAULT 'pending', -- pending, confirmed, waitlisted, cancelled, attended, no_show
  
  -- Informations additionnelles
  guest_count INTEGER DEFAULT 1, -- Nombre d'invités
  dietary_restrictions TEXT,
  special_requests TEXT,
  
  -- Check-in
  checked_in_at TIMESTAMP WITH TIME ZONE,
  check_in_qr_code TEXT, -- Code QR unique pour le check-in
  
  -- Feedback post-événement
  rating INTEGER, -- 1-5
  feedback TEXT,
  feedback_submitted_at TIMESTAMP WITH TIME ZONE,
  
  -- Métadonnées
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  
  -- Contrainte unique : un utilisateur ne peut s'inscrire qu'une fois par événement
  UNIQUE(event_id, user_id)
);

-- Index
CREATE INDEX IF NOT EXISTS event_rsvps_event_id_idx ON public.event_rsvps(event_id);
CREATE INDEX IF NOT EXISTS event_rsvps_user_id_idx ON public.event_rsvps(user_id);
CREATE INDEX IF NOT EXISTS event_rsvps_status_idx ON public.event_rsvps(status);
CREATE INDEX IF NOT EXISTS event_rsvps_check_in_qr_code_idx ON public.event_rsvps(check_in_qr_code);

-- ============================================
-- TABLE 3: event_photos (Galerie photos)
-- ============================================
CREATE TABLE IF NOT EXISTS public.event_photos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  
  photo_url TEXT NOT NULL,
  caption TEXT,
  display_order INTEGER DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Index
CREATE INDEX IF NOT EXISTS event_photos_event_id_idx ON public.event_photos(event_id);
CREATE INDEX IF NOT EXISTS event_photos_uploaded_by_idx ON public.event_photos(uploaded_by);

-- ============================================
-- TABLE 4: event_invitations (Invitations personnalisées)
-- ============================================
CREATE TABLE IF NOT EXISTS public.event_invitations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  invited_by UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  invited_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  invited_email TEXT, -- Pour inviter des non-membres
  
  -- Statut
  status TEXT NOT NULL DEFAULT 'pending', -- pending, accepted, declined
  invitation_token TEXT UNIQUE, -- Token unique pour les invitations par email
  
  -- Métadonnées
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  responded_at TIMESTAMP WITH TIME ZONE
);

-- Index
CREATE INDEX IF NOT EXISTS event_invitations_event_id_idx ON public.event_invitations(event_id);
CREATE INDEX IF NOT EXISTS event_invitations_invited_user_id_idx ON public.event_invitations(invited_user_id);
CREATE INDEX IF NOT EXISTS event_invitations_invitation_token_idx ON public.event_invitations(invitation_token);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Activer RLS sur toutes les tables
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_invitations ENABLE ROW LEVEL SECURITY;

-- ============================================
-- POLITIQUES RLS - events
-- ============================================

-- Tous les utilisateurs authentifiés peuvent voir les événements publiés
CREATE POLICY "Anyone can view published events"
  ON public.events FOR SELECT
  TO authenticated
  USING (status = 'published' OR created_by = auth.uid());

-- Les utilisateurs authentifiés peuvent créer des événements
CREATE POLICY "Authenticated users can create events"
  ON public.events FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

-- Les créateurs peuvent modifier leurs événements
CREATE POLICY "Creators can update their events"
  ON public.events FOR UPDATE
  TO authenticated
  USING (created_by = auth.uid())
  WITH CHECK (created_by = auth.uid());

-- Les créateurs peuvent supprimer leurs événements
CREATE POLICY "Creators can delete their events"
  ON public.events FOR DELETE
  TO authenticated
  USING (created_by = auth.uid());

-- ============================================
-- POLITIQUES RLS - event_rsvps
-- ============================================

-- Tous les utilisateurs authentifiés peuvent voir les RSVPs des événements publiés
CREATE POLICY "Anyone can view RSVPs for published events"
  ON public.event_rsvps FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.events
      WHERE events.id = event_rsvps.event_id
      AND (events.status = 'published' OR events.created_by = auth.uid())
    )
  );

-- Les utilisateurs peuvent créer leurs propres RSVPs
CREATE POLICY "Users can create their own RSVPs"
  ON public.event_rsvps FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Les utilisateurs peuvent modifier leurs propres RSVPs
CREATE POLICY "Users can update their own RSVPs"
  ON public.event_rsvps FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Les créateurs d'événements peuvent modifier les RSVPs (pour le check-in)
CREATE POLICY "Event creators can update RSVPs for check-in"
  ON public.event_rsvps FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.events
      WHERE events.id = event_rsvps.event_id
      AND events.created_by = auth.uid()
    )
  );

-- ============================================
-- POLITIQUES RLS - event_photos
-- ============================================

-- Tous les utilisateurs authentifiés peuvent voir les photos des événements publiés
CREATE POLICY "Anyone can view photos for published events"
  ON public.event_photos FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.events
      WHERE events.id = event_photos.event_id
      AND events.status = 'published'
    )
  );

-- Les utilisateurs authentifiés peuvent uploader des photos
CREATE POLICY "Authenticated users can upload photos"
  ON public.event_photos FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = uploaded_by);

-- Les uploaders peuvent supprimer leurs photos
CREATE POLICY "Uploaders can delete their photos"
  ON public.event_photos FOR DELETE
  TO authenticated
  USING (uploaded_by = auth.uid());

-- ============================================
-- POLITIQUES RLS - event_invitations
-- ============================================

-- Les utilisateurs peuvent voir leurs invitations
CREATE POLICY "Users can view their invitations"
  ON public.event_invitations FOR SELECT
  TO authenticated
  USING (invited_user_id = auth.uid() OR invited_by = auth.uid());

-- Les créateurs d'événements peuvent créer des invitations
CREATE POLICY "Event creators can create invitations"
  ON public.event_invitations FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.events
      WHERE events.id = event_invitations.event_id
      AND events.created_by = auth.uid()
    )
    AND invited_by = auth.uid()
  );

-- Les utilisateurs peuvent accepter/refuser leurs invitations
CREATE POLICY "Users can update their invitations"
  ON public.event_invitations FOR UPDATE
  TO authenticated
  USING (invited_user_id = auth.uid())
  WITH CHECK (invited_user_id = auth.uid());

-- ============================================
-- TRIGGERS - Mise à jour automatique de updated_at
-- ============================================

-- Fonction pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers pour events
CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Triggers pour event_rsvps
CREATE TRIGGER update_event_rsvps_updated_at
  BEFORE UPDATE ON public.event_rsvps
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- FONCTIONS UTILITAIRES
-- ============================================

-- Fonction pour générer un code QR unique pour le check-in
CREATE OR REPLACE FUNCTION generate_check_in_qr_code()
RETURNS TEXT AS $$
BEGIN
  RETURN 'EC-' || gen_random_uuid()::TEXT;
END;
$$ LANGUAGE plpgsql;

-- Fonction pour obtenir le nombre de participants confirmés
CREATE OR REPLACE FUNCTION get_event_confirmed_count(event_uuid UUID)
RETURNS INTEGER AS $$
BEGIN
  RETURN (
    SELECT COUNT(*)
    FROM public.event_rsvps
    WHERE event_id = event_uuid
    AND status = 'confirmed'
  );
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- VÉRIFICATION
-- ============================================

SELECT 'Tables créées avec succès!' as status;
SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename IN ('events', 'event_rsvps', 'event_photos', 'event_invitations');




