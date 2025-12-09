"use client";

import EliteConnectLogo from "@/components/elite-connect-logo";
import Link from "next/link";
import Header from "@/components/header";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F7F5F0] text-[#0A0A0A]">
      {/* HEADER */}
      <Header />

      {/* HERO SECTION */}
      <section className="flex items-center justify-center h-screen text-center text-white relative overflow-hidden pt-20">
        {/* Video Background */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 1 }}
        >
          <source src="/videos/video tennis 3 eme choix.mov" type="video/quicktime" />
          <source src="/videos/video tennis 3 eme choix.mov" type="video/mp4" />
        </video>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 animate-fade-in" style={{ zIndex: 4 }}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 leading-tight tracking-tight">
            Where Ambition Meets Opportunity.
          </h1>
          <p className="text-xl md:text-2xl text-white mb-12 max-w-2xl mx-auto leading-relaxed">
            A private circle of leaders, creators, and investors shaping Tunisia&apos;s future together.
          </p>
          <Link 
            href="/membership"
            className="elite-button-glow border-2 border-white bg-black/40 backdrop-blur-md text-white px-8 py-4 hover:bg-white hover:text-[#0A0A0A] transition-all duration-300 text-sm uppercase tracking-widest font-medium inline-block shadow-2xl font-bold relative overflow-hidden"
          >
            <span className="relative z-10">Request Invitation</span>
          </Link>
        </div>
      </section>

      {/* PILLARS PREVIEW */}
      <section className="py-24 px-6 bg-[#F7F5F0]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Community & Lifestyle */}
            <div className="text-center space-y-4 animate-slide-up elite-card-hover">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#1D3B2A]/20 to-[#3C5F3C]/20 rounded-full flex items-center justify-center mb-6 elite-hover animate-float">
                <svg className="w-10 h-10 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif font-semibold">Community & Lifestyle</h3>
              <p className="text-[#2C2C2C] leading-relaxed">
                Meaningful connections that transcend business.
              </p>
            </div>

            {/* Investment & Growth */}
            <div className="text-center space-y-4 animate-slide-up elite-card-hover" style={{ animationDelay: '0.1s' }}>
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#1D3B2A]/20 to-[#3C5F3C]/20 rounded-full flex items-center justify-center mb-6 elite-hover animate-float" style={{ animationDelay: '0.2s' }}>
                <svg className="w-10 h-10 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif font-semibold">Investment & Growth</h3>
              <p className="text-[#2C2C2C] leading-relaxed">
                Exclusive co-ownership and wealth-building opportunities.
              </p>
            </div>

            {/* Advisory & Consulting */}
            <div className="text-center space-y-4 animate-slide-up elite-card-hover" style={{ animationDelay: '0.2s' }}>
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#1D3B2A]/20 to-[#3C5F3C]/20 rounded-full flex items-center justify-center mb-6 elite-hover animate-float" style={{ animationDelay: '0.4s' }}>
                <svg className="w-10 h-10 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif font-semibold">Advisory & Consulting</h3>
              <p className="text-[#2C2C2C] leading-relaxed">
                Strategic guidance for individuals and companies seeking excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW SECTION */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">About Elite Connect</h2>
          <p className="text-lg text-[#2C2C2C] leading-relaxed max-w-3xl mx-auto mb-8">
            Elite Connect is a private circle dedicated to uniting Tunisia&apos;s most ambitious leaders and visionaries — offering access to powerful connections, curated opportunities, and a shared pursuit of legacy.
          </p>
          <Link 
            href="/about"
            className="border-2 border-[#D4AF37] text-[#D4AF37] px-8 py-4 hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-colors duration-300 text-sm uppercase tracking-widest font-medium inline-block"
          >
            Learn More About Us
          </Link>
        </div>
      </section>

      {/* MEMBERSHIP PREVIEW SECTION */}
      <section className="py-24 px-6 bg-[#F7F5F0]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">Membership</h2>
          <p className="text-xl text-[#2C2C2C] max-w-3xl mx-auto mb-8">
            Membership opens doors to an ecosystem of business, culture, and opportunity — reserved for those shaping tomorrow.
          </p>
          <Link 
            href="/membership"
            className="border-2 border-[#D4AF37] text-[#D4AF37] px-8 py-4 hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-colors duration-300 text-sm uppercase tracking-widest font-medium inline-block"
          >
            View Membership Details
          </Link>
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
    </div>
  );
}
