"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import EliteConnectLogo from "@/components/elite-connect-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });

      if (error) throw error;

      setSuccess(true);
    } catch (error: any) {
      setError(error.message || "Une erreur est survenue");
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
              Email envoyé !
            </h2>
            <p className="text-[#2C2C2C]">
              Vérifiez votre boîte de réception pour réinitialiser votre mot de passe.
            </p>
            <Link href="/login">
              <Button className="mt-4 bg-[#D4AF37] text-[#0A0A0A] hover:bg-[#D4AF37]/90">
                Retour à la connexion
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F5F0] flex items-center justify-center px-6 py-12">
      <Card className="w-full max-w-md border border-gray-200 shadow-xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <EliteConnectLogo size={48} />
          </div>
          <CardTitle className="text-3xl font-serif font-bold text-[#0A0A0A]">
            Réinitialiser le mot de passe
          </CardTitle>
          <CardDescription className="text-[#2C2C2C]">
            Entrez votre email pour recevoir un lien de réinitialisation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleReset} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

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

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#D4AF37] text-[#0A0A0A] hover:bg-[#D4AF37]/90 uppercase tracking-wider font-medium"
            >
              {loading ? "Envoi..." : "Envoyer le lien"}
            </Button>

            <div className="text-center text-sm">
              <Link
                href="/login"
                className="text-[#D4AF37] hover:underline"
              >
                Retour à la connexion
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}



