"use client";

import EliteConnectLogo from "@/components/elite-connect-logo";
import { useState } from "react";

export default function SohoPage() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showMembershipModal, setShowMembershipModal] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F5F0] text-[#2C2C2C] font-serif">
      {/* HEADER */}
      <header className="w-full bg-[#F7F5F0]/90 backdrop-blur-md fixed top-0 z-50 border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <EliteConnectLogo size={40} />
            <span className="text-lg font-semibold tracking-wide font-serif-elegant">Elite Connect</span>
          </div>

          <nav className="hidden md:flex space-x-8 text-sm">
            <button 
              onClick={() => scrollToSection('about')}
              className="hover:opacity-60 transition-opacity duration-300"
            >
              À propos
            </button>
            <button 
              onClick={() => setShowMembershipModal(true)}
              className="hover:opacity-60 transition-opacity duration-300"
            >
              Adhésion
            </button>
            <button 
              onClick={() => scrollToSection('houses')}
              className="hover:opacity-60 transition-opacity duration-300"
            >
              Lieux
            </button>
            <button 
              onClick={() => scrollToSection('news')}
              className="hover:opacity-60 transition-opacity duration-300"
            >
              Actualités
            </button>
          </nav>

          <div className="hidden md:flex space-x-4">
            <button 
              onClick={() => setShowLoginModal(true)}
              className="text-sm font-medium hover:opacity-60 transition-opacity duration-300"
            >
              Se connecter
            </button>
            <button 
              onClick={() => setShowMembershipModal(true)}
              className="border border-black px-4 py-1 text-sm hover:bg-black hover:text-white transition-colors duration-300"
            >
              Adhésion
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="flex items-center justify-center h-[90vh] text-center text-white relative mt-20 overflow-hidden">
        {/* Vidéo de fond */}
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
          {/* Fallback image si la vidéo ne charge pas */}
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: "url('https://media.fastly.sohohousedigital.com/t_dc_base/sitecore-prod/images/dotcom-sites/brand-reset-crops/finals/01_desktop_hp_still.jpg')"
            }}
          />
        </video>
        <div className="absolute inset-0 bg-black/40"></div>
        {/* Effet vintage années 80 */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-transparent to-yellow-600/20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
        <div className="relative z-10 max-w-2xl px-4">
          <h1 className="text-3xl md:text-5xl font-serif-elegant mb-6 leading-tight">
            L'élite se retrouve ici<br />pour créer l'exceptionnel
          </h1>
          <button 
            onClick={() => setShowMembershipModal(true)}
            className="border border-white px-6 py-2 hover:bg-white hover:text-black transition-colors duration-300 text-sm uppercase"
          >
            Devenir membre
          </button>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="max-w-6xl mx-auto py-24 px-6 text-center">
        <h2 className="text-3xl font-serif-elegant mb-8">À propos d'Elite Connect</h2>
        
        {/* Description principale */}
        <div className="max-w-4xl mx-auto mb-16">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Elite Connect est un cercle privé réunissant entrepreneurs, investisseurs et décideurs.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Nous cultivons l'art de la connexion stratégique, où chaque échange ouvre sur des opportunités rares.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Notre essence : transformer le capital relationnel en valeur durable et en croissance patrimoniale.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            Ici, le privilège réside dans l'accès à un réseau qui crée un impact réel.
          </p>
        </div>

        <h3 className="text-2xl font-serif mb-8">Découvrir les Maisons</h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Les Maisons offrent un cadre accueillant pour nos membres : manger, se détendre, se ressourcer et se retrouver.
          Chaque Maison est pensée comme un refuge élégant pour les esprits créatifs du monde entier.
        </p>

        <div id="houses" className="mt-10 grid md:grid-cols-3 gap-8">
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <img 
              src="https://media.fastly.sohohousedigital.com/f_auto,q_auto,fl_progressive:steep,w_640/t_dc_base/sitecore-prod/images/dotcom-sites/house-pages/miami-pool-house/latest-2024/01_mph_43.png" 
              className="w-full h-56 object-cover" 
              alt="Miami Pool House"
            />
            <div className="p-4">
              <h3 className="font-medium text-lg">Miami Pool House</h3>
              <p className="text-sm text-gray-500">Détente, piscine et ambiance tropicale.</p>
            </div>
          </div>
          
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <img 
              src="https://media.fastly.sohohousedigital.com/f_auto,q_auto,fl_progressive:steep,w_640/t_dc_base/sitecore-prod/images/dotcom-sites/house-pages/hong-kong/01_hong_kong_update_11.jpg" 
              className="w-full h-56 object-cover" 
              alt="Soho House Hong Kong"
            />
            <div className="p-4">
              <h3 className="font-medium text-lg">Soho House Hong Kong</h3>
              <p className="text-sm text-gray-500">Une vue spectaculaire et une ambiance exclusive.</p>
            </div>
          </div>
          
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <img 
              src="https://media.fastly.sohohousedigital.com/f_auto,q_auto,fl_progressive:steep,w_640/t_dc_base/sitecore-prod/images/dotcom-sites/house-pages/portland/july-refresh/11_portland_hp_refresh_43.png" 
              className="w-full h-56 object-cover" 
              alt="Soho House Portland"
            />
            <div className="p-4">
              <h3 className="font-medium text-lg">Soho House Portland</h3>
              <p className="text-sm text-gray-500">Design apaisant et ambiance artistique.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION ACTUALITÉS */}
      <section id="news" className="max-w-6xl mx-auto py-24 px-6 text-center bg-gray-50">
        <h2 className="text-3xl font-serif mb-8">Actualités</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Découvrez les dernières nouvelles, événements et collaborations d'Elite Connect.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2 text-gray-600">Bientôt disponible</h3>
                <p className="text-gray-500 text-sm">Contenu exclusif à venir</p>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-medium mb-2">Actualités Elite Connect</h3>
              <p className="text-gray-600 text-sm">Découvrez bientôt nos dernières actualités et événements exclusifs.</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2 text-gray-600">Bientôt disponible</h3>
                <p className="text-gray-500 text-sm">Contenu exclusif à venir</p>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-medium mb-2">Événements à venir</h3>
              <p className="text-gray-600 text-sm">Restez connectés pour découvrir nos prochains événements privés.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-auto bg-[#F0EDE5] py-10 border-t border-gray-300">
        <div className="max-w-6xl mx-auto px-6 text-sm text-gray-600 grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Elite Connect</h4>
            <p>Un réseau de lieux d'exception pour se retrouver entre initiés.</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Navigation</h4>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline">À propos</a></li>
              <li><a href="#" className="hover:underline">Adhésion</a></li>
              <li><a href="#" className="hover:underline">Lieux</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Contact</h4>
            <p>Email : contact@eliteconnect.com</p>
            <p>© 2025 Elite Connect. Tous droits réservés.</p>
          </div>
        </div>
      </footer>

      {/* MODAL DE CONNEXION */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif">Se connecter</h2>
              <button 
                onClick={() => setShowLoginModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="votre@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Mot de passe</label>
                <input 
                  type="password" 
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="••••••••"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors duration-300"
              >
                Se connecter
              </button>
            </form>
            <p className="text-center text-sm text-gray-600 mt-4">
              Pas encore membre ? 
              <button 
                onClick={() => {
                  setShowLoginModal(false);
                  setShowMembershipModal(true);
                }}
                className="text-black hover:underline ml-1"
              >
                Demander l'adhésion
              </button>
            </p>
          </div>
        </div>
      )}

      {/* MODAL D'ADHÉSION */}
      {showMembershipModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-lg w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif">Demander l'adhésion</h2>
              <button 
                onClick={() => setShowMembershipModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Prénom</label>
                  <input 
                    type="text" 
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Jean"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Nom</label>
                  <input 
                    type="text" 
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Dupont"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="jean.dupont@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Profession</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Designer, Entrepreneur, Artiste..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Pourquoi souhaitez-vous rejoindre Elite Connect ?</label>
                <textarea 
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black h-24 resize-none"
                  placeholder="Décrivez votre motivation..."
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors duration-300"
              >
                Soumettre ma candidature
              </button>
            </form>
            <p className="text-center text-sm text-gray-600 mt-4">
              Déjà membre ? 
              <button 
                onClick={() => {
                  setShowMembershipModal(false);
                  setShowLoginModal(true);
                }}
                className="text-black hover:underline ml-1"
              >
                Se connecter
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
