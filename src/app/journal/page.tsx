"use client";

import EliteConnectLogo from "@/components/elite-connect-logo";
import { useState } from "react";
import Link from "next/link";

export default function JournalPage() {
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);
  const [showMembershipDropdown, setShowMembershipDropdown] = useState(false);
  const [showEventsDropdown, setShowEventsDropdown] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'all' | 'highlights' | 'recaps' | 'thoughts' | 'investments'>('all');

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'highlights', label: 'Member Highlights' },
    { id: 'recaps', label: 'Event Recaps' },
    { id: 'thoughts', label: 'Thought Pieces' },
    { id: 'investments', label: 'Investment Spotlights' }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F5F0] text-[#0A0A0A]">
      {/* HEADER */}
      <header className="w-full bg-[#F7F5F0] backdrop-blur-md fixed top-0 z-50 border-b border-gray-200">
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
                    <Link href="/#about" className="block px-4 py-2 hover:bg-[#2A2A2A] transition-colors">Who We Are</Link>
                    <Link href="/#about" className="block px-4 py-2 hover:bg-[#2A2A2A] transition-colors">Our Story</Link>
                    <Link href="/#about" className="block px-4 py-2 hover:bg-[#2A2A2A] transition-colors">Our Values</Link>
                  </div>
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
                <div className="absolute top-full left-0 pt-2 w-64">
                  <div className="bg-white border border-gray-200 rounded-lg shadow-xl py-4">
                    <Link href="/#membership" className="block px-4 py-2 hover:bg-[#2A2A2A] transition-colors">Join the Community</Link>
                    <Link href="/#membership" className="block px-4 py-2 hover:bg-[#2A2A2A] transition-colors">Membership Tiers</Link>
                    <Link href="/#membership" className="block px-4 py-2 hover:bg-[#2A2A2A] transition-colors">Privileges & Benefits</Link>
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
                    <Link href="/events" className="block px-4 py-2 hover:bg-[#2A2A2A] transition-colors">Upcoming Events</Link>
                    <Link href="/events" className="block px-4 py-2 hover:bg-[#2A2A2A] transition-colors">Past Events</Link>
                    <Link href="/events" className="block px-4 py-2 hover:bg-[#2A2A2A] transition-colors">Private Experiences</Link>
                  </div>
                </div>
              )}
            </div>
            <Link href="/investment" className="hover:opacity-60 transition-opacity duration-300">Investment</Link>
            <Link href="/consulting" className="hover:opacity-60 transition-opacity duration-300">Consulting</Link>
            <Link href="/journal" className="hover:opacity-60 transition-opacity duration-300 font-medium text-[#D4AF37]">Journal</Link>
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
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-8">
            Journal
          </h1>
          <p className="text-xl md:text-2xl text-[#2C2C2C] max-w-3xl mx-auto leading-relaxed mb-12">
            Insights, stories, and highlights from the Elite Connect community.
          </p>
        </div>
      </section>

      {/* CATEGORY FILTERS */}
      <section className="px-6 mb-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id as any)}
                className={`px-6 py-2 text-sm uppercase tracking-wider transition-colors border ${
                  activeCategory === category.id
                    ? 'border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/10'
                    : 'border-gray-200 text-[#2C2C2C] hover:border-gray-200/50'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* MEMBER HIGHLIGHTS */}
      {(activeCategory === 'all' || activeCategory === 'highlights') && (
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-serif font-bold mb-8 text-[#D4AF37]">Member Highlights</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {[1, 2].map((item) => (
                <div key={item} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-[#D4AF37]/50 transition-colors">
                  <div className="h-64 bg-gradient-to-br from-[#1D3B2A] to-[#3C5F3C] flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto mb-4 bg-[#D4AF37]/20 rounded-full flex items-center justify-center">
                        <svg className="w-10 h-10 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="text-sm text-[#D4AF37] mb-2">Member Highlight</div>
                    <h3 className="text-2xl font-serif font-semibold mb-4">Success Stories & Collaborations</h3>
                    <p className="text-[#2C2C2C] leading-relaxed mb-4">
                      Discover how Elite Connect members are creating impact through strategic partnerships and innovative ventures.
                    </p>
                    <button className="text-sm text-[#D4AF37] hover:underline uppercase tracking-wide">
                      Read More →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* EVENT RECAPS */}
      {(activeCategory === 'all' || activeCategory === 'recaps') && (
        <section className="py-12 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-serif font-bold mb-8 text-[#D4AF37]">Event Recaps</h2>
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-[#F7F5F0] border border-gray-200 rounded-lg overflow-hidden hover:border-[#D4AF37]/50 transition-colors">
                  <div className="h-48 bg-gradient-to-br from-[#1D3B2A]/50 to-[#3C5F3C]/50 flex items-center justify-center">
                    <svg className="w-12 h-12 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-[#D4AF37] mb-2">Event Recap</div>
                    <h3 className="text-xl font-serif font-semibold mb-3">Photos, Videos & Key Insights</h3>
                    <p className="text-[#2C2C2C] text-sm leading-relaxed">
                      Highlights from recent Elite Connect gatherings with key takeaways and memorable moments.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* THOUGHT PIECES */}
      {(activeCategory === 'all' || activeCategory === 'thoughts') && (
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-serif font-bold mb-8 text-[#D4AF37]">Thought Pieces</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="bg-white border border-gray-200 rounded-lg p-8 hover:border-[#D4AF37]/50 transition-colors">
                  <div className="text-sm text-[#D4AF37] mb-3">Article</div>
                  <h3 className="text-2xl font-serif font-semibold mb-4">Articles on Business, Lifestyle & Innovation</h3>
                  <p className="text-[#2C2C2C] leading-relaxed mb-4">
                    In-depth perspectives on industry trends, strategic insights, and the future of business and lifestyle.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#2C2C2C]">January 15, 2025</span>
                    <button className="text-sm text-[#D4AF37] hover:underline uppercase tracking-wide">
                      Read More →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* INVESTMENT SPOTLIGHTS */}
      {(activeCategory === 'all' || activeCategory === 'investments') && (
        <section className="py-12 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-serif font-bold mb-8 text-[#D4AF37]">Investment Spotlights</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {[1, 2].map((item) => (
                <div key={item} className="bg-[#F7F5F0] border border-gray-200 rounded-lg overflow-hidden hover:border-[#D4AF37]/50 transition-colors">
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
                    <div className="text-sm text-[#D4AF37] mb-2">Investment Spotlight</div>
                    <h3 className="text-2xl font-serif font-semibold mb-4">Projects Led or Backed by Elite Connect</h3>
                    <p className="text-[#2C2C2C] leading-relaxed mb-4">
                      Explore our portfolio of investments and co-ownership projects making an impact in hospitality, lifestyle, and innovation.
                    </p>
                    <button className="text-sm text-[#D4AF37] hover:underline uppercase tracking-wide">
                      Learn More →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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
              <h2 className="text-3xl font-serif font-bold">Request an Invitation</h2>
              <button onClick={() => setShowApplyModal(false)} className="text-[#2C2C2C] hover:text-white text-3xl leading-none">×</button>
            </div>
            <p className="text-[#2C2C2C] mb-6">Elite Connect membership and investment access are limited and reviewed individually.</p>
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setShowApplyModal(false); }}>
              <div>
                <label className="block text-sm font-medium mb-2 text-[#2C2C2C]">Full Name</label>
                <input type="text" required className="w-full bg-[#F7F5F0] border border-gray-200 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-[#2C2C2C]">Profession / Company</label>
                <input type="text" required className="w-full bg-[#F7F5F0] border border-gray-200 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent" placeholder="Entrepreneur, CEO, Designer..." />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-[#2C2C2C]">Email</label>
                <input type="email" required className="w-full bg-[#F7F5F0] border border-gray-200 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent" placeholder="john.doe@email.com" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-[#2C2C2C]">Message / Motivation</label>
                <textarea required rows={6} className="w-full bg-[#F7F5F0] border border-gray-200 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent resize-none" placeholder="Tell us about yourself and your motivation to join Elite Connect..." />
              </div>
              <button type="submit" className="w-full bg-[#D4AF37] text-[#0A0A0A] py-4 rounded-lg hover:bg-[#D4AF37]/90 transition-colors font-medium uppercase tracking-wider">
                Request an Invitation
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

