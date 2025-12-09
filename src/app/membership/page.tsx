"use client";

import EliteConnectLogo from "@/components/elite-connect-logo";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function MembershipPage() {
  const pathname = usePathname();
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);
  const [showMembershipDropdown, setShowMembershipDropdown] = useState(false);
  const [showEventsDropdown, setShowEventsDropdown] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    profession_company: "",
    email: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const supabase = createClient();

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F5F0] text-[#0A0A0A]">
      {/* HEADER */}
      <header className="w-full bg-[#F7F5F0] backdrop-blur-md fixed top-0 z-50 border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <EliteConnectLogo size={40} />
            <span className="text-lg font-semibold tracking-wide">Elite Connect</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8 text-sm">
            <div 
              className="relative"
              onMouseEnter={() => setShowAboutDropdown(true)}
              onMouseLeave={() => setShowAboutDropdown(false)}
            >
              <button className="hover:opacity-60 transition-opacity duration-300">About</button>
              {showAboutDropdown && (
                <div className="absolute top-full left-0 pt-2 w-64">
                  <div className="bg-white border border-gray-200 rounded-lg shadow-xl py-4">
                    <Link href="/about" className="block px-4 py-2 hover:bg-gray-100 transition-colors text-[#0A0A0A]">Who We Are</Link>
                    <Link href="/about" className="block px-4 py-2 hover:bg-gray-100 transition-colors text-[#0A0A0A]">Our Story</Link>
                    <Link href="/about" className="block px-4 py-2 hover:bg-gray-100 transition-colors text-[#0A0A0A]">Our Values</Link>
                  </div>
                </div>
              )}
            </div>
            <Link 
              href="/partners" 
              className={`hover:opacity-60 transition-opacity duration-300 ${
                pathname === '/partners' ? 'font-medium text-[#D4AF37]' : ''
              }`}
            >
              Partners
            </Link>
            <div 
              className="relative"
              onMouseEnter={() => setShowMembershipDropdown(true)}
              onMouseLeave={() => setShowMembershipDropdown(false)}
            >
              <button className="hover:opacity-60 transition-opacity duration-300 font-medium text-[#D4AF37]">Membership</button>
              {showMembershipDropdown && (
                <div className="absolute top-full left-0 pt-2 w-64">
                  <div className="bg-white border border-gray-200 rounded-lg shadow-xl py-4">
                    <Link href="/membership" className="block px-4 py-2 hover:bg-gray-100 transition-colors text-[#0A0A0A]">Join the Community</Link>
                    <Link href="/membership" className="block px-4 py-2 hover:bg-gray-100 transition-colors text-[#0A0A0A]">Membership Tiers</Link>
                    <Link href="/membership" className="block px-4 py-2 hover:bg-gray-100 transition-colors text-[#0A0A0A]">Privileges & Benefits</Link>
                  </div>
                </div>
              )}
            </div>
            <div 
              className="relative"
              onMouseEnter={() => setShowEventsDropdown(true)}
              onMouseLeave={() => setShowEventsDropdown(false)}
            >
              <button className="hover:opacity-60 transition-opacity duration-300">Events</button>
              {showEventsDropdown && (
                <div className="absolute top-full left-0 pt-2 w-64">
                  <div className="bg-white border border-gray-200 rounded-lg shadow-xl py-4">
                    <Link href="/events" className="block px-4 py-2 hover:bg-gray-100 transition-colors text-[#0A0A0A]">Upcoming Events</Link>
                    <Link href="/events" className="block px-4 py-2 hover:bg-gray-100 transition-colors text-[#0A0A0A]">Past Events</Link>
                    <Link href="/events" className="block px-4 py-2 hover:bg-gray-100 transition-colors text-[#0A0A0A]">Private Experiences</Link>
                  </div>
                </div>
              )}
            </div>
            <Link href="/investment" className="hover:opacity-60 transition-opacity duration-300">Investment</Link>
            <Link href="/consulting" className="hover:opacity-60 transition-opacity duration-300">Consulting</Link>
            <Link href="/journal" className="hover:opacity-60 transition-opacity duration-300">Journal</Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/membership"
              className="border border-[#D4AF37] text-[#D4AF37] px-6 py-2 hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-colors duration-300 text-sm uppercase tracking-wide"
            >
              Membre
            </Link>
            <button 
              onClick={() => setShowApplyModal(true)}
              className="border border-[#D4AF37] text-[#D4AF37] px-6 py-2 hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-colors duration-300 text-sm uppercase tracking-wide"
            >
              Request Invitation
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-8">
            Membership
          </h1>
          <p className="text-xl md:text-2xl text-[#2C2C2C] max-w-3xl mx-auto leading-relaxed">
            Membership opens doors to an ecosystem of business, culture, and opportunity — reserved for those shaping tomorrow.
          </p>
        </div>
      </section>

      {/* JOIN THE COMMUNITY */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#D4AF37]">Join the Community</h2>
            <p className="text-lg text-[#2C2C2C] leading-relaxed max-w-3xl">
              Membership is by invitation only. Each applicant is individually reviewed for alignment with Elite Connect&apos;s values.
            </p>
          </div>
        </div>
      </section>

      {/* MEMBERSHIP TIERS */}
      <section className="py-24 px-6 bg-[#F7F5F0]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 space-y-8">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#D4AF37]">Membership Tiers</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-8 bg-white border border-gray-200 rounded-lg hover:border-[#D4AF37]/50 transition-colors">
                <h3 className="text-xl font-serif font-semibold mb-4">Individual Membership</h3>
                <p className="text-[#2C2C2C]">Entrepreneurs, leaders, creatives.</p>
              </div>
              <div className="p-8 bg-white border border-gray-200 rounded-lg hover:border-[#D4AF37]/50 transition-colors">
                <h3 className="text-xl font-serif font-semibold mb-4">Corporate Membership</h3>
                <p className="text-[#2C2C2C]">Companies seeking visibility, partnerships, and network access.</p>
              </div>
              <div className="p-8 bg-white border border-gray-200 rounded-lg hover:border-[#D4AF37]/50 transition-colors">
                <h3 className="text-xl font-serif font-semibold mb-4">Tailored Membership</h3>
                <p className="text-[#2C2C2C]">Fully customized for private clients and families.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRIVILEGES & BENEFITS */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#D4AF37]">Privileges & Benefits</h2>
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {[
                'Invitations to exclusive events',
                'Access to investment and co-ownership projects',
                'Strategic consulting and partnership facilitation',
                'Lifestyle and hospitality perks'
              ].map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4 p-6 bg-[#F7F5F0] rounded-lg border border-gray-200">
                  <div className="w-6 h-6 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-[#D4AF37]"></div>
                  </div>
                  <p className="text-[#2C2C2C]">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-16">
            <button 
              onClick={() => setShowApplyModal(true)}
              className="border-2 border-[#D4AF37] text-[#D4AF37] px-8 py-4 hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-colors duration-300 text-sm uppercase tracking-widest font-medium"
            >
              Apply for Membership
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
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
                <li><Link href="/investment" className="hover:text-[#D4AF37] transition-colors">Investment</Link></li>
                <li><Link href="/consulting" className="hover:text-[#D4AF37] transition-colors">Consulting</Link></li>
                <li><Link href="/journal" className="hover:text-[#D4AF37] transition-colors">Journal</Link></li>
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

      {/* APPLY MODAL */}
      {showApplyModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => setShowApplyModal(false)}>
          <div className="bg-white border border-gray-200 rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-serif font-bold text-[#0A0A0A]">Apply for Membership</h2>
              <button 
                onClick={() => setShowApplyModal(false)}
                className="text-[#2C2C2C] hover:text-[#0A0A0A] text-3xl leading-none"
              >
                ×
              </button>
            </div>
            <p className="text-[#2C2C2C] mb-6">
              Elite Connect membership and investment access are limited and reviewed individually.
            </p>
            {submitSuccess ? (
              <div className="text-center space-y-4 py-8">
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#0A0A0A]">
                  Demande envoyée avec succès !
                </h3>
                <p className="text-[#2C2C2C]">
                  Votre demande d'adhésion a été enregistrée. Nous vous contacterons sous peu.
                </p>
                <button
                  onClick={() => {
                    setShowApplyModal(false);
                    setSubmitSuccess(false);
                    setFormData({ full_name: "", profession_company: "", email: "", message: "" });
                  }}
                  className="mt-4 bg-[#D4AF37] text-[#0A0A0A] px-6 py-2 rounded-lg hover:bg-[#D4AF37]/90 transition-colors"
                >
                  Fermer
                </button>
              </div>
            ) : (
              <form 
                className="space-y-6" 
                onSubmit={async (e) => {
                  e.preventDefault();
                  setSubmitting(true);
                  setSubmitError(null);

                  try {
                    console.log("Tentative d'enregistrement:", formData);
                    
                    const { data, error } = await supabase
                      .from("membership_requests")
                      .insert({
                        full_name: formData.full_name,
                        profession_company: formData.profession_company,
                        email: formData.email,
                        message: formData.message,
                        status: "pending",
                      })
                      .select();

                    if (error) {
                      console.error("❌ Erreur Supabase:", error);
                      console.error("Code d'erreur:", error.code);
                      console.error("Détails:", error.details);
                      console.error("Message:", error.message);
                      throw error;
                    }

                    console.log("✅ Demande enregistrée avec succès:", data);
                    setSubmitSuccess(true);
                  } catch (error: any) {
                    console.error("❌ Erreur complète:", error);
                    let errorMessage = "Une erreur est survenue. Veuillez réessayer.";
                    
                    if (error?.message) {
                      errorMessage = error.message;
                    } else if (error?.details) {
                      errorMessage = error.details;
                    } else if (typeof error === 'string') {
                      errorMessage = error;
                    }
                    
                    setSubmitError(`Erreur: ${errorMessage}. Si le problème persiste, vérifiez les politiques RLS dans Supabase.`);
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                {submitError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {submitError}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2 text-[#2C2C2C]">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    className="w-full bg-[#F7F5F0] border border-gray-300 rounded-lg px-4 py-3 text-[#0A0A0A] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-[#2C2C2C]">Profession / Company</label>
                  <input 
                    type="text" 
                    required
                    value={formData.profession_company}
                    onChange={(e) => setFormData({ ...formData, profession_company: e.target.value })}
                    className="w-full bg-[#F7F5F0] border border-gray-300 rounded-lg px-4 py-3 text-[#0A0A0A] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
                    placeholder="Entrepreneur, CEO, Designer..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-[#2C2C2C]">Email</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#F7F5F0] border border-gray-300 rounded-lg px-4 py-3 text-[#0A0A0A] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
                    placeholder="john.doe@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-[#2C2C2C]">Message / Motivation</label>
                  <textarea 
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#F7F5F0] border border-gray-300 rounded-lg px-4 py-3 text-[#0A0A0A] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all resize-none"
                    placeholder="Tell us about yourself and your motivation to join Elite Connect..."
                  />
                </div>
                <button 
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#D4AF37] text-[#0A0A0A] py-4 rounded-lg hover:bg-[#D4AF37]/90 transition-colors duration-300 font-medium uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? "Envoi en cours..." : "Apply for Membership"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

