import Link from "next/link";
import EliteConnectLogo from "@/components/elite-connect-logo";
import Header from "@/components/header";
import { PartnersContent } from "./partners-content";

// ============================================
// PAGE PRINCIPALE
// ============================================
export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      {/* Header */}
      <Header />

      {/* Contenu principal */}
      <main className="pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Titre principal */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-[#0A0A0A] mb-3 sm:mb-4">
              Our Partners
            </h1>
            <p className="text-base sm:text-lg text-[#2C2C2C] max-w-2xl mx-auto px-2">
              We are proud to collaborate with exceptional organizations and brands that share our vision of excellence and innovation.
            </p>
          </div>

          {/* Sections des partenaires avec slider */}
          <PartnersContent />
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto bg-white py-8 sm:py-12 px-4 sm:px-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
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

