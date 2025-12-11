"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Link } from '@/i18n/routing';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function CompleteProfilePage() {
  const [fullName, setFullName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // Récupérer les informations de l'utilisateur connecté
    const getUserData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      setEmail(user.email || "");

      // Récupérer le profil existant
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profile) {
        setFullName(profile.full_name || "");
        setJobTitle(profile.job_title || "");
        setCompany(profile.company || "");
        setPhoneNumber(profile.phone_number || "");
        setBio(profile.bio || "");
        setProfilePictureUrl(profile.profile_picture_url || "");
      }
    };

    getUserData();
  }, [supabase, router]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Vérifier la taille (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("L'image est trop grande. Maximum 5MB.");
      return;
    }

    // Vérifier le type
    if (!file.type.startsWith("image/")) {
      setError("Veuillez sélectionner une image.");
      return;
    }

    setProfilePicture(file);
    setUploading(true);
    setError(null);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("Utilisateur non connecté");

      // Créer un nom unique pour l'image
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `profiles/${fileName}`;

      // Upload vers Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("profile-pictures")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        // Message d'erreur plus clair pour "Bucket not found"
        if (uploadError.message?.includes('Bucket not found') || uploadError.message?.includes('not found')) {
          throw new Error(
            "Le bucket de stockage n'existe pas. Veuillez contacter l'administrateur ou exécuter le script SQL de configuration du storage."
          );
        }
        throw uploadError;
      }

      // Obtenir l'URL publique
      const {
        data: { publicUrl },
      } = supabase.storage.from("profile-pictures").getPublicUrl(filePath);

      setProfilePictureUrl(publicUrl);
      setUploading(false);
    } catch (error: any) {
      const errorMessage = error.message || "Erreur lors du téléchargement de l'image";
      setError(errorMessage);
      setUploading(false);
      console.error("Erreur upload image:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("Utilisateur non connecté");

      // Mettre à jour le profil
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          full_name: fullName,
          job_title: jobTitle,
          company: company,
          phone_number: phoneNumber,
          profile_picture_url: profilePictureUrl,
          bio: bio,
          profile_completed: true,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (updateError) throw updateError;

      // Rediriger vers le portail
      router.push("/portal");
      router.refresh();
    } catch (error: any) {
      setError(error.message || "Une erreur est survenue lors de la mise à jour du profil");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] flex items-center justify-center px-6 py-12">
      <Card className="w-full max-w-2xl border border-gray-200 shadow-xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center mb-2">
            <img
              src="/logo-elite-connect.png"
              alt="Elite Connect Logo"
              width={150}
              height={150}
              className="object-contain block"
              style={{ maxWidth: '150px', maxHeight: '150px', display: 'block' }}
              onError={(e) => {
                console.error('Erreur de chargement du logo:', e);
                (e.target as HTMLImageElement).style.display = 'none';
              }}
              onLoad={() => console.log('Logo chargé avec succès')}
            />
          </div>
          <CardTitle className="text-3xl font-serif font-bold text-[#0A0A0A]">
            Complétez votre profil
          </CardTitle>
          <CardDescription className="text-[#2C2C2C]">
            Remplissez vos informations pour accéder à votre portail membre
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Photo de profil */}
            <div className="space-y-2">
              <Label className="text-[#2C2C2C]">Photo de profil</Label>
              <div className="flex items-center space-x-4">
                {profilePictureUrl ? (
                  <img
                    src={profilePictureUrl}
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover border-2 border-[#D4AF37]"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center border-2 border-gray-300">
                    <span className="text-gray-400 text-xs">Photo</span>
                  </div>
                )}
                <div className="flex-1">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="bg-[#F7F5F0] border-gray-300 text-[#0A0A0A] focus:ring-[#D4AF37]"
                  />
                  {uploading && (
                    <p className="text-xs text-[#2C2C2C] mt-1">Téléchargement en cours...</p>
                  )}
                  <p className="text-xs text-[#2C2C2C] mt-1">
                    Format: JPG, PNG. Maximum 5MB
                  </p>
                </div>
              </div>
            </div>

            {/* Nom complet */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-[#2C2C2C]">
                Nom complet *
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Jean Dupont"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="bg-[#F7F5F0] border-gray-300 text-[#0A0A0A] focus:ring-[#D4AF37]"
              />
            </div>

            {/* Email (lecture seule) */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#2C2C2C]">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                disabled
                className="bg-gray-100 border-gray-300 text-[#2C2C2C] cursor-not-allowed"
              />
            </div>

            {/* Métier */}
            <div className="space-y-2">
              <Label htmlFor="jobTitle" className="text-[#2C2C2C]">
                Métier / Poste *
              </Label>
              <Input
                id="jobTitle"
                type="text"
                placeholder="CEO, Entrepreneur, Designer..."
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                required
                className="bg-[#F7F5F0] border-gray-300 text-[#0A0A0A] focus:ring-[#D4AF37]"
              />
            </div>

            {/* Entreprise */}
            <div className="space-y-2">
              <Label htmlFor="company" className="text-[#2C2C2C]">
                Entreprise / Organisation *
              </Label>
              <Input
                id="company"
                type="text"
                placeholder="Nom de votre entreprise"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
                className="bg-[#F7F5F0] border-gray-300 text-[#0A0A0A] focus:ring-[#D4AF37]"
              />
            </div>

            {/* Numéro de téléphone */}
            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="text-[#2C2C2C]">
                Numéro de téléphone *
              </Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="+33 6 12 34 56 78"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                className="bg-[#F7F5F0] border-gray-300 text-[#0A0A0A] focus:ring-[#D4AF37]"
              />
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <Label htmlFor="bio" className="text-[#2C2C2C]">
                À propos de vous
              </Label>
              <Textarea
                id="bio"
                rows={4}
                placeholder="Parlez-nous de vous, de vos passions, de votre parcours..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="bg-[#F7F5F0] border-gray-300 text-[#0A0A0A] focus:ring-[#D4AF37] resize-none"
              />
            </div>

            <Button
              type="submit"
              disabled={loading || uploading}
              className="w-full bg-[#D4AF37] text-[#0A0A0A] hover:bg-[#D4AF37]/90 uppercase tracking-wider font-medium"
            >
              {loading ? "Enregistrement..." : "Compléter mon profil"}
            </Button>

            <div className="text-center text-sm">
              <Link
                href="/portal"
                className="text-[#2C2C2C] hover:text-[#D4AF37] hover:underline"
              >
                Passer cette étape pour l'instant
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

