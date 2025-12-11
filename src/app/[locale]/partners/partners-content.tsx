"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { PartnersSlider } from "@/components/partners-slider";

interface Partner {
  id: string;
  name: string;
  category: string;
  logo_url: string | null;
  website_url: string | null;
  description: string | null;
}

export function PartnersContent() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPartners() {
      try {
        const supabase = createClient();
        const { data, error: fetchError } = await supabase
          .from("partners")
          .select("*")
          .eq("is_active", true)
          .order("display_order", { ascending: true })
          .order("created_at", { ascending: false });

        if (fetchError) {
          console.error("Erreur chargement partenaires:", fetchError);
          setError("Erreur lors du chargement des partenaires");
          return;
        }

        setPartners(data || []);
      } catch (err) {
        console.error("Erreur:", err);
        setError("Une erreur est survenue");
      } finally {
        setLoading(false);
      }
    }

    fetchPartners();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4AF37] mx-auto mb-4"></div>
          <p className="text-[#2C2C2C]">Chargement des partenaires...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <>
      {/* Slider unique avec tous les partenaires */}
      {partners.length > 0 ? (
        <PartnersSlider
          partners={partners}
          title=""
        />
      ) : (
        <div className="text-center py-16">
          <p className="text-[#2C2C2C] text-lg">Aucun partenaire pour le moment.</p>
        </div>
      )}
    </>
  );
}

