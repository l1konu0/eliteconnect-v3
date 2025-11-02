"use client";

import EliteConnectLogo from "@/components/elite-connect-logo";
import { useState } from "react";
import Link from "next/link";

export default function ConsultingPage() {
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);
  const [showMembershipDropdown, setShowMembershipDropdown] = useState(false);
  const [showEventsDropdown, setShowEventsDropdown] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F5F0] text-white">
      {/* HEADER */}
      <header className="w-full bg-[#F7F5F0]/95 backdrop-blur-md fixed top-0 z-50 border-b border-gray-200">
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
            <Link href="/investment" className="hover:opacity-60 transition-opacity duration-300">Investment</Link>
            <Link href="/consulting" className="hover:opacity-60 transition-opacity duration-300 font-medium text-[#D4AF37]">Consulting</Link>
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
            Consulting
          </h1>
          <p className="text-xl md:text-2xl text-[#2C2C2C] max-w-3xl mx-auto leading-relaxed">
            Strategic guidance for business development, brand positioning, and partnership acceleration.
          </p>
        </div>
      </section>

      {/* ADVISORY & GROWTH */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 text-[#D4AF37]">Advisory & Growth</h2>
            <div className="bg-[#F7F5F0] border-l-4 border-[#D4AF37] p-8 md:p-12 rounded-lg">
              <p className="text-xl md:text-2xl text-[#2C2C2C] leading-relaxed">
                Our consulting division empowers members and companies through strategic guidance in business development, brand positioning, and partnership acceleration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOR MEMBERS & FOR COMPANIES */}
      <section className="py-24 px-6 bg-[#F7F5F0]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#D4AF37]">For Members</h2>
              <p className="text-lg text-[#2C2C2C] leading-relaxed">
                Consulting benefits included for upper-tier memberships. Access to strategic guidance, network facilitation, and personalized advisory services.
              </p>
              <ul className="space-y-4">
                {[
                  'Personalized business strategy',
                  'Network facilitation',
                  'Brand positioning support',
                  'Partnership development'
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 rounded-full bg-[#D4AF37]"></div>
                    </div>
                    <p className="text-[#2C2C2C]">{benefit}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#D4AF37]">For Companies</h2>
              <p className="text-lg text-[#2C2C2C] leading-relaxed">
                Tailored support for startups or established firms seeking expansion, restructuring, or repositioning.
              </p>
              <ul className="space-y-4">
                {[
                  'Business growth strategy',
                  'Market expansion planning',
                  'Organizational restructuring',
                  'Brand repositioning'
                ].map((service, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 rounded-full bg-[#D4AF37]"></div>
                    </div>
                    <p className="text-[#2C2C2C]">{service}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERTISE AREAS */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-12 text-center">Expertise Areas</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Business & Growth Strategy', desc: 'Strategic planning for sustainable growth and market positioning.' },
              { title: 'Brand Positioning', desc: 'Develop a distinct brand identity and market presence.' },
              { title: 'Networking Acceleration', desc: 'Access to exclusive networks and partnership opportunities.' },
              { title: 'Partnership Development', desc: 'Facilitate strategic partnerships and collaborations.' }
            ].map((area, index) => (
              <div key={index} className="p-8 bg-[#F7F5F0] border border-gray-200 rounded-lg hover:border-[#D4AF37]/50 transition-colors">
                <h3 className="text-xl font-serif font-semibold mb-4 text-[#D4AF37]">{area.title}</h3>
                <p className="text-[#2C2C2C] leading-relaxed">{area.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 px-6 bg-[#F7F5F0]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Ready to Accelerate Your Growth?</h2>
          <p className="text-xl text-[#2C2C2C] max-w-2xl mx-auto mb-12 leading-relaxed">
            Connect with our consulting team to discuss your strategic needs.
          </p>
          <button 
            onClick={() => setShowApplyModal(true)}
            className="border-2 border-[#D4AF37] text-[#D4AF37] px-8 py-4 hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-colors duration-300 text-sm uppercase tracking-widest font-medium"
          >
            Request Consultation
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

      {/* CONSULTATION MODAL */}
      {showApplyModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setShowApplyModal(false)}>
          <div className="bg-white border border-gray-200 rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-serif font-bold">Request Consultation</h2>
              <button onClick={() => setShowApplyModal(false)} className="text-[#2C2C2C] hover:text-white text-3xl leading-none">×</button>
            </div>
            <p className="text-[#2C2C2C] mb-6">Tell us about your consulting needs and we'll connect you with our team.</p>
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setShowApplyModal(false); }}>
              <div>
                <label className="block text-sm font-medium mb-2 text-[#2C2C2C]">Full Name</label>
                <input type="text" required className="w-full bg-[#F7F5F0] border border-gray-200 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-[#2C2C2C]">Company / Organization</label>
                <input type="text" className="w-full bg-[#F7F5F0] border border-gray-200 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent" placeholder="Company Name" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-[#2C2C2C]">Email</label>
                <input type="email" required className="w-full bg-[#F7F5F0] border border-gray-200 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent" placeholder="john.doe@email.com" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-[#2C2C2C]">Consulting Interest</label>
                <select className="w-full bg-[#F7F5F0] border border-gray-200 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent">
                  <option>Business & Growth Strategy</option>
                  <option>Brand Positioning</option>
                  <option>Networking Acceleration</option>
                  <option>Partnership Development</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-[#2C2C2C]">Message</label>
                <textarea required rows={6} className="w-full bg-[#F7F5F0] border border-gray-200 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent resize-none" placeholder="Tell us about your consulting needs..." />
              </div>
              <button type="submit" className="w-full bg-[#D4AF37] text-[#0A0A0A] py-4 rounded-lg hover:bg-[#D4AF37]/90 transition-colors font-medium uppercase tracking-wider">
                Request Consultation
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

