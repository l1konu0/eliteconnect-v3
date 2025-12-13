"use client";

import { useEffect, useRef, useState } from 'react';

interface AnimatedParagraphProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  animationType?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right';
}

export default function AnimatedParagraph({
  children,
  delay = 0,
  className = '',
  animationType = 'fade-up',
}: AnimatedParagraphProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15, /* Augmenté pour déclencher plus tôt */
        rootMargin: '0px 0px -100px 0px', /* Augmenté pour déclencher plus tôt */
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  const animationClasses = {
    'fade-up': isVisible ? 'animate-fade-up-visible' : 'animate-fade-up-hidden',
    'fade-in': isVisible ? 'animate-fade-in-visible' : 'animate-fade-in-hidden',
    'slide-left': isVisible ? 'animate-slide-left-visible' : 'animate-slide-left-hidden',
    'slide-right': isVisible ? 'animate-slide-right-visible' : 'animate-slide-right-hidden',
  };

  return (
    <div
      ref={ref}
      className={`${animationClasses[animationType]} ${className}`}
    >
      {children}
    </div>
  );
}
