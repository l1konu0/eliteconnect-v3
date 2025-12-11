"use client";

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Header from "@/components/header";

export default function HomePage() {
  const t = useTranslations();
  return (
    <div className="flex flex-col min-h-screen bg-[#F7F5F0] text-[#0A0A0A]">
      {/* HEADER */}
      <Header />

      {/* HERO SECTION */}
      <section className="flex items-center justify-center min-h-screen text-center text-white relative overflow-hidden pt-20 pb-12">
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
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 animate-fade-in" style={{ zIndex: 4 }}>
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold mb-4 sm:mb-6 leading-tight tracking-tight">
            {t('home.hero.title')}
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-2">
            {t('home.hero.subtitle')}
          </p>
          <Link 
            href="/membership"
            className="elite-button-glow border-2 border-white bg-black/40 backdrop-blur-md text-white px-6 sm:px-8 py-3 sm:py-4 hover:bg-white hover:text-[#0A0A0A] transition-all duration-300 text-xs sm:text-sm uppercase tracking-widest font-medium inline-block shadow-2xl font-bold relative overflow-hidden"
          >
            <span className="relative z-10">Request Invitation</span>
          </Link>
        </div>
      </section>

      {/* PILLARS PREVIEW */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-[#F7F5F0]">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
            {/* Community & Lifestyle */}
            <div className="text-center space-y-4 animate-slide-up elite-card-hover">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#1D3B2A]/20 to-[#3C5F3C]/20 rounded-full flex items-center justify-center mb-6 elite-hover animate-float">
                <svg className="w-10 h-10 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-semibold">{t('home.pillars.community.title')}</h3>
              <p className="text-sm sm:text-base text-[#2C2C2C] leading-relaxed">
                {t('home.pillars.community.description')}
              </p>
            </div>

            {/* Investment & Growth */}
            <div className="text-center space-y-4 animate-slide-up elite-card-hover" style={{ animationDelay: '0.1s' }}>
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#1D3B2A]/20 to-[#3C5F3C]/20 rounded-full flex items-center justify-center mb-6 elite-hover animate-float" style={{ animationDelay: '0.2s' }}>
                <svg className="w-10 h-10 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-semibold">{t('home.pillars.investment.title')}</h3>
              <p className="text-sm sm:text-base text-[#2C2C2C] leading-relaxed">
                {t('home.pillars.investment.description')}
              </p>
            </div>

            {/* Advisory & Consulting */}
            <div className="text-center space-y-4 animate-slide-up elite-card-hover" style={{ animationDelay: '0.2s' }}>
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#1D3B2A]/20 to-[#3C5F3C]/20 rounded-full flex items-center justify-center mb-6 elite-hover animate-float" style={{ animationDelay: '0.4s' }}>
                <svg className="w-10 h-10 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-semibold">{t('home.pillars.advisory.title')}</h3>
              <p className="text-sm sm:text-base text-[#2C2C2C] leading-relaxed">
                {t('home.pillars.advisory.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW SECTION */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-6 sm:mb-8">{t('home.about.title')}</h2>
          <p className="text-base sm:text-lg text-[#2C2C2C] leading-relaxed max-w-3xl mx-auto mb-6 sm:mb-8 px-2">
            {t('home.about.description')}
          </p>
          <Link 
            href="/about"
            className="border-2 border-[#D4AF37] text-[#D4AF37] px-6 sm:px-8 py-3 sm:py-4 hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-colors duration-300 text-xs sm:text-sm uppercase tracking-widest font-medium inline-block"
          >
            {t('home.about.learnMore')}
          </Link>
        </div>
      </section>

      {/* MEMBERSHIP PREVIEW SECTION */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-[#F7F5F0]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-6 sm:mb-8">{t('home.membership.title')}</h2>
          <p className="text-base sm:text-lg md:text-xl text-[#2C2C2C] max-w-3xl mx-auto mb-6 sm:mb-8 px-2">
            {t('home.membership.description')}
          </p>
          <Link 
            href="/membership"
            className="border-2 border-[#D4AF37] text-[#D4AF37] px-6 sm:px-8 py-3 sm:py-4 hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-colors duration-300 text-xs sm:text-sm uppercase tracking-widest font-medium inline-block"
          >
            {t('home.membership.viewDetails')}
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-auto bg-white py-8 sm:py-12 px-4 sm:px-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src="/logo-elite-connect.png"
                  alt="Elite Connect Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                  style={{ maxWidth: '48px', maxHeight: '48px' }}
                />
                <span className="text-lg font-semibold">Elite Connect</span>
              </div>
              <p className="text-sm text-[#2C2C2C]">
                A private circle of leaders shaping Tunisia&apos;s future.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('footer.navigation')}</h4>
              <ul className="space-y-2 text-sm text-[#2C2C2C]">
                <li><Link href="/" className="hover:text-[#D4AF37] transition-colors">{t('common.home')}</Link></li>
                <li><Link href="/about" className="hover:text-[#D4AF37] transition-colors">{t('common.about')}</Link></li>
                <li><Link href="/membership" className="hover:text-[#D4AF37] transition-colors">{t('common.membership')}</Link></li>
                <li><Link href="/investment" className="hover:text-[#D4AF37] transition-colors">{t('common.investment')}</Link></li>
                <li><Link href="/consulting" className="hover:text-[#D4AF37] transition-colors">{t('common.consulting')}</Link></li>
                <li><Link href="/journal" className="hover:text-[#D4AF37] transition-colors">{t('common.journal')}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('footer.connect')}</h4>
              <div className="flex space-x-4">
                {['Instagram', 'LinkedIn', 'Twitter'].map((social, index) => (
                  <a key={index} href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-[#D4AF37] transition-colors">
                    <span className="text-xs text-[#2C2C2C]">{social[0]}</span>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('footer.legal')}</h4>
              <ul className="space-y-2 text-sm text-[#2C2C2C]">
                <li><Link href="#" className="hover:text-[#D4AF37] transition-colors">{t('footer.privacy')}</Link></li>
                <li><Link href="#" className="hover:text-[#D4AF37] transition-colors">{t('footer.terms')}</Link></li>
              </ul>
            </div>
          </div>
          <div className="text-center text-sm text-[#2C2C2C] pt-8 border-t border-gray-200">
            <p>{t('footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
