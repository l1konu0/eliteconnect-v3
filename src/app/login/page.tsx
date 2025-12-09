"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import EliteConnectLogo from "@/components/elite-connect-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        router.push("/portal");
        router.refresh();
      }
    } catch (error: any) {
      setError(error.message || "Une erreur est survenue lors de la connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] flex items-center justify-center px-6 py-12">
      <Card className="w-full max-w-md border border-gray-200 shadow-xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <EliteConnectLogo size={48} />
          </div>
          <CardTitle className="text-3xl font-serif font-bold text-[#0A0A0A]">
            Connexion
          </CardTitle>
          <CardDescription className="text-[#2C2C2C]">
            Accédez à votre portail membre Elite Connect
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
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
                className="bg-[#F7F5F0] border-gray-300 text-[#0A0A0A] focus:ring-[#D4AF37]"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#D4AF37] text-[#0A0A0A] hover:bg-[#D4AF37]/90 uppercase tracking-wider font-medium"
            >
              {loading ? "Connexion..." : "Se connecter"}
            </Button>

            <div className="text-center space-y-2 text-sm">
              <Link
                href="/signup"
                className="text-[#D4AF37] hover:underline block"
              >
                Pas encore de compte ? Créer un compte
              </Link>
              <Link
                href="/auth/reset-password"
                className="text-[#2C2C2C] hover:text-[#D4AF37] hover:underline block"
              >
                Mot de passe oublié ?
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}



