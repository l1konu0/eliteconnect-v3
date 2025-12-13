"use client";

import { useEffect } from 'react';

/**
 * Composant qui ajoute automatiquement des animations aux paragraphes
 * Utilise l'Intersection Observer pour déclencher les animations au scroll
 */
export default function ParagraphAnimator() {
  useEffect(() => {
    const paragraphs = document.querySelectorAll('section p, section h2, section h3');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            element.style.setProperty('--paragraph-index', index.toString());
            element.classList.add('animate-paragraph-visible');
            observer.unobserve(element);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    paragraphs.forEach((p) => {
      observer.observe(p);
    });

    return () => {
      paragraphs.forEach((p) => {
        observer.unobserve(p);
      });
    };
  }, []);

  return null;
}
