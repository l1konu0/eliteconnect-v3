"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function TestSupabasePage() {
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const testConnection = async () => {
    setLoading(true);
    setResult("Test en cours...\n");

    try {
      // Test 1 : Vérifier les variables d'environnement
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      
      setResult(prev => prev + `✅ URL Supabase: ${url ? "Configurée" : "MANQUANTE"}\n`);
      setResult(prev => prev + `   URL: ${url || "N/A"}\n`);
      setResult(prev => prev + `✅ Clé API: ${key ? "Configurée" : "MANQUANTE"}\n`);
      if (key) {
        // Afficher les 30 premiers caractères pour vérification
        setResult(prev => prev + `   Clé (début): ${key.substring(0, 30)}...\n`);
        // Vérifier que c'est bien la clé anon (contient "anon" dans le payload)
        try {
          const payload = JSON.parse(atob(key.split('.')[1]));
          setResult(prev => prev + `   Rôle: ${payload.role || "N/A"}\n`);
          setResult(prev => prev + `   Ref: ${payload.ref || "N/A"}\n`);
        } catch (e) {
          setResult(prev => prev + `   ⚠️ Impossible de décoder la clé\n`);
        }
      }
      setResult(prev => prev + `\n`);

      // Test 2 : Vérifier la connexion
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      setResult(prev => prev + `✅ Connexion Supabase: ${authError ? "Erreur" : "OK"}\n`);
      if (authError) {
        setResult(prev => prev + `   Erreur: ${authError.message}\n`);
      }

      // Test 3 : Tester la lecture de la table
      const { data: readData, error: readError } = await supabase
        .from("membership_requests")
        .select("*")
        .limit(5);

      if (readError) {
        setResult(prev => prev + `\n❌ Erreur lecture: ${readError.message}\n`);
        setResult(prev => prev + `   Code: ${readError.code}\n`);
        setResult(prev => prev + `   Détails: ${readError.details}\n`);
      } else {
        setResult(prev => prev + `\n✅ Lecture OK: ${readData?.length || 0} demandes trouvées\n`);
      }

      // Test 4 : Vérifier le rôle actuel
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      setResult(prev => prev + `\n👤 Rôle actuel: ${currentUser ? "authenticated" : "anon"}\n`);
      setResult(prev => prev + `   User ID: ${currentUser?.id || "Non connecté"}\n`);

      // Test 5 : Tester l'insertion
      const testData = {
        full_name: "Test " + new Date().toLocaleTimeString(),
        profession_company: "Test Company",
        email: `test-${Date.now()}@test.com`,
        message: "Test automatique depuis la page de test",
        status: "pending",
      };

      setResult(prev => prev + `\n🔄 Tentative d'insertion...\n`);
      setResult(prev => prev + `   Données: ${JSON.stringify(testData)}\n`);
      
      const { data: insertData, error: insertError } = await supabase
        .from("membership_requests")
        .insert(testData)
        .select();

      if (insertError) {
        setResult(prev => prev + `\n❌ Erreur insertion:\n`);
        setResult(prev => prev + `   Message: ${insertError.message}\n`);
        setResult(prev => prev + `   Code: ${insertError.code}\n`);
        setResult(prev => prev + `   Détails: ${insertError.details}\n`);
        setResult(prev => prev + `   Hint: ${insertError.hint || "N/A"}\n`);
      } else {
        setResult(prev => prev + `\n✅ Insertion réussie !\n`);
        setResult(prev => prev + `   ID: ${insertData?.[0]?.id}\n`);
        setResult(prev => prev + `   Nom: ${insertData?.[0]?.full_name}\n`);
      }

      // Test 5 : Vérifier à nouveau
      const { data: verifyData } = await supabase
        .from("membership_requests")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1);

      if (verifyData && verifyData.length > 0) {
        setResult(prev => prev + `\n✅ Vérification: Dernière demande trouvée\n`);
        setResult(prev => prev + `   Email: ${verifyData[0].email}\n`);
      }

    } catch (error: any) {
      setResult(prev => prev + `\n❌ Erreur générale: ${error.message}\n`);
      setResult(prev => prev + `   Stack: ${error.stack}\n`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-serif font-bold mb-6 text-[#0A0A0A]">
          Test Supabase - Membership Requests
        </h1>
        
        <button
          onClick={testConnection}
          disabled={loading}
          className="mb-6 bg-[#D4AF37] text-[#0A0A0A] px-6 py-3 rounded-lg hover:bg-[#D4AF37]/90 disabled:opacity-50"
        >
          {loading ? "Test en cours..." : "Lancer le test"}
        </button>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-[#0A0A0A]">Résultats :</h2>
          <pre className="whitespace-pre-wrap font-mono text-sm text-[#0A0A0A] bg-[#F7F5F0] p-4 rounded border">
            {result || "Cliquez sur 'Lancer le test' pour commencer..."}
          </pre>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-[#0A0A0A]">
            <strong>Instructions :</strong>
            <br />1. Cliquez sur "Lancer le test"
            <br />2. Regardez les résultats ci-dessus
            <br />3. Si vous voyez des erreurs, copiez-les et partagez-les
            <br />4. Vérifiez aussi la console du navigateur (F12)
          </p>
        </div>
      </div>
    </div>
  );
}

