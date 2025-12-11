"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { safeString, safeUrl } from "@/lib/security/client-safe";

interface Partner {
  id: string;
  name: string;
  category: string;
  logo_url: string | null;
  website_url: string | null;
  description: string | null;
}

interface PartnersSliderProps {
  partners: Partner[];
  title: string;
}

export function PartnersSlider({ partners, title }: PartnersSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth >= 1024) {
          setVisibleCount(4);
        } else if (window.innerWidth >= 768) {
          setVisibleCount(3);
        } else if (window.innerWidth >= 640) {
          setVisibleCount(2);
        } else {
          setVisibleCount(1);
        }
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  if (partners.length === 0) {
    return null;
  }

  const maxIndex = Math.max(0, partners.length - visibleCount);
  
  const nextSlide = () => {
    setCurrentIndex((prev) => {
      if (prev >= maxIndex) {
        return 0; // Retour au début
      }
      return Math.min(prev + visibleCount, maxIndex);
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      if (prev <= 0) {
        return maxIndex; // Aller à la fin
      }
      return Math.max(prev - visibleCount, 0);
    });
  };

  const handlePartnerClick = (partner: Partner) => {
    setSelectedPartner(partner);
    setIsModalOpen(true);
  };

  // Calculer les partenaires visibles
  const visiblePartners = partners.slice(currentIndex, currentIndex + visibleCount);
  const safeWebsiteUrl = selectedPartner ? safeUrl(selectedPartner.website_url) : null;

  return (
    <>
      <section className="mb-16">
        {/* Titre de la section - seulement si fourni */}
        {title && (
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold text-[#0A0A0A] mb-6 sm:mb-8 text-center px-2">
            {title}
          </h2>
        )}

        {/* Slider Container */}
        <div className="relative">
          {/* Bouton précédent */}
          {partners.length > visibleCount && (
            <button
              onClick={prevSlide}
              className="absolute left-0 sm:left-2 md:left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white border border-gray-200 rounded-full p-1.5 sm:p-2 shadow-lg transition-all duration-300 hover:border-[#D4AF37]"
              aria-label="Partenaire précédent"
            >
              <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-[#0A0A0A]" />
            </button>
          )}

          {/* Grille des partenaires visibles */}
          <div 
            className={`grid gap-4 sm:gap-6 px-4 sm:px-8 md:px-12 ${
              visibleCount === 1 ? 'grid-cols-1' :
              visibleCount === 2 ? 'grid-cols-1 sm:grid-cols-2' :
              visibleCount === 3 ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3' :
              'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
            }`}
          >
            {visiblePartners.map((partner) => {
              const safeLogoUrl = safeUrl(partner.logo_url);
              return (
                <div
                  key={partner.id}
                  onClick={() => handlePartnerClick(partner)}
                  className="group flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-lg hover:border-[#D4AF37] hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  {/* Image du logo partenaire */}
                  <div className="w-full h-32 mb-4 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden">
                    {safeLogoUrl ? (
                      <img
                        src={safeLogoUrl}
                        alt={safeString(partner.name)}
                        className="h-20 w-auto object-contain max-w-full transition-transform duration-300 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-xs text-gray-400 font-medium">Logo</span>
                      </div>
                    )}
                  </div>

                  {/* Nom du partenaire */}
                  <h3 className="text-center text-sm font-medium text-[#0A0A0A] group-hover:text-[#D4AF37] transition-colors">
                    {safeString(partner.name)}
                  </h3>
                </div>
              );
            })}
          </div>

          {/* Bouton suivant */}
          {partners.length > visibleCount && (
            <button
              onClick={nextSlide}
              className="absolute right-0 sm:right-2 md:right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white border border-gray-200 rounded-full p-1.5 sm:p-2 shadow-lg transition-all duration-300 hover:border-[#D4AF37]"
              aria-label="Partenaire suivant"
            >
              <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-[#0A0A0A]" />
            </button>
          )}

          {/* Indicateurs de pagination */}
          {partners.length > visibleCount && (
            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({ length: Math.ceil(partners.length / visibleCount) }).map((_, idx) => {
                const pageIndex = idx * visibleCount;
                const isActive = currentIndex >= pageIndex && currentIndex < pageIndex + visibleCount;
                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(Math.min(pageIndex, maxIndex))}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      isActive
                        ? "w-8 bg-[#D4AF37]"
                        : "w-2 bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Aller à la page ${idx + 1}`}
                  />
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Modal de zoom */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedPartner && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-serif text-[#0A0A0A]">
                  {safeString(selectedPartner.name)}
                </DialogTitle>
              </DialogHeader>

              <div className="flex flex-col items-center space-y-6">
                {/* Image zoomée */}
                <div className="w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-8 min-h-[300px]">
                  {safeUrl(selectedPartner.logo_url) ? (
                    <img
                      src={safeUrl(selectedPartner.logo_url)!}
                      alt={safeString(selectedPartner.name)}
                      className="max-w-full max-h-[400px] object-contain"
                    />
                  ) : (
                    <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-sm text-gray-400 font-medium">Logo</span>
                    </div>
                  )}
                </div>

                {/* Description si disponible */}
                {selectedPartner.description && (
                  <p className="text-center text-[#2C2C2C] text-sm leading-relaxed">
                    {safeString(selectedPartner.description)}
                  </p>
                )}

                {/* Bouton vers le site web */}
                {safeWebsiteUrl && (
                  <Button
                    asChild
                    className="bg-[#D4AF37] hover:bg-[#B8941F] text-white"
                  >
                    <a
                      href={safeWebsiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2"
                    >
                      <span>Visiter le site web</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

