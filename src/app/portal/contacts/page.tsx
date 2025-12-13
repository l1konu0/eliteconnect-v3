"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import EliteConnectLogo from "@/components/elite-connect-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import LogoutButton from "@/components/logout-button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Contact {
  id: string;
  user_id: string;
  full_name: string;
  email?: string;
  phone_number?: string;
  job_title?: string;
  company?: string;
  profile_picture_url?: string;
  bio?: string;
  linkedin_url?: string;
  twitter_url?: string;
  website_url?: string;
  notes?: string;
  created_at: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    job_title: "",
    company: "",
    bio: "",
    linkedin_url: "",
    twitter_url: "",
    website_url: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      loadContacts();
    };

    checkUser();
  }, [supabase, router]);

  const loadContacts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("contacts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setContacts(data || []);
    } catch (error: any) {
      setError(error.message || "Erreur lors du chargement des contacts");
    } finally {
      setLoading(false);
    }
  };

  const handleAddContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("Utilisateur non connecté");

      const { error: insertError } = await supabase.from("contacts").insert({
        user_id: user.id,
        ...formData,
      });

      if (insertError) throw insertError;

      // Réinitialiser le formulaire
      setFormData({
        full_name: "",
        email: "",
        phone_number: "",
        job_title: "",
        company: "",
        bio: "",
        linkedin_url: "",
        twitter_url: "",
        website_url: "",
        notes: "",
      });

      setShowAddDialog(false);
      loadContacts();
    } catch (error: any) {
      setError(error.message || "Erreur lors de l'ajout du contact");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteContact = async (contactId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce contact ?")) return;

    try {
      const { error } = await supabase.from("contacts").delete().eq("id", contactId);

      if (error) throw error;

      loadContacts();
    } catch (error: any) {
      setError(error.message || "Erreur lors de la suppression");
    }
  };

  // Filtrer les contacts selon la recherche
  const filteredContacts = contacts.filter((contact) =>
    contact.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.job_title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      {/* Header */}
      <header className="w-full bg-[#F7F5F0] backdrop-blur-md fixed top-0 z-50 border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
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
          {/* Header Section */}
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0A0A0A] mb-2">
                Mes Contacts
              </h1>
              <p className="text-lg text-[#2C2C2C]">
                Tous les contacts de la communauté Elite Connect
              </p>
            </div>
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button className="bg-[#D4AF37] text-[#0A0A0A] hover:bg-[#D4AF37]/90">
                  + Ajouter un contact
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-serif">Ajouter un contact</DialogTitle>
                  <DialogDescription>
                    Ajoutez un nouveau contact à votre réseau Elite Connect
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddContact} className="space-y-4">
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="full_name">Nom complet *</Label>
                      <Input
                        id="full_name"
                        value={formData.full_name}
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                        required
                        placeholder="Jean Dupont"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="jean.dupont@email.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone_number">Téléphone</Label>
                      <Input
                        id="phone_number"
                        type="tel"
                        value={formData.phone_number}
                        onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                        placeholder="+33 6 12 34 56 78"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="job_title">Poste</Label>
                      <Input
                        id="job_title"
                        value={formData.job_title}
                        onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
                        placeholder="CEO, Entrepreneur..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">Entreprise</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Nom de l'entreprise"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="linkedin_url">LinkedIn</Label>
                      <Input
                        id="linkedin_url"
                        type="url"
                        value={formData.linkedin_url}
                        onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                        placeholder="https://linkedin.com/in/..."
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      rows={3}
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      placeholder="Quelques mots sur ce contact..."
                      className="resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes personnelles</Label>
                    <Textarea
                      id="notes"
                      rows={2}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Notes privées (visibles uniquement par vous)"
                      className="resize-none"
                    />
                  </div>

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowAddDialog(false)}
                    >
                      Annuler
                    </Button>
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="bg-[#D4AF37] text-[#0A0A0A] hover:bg-[#D4AF37]/90"
                    >
                      {submitting ? "Ajout..." : "Ajouter le contact"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <Input
              type="text"
              placeholder="Rechercher un contact (nom, email, entreprise, poste)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md bg-white border-gray-300"
            />
          </div>

          {/* Error Message */}
          {error && !showAddDialog && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Contacts Grid */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-[#2C2C2C]">Chargement des contacts...</p>
            </div>
          ) : filteredContacts.length === 0 ? (
            <Card className="border border-gray-200">
              <CardContent className="pt-6 text-center">
                <p className="text-[#2C2C2C] mb-4">
                  {searchTerm ? "Aucun contact trouvé" : "Aucun contact pour le moment"}
                </p>
                {!searchTerm && (
                  <Button
                    onClick={() => setShowAddDialog(true)}
                    className="bg-[#D4AF37] text-[#0A0A0A] hover:bg-[#D4AF37]/90"
                  >
                    Ajouter votre premier contact
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContacts.map((contact) => (
                <Card key={contact.id} className="border border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-start space-x-4">
                      {contact.profile_picture_url ? (
                        <img
                          src={contact.profile_picture_url}
                          alt={contact.full_name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-[#D4AF37]"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center border-2 border-gray-300">
                          <span className="text-gray-400 text-xl font-serif">
                            {contact.full_name[0].toUpperCase()}
                          </span>
                        </div>
                      )}
                      <div className="flex-1">
                        <CardTitle className="text-lg font-serif">{contact.full_name}</CardTitle>
                        {contact.job_title && (
                          <CardDescription className="mt-1">{contact.job_title}</CardDescription>
                        )}
                        {contact.company && (
                          <CardDescription>{contact.company}</CardDescription>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {contact.email && (
                      <div>
                        <p className="text-xs text-[#2C2C2C] mb-1">Email</p>
                        <a
                          href={`mailto:${contact.email}`}
                          className="text-sm text-[#D4AF37] hover:underline"
                        >
                          {contact.email}
                        </a>
                      </div>
                    )}

                    {contact.phone_number && (
                      <div>
                        <p className="text-xs text-[#2C2C2C] mb-1">Téléphone</p>
                        <a
                          href={`tel:${contact.phone_number}`}
                          className="text-sm text-[#0A0A0A] hover:text-[#D4AF37]"
                        >
                          {contact.phone_number}
                        </a>
                      </div>
                    )}

                    {contact.bio && (
                      <div>
                        <p className="text-xs text-[#2C2C2C] mb-1">Bio</p>
                        <p className="text-sm text-[#0A0A0A] line-clamp-2">{contact.bio}</p>
                      </div>
                    )}

                    <div className="flex space-x-2 pt-2">
                      {contact.linkedin_url && (
                        <a
                          href={contact.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#D4AF37] hover:text-[#0A0A0A] text-sm"
                        >
                          LinkedIn
                        </a>
                      )}
                      {contact.website_url && (
                        <a
                          href={contact.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#D4AF37] hover:text-[#0A0A0A] text-sm"
                        >
                          Site web
                        </a>
                      )}
                    </div>

                    {contact.notes && (
                      <div className="pt-2 border-t border-gray-200">
                        <p className="text-xs text-[#2C2C2C] mb-1">Notes</p>
                        <p className="text-xs text-[#0A0A0A] italic">{contact.notes}</p>
                      </div>
                    )}

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteContact(contact.id)}
                      className="w-full mt-4 border-red-200 text-red-600 hover:bg-red-50"
                    >
                      Supprimer
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Stats */}
          {!loading && contacts.length > 0 && (
            <div className="mt-8 text-center text-sm text-[#2C2C2C]">
              <p>
                {filteredContacts.length} contact{filteredContacts.length > 1 ? "s" : ""} 
                {searchTerm && ` trouvé${filteredContacts.length > 1 ? "s" : ""}`}
                {!searchTerm && ` au total`}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

