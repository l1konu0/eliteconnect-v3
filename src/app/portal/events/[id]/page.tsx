"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import LogoutButton from "@/components/logout-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Event {
  id: string;
  created_by: string;
  title: string;
  description: string | null;
  event_type: string;
  start_date: string;
  end_date: string | null;
  location_name: string;
  location_address: string | null;
  location_city: string | null;
  location_country: string;
  is_online: boolean;
  online_link: string | null;
  visibility: string;
  max_attendees: number | null;
  has_waitlist: boolean;
  dress_code: string | null;
  agenda: string | null;
  special_instructions: string | null;
  status: string;
  created_at: string;
}

interface RSVP {
  id: string;
  user_id: string;
  status: string;
  guest_count: number;
  dietary_restrictions: string | null;
  special_requests: string | null;
  checked_in_at: string | null;
  profiles?: {
    full_name: string;
    profile_picture_url: string | null;
    job_title: string | null;
    company: string | null;
  };
}

export default function EventDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const supabase = createClient();
  const eventId = params.id as string;

  const [event, setEvent] = useState<Event | null>(null);
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [userRsvp, setUserRsvp] = useState<RSVP | null>(null);
  const [loading, setLoading] = useState(true);
  const [rsvpLoading, setRsvpLoading] = useState(false);
  const [showRsvpForm, setShowRsvpForm] = useState(false);
  const [isCreator, setIsCreator] = useState(false);

  const [rsvpData, setRsvpData] = useState({
    guest_count: 1,
    dietary_restrictions: "",
    special_requests: "",
  });

  useEffect(() => {
    loadEvent();
  }, [eventId]);

  const loadEvent = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      // Charger l'événement
      const { data: eventData, error: eventError } = await supabase
        .from("events")
        .select("*")
        .eq("id", eventId)
        .single();

      if (eventError) throw eventError;
      setEvent(eventData);
      setIsCreator(eventData.created_by === user.id);

      // Charger les RSVPs
      const { data: rsvpsData, error: rsvpsError } = await supabase
        .from("event_rsvps")
        .select("*")
        .eq("event_id", eventId)
        .order("created_at", { ascending: false });

      if (rsvpsError) throw rsvpsError;

      // Charger les profils pour chaque RSVP
      if (rsvpsData) {
        const rsvpsWithProfiles = await Promise.all(
          rsvpsData.map(async (rsvp: RSVP) => {
            const { data: profile } = await supabase
              .from("profiles")
              .select("full_name, profile_picture_url, job_title, company")
              .eq("id", rsvp.user_id)
              .single();

            return {
              ...rsvp,
              profiles: profile || undefined,
            };
          })
        );
        setRsvps(rsvpsWithProfiles);
      } else {
        setRsvps([]);
      }

      // Trouver le RSVP de l'utilisateur actuel
      const currentUserRsvp = rsvpsData?.find((r: RSVP) => r.user_id === user.id);
      setUserRsvp(currentUserRsvp || null);
      setShowRsvpForm(!currentUserRsvp);
    } catch (error: any) {
      console.error("Erreur:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRSVP = async (status: "confirmed" | "cancelled") => {
    setRsvpLoading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      if (status === "confirmed") {
        // Vérifier si l'événement est complet
        const confirmedCount = rsvps.filter((r) => r.status === "confirmed").length;
        if (event?.max_attendees && confirmedCount >= event.max_attendees) {
          if (event.has_waitlist) {
            // Ajouter à la liste d'attente
            const { error } = await supabase.from("event_rsvps").insert({
              event_id: eventId,
              user_id: user.id,
              status: "waitlisted",
              guest_count: rsvpData.guest_count,
              dietary_restrictions: rsvpData.dietary_restrictions || null,
              special_requests: rsvpData.special_requests || null,
            });
            if (error) throw error;
          } else {
            alert("L'événement est complet.");
            return;
          }
        } else {
          // Confirmer la participation
          const { error } = await supabase.from("event_rsvps").insert({
            event_id: eventId,
            user_id: user.id,
            status: "confirmed",
            guest_count: rsvpData.guest_count,
            dietary_restrictions: rsvpData.dietary_restrictions || null,
            special_requests: rsvpData.special_requests || null,
          });
          if (error) throw error;
        }
      } else {
        // Annuler
        if (userRsvp) {
          const { error } = await supabase
            .from("event_rsvps")
            .update({ status: "cancelled" })
            .eq("id", userRsvp.id);
          if (error) throw error;
        }
      }

      // Recharger les données
      await loadEvent();
      setShowRsvpForm(false);
    } catch (error: any) {
      console.error("Erreur RSVP:", error);
      alert("Une erreur est survenue.");
    } finally {
      setRsvpLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F5F0] flex items-center justify-center">
        <p className="text-[#2C2C2C]">Chargement...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-[#F7F5F0] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#2C2C2C] mb-4">Événement non trouvé</p>
          <Link href="/portal">
            <Button>Retour au portail</Button>
          </Link>
        </div>
      </div>
    );
  }

  const confirmedCount = rsvps.filter((r) => r.status === "confirmed").length;
  const waitlistedCount = rsvps.filter((r) => r.status === "waitlisted").length;
  const isFull = event.max_attendees ? confirmedCount >= event.max_attendees : false;

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      {/* Header */}
      <header className="w-full bg-[#F7F5F0] backdrop-blur-md fixed top-0 z-50 border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/portal" className="flex items-center space-x-3">
            <img
              src="/logo-elite-connect.png"
              alt="Elite Connect Logo"
              width={40}
              height={40}
              className="object-contain"
              style={{ maxWidth: '40px', maxHeight: '40px' }}
            />
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
        <div className="max-w-6xl mx-auto">
          {/* Header de l'événement */}
          <div className="mb-8">
            <Link href="/portal" className="text-[#D4AF37] hover:underline mb-4 inline-block">
              ← Retour aux événements
            </Link>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0A0A0A] mb-4">
              {event.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-[#2C2C2C]">
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formatDate(event.start_date)}
              </span>
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {event.is_online ? (
                  <a href={event.online_link || "#"} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    Événement en ligne
                  </a>
                ) : (
                  `${event.location_name}${event.location_city ? `, ${event.location_city}` : ""}`
                )}
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Contenu principal */}
            <div className="md:col-span-2 space-y-6">
              {event.description && (
                <Card className="border border-gray-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl font-serif">Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#2C2C2C] whitespace-pre-line">{event.description}</p>
                  </CardContent>
                </Card>
              )}

              {event.agenda && (
                <Card className="border border-gray-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl font-serif">Programme</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#2C2C2C] whitespace-pre-line">{event.agenda}</p>
                  </CardContent>
                </Card>
              )}

              {event.special_instructions && (
                <Card className="border border-gray-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl font-serif">Instructions spéciales</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#2C2C2C] whitespace-pre-line">{event.special_instructions}</p>
                  </CardContent>
                </Card>
              )}

              {/* Liste des participants */}
              <Card className="border border-gray-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-serif">
                    Participants ({confirmedCount}
                    {event.max_attendees ? ` / ${event.max_attendees}` : ""})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {rsvps.filter((r) => r.status === "confirmed").length === 0 ? (
                    <p className="text-[#2C2C2C]">Aucun participant pour le moment</p>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {rsvps
                        .filter((r) => r.status === "confirmed")
                        .map((rsvp) => (
                          <div key={rsvp.id} className="flex items-center space-x-3">
                            {rsvp.profiles?.profile_picture_url ? (
                              <img
                                src={rsvp.profiles.profile_picture_url}
                                alt={rsvp.profiles.full_name || "Participant"}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-400 text-sm">
                                  {(rsvp.profiles?.full_name || "U")[0].toUpperCase()}
                                </span>
                              </div>
                            )}
                            <div>
                              <p className="font-medium text-[#0A0A0A] text-sm">
                                {rsvp.profiles?.full_name || "Membre"}
                              </p>
                              {rsvp.profiles?.job_title && (
                                <p className="text-xs text-[#2C2C2C]">{rsvp.profiles.job_title}</p>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar RSVP */}
            <div className="space-y-6">
              <Card className="border border-gray-200 shadow-lg sticky top-24">
                <CardHeader>
                  <CardTitle className="text-xl font-serif">Réserver ma place</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {userRsvp ? (
                    <div>
                      <div className="mb-4 p-4 bg-[#D4AF37]/10 rounded-lg">
                        <p className="font-medium text-[#0A0A0A] mb-2">
                          Statut:{" "}
                          <span className="capitalize">
                            {userRsvp.status === "confirmed"
                              ? "Confirmé"
                              : userRsvp.status === "waitlisted"
                              ? "En liste d'attente"
                              : "Annulé"}
                          </span>
                        </p>
                        {userRsvp.status === "waitlisted" && (
                          <p className="text-sm text-[#2C2C2C]">
                            Vous serez notifié si une place se libère
                          </p>
                        )}
                      </div>
                      {userRsvp.status !== "cancelled" && (
                        <Button
                          onClick={() => handleRSVP("cancelled")}
                          disabled={rsvpLoading}
                          variant="outline"
                          className="w-full border-red-300 text-red-600"
                        >
                          Annuler ma participation
                        </Button>
                      )}
                    </div>
                  ) : (
                    <>
                      {isFull && !event.has_waitlist ? (
                        <p className="text-[#2C2C2C] text-center">
                          L'événement est complet
                        </p>
                      ) : (
                        <>
                          {showRsvpForm ? (
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="guest_count">Nombre d'invités</Label>
                                <Input
                                  id="guest_count"
                                  type="number"
                                  min="1"
                                  value={rsvpData.guest_count}
                                  onChange={(e) =>
                                    setRsvpData({ ...rsvpData, guest_count: parseInt(e.target.value) || 1 })
                                  }
                                />
                              </div>
                              <div>
                                <Label htmlFor="dietary_restrictions">Restrictions alimentaires</Label>
                                <Textarea
                                  id="dietary_restrictions"
                                  value={rsvpData.dietary_restrictions}
                                  onChange={(e) =>
                                    setRsvpData({ ...rsvpData, dietary_restrictions: e.target.value })
                                  }
                                  rows={2}
                                  placeholder="Végétarien, allergies..."
                                />
                              </div>
                              <div>
                                <Label htmlFor="special_requests">Demandes spéciales</Label>
                                <Textarea
                                  id="special_requests"
                                  value={rsvpData.special_requests}
                                  onChange={(e) =>
                                    setRsvpData({ ...rsvpData, special_requests: e.target.value })
                                  }
                                  rows={2}
                                  placeholder="..."
                                />
                              </div>
                              <Button
                                onClick={() => handleRSVP("confirmed")}
                                disabled={rsvpLoading}
                                className="w-full bg-[#D4AF37] text-[#0A0A0A] hover:bg-[#D4AF37]/90"
                              >
                                {rsvpLoading
                                  ? "Traitement..."
                                  : isFull
                                  ? "Rejoindre la liste d'attente"
                                  : "Confirmer ma participation"}
                              </Button>
                            </div>
                          ) : (
                            <Button
                              onClick={() => setShowRsvpForm(true)}
                              className="w-full bg-[#D4AF37] text-[#0A0A0A] hover:bg-[#D4AF37]/90"
                            >
                              Réserver ma place
                            </Button>
                          )}
                        </>
                      )}
                    </>
                  )}

                  {event.dress_code && (
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-sm text-[#2C2C2C]">
                        <strong>Code vestimentaire:</strong> {event.dress_code}
                      </p>
                    </div>
                  )}

                  {waitlistedCount > 0 && (
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-sm text-[#2C2C2C]">
                        {waitlistedCount} personne{waitlistedCount > 1 ? "s" : ""} en liste d'attente
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

