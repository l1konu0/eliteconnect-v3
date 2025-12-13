"use client";

import { useEffect } from 'react';

/**
 * Composant qui ajoute automatiquement des animations aux paragraphes au scroll
 * Utilise l'Intersection Observer pour déclencher les animations de manière fluide
 */
export default function ParagraphAnimator() {
  useEffect(() => {
    // Sélectionner tous les éléments de texte à animer
    const selectors = [
      'section p',
      'section h1',
      'section h2', 
      'section h3',
      'section h4',
      'section li',
      'section blockquote',
      'article p',
      'article h2',
      'article h3',
      'main p',
      'main h2',
      'main h3'
    ];
    
    const elements = document.querySelectorAll(selectors.join(', '));
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            
            // Ajouter la classe d'animation
            element.classList.add('scroll-animate-visible');
            
            // Ne plus observer cet élément
            observer.unobserve(element);
          }
        });
      },
      {
        threshold: 0.15, // Déclencher quand 15% de l'élément est visible
        rootMargin: '0px 0px -80px 0px', // Déclencher 80px avant que l'élément soit visible
      }
    );

    // Observer tous les éléments
    elements.forEach((el) => {
      // Ajouter la classe initiale pour l'état caché
      (el as HTMLElement).classList.add('scroll-animate-hidden');
      observer.observe(el);
    });

    return () => {
      elements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return null;
}
