"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        setSuccess(true);
        // Optionnel: rediriger vers une page de confirmation
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (error: any) {
      setError(error.message || "Une erreur est survenue lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#F7F5F0] flex items-center justify-center px-6 py-12">
        <Card className="w-full max-w-md border border-gray-200 shadow-xl">
          <CardContent className="pt-6 text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#0A0A0A]">
              Inscription réussie !
            </h2>
            <p className="text-[#2C2C2C]">
              Vérifiez votre email pour confirmer votre compte.
            </p>
            <p className="text-sm text-[#2C2C2C]">
              Une fois votre email validé, vous pourrez compléter votre profil et accéder à votre portail membre.
            </p>
            <p className="text-xs text-[#2C2C2C] mt-2">
              Redirection vers la page de connexion...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F5F0] flex items-center justify-center px-6 py-12">
      <Card className="w-full max-w-md border border-gray-200 shadow-xl">
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
            Créer un compte
          </CardTitle>
          <CardDescription className="text-[#2C2C2C]">
            Rejoignez la communauté Elite Connect
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-[#2C2C2C]">
                Nom complet
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

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#2C2C2C]">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-[#F7F5F0] border-gray-300 text-[#0A0A0A] focus:ring-[#D4AF37]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#2C2C2C]">
                Mot de passe
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="bg-[#F7F5F0] border-gray-300 text-[#0A0A0A] focus:ring-[#D4AF37]"
              />
              <p className="text-xs text-[#2C2C2C]">
                Minimum 6 caractères
              </p>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#D4AF37] text-[#0A0A0A] hover:bg-[#D4AF37]/90 uppercase tracking-wider font-medium"
            >
              {loading ? "Inscription..." : "Créer mon compte"}
            </Button>

            <div className="text-center text-sm">
              <Link
                href="/login"
                className="text-[#D4AF37] hover:underline"
              >
                Déjà un compte ? Se connecter
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}



