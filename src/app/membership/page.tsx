"use client";

import EliteConnectLogo from "@/components/elite-connect-logo";
import { useState } from "react";
import Link from "next/link";

export default function MembershipPage() {
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);
  const [showMembershipDropdown, setShowMembershipDropdown] = useState(false);
  const [showEventsDropdown, setShowEventsDropdown] = useState(false);

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
                <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-xl py-4">
                  <Link href="/about" className="block px-4 py-2 hover:bg-gray-100 transition-colors text-[#0A0A0A]">Who We Are</Link>
                  <Link href="/about" className="block px-4 py-2 hover:bg-gray-100 transition-colors text-[#0A0A0A]">Our Story</Link>
                  <Link href="/about" className="block px-4 py-2 hover:bg-gray-100 transition-colors text-[#0A0A0A]">Our Values</Link>
                </div>
              )}
            </div>
            <div 
              className="relative"
              onMouseEnter={() => setShowMembershipDropdown(true)}
              onMouseLeave={() => setShowMembershipDropdown(false)}
            >
              <button className="hover:opacity-60 transition-opacity duration-300 font-medium text-[#D4AF37]">Membership</button>
              {showMembershipDropdown && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-xl py-4">
                  <Link href="/membership" className="block px-4 py-2 hover:bg-gray-100 transition-colors text-[#0A0A0A]">Join the Community</Link>
                  <Link href="/membership" className="block px-4 py-2 hover:bg-gray-100 transition-colors text-[#0A0A0A]">Membership Tiers</Link>
                  <Link href="/membership" className="block px-4 py-2 hover:bg-gray-100 transition-colors text-[#0A0A0A]">Privileges & Benefits</Link>
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
                  <Link href="/events" className="block px-4 py-2 hover:bg-gray-100 transition-colors text-[#0A0A0A]">Upcoming Events</Link>
                  <Link href="/events" className="block px-4 py-2 hover:bg-gray-100 transition-colors text-[#0A0A0A]">Past Events</Link>
                  <Link href="/events" className="block px-4 py-2 hover:bg-gray-100 transition-colors text-[#0A0A0A]">Private Experiences</Link>
                </div>
              )}
            </div>
            <Link href="/investment" className="hover:opacity-60 transition-opacity duration-300">Investment</Link>
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
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setShowApplyModal(false); }}>
              <div>
                <label className="block text-sm font-medium mb-2 text-[#2C2C2C]">Full Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-[#F7F5F0] border border-gray-300 rounded-lg px-4 py-3 text-[#0A0A0A] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-[#2C2C2C]">Profession / Company</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-[#F7F5F0] border border-gray-300 rounded-lg px-4 py-3 text-[#0A0A0A] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
                  placeholder="Entrepreneur, CEO, Designer..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-[#2C2C2C]">Email</label>
                <input 
                  type="email" 
                  required
                  className="w-full bg-[#F7F5F0] border border-gray-300 rounded-lg px-4 py-3 text-[#0A0A0A] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
                  placeholder="john.doe@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-[#2C2C2C]">Message / Motivation</label>
                <textarea 
                  required
                  rows={6}
                  className="w-full bg-[#F7F5F0] border border-gray-300 rounded-lg px-4 py-3 text-[#0A0A0A] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all resize-none"
                  placeholder="Tell us about yourself and your motivation to join Elite Connect..."
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-[#D4AF37] text-[#0A0A0A] py-4 rounded-lg hover:bg-[#D4AF37]/90 transition-colors duration-300 font-medium uppercase tracking-wider"
              >
                Apply for Membership
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

