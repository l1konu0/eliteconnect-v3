"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import EliteConnectLogo from "@/components/elite-connect-logo";
import LogoutButton from "@/components/logout-button";

export default function CreateEventPage() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    event_type: "networking",
    start_date: "",
    start_time: "",
    end_date: "",
    end_time: "",
    location_name: "",
    location_address: "",
    location_city: "",
    location_country: "Tunisia",
    is_online: false,
    online_link: "",
    visibility: "private",
    max_attendees: "",
    has_waitlist: true,
    dress_code: "",
    agenda: "",
    special_instructions: "",
  });

  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [members, setMembers] = useState<Array<{ id: string; full_name: string; email: string; profile_picture_url: string | null }>>([]);
  const [memberSearch, setMemberSearch] = useState("");
  const [showMemberSelector, setShowMemberSelector] = useState(false);

  // Vérifier si l'utilisateur est admin et charger les membres
  useEffect(() => {
    checkAdminStatus();
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      const { data: profiles, error } = await supabase
        .from("profiles")
        .select("id, full_name, profile_picture_url")
        .eq("profile_completed", true)
        .order("full_name", { ascending: true });

      if (error) throw error;

      if (profiles) {
        setMembers(
          profiles.map((p) => ({
            id: p.id,
            full_name: p.full_name || "Membre",
            email: "", // Email non nécessaire pour les invitations
            profile_picture_url: p.profile_picture_url,
          }))
        );
      }
    } catch (error: any) {
      console.error("Erreur chargement membres:", error);
    }
  };

  const checkAdminStatus = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", user.id)
        .single();

      if (error) throw error;

      if (!profile?.is_admin) {
        // Rediriger si pas admin
        router.push("/portal");
        return;
      }

      setIsAdmin(true);
    } catch (err: any) {
      console.error("Erreur vérification admin:", err);
      setError("Erreur de vérification des permissions.");
    } finally {
      setChecking(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Récupérer l'utilisateur actuel
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      // Combiner date et heure pour start_date
      const startDateTime = new Date(`${formData.start_date}T${formData.start_time}`);
      const endDateTime = formData.end_date && formData.end_time
        ? new Date(`${formData.end_date}T${formData.end_time}`)
        : null;

      // Préparer les données
      const eventData = {
        created_by: user.id,
        title: formData.title,
        description: formData.description || null,
        event_type: formData.event_type,
        start_date: startDateTime.toISOString(),
        end_date: endDateTime ? endDateTime.toISOString() : null,
        location_name: formData.location_name,
        location_address: formData.location_address || null,
        location_city: formData.location_city || null,
        location_country: formData.location_country,
        is_online: formData.is_online,
        online_link: formData.is_online ? formData.online_link || null : null,
        visibility: formData.visibility,
        max_attendees: formData.max_attendees ? parseInt(formData.max_attendees) : null,
        has_waitlist: formData.has_waitlist,
        dress_code: formData.dress_code || null,
        agenda: formData.agenda || null,
        special_instructions: formData.special_instructions || null,
        status: "published", // Publier directement
      };

      // Insérer l'événement
      const { data: event, error: eventError } = await supabase
        .from("events")
        .insert(eventData)
        .select()
        .single();

      if (eventError) throw eventError;

      // Créer les invitations pour les membres sélectionnés
      if (selectedMembers.length > 0 && event) {
        const invitations = selectedMembers.map((memberId) => ({
          event_id: event.id,
          invited_by: user.id,
          invited_user_id: memberId,
          status: "pending",
        }));

        const { error: inviteError } = await supabase
          .from("event_invitations")
          .insert(invitations);

        if (inviteError) {
          console.error("Erreur création invitations:", inviteError);
          // Ne pas bloquer la création de l'événement si les invitations échouent
        }
      }

      // Rediriger vers la page de détails de l'événement
      router.push(`/portal/events/${event.id}`);
    } catch (err: any) {
      console.error("Erreur:", err);
      setError(err.message || "Une erreur est survenue lors de la création de l'événement.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      {/* Header */}
      <header className="w-full bg-[#F7F5F0] backdrop-blur-md fixed top-0 z-50 border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/portal" className="flex items-center space-x-3">
            <EliteConnectLogo size={40} />
            <span className="text-lg font-semibold tracking-wide">Elite Connect</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link href="/portal">
              <Button variant="outline" className="border-gray-300">
                Retour au portail
              </Button>
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          {checking ? (
            <div className="text-center py-12">
              <p className="text-[#2C2C2C]">Vérification des permissions...</p>
            </div>
          ) : !isAdmin ? (
            <div className="text-center py-12">
              <p className="text-[#2C2C2C] mb-4">Accès refusé. Seuls les administrateurs peuvent créer des événements.</p>
              <Link href="/portal">
                <Button>Retour au portail</Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0A0A0A] mb-4">
                  Créer un Événement
                </h1>
                <p className="text-lg text-[#2C2C2C]">
                  Organisez un événement pour la communauté Elite Connect
                </p>
              </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informations de base */}
            <Card className="border border-gray-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-serif">Informations de base</CardTitle>
                <CardDescription>Détails principaux de l'événement</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Titre de l'événement *</Label>
                  <Input
                    id="title"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Ex: Soirée Networking Elite Connect"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Décrivez votre événement..."
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="event_type">Type d'événement *</Label>
                  <select
                    id="event_type"
                    required
                    value={formData.event_type}
                    onChange={(e) => setFormData({ ...formData, event_type: e.target.value })}
                    className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  >
                    <option value="networking">Networking</option>
                    <option value="private_dining">Private Dining</option>
                    <option value="conference">Conference</option>
                    <option value="workshop">Workshop</option>
                    <option value="retreat">Retreat</option>
                    <option value="roundtable">Business Roundtable</option>
                    <option value="other">Autre</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Date et heure */}
            <Card className="border border-gray-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-serif">Date et heure</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="start_date">Date de début *</Label>
                    <Input
                      id="start_date"
                      type="date"
                      required
                      value={formData.start_date}
                      onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="start_time">Heure de début *</Label>
                    <Input
                      id="start_time"
                      type="time"
                      required
                      value={formData.start_time}
                      onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="end_date">Date de fin (optionnel)</Label>
                    <Input
                      id="end_date"
                      type="date"
                      value={formData.end_date}
                      onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="end_time">Heure de fin (optionnel)</Label>
                    <Input
                      id="end_time"
                      type="time"
                      value={formData.end_time}
                      onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Localisation */}
            <Card className="border border-gray-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-serif">Localisation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="is_online"
                    checked={formData.is_online}
                    onChange={(e) => setFormData({ ...formData, is_online: e.target.checked })}
                    className="rounded"
                  />
                  <Label htmlFor="is_online">Événement en ligne</Label>
                </div>

                {formData.is_online ? (
                  <div>
                    <Label htmlFor="online_link">Lien de l'événement en ligne *</Label>
                    <Input
                      id="online_link"
                      type="url"
                      required={formData.is_online}
                      value={formData.online_link}
                      onChange={(e) => setFormData({ ...formData, online_link: e.target.value })}
                      placeholder="https://zoom.us/j/..."
                    />
                  </div>
                ) : (
                  <>
                    <div>
                      <Label htmlFor="location_name">Nom du lieu *</Label>
                      <Input
                        id="location_name"
                        required={!formData.is_online}
                        value={formData.location_name}
                        onChange={(e) => setFormData({ ...formData, location_name: e.target.value })}
                        placeholder="Ex: Hôtel Laico Tunis"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location_address">Adresse</Label>
                      <Input
                        id="location_address"
                        value={formData.location_address}
                        onChange={(e) => setFormData({ ...formData, location_address: e.target.value })}
                        placeholder="Rue, numéro..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="location_city">Ville</Label>
                      <Input
                        id="location_city"
                        value={formData.location_city}
                        onChange={(e) => setFormData({ ...formData, location_city: e.target.value })}
                        placeholder="Tunis"
                      />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Gestion des invitations */}
            <Card className="border border-gray-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-serif">Gestion des invitations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="visibility">Visibilité *</Label>
                  <select
                    id="visibility"
                    required
                    value={formData.visibility}
                    onChange={(e) => setFormData({ ...formData, visibility: e.target.value })}
                    className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  >
                    <option value="public">Public (tous les membres peuvent voir)</option>
                    <option value="private">Privé (seulement les invités)</option>
                    <option value="invite_only">Sur invitation uniquement</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="max_attendees">Nombre maximum de participants</Label>
                  <Input
                    id="max_attendees"
                    type="number"
                    min="1"
                    value={formData.max_attendees}
                    onChange={(e) => setFormData({ ...formData, max_attendees: e.target.value })}
                    placeholder="Laissez vide pour illimité"
                  />
                </div>

                {/* Sélection des membres à inviter */}
                <div>
                  <Label>Sélectionner des membres à inviter (optionnel)</Label>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowMemberSelector(!showMemberSelector)}
                    className="w-full mt-2"
                  >
                    {showMemberSelector ? "Masquer" : "Sélectionner des membres"} ({selectedMembers.length} sélectionné{selectedMembers.length > 1 ? "s" : ""})
                  </Button>

                  {showMemberSelector && (
                    <div className="mt-4 space-y-4 border border-gray-200 rounded-lg p-4 bg-white">
                      <Input
                        placeholder="Rechercher un membre..."
                        value={memberSearch}
                        onChange={(e) => setMemberSearch(e.target.value)}
                        className="mb-4"
                      />
                      <div className="max-h-60 overflow-y-auto space-y-2">
                        {members
                          .filter((member) =>
                            member.full_name.toLowerCase().includes(memberSearch.toLowerCase())
                          )
                          .map((member) => (
                            <div
                              key={member.id}
                              className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                              onClick={() => {
                                if (selectedMembers.includes(member.id)) {
                                  setSelectedMembers(selectedMembers.filter((id) => id !== member.id));
                                } else {
                                  setSelectedMembers([...selectedMembers, member.id]);
                                }
                              }}
                            >
                              <input
                                type="checkbox"
                                checked={selectedMembers.includes(member.id)}
                                onChange={() => {}}
                                className="rounded"
                              />
                              {member.profile_picture_url ? (
                                <img
                                  src={member.profile_picture_url}
                                  alt={member.full_name}
                                  className="w-8 h-8 rounded-full object-cover"
                                />
                              ) : (
                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                  <span className="text-xs text-gray-400">
                                    {member.full_name[0].toUpperCase()}
                                  </span>
                                </div>
                              )}
                              <span className="flex-1 text-sm">{member.full_name}</span>
                            </div>
                          ))}
                      </div>
                      {selectedMembers.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <p className="text-sm font-medium mb-2">Membres sélectionnés :</p>
                          <div className="flex flex-wrap gap-2">
                            {selectedMembers.map((memberId) => {
                              const member = members.find((m) => m.id === memberId);
                              return member ? (
                                <span
                                  key={memberId}
                                  className="inline-flex items-center space-x-1 px-2 py-1 bg-[#D4AF37]/10 text-[#0A0A0A] rounded text-sm"
                                >
                                  <span>{member.full_name}</span>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedMembers(selectedMembers.filter((id) => id !== memberId));
                                    }}
                                    className="ml-1 hover:text-red-600"
                                  >
                                    ×
                                  </button>
                                </span>
                              ) : null;
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="has_waitlist"
                    checked={formData.has_waitlist}
                    onChange={(e) => setFormData({ ...formData, has_waitlist: e.target.checked })}
                    className="rounded"
                  />
                  <Label htmlFor="has_waitlist">Activer la liste d'attente</Label>
                </div>
              </CardContent>
            </Card>

            {/* Informations supplémentaires */}
            <Card className="border border-gray-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-serif">Informations supplémentaires</CardTitle>
                <CardDescription>Optionnel</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="dress_code">Code vestimentaire</Label>
                  <Input
                    id="dress_code"
                    value={formData.dress_code}
                    onChange={(e) => setFormData({ ...formData, dress_code: e.target.value })}
                    placeholder="Ex: Tenue de soirée, Business casual..."
                  />
                </div>

                <div>
                  <Label htmlFor="agenda">Programme / Agenda</Label>
                  <Textarea
                    id="agenda"
                    value={formData.agenda}
                    onChange={(e) => setFormData({ ...formData, agenda: e.target.value })}
                    placeholder="18h00 - Accueil&#10;18h30 - Cocktail&#10;19h00 - Dîner..."
                    rows={6}
                  />
                </div>

                <div>
                  <Label htmlFor="special_instructions">Instructions spéciales</Label>
                  <Textarea
                    id="special_instructions"
                    value={formData.special_instructions}
                    onChange={(e) => setFormData({ ...formData, special_instructions: e.target.value })}
                    placeholder="Parking disponible, entrée par la porte principale..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex justify-end space-x-4">
              <Link href="/portal">
                <Button type="button" variant="outline" className="border-gray-300">
                  Annuler
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={loading}
                className="bg-[#D4AF37] text-[#0A0A0A] hover:bg-[#D4AF37]/90"
              >
                {loading ? "Création en cours..." : "Créer l'événement"}
              </Button>
            </div>
          </form>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

