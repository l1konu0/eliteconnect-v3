import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import EliteConnectLogo from "@/components/elite-connect-logo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LogoutButton from "@/components/logout-button";
import { safeString, safeEmail, safeUrl } from "@/lib/security/server-safe";

export default async function PortalPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // Rediriger vers la page de complétion du profil si non complété
  if (!profile?.profile_completed) {
    redirect("/complete-profile");
  }

  // Vérifier si l'utilisateur est admin
  const isAdmin = profile?.is_admin || false;

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      {/* Header */}
      <header className="w-full bg-[#F7F5F0] backdrop-blur-md fixed top-0 z-50 border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <EliteConnectLogo size={40} />
            <span className="text-lg font-semibold tracking-wide">Elite Connect</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="outline" className="border-gray-300">
                Retour au site
              </Button>
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center space-x-6 mb-4">
              {safeUrl(profile?.profile_picture_url) ? (
                <img
                  src={safeUrl(profile.profile_picture_url)!}
                  alt={safeString(profile?.full_name, "Profile")}
                  className="w-20 h-20 rounded-full object-cover border-2 border-[#D4AF37]"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center border-2 border-gray-300">
                  <span className="text-gray-400 text-2xl font-serif">
                    {safeString(profile?.full_name || user.email || "U")[0].toUpperCase()}
                  </span>
                </div>
              )}
              <div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0A0A0A]">
                  Portail Membre
                </h1>
                <p className="text-lg text-[#2C2C2C]">
                  Bienvenue, {safeString(profile?.full_name || user.user_metadata?.full_name || user.email)}
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <Card className="card-elite-premium border border-gray-200/50 shadow-elite-lg elite-card-hover">
              <CardHeader>
                <CardTitle className="text-xl font-serif">Mon Profil</CardTitle>
                <CardDescription>Gérez vos informations personnelles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {safeUrl(profile?.profile_picture_url) && (
                  <div className="flex justify-center mb-4">
                    <img
                      src={safeUrl(profile.profile_picture_url)!}
                      alt={safeString(profile?.full_name, "Profile")}
                      className="w-24 h-24 rounded-full object-cover border-2 border-[#D4AF37]"
                    />
                  </div>
                )}
                <div>
                  <p className="text-sm text-[#2C2C2C] mb-1">Nom complet</p>
                  <p className="font-medium text-[#0A0A0A]">{safeString(profile?.full_name, "Non renseigné")}</p>
                </div>
                <div>
                  <p className="text-sm text-[#2C2C2C] mb-1">Email</p>
                  <p className="font-medium text-[#0A0A0A]">{safeEmail(user.email)}</p>
                </div>
                {profile?.job_title && (
                  <div>
                    <p className="text-sm text-[#2C2C2C] mb-1">Métier</p>
                    <p className="font-medium text-[#0A0A0A]">{safeString(profile.job_title)}</p>
                  </div>
                )}
                {profile?.company && (
                  <div>
                    <p className="text-sm text-[#2C2C2C] mb-1">Entreprise</p>
                    <p className="font-medium text-[#0A0A0A]">{safeString(profile.company)}</p>
                  </div>
                )}
                {profile?.phone_number && (
                  <div>
                    <p className="text-sm text-[#2C2C2C] mb-1">Téléphone</p>
                    <p className="font-medium text-[#0A0A0A]">{safeString(profile.phone_number)}</p>
                  </div>
                )}
                {profile?.bio && (
                  <div>
                    <p className="text-sm text-[#2C2C2C] mb-1">À propos</p>
                    <p className="font-medium text-[#0A0A0A] text-sm">{safeString(profile.bio)}</p>
                  </div>
                )}
                <Link href="/complete-profile">
                  <Button className="w-full bg-[#D4AF37] text-[#0A0A0A] hover:bg-[#D4AF37]/90">
                    Modifier le profil
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Membership Card */}
            <Card className="card-elite-premium border border-gray-200/50 shadow-elite-lg elite-card-hover">
              <CardHeader>
                <CardTitle className="text-xl font-serif">Adhésion</CardTitle>
                <CardDescription>Informations sur votre membership</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-[#2C2C2C] mb-1">Statut</p>
                  <p className="font-medium text-[#0A0A0A]">
                    {safeString(profile?.membership_status, "En attente")}
                  </p>
                </div>
                <Button variant="outline" className="w-full border-[#D4AF37] text-[#D4AF37]">
                  Voir les détails
                </Button>
              </CardContent>
            </Card>

            {/* Events Card */}
            <Card className="card-elite-premium border border-gray-200/50 shadow-elite-lg elite-card-hover">
              <CardHeader>
                <CardTitle className="text-xl font-serif">Événements</CardTitle>
                <CardDescription>Vos événements à venir</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-[#2C2C2C]">Aucun événement à venir</p>
                <Link href="/events">
                  <Button variant="outline" className="w-full border-[#D4AF37] text-[#D4AF37]">
                    Voir tous les événements
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Investment Card */}
            <Card className="card-elite-premium border border-gray-200/50 shadow-elite-lg elite-card-hover">
              <CardHeader>
                <CardTitle className="text-xl font-serif">Investissements</CardTitle>
                <CardDescription>Vos opportunités d&apos;investissement</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/investment">
                  <Button variant="outline" className="w-full border-[#D4AF37] text-[#D4AF37]">
                    Explorer les opportunités
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Consulting Card */}
            <Card className="card-elite-premium border border-gray-200/50 shadow-elite-lg elite-card-hover">
              <CardHeader>
                <CardTitle className="text-xl font-serif">Consulting</CardTitle>
                <CardDescription>Services de conseil disponibles</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/consulting">
                  <Button variant="outline" className="w-full border-[#D4AF37] text-[#D4AF37]">
                    Découvrir les services
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Journal Card */}
            <Card className="card-elite-premium border border-gray-200/50 shadow-elite-lg elite-card-hover">
              <CardHeader>
                <CardTitle className="text-xl font-serif">Journal</CardTitle>
                <CardDescription>Articles et actualités</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/journal">
                  <Button variant="outline" className="w-full border-[#D4AF37] text-[#D4AF37]">
                    Lire le journal
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Contacts Card */}
            <Card className="card-elite-premium border border-gray-200/50 shadow-elite-lg elite-card-hover">
              <CardHeader>
                <CardTitle className="text-xl font-serif">Mes Contacts</CardTitle>
                <CardDescription>Réseau Elite Connect</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/portal/contacts">
                  <Button variant="outline" className="w-full border-[#D4AF37] text-[#D4AF37]">
                    Voir mes contacts
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Admin Events Card - Only visible for admins */}
            {isAdmin && (
              <Card className="card-elite-premium border-2 border-[#D4AF37]/50 shadow-elite-xl bg-gradient-to-br from-[#D4AF37]/10 to-[#D4AF37]/5 elite-card-hover animate-pulse-glow">
                <CardHeader>
                  <CardTitle className="text-xl font-serif text-[#D4AF37]">Administration</CardTitle>
                  <CardDescription>Gestion du site</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link href="/portal/events/create">
                    <Button className="w-full bg-[#D4AF37] text-[#0A0A0A] hover:bg-[#D4AF37]/90">
                      Créer un événement
                    </Button>
                  </Link>
                  <Link href="/portal/events">
                    <Button variant="outline" className="w-full border-[#D4AF37] text-[#D4AF37]">
                      Gérer les événements
                    </Button>
                  </Link>
                  <Link href="/portal/partners/manage">
                    <Button variant="outline" className="w-full border-[#D4AF37] text-[#D4AF37]">
                      Gérer les partenaires
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}



