"use client";

import { useEffect, useRef, useState } from 'react';

interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  stagger?: boolean;
  staggerDelay?: number;
}

export default function AnimatedSection({
  children,
  delay = 0,
  className = '',
  stagger = false,
  staggerDelay = 100,
}: AnimatedSectionProps) {
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
        rootMargin: '0px 0px -150px 0px', /* Augmenté pour déclencher plus tôt */
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

  return (
    <div
      ref={ref}
      className={`${isVisible ? 'animate-section-visible' : 'animate-section-hidden'} ${className}`}
      style={stagger ? { '--stagger-delay': `${staggerDelay}ms` } as React.CSSProperties : undefined}
    >
      {children}
    </div>
  );
}
