import Link from "next/link";
import EliteConnectLogo from "@/components/elite-connect-logo";
import Header from "@/components/header";
import { createClient } from "@/lib/supabase/server";

// ============================================
// INTERFACE PARTENAIRE
// ============================================
interface Partner {
  id: string;
  name: string;
  category: string;
  logo_url: string | null;
  website_url: string | null;
  description: string | null;
}

// ============================================
// COMPOSANT CARTE PARTENAIRE
// ============================================
interface PartnerCardProps {
  partner: Partner;
}

function PartnerCard({ partner }: PartnerCardProps) {
  const CardContent = (
    <div className="group flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-lg hover:border-[#D4AF37] hover:shadow-lg transition-all duration-300">
      {/* Image du logo partenaire */}
      <div className="w-full h-32 mb-4 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden">
        {partner.logo_url ? (
          <img
            src={partner.logo_url}
            alt={partner.name}
            className="h-20 w-auto object-contain max-w-full"
          />
        ) : (
          <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-xs text-gray-400 font-medium">Logo</span>
          </div>
        )}
      </div>

      {/* Nom du partenaire */}
      <h3 className="text-center text-sm font-medium text-[#0A0A0A] group-hover:text-[#D4AF37] transition-colors">
        {partner.name}
      </h3>
    </div>
  );

  if (partner.website_url) {
    return (
      <a
        href={partner.website_url}
        target="_blank"
        rel="noopener noreferrer"
        className="cursor-pointer"
      >
        {CardContent}
      </a>
    );
  }

  return CardContent;
}

// ============================================
// COMPOSANT SECTION PARTENAIRES
// ============================================
interface PartnersSectionProps {
  title: string;
  partners: Partner[];
}

function PartnersSection({ title, partners }: PartnersSectionProps) {
  if (partners.length === 0) {
    return null; // Ne pas afficher la section si elle est vide
  }

  return (
    <section className="mb-16">
      {/* Titre de la section */}
      <h2 className="text-3xl md:text-4xl font-serif font-semibold text-[#0A0A0A] mb-8 text-center">
        {title}
      </h2>

      {/* Grille responsive des partenaires */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {partners.map((partner) => (
          <PartnerCard key={partner.id} partner={partner} />
        ))}
      </div>
    </section>
  );
}

// ============================================
// PAGE PRINCIPALE
// ============================================
export default async function PartnersPage() {
  const supabase = await createClient();

  // Récupérer tous les partenaires actifs
  const { data: partners, error } = await supabase
    .from("partners")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erreur chargement partenaires:", error);
  }

  // Grouper les partenaires par catégorie
  const partnersByCategory = {
    strategic: partners?.filter((p) => p.category === "strategic") || [],
    technology: partners?.filter((p) => p.category === "technology") || [],
    brands: partners?.filter((p) => p.category === "brands") || [],
    other: partners?.filter((p) => p.category === "other") || [],
  };

  const categoryLabels: Record<string, string> = {
    strategic: "Strategic Partners",
    technology: "Technology Partners",
    brands: "Brands & Collaborations",
    other: "Other Partners",
  };
  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      {/* Header */}
      <Header />

      {/* Contenu principal */}
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Titre principal */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-[#0A0A0A] mb-4">
              Our Partners
            </h1>
            <p className="text-lg text-[#2C2C2C] max-w-2xl mx-auto">
              We are proud to collaborate with exceptional organizations and brands that share our vision of excellence and innovation.
            </p>
          </div>

          {/* Sections des partenaires par catégorie */}
          {Object.entries(partnersByCategory).map(([category, categoryPartners]) => (
            <PartnersSection
              key={category}
              title={categoryLabels[category] || category}
              partners={categoryPartners}
            />
          ))}

          {/* Message si aucun partenaire */}
          {partners?.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[#2C2C2C] text-lg">Aucun partenaire pour le moment.</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto bg-white py-12 px-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <EliteConnectLogo size={32} />
                <span className="text-lg font-semibold">Elite Connect</span>
              </div>
              <p className="text-sm text-[#2C2C2C]">
                A private circle of leaders shaping Tunisia&apos;s future.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Navigation</h4>
              <ul className="space-y-2 text-sm text-[#2C2C2C]">
                <li><Link href="/" className="hover:text-[#D4AF37] transition-colors">Home</Link></li>
                <li><Link href="/about" className="hover:text-[#D4AF37] transition-colors">About</Link></li>
                <li><Link href="/membership" className="hover:text-[#D4AF37] transition-colors">Membership</Link></li>
                <li><Link href="/partners" className="hover:text-[#D4AF37] transition-colors">Partners</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                {['Instagram', 'LinkedIn', 'Twitter'].map((social, index) => (
                  <a key={index} href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-[#D4AF37] transition-colors">
                    <span className="text-xs text-[#2C2C2C]">{social[0]}</span>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-[#2C2C2C]">
                <li><Link href="#" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-[#D4AF37] transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="text-center text-sm text-[#2C2C2C] pt-8 border-t border-gray-200">
            <p>©️ 2025 Elite Connect. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

