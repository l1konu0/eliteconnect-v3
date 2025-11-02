"use client";

import EliteConnectLogo from "@/components/elite-connect-logo";
import { useState } from "react";
import Link from "next/link";

export default function InvestmentPage() {
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);
  const [showMembershipDropdown, setShowMembershipDropdown] = useState(false);
  const [showEventsDropdown, setShowEventsDropdown] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F5F0] text-[#0A0A0A]">
      {/* HEADER */}
      <header className="w-full bg-[#F7F5F0]/95 backdrop-blur-md fixed top-0 z-50 border-b border-gray-300">
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
              <button className="hover:opacity-60 transition-opacity duration-300">
                About
              </button>
              {showAboutDropdown && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-xl py-4">
                  <Link href="/#about" className="block px-4 py-2 hover:bg-[#2A2A2A] transition-colors">Who We Are</Link>
                  <Link href="/#about" className="block px-4 py-2 hover:bg-[#2A2A2A] transition-colors">Our Story</Link>
                  <Link href="/#about" className="block px-4 py-2 hover:bg-[#2A2A2A] transition-colors">Our Values</Link>
                </div>
              )}
            </div>
            <div 
              className="relative"
              onMouseEnter={() => setShowMembershipDropdown(true)}
              onMouseLeave={() => setShowMembershipDropdown(false)}
            >
              <button className="hover:opacity-60 transition-opacity duration-300">Membership</button>
              {showMembershipDropdown && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-xl py-4">
                  <Link href="/#membership" className="block px-4 py-2 hover:bg-[#2A2A2A] transition-colors">Join the Community</Link>
                  <Link href="/#membership" className="block px-4 py-2 hover:bg-[#2A2A2A] transition-colors">Membership Tiers</Link>
                  <Link href="/#membership" className="block px-4 py-2 hover:bg-[#2A2A2A] transition-colors">Privileges & Benefits</Link>
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
                <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-xl py-4">
                  <Link href="/events" className="block px-4 py-2 hover:bg-[#2A2A2A] transition-colors">Upcoming Events</Link>
                  <Link href="/events" className="block px-4 py-2 hover:bg-[#2A2A2A] transition-colors">Past Events</Link>
                  <Link href="/events" className="block px-4 py-2 hover:bg-[#2A2A2A] transition-colors">Private Experiences</Link>
                </div>
              )}
            </div>
            <Link href="/investment" className="hover:opacity-60 transition-opacity duration-300 font-medium text-[#D4AF37]">Investment</Link>
            <Link href="/consulting" className="hover:opacity-60 transition-opacity duration-300">Consulting</Link>
            <Link href="/journal" className="hover:opacity-60 transition-opacity duration-300">Journal</Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
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
            Investment
          </h1>
          <p className="text-xl md:text-2xl text-[#2C2C2C] max-w-3xl mx-auto leading-relaxed">
            Wealth creation, business co-ownership, and project incubation.
          </p>
        </div>
      </section>

      {/* INVESTMENT VISION */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 text-[#D4AF37]">Investment Vision</h2>
            <div className="bg-[#F7F5F0] border-l-4 border-[#D4AF37] p-8 rounded-lg">
              <p className="text-2xl md:text-3xl font-serif italic mb-6 text-white">
                "Elite Connect bridges the gap between visionaries and investors — creating ventures where members don't just participate, they own."
              </p>
              <p className="text-lg text-[#2C2C2C] leading-relaxed">
                We identify, incubate, and fund promising projects in hospitality, lifestyle, tech, and real estate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CO-OWNERSHIP & PARTNERSHIPS */}
      <section className="py-24 px-6 bg-[#F7F5F0]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-12">Co-Ownership & Partnerships</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-8 md:p-12">
            <p className="text-xl md:text-2xl text-[#2C2C2C] leading-relaxed mb-6">
              Members have the opportunity to become co-founders or shareholders in exclusive Elite Connect ventures — private lounges, boutique brands, and digital startups.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-12">
              <div className="p-6 bg-[#F7F5F0] rounded-lg border border-gray-200">
                <h3 className="text-xl font-serif font-semibold mb-4 text-[#D4AF37]">Private Lounges</h3>
                <p className="text-[#2C2C2C]">Exclusive members-only spaces for networking and lifestyle experiences.</p>
              </div>
              <div className="p-6 bg-[#F7F5F0] rounded-lg border border-gray-200">
                <h3 className="text-xl font-serif font-semibold mb-4 text-[#D4AF37]">Boutique Brands</h3>
                <p className="text-[#2C2C2C]">Curated luxury brands and lifestyle products with member ownership opportunities.</p>
              </div>
              <div className="p-6 bg-[#F7F5F0] rounded-lg border border-gray-200">
                <h3 className="text-xl font-serif font-semibold mb-4 text-[#D4AF37]">Digital Startups</h3>
                <p className="text-[#2C2C2C]">Tech innovation projects with strategic investment and co-ownership models.</p>
              </div>
              <div className="p-6 bg-[#F7F5F0] rounded-lg border border-gray-200">
                <h3 className="text-xl font-serif font-semibold mb-4 text-[#D4AF37]">Real Estate</h3>
                <p className="text-[#2C2C2C]">Premium property development and investment opportunities.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INAUGURATED PROJECTS */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-12">Inaugurated Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#F7F5F0] border border-gray-200 rounded-lg overflow-hidden hover:border-[#D4AF37]/50 transition-colors">
              <div className="h-64 bg-gradient-to-br from-[#1D3B2A] to-[#3C5F3C] flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-[#D4AF37]/20 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-serif font-semibold mb-4">The House by Elite Connect</h3>
                <p className="text-[#2C2C2C] leading-relaxed">
                  Upscale lounge concept providing an exclusive space for members to connect, work, and socialize in a sophisticated environment.
                </p>
              </div>
            </div>
            <div className="bg-[#F7F5F0] border border-gray-200 rounded-lg overflow-hidden hover:border-[#D4AF37]/50 transition-colors">
              <div className="h-64 bg-gradient-to-br from-[#D4AF37]/20 to-[#1D3B2A] flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-[#D4AF37]/20 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-serif font-semibold mb-4">EC Ventures</h3>
                <p className="text-[#2C2C2C] leading-relaxed">
                  Investment arm focused on hospitality and innovation, identifying and funding promising projects with high growth potential.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INVESTMENT OPPORTUNITIES */}
      <section className="py-24 px-6 bg-[#F7F5F0]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">Investment Opportunities</h2>
          <p className="text-xl text-[#2C2C2C] max-w-2xl mx-auto mb-12 leading-relaxed">
            Invitation-only access to active or upcoming investment rounds.
          </p>
          <button 
            onClick={() => setShowApplyModal(true)}
            className="border-2 border-[#D4AF37] text-[#D4AF37] px-8 py-4 hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-colors duration-300 text-sm uppercase tracking-widest font-medium"
          >
            Request Access to Opportunities
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-auto bg-[#F7F5F0] py-12 px-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <EliteConnectLogo size={32} />
                <span className="text-lg font-semibold">Elite Connect</span>
              </div>
              <p className="text-sm text-[#2C2C2C]">A private circle of leaders shaping Tunisia's future.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Navigation</h4>
              <ul className="space-y-2 text-sm text-[#2C2C2C]">
                <li><Link href="/" className="hover:text-[#D4AF37] transition-colors">Home</Link></li>
                <li><Link href="/#about" className="hover:text-[#D4AF37] transition-colors">About</Link></li>
                <li><Link href="/#membership" className="hover:text-[#D4AF37] transition-colors">Membership</Link></li>
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
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setShowApplyModal(false)}>
          <div className="bg-white border border-gray-200 rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-serif font-bold">Request Access to Opportunities</h2>
              <button onClick={() => setShowApplyModal(false)} className="text-[#2C2C2C] hover:text-white text-3xl leading-none">×</button>
            </div>
            <p className="text-[#2C2C2C] mb-6">Elite Connect investment opportunities are invitation-only and reviewed individually.</p>
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setShowApplyModal(false); }}>
              <div>
                <label className="block text-sm font-medium mb-2 text-[#2C2C2C]">Full Name</label>
                <input type="text" required className="w-full bg-[#F7F5F0] border border-gray-200 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-[#2C2C2C]">Email</label>
                <input type="email" required className="w-full bg-[#F7F5F0] border border-gray-200 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent" placeholder="john.doe@email.com" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-[#2C2C2C]">Message</label>
                <textarea required rows={6} className="w-full bg-[#F7F5F0] border border-gray-200 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent resize-none" placeholder="Tell us about your investment interests..." />
              </div>
              <button type="submit" className="w-full bg-[#D4AF37] text-[#0A0A0A] py-4 rounded-lg hover:bg-[#D4AF37]/90 transition-colors font-medium uppercase tracking-wider">
                Request Access
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

