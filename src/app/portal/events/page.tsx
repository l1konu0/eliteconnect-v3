"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import EliteConnectLogo from "@/components/elite-connect-logo";
import LogoutButton from "@/components/logout-button";

interface Event {
  id: string;
  title: string;
  description: string | null;
  event_type: string;
  start_date: string;
  end_date: string | null;
  location_name: string;
  location_city: string | null;
  is_online: boolean;
  visibility: string;
  max_attendees: number | null;
  status: string;
  created_at: string;
  rsvp_count?: number;
}

export default function PortalEventsPage() {
  const router = useRouter();
  const supabase = createClient();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<"upcoming" | "past" | "all">("upcoming");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterCity, setFilterCity] = useState<string>("all");

  useEffect(() => {
    loadEvents();
    checkAdminStatus();
  }, [activeTab]);

  const checkAdminStatus = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", user.id)
        .single();

      setIsAdmin(profile?.is_admin || false);
    } catch (error: any) {
      console.error("Erreur vérification admin:", error);
      setIsAdmin(false);
    }
  };

  const loadEvents = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const now = new Date().toISOString();
      let query = supabase
        .from("events")
        .select("*")
        .eq("status", "published");

      // Filtrer par date selon l'onglet actif
      if (activeTab === "upcoming") {
        query = query.gte("start_date", now);
      } else if (activeTab === "past") {
        query = query.lt("start_date", now);
      }

      query = query.order("start_date", { ascending: activeTab === "past" ? false : true });

      const { data: eventsData, error } = await query;

      if (error) throw error;

      // Charger le nombre de RSVPs pour chaque événement
      if (eventsData) {
        const eventsWithRsvpCount = await Promise.all(
          eventsData.map(async (event) => {
            const { count } = await supabase
              .from("event_rsvps")
              .select("*", { count: "exact", head: true })
              .eq("event_id", event.id)
              .eq("status", "confirmed");

            return {
              ...event,
              rsvp_count: count || 0,
            };
          })
        );
        setEvents(eventsWithRsvpCount);
      } else {
        setEvents([]);
      }
    } catch (error: any) {
      console.error("Erreur:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filteredEvents = events.filter((event) => {
    // Filtre par recherche
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      if (
        !event.title.toLowerCase().includes(searchLower) &&
        !event.description?.toLowerCase().includes(searchLower) &&
        !event.location_name.toLowerCase().includes(searchLower)
      ) {
        return false;
      }
    }

    // Filtre par type
    if (filterType !== "all" && event.event_type !== filterType) {
      return false;
    }

    // Filtre par ville
    if (filterCity !== "all" && event.location_city !== filterCity) {
      return false;
    }

    return true;
  });

  const eventTypes = Array.from(new Set(events.map((e) => e.event_type)));
  const cities = Array.from(new Set(events.map((e) => e.location_city).filter((city): city is string => city !== null && city !== undefined)));

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F5F0] flex items-center justify-center">
        <p className="text-[#2C2C2C]">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      {/* Header */}
      <header className="w-full bg-[#F7F5F0] backdrop-blur-md fixed top-0 z-50 border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/portal" className="flex items-center space-x-3">
            <EliteConnectLogo size={40} />
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
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0A0A0A] mb-4">
                Événements
              </h1>
              <p className="text-lg text-[#2C2C2C]">
                Découvrez et participez aux événements de la communauté Elite Connect
              </p>
            </div>
            {isAdmin && (
              <Link href="/portal/events/create">
                <Button className="bg-[#D4AF37] text-[#0A0A0A] hover:bg-[#D4AF37]/90">
                  + Créer un événement
                </Button>
              </Link>
            )}
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <div className="flex space-x-2 border-b border-gray-200">
              {[
                { id: "upcoming", label: "À venir" },
                { id: "past", label: "Passés" },
                { id: "all", label: "Tous" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    loadEvents();
                  }}
                  className={`px-6 py-3 text-sm uppercase tracking-wider transition-colors border-b-2 ${
                    activeTab === tab.id
                      ? "border-[#D4AF37] text-[#D4AF37]"
                      : "border-transparent text-[#2C2C2C] hover:text-[#D4AF37]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Filtres */}
          <div className="mb-6 grid md:grid-cols-3 gap-4">
            <div>
              <Input
                placeholder="Rechercher un événement..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              >
                <option value="all">Tous les types</option>
                {eventTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.replace("_", " ")}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={filterCity}
                onChange={(e) => setFilterCity(e.target.value)}
                className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              >
                <option value="all">Toutes les villes</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Liste des événements */}
          {filteredEvents.length === 0 ? (
            <Card className="border border-gray-200 shadow-lg">
              <CardContent className="py-12 text-center">
                <p className="text-[#2C2C2C]">
                  {activeTab === "upcoming"
                    ? "Aucun événement à venir"
                    : activeTab === "past"
                    ? "Aucun événement passé"
                    : "Aucun événement"}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <Link key={event.id} href={`/portal/events/${event.id}`}>
                  <Card className="border border-gray-200 shadow-lg hover:border-[#D4AF37]/50 transition-colors cursor-pointer h-full flex flex-col">
                    <div className="h-48 bg-gradient-to-br from-[#1D3B2A] to-[#3C5F3C] flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-[#D4AF37]/20 rounded-full flex items-center justify-center">
                          <svg
                            className="w-8 h-8 text-[#D4AF37]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6 flex-grow flex flex-col">
                      <div className="mb-2">
                        <span className="text-xs text-[#D4AF37] uppercase tracking-wide">
                          {event.event_type.replace("_", " ")}
                        </span>
                      </div>
                      <h3 className="text-xl font-serif font-semibold mb-3 text-[#0A0A0A]">
                        {event.title}
                      </h3>
                      <p className="text-[#2C2C2C] text-sm mb-4 flex-grow">
                        {event.description
                          ? event.description.length > 100
                            ? event.description.substring(0, 100) + "..."
                            : event.description
                          : "Aucune description"}
                      </p>
                      <div className="space-y-2 text-sm text-[#2C2C2C]">
                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          {formatDate(event.start_date)}
                        </div>
                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          {event.is_online
                            ? "Événement en ligne"
                            : `${event.location_name}${event.location_city ? `, ${event.location_city}` : ""}`}
                        </div>
                        {event.rsvp_count !== undefined && (
                          <div className="flex items-center">
                            <svg
                              className="w-4 h-4 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                              />
                            </svg>
                            {event.rsvp_count} participant{event.rsvp_count > 1 ? "s" : ""}
                            {event.max_attendees && ` / ${event.max_attendees}`}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

