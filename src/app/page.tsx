"use client";

import EliteConnectLogo from "@/components/elite-connect-logo";
import { useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);
  const [showMembershipDropdown, setShowMembershipDropdown] = useState(false);
  const [showEventsDropdown, setShowEventsDropdown] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0A] text-[#F5F5F5]">
      {/* HEADER */}
      <header className="w-full bg-[#0A0A0A]/95 backdrop-blur-md fixed top-0 z-50 border-b border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <EliteConnectLogo size={40} />
            <span className="text-lg font-semibold tracking-wide">Elite Connect</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8 text-sm">
            {/* About Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setShowAboutDropdown(true)}
              onMouseLeave={() => setShowAboutDropdown(false)}
            >
              <button className="hover:opacity-60 transition-opacity duration-300">
                About
              </button>
              {showAboutDropdown && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg shadow-xl py-4 animate-slide-down">
                  <Link href="/#about" className="block px-4 py-2 hover:bg-[#2A2A2A] transition-colors">
                    Who We Are
                  </Link>
                  <Link href="/#about" className="block px-4 py-2 hover:bg-[#2A2A2A] transition-colors">
                    Our Story
                  </Link>
                  <Link href="/#about" className="block px-4 py-2 hover:bg-[#2A2A2A] transition-colors">
                    Our Values
                  </Link>
                </div>
              )}
            </div>

            {/* Membership Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setShowMembershipDropdown(true)}
              onMouseLeave={() => setShowMembershipDropdown(false)}
            >
              <button className="hover:opacity-60 transition-opacity duration-300">
                Membership
              </button>
              {showMembershipDropdown && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg shadow-xl py-4 animate-slide-down">
                  <Link href="/#membership" className="block px-4 py-2 hover:bg-[#2A2A2A] transition-colors">
                    Join the Community
                  </Link>
                  <Link href="/#membership" className="block px-4 py-2 hover:bg-[#2A2A2A] transition-colors">
                    Membership Tiers
                  </Link>
                  <Link href="/#membership" className="block px-4 py-2 hover:bg-[#2A2A2A] transition-colors">
                    Privileges & Benefits
                  </Link>
                </div>
              )}
            </div>

            {/* Events Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setShowEventsDropdown(true)}
              onMouseLeave={() => setShowEventsDropdown(false)}
            >
              <button className="hover:opacity-60 transition-opacity duration-300">
                Events
              </button>
              {showEventsDropdown && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg shadow-xl py-4 animate-slide-down">
                  <Link href="/events" className="block px-4 py-2 hover:bg-[#2A2A2A] transition-colors">
                    Upcoming Events
                  </Link>
                  <Link href="/events" className="block px-4 py-2 hover:bg-[#2A2A2A] transition-colors">
                    Past Events
                  </Link>
                  <Link href="/events" className="block px-4 py-2 hover:bg-[#2A2A2A] transition-colors">
                    Private Experiences
                  </Link>
                </div>
              )}
            </div>

            <Link href="/investment" className="hover:opacity-60 transition-opacity duration-300">
              Investment
            </Link>
            <Link href="/consulting" className="hover:opacity-60 transition-opacity duration-300">
              Consulting
            </Link>
            <Link href="/journal" className="hover:opacity-60 transition-opacity duration-300">
              Journal
            </Link>
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
      <section className="flex items-center justify-center h-screen text-center text-white relative overflow-hidden pt-20">
        {/* Video Background */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          style={{ zIndex: 1 }}
        >
          <source src="/videos/video tennis 3 eme choix.mov" type="video/quicktime" />
          <source src="/videos/video tennis 3 eme choix.mov" type="video/mp4" />
        </video>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/80 via-[#0A0A0A]/60 to-[#0A0A0A]/80" style={{ zIndex: 2 }}></div>
        
        {/* Champagne Gold Accent */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 via-transparent to-[#D4AF37]/5" style={{ zIndex: 3 }}></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 animate-fade-in" style={{ zIndex: 4 }}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 leading-tight tracking-tight">
            Where Ambition Meets Opportunity.
          </h1>
          <p className="text-xl md:text-2xl text-[#CFCFCF] mb-12 max-w-2xl mx-auto leading-relaxed">
            A private circle of leaders, creators, and investors shaping Tunisia's future together.
          </p>
          <button 
            onClick={() => {
              scrollToSection('apply');
              setShowApplyModal(true);
            }}
            className="border-2 border-white px-8 py-4 hover:bg-white hover:text-[#0A0A0A] transition-all duration-300 text-sm uppercase tracking-widest font-medium"
          >
            Request Invitation
          </button>
        </div>
      </section>

      {/* PILLARS PREVIEW */}
      <section className="py-24 px-6 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Community & Lifestyle */}
            <div className="text-center space-y-4 animate-slide-up">
              <div className="w-20 h-20 mx-auto bg-[#1D3B2A]/20 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif font-semibold">Community & Lifestyle</h3>
              <p className="text-[#CFCFCF] leading-relaxed">
                Meaningful connections that transcend business.
              </p>
            </div>

            {/* Investment & Growth */}
            <div className="text-center space-y-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-20 h-20 mx-auto bg-[#1D3B2A]/20 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif font-semibold">Investment & Growth</h3>
              <p className="text-[#CFCFCF] leading-relaxed">
                Exclusive co-ownership and wealth-building opportunities.
              </p>
            </div>

            {/* Advisory & Consulting */}
            <div className="text-center space-y-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-20 h-20 mx-auto bg-[#1D3B2A]/20 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif font-semibold">Advisory & Consulting</h3>
              <p className="text-[#CFCFCF] leading-relaxed">
                Strategic guidance for individuals and companies seeking excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-24 px-6 bg-[#1A1A1A]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">About Elite Connect</h2>
          </div>

          {/* Who We Are */}
          <div className="mb-16 space-y-6">
            <h3 className="text-2xl font-serif font-semibold text-[#D4AF37]">Who We Are</h3>
            <p className="text-lg text-[#CFCFCF] leading-relaxed max-w-3xl">
              Elite Connect is a private circle dedicated to uniting Tunisia's most ambitious leaders and visionaries — offering access to powerful connections, curated opportunities, and a shared pursuit of legacy.
            </p>
          </div>

          {/* Our Story */}
          <div className="mb-16 space-y-6">
            <h3 className="text-2xl font-serif font-semibold text-[#D4AF37]">Our Story</h3>
            <p className="text-lg text-[#CFCFCF] leading-relaxed max-w-3xl">
              Born from a desire to connect Tunisia's brightest minds, Elite Connect was founded to bridge social and professional ecosystems — blending business, culture, and influence in a single community.
            </p>
          </div>

          {/* Our Values */}
          <div className="space-y-6">
            <h3 className="text-2xl font-serif font-semibold text-[#D4AF37]">Our Values</h3>
            <div className="grid md:grid-cols-5 gap-6 mt-8">
              {['Discretion', 'Authenticity', 'Excellence', 'Ambition', 'Legacy'].map((value, index) => (
                <div key={index} className="text-center p-6 bg-[#0A0A0A] rounded-lg border border-[#2A2A2A] hover:border-[#D4AF37]/50 transition-colors">
                  <p className="text-lg font-medium">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-center text-xl text-[#CFCFCF] mt-16 italic max-w-3xl mx-auto">
            "Elite Connect was built on one belief — that curated connections create both personal and financial growth."
          </p>
        </div>
      </section>

      {/* MEMBERSHIP SECTION */}
      <section id="membership" className="py-24 px-6 bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">Membership</h2>
            <p className="text-xl text-[#CFCFCF] max-w-3xl mx-auto">
              Membership opens doors to an ecosystem of business, culture, and opportunity — reserved for those shaping tomorrow.
            </p>
          </div>

          {/* Join the Community */}
          <div className="mb-16 space-y-6">
            <h3 className="text-2xl font-serif font-semibold text-[#D4AF37]">Join the Community</h3>
            <p className="text-lg text-[#CFCFCF] leading-relaxed max-w-3xl">
              Membership is by invitation only. Each applicant is individually reviewed for alignment with Elite Connect's values.
            </p>
          </div>

          {/* Membership Tiers */}
          <div className="mb-16 space-y-8">
            <h3 className="text-2xl font-serif font-semibold text-[#D4AF37]">Membership Tiers</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-8 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg hover:border-[#D4AF37]/50 transition-colors">
                <h4 className="text-xl font-serif font-semibold mb-4">Individual Membership</h4>
                <p className="text-[#CFCFCF]">Entrepreneurs, leaders, creatives.</p>
              </div>
              <div className="p-8 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg hover:border-[#D4AF37]/50 transition-colors">
                <h4 className="text-xl font-serif font-semibold mb-4">Corporate Membership</h4>
                <p className="text-[#CFCFCF]">Companies seeking visibility, partnerships, and network access.</p>
              </div>
              <div className="p-8 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg hover:border-[#D4AF37]/50 transition-colors">
                <h4 className="text-xl font-serif font-semibold mb-4">Tailored Membership</h4>
                <p className="text-[#CFCFCF]">Fully customized for private clients and families.</p>
              </div>
            </div>
          </div>

          {/* Privileges & Benefits */}
          <div className="space-y-6">
            <h3 className="text-2xl font-serif font-semibold text-[#D4AF37]">Privileges & Benefits</h3>
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {[
                'Invitations to exclusive events',
                'Access to investment and co-ownership projects',
                'Strategic consulting and partnership facilitation',
                'Lifestyle and hospitality perks'
              ].map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4 p-6 bg-[#1A1A1A] rounded-lg border border-[#2A2A2A]">
                  <div className="w-6 h-6 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-[#D4AF37]"></div>
                  </div>
                  <p className="text-[#CFCFCF]">{benefit}</p>
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
      <footer className="mt-auto bg-[#0A0A0A] py-12 px-6 border-t border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <EliteConnectLogo size={32} />
                <span className="text-lg font-semibold">Elite Connect</span>
              </div>
              <p className="text-sm text-[#CFCFCF]">
                A private circle of leaders shaping Tunisia's future.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Navigation</h4>
              <ul className="space-y-2 text-sm text-[#CFCFCF]">
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
                  <a key={index} href="#" className="w-10 h-10 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center hover:border-[#D4AF37] transition-colors">
                    <span className="text-xs text-[#CFCFCF]">{social[0]}</span>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-[#CFCFCF]">
                <li><Link href="#" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-[#D4AF37] transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="text-center text-sm text-[#CFCFCF] pt-8 border-t border-[#2A2A2A]">
            <p>©️ 2025 Elite Connect. All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      {/* APPLY MODAL */}
      {showApplyModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setShowApplyModal(false)}>
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-serif font-bold">Request an Invitation</h2>
              <button 
                onClick={() => setShowApplyModal(false)}
                className="text-[#CFCFCF] hover:text-white text-3xl leading-none"
              >
                ×
              </button>
            </div>
            <p className="text-[#CFCFCF] mb-6">
              Elite Connect membership and investment access are limited and reviewed individually.
            </p>
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setShowApplyModal(false); }}>
              <div>
                <label className="block text-sm font-medium mb-2 text-[#CFCFCF]">Full Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-[#CFCFCF]">Profession / Company</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
                  placeholder="Entrepreneur, CEO, Designer..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-[#CFCFCF]">Email</label>
                <input 
                  type="email" 
                  required
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
                  placeholder="john.doe@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-[#CFCFCF]">Message / Motivation</label>
                <textarea 
                  required
                  rows={6}
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all resize-none"
                  placeholder="Tell us about yourself and your motivation to join Elite Connect..."
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-[#D4AF37] text-[#0A0A0A] py-4 rounded-lg hover:bg-[#D4AF37]/90 transition-colors duration-300 font-medium uppercase tracking-wider"
              >
                Request an Invitation
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
