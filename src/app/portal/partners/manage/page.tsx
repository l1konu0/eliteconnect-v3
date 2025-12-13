"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import EliteConnectLogo from "@/components/elite-connect-logo";
import LogoutButton from "@/components/logout-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Partner {
  id: string;
  name: string;
  category: string;
  logo_url: string | null;
  website_url: string | null;
  description: string | null;
  display_order: number;
  is_active: boolean;
}

export default function ManagePartnersPage() {
  const router = useRouter();
  const supabase = createClient();
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    category: "strategic",
    website_url: "",
    description: "",
    display_order: 0,
    is_active: true,
  });

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  useEffect(() => {
    checkAdminAndLoadPartners();
  }, []);

  const checkAdminAndLoadPartners = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      // Vérifier si l'utilisateur est admin
      const { data: profile } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", user.id)
        .single();

      if (!profile?.is_admin) {
        router.push("/portal");
        return;
      }

      setIsAdmin(true);
      await loadPartners();
    } catch (error: any) {
      console.error("Erreur:", error);
      router.push("/portal");
    } finally {
      setLoading(false);
    }
  };

  const loadPartners = async () => {
    try {
      const { data, error } = await supabase
        .from("partners")
        .select("*")
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPartners(data || []);
    } catch (error: any) {
      console.error("Erreur chargement partenaires:", error);
      alert("Erreur lors du chargement des partenaires");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadLogo = async (partnerId: string): Promise<string | null> => {
    if (!logoFile) return null;

    try {
      const fileExt = logoFile.name.split(".").pop();
      const fileName = `${partnerId}-${Date.now()}.${fileExt}`;
      const filePath = `logos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("partner-logos")
        .upload(filePath, logoFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("partner-logos").getPublicUrl(filePath);

      return publicUrl;
    } catch (error: any) {
      console.error("Erreur upload logo:", error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      let logoUrl = editingPartner?.logo_url || null;

      // Upload du logo si un nouveau fichier est sélectionné
      if (logoFile) {
        const partnerId = editingPartner?.id || crypto.randomUUID();
        logoUrl = await uploadLogo(partnerId);
      }

      const partnerData = {
        name: formData.name,
        category: formData.category,
        website_url: formData.website_url || null,
        description: formData.description || null,
        display_order: formData.display_order,
        is_active: formData.is_active,
        logo_url: logoUrl,
      };

      if (editingPartner) {
        // Mise à jour
        const { error } = await supabase
          .from("partners")
          .update(partnerData)
          .eq("id", editingPartner.id);

        if (error) throw error;
        alert("Partenaire mis à jour avec succès !");
      } else {
        // Création
        const { error } = await supabase.from("partners").insert(partnerData);

        if (error) throw error;
        alert("Partenaire créé avec succès !");
      }

      // Réinitialiser le formulaire
      setFormData({
        name: "",
        category: "strategic",
        website_url: "",
        description: "",
        display_order: 0,
        is_active: true,
      });
      setLogoFile(null);
      setLogoPreview(null);
      setShowForm(false);
      setEditingPartner(null);
      await loadPartners();
    } catch (error: any) {
      console.error("Erreur:", error);
      alert("Une erreur est survenue : " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (partner: Partner) => {
    setEditingPartner(partner);
    setFormData({
      name: partner.name,
      category: partner.category,
      website_url: partner.website_url || "",
      description: partner.description || "",
      display_order: partner.display_order,
      is_active: partner.is_active,
    });
    setLogoPreview(partner.logo_url);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce partenaire ?")) return;

    try {
      const { error } = await supabase.from("partners").delete().eq("id", id);

      if (error) throw error;
      alert("Partenaire supprimé avec succès !");
      await loadPartners();
    } catch (error: any) {
      console.error("Erreur:", error);
      alert("Une erreur est survenue : " + error.message);
    }
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingPartner(null);
    setFormData({
      name: "",
      category: "strategic",
      website_url: "",
      description: "",
      display_order: 0,
      is_active: true,
    });
    setLogoFile(null);
    setLogoPreview(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F5F0] flex items-center justify-center">
        <p className="text-[#2C2C2C]">Chargement...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  const categoryLabels: Record<string, string> = {
    strategic: "Partenaires Stratégiques",
    technology: "Partenaires Technologiques",
    brands: "Marques & Collaborations",
    other: "Autres",
  };

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
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0A0A0A] mb-2">
                Gérer les Partenaires
              </h1>
              <p className="text-[#2C2C2C]">Ajoutez, modifiez ou supprimez des partenaires</p>
            </div>
            {!showForm && (
              <Button
                onClick={() => setShowForm(true)}
                className="bg-[#D4AF37] text-[#0A0A0A] hover:bg-[#D4AF37]/90"
              >
                + Ajouter un partenaire
              </Button>
            )}
          </div>

          {/* Formulaire */}
          {showForm && (
            <Card className="mb-8 border border-gray-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-serif">
                  {editingPartner ? "Modifier le partenaire" : "Nouveau partenaire"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nom du partenaire *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="category">Catégorie *</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="strategic">Partenaires Stratégiques</SelectItem>
                          <SelectItem value="technology">Partenaires Technologiques</SelectItem>
                          <SelectItem value="brands">Marques & Collaborations</SelectItem>
                          <SelectItem value="other">Autres</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="logo">Logo</Label>
                    <Input
                      id="logo"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="cursor-pointer"
                    />
                    {logoPreview && (
                      <div className="mt-2">
                        <img
                          src={logoPreview}
                          alt="Preview"
                          className="w-32 h-32 object-contain border border-gray-200 rounded"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="website_url">Site web</Label>
                    <Input
                      id="website_url"
                      type="url"
                      value={formData.website_url}
                      onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="display_order">Ordre d'affichage</Label>
                      <Input
                        id="display_order"
                        type="number"
                        value={formData.display_order}
                        onChange={(e) =>
                          setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })
                        }
                      />
                    </div>

                    <div className="flex items-center space-x-2 pt-6">
                      <input
                        type="checkbox"
                        id="is_active"
                        checked={formData.is_active}
                        onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <Label htmlFor="is_active">Actif</Label>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      type="submit"
                      disabled={uploading}
                      className="bg-[#D4AF37] text-[#0A0A0A] hover:bg-[#D4AF37]/90"
                    >
                      {uploading ? "Traitement..." : editingPartner ? "Mettre à jour" : "Créer"}
                    </Button>
                    <Button type="button" variant="outline" onClick={cancelForm}>
                      Annuler
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Liste des partenaires */}
          <div className="space-y-6">
            {partners.length === 0 ? (
              <Card className="border border-gray-200">
                <CardContent className="py-12 text-center">
                  <p className="text-[#2C2C2C]">Aucun partenaire pour le moment</p>
                </CardContent>
              </Card>
            ) : (
              partners.map((partner) => (
                <Card key={partner.id} className="border border-gray-200 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        {partner.logo_url ? (
                          <img
                            src={partner.logo_url}
                            alt={partner.name}
                            className="w-20 h-20 object-contain border border-gray-200 rounded"
                          />
                        ) : (
                          <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center">
                            <span className="text-xs text-gray-400">Pas de logo</span>
                          </div>
                        )}
                        <div>
                          <h3 className="text-lg font-semibold text-[#0A0A0A]">{partner.name}</h3>
                          <p className="text-sm text-[#2C2C2C]">
                            {categoryLabels[partner.category] || partner.category}
                          </p>
                          {partner.website_url && (
                            <a
                              href={partner.website_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-[#D4AF37] hover:underline"
                            >
                              Visiter le site →
                            </a>
                          )}
                          <span
                            className={`ml-2 text-xs px-2 py-1 rounded ${
                              partner.is_active
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {partner.is_active ? "Actif" : "Inactif"}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(partner)}
                        >
                          Modifier
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-300 text-red-600"
                          onClick={() => handleDelete(partner.id)}
                        >
                          Supprimer
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

