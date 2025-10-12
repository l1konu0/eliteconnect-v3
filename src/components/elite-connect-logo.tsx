export default function EliteConnectLogo({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 40 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Contour du carré arrondi doré */}
      <rect x="2" y="2" width="36" height="36" rx="8" ry="8" stroke="#D4AF37" strokeWidth="1.5" fill="none"/>
      
      {/* Lettre E - Design élégant avec contours dorés */}
      <g>
        {/* Barre horizontale du haut */}
        <rect x="8" y="12" width="16" height="2.5" fill="#0A0A0A" stroke="#D4AF37" strokeWidth="0.3"/>
        {/* Barre horizontale du milieu */}
        <rect x="8" y="18.75" width="16" height="2.5" fill="#0A0A0A" stroke="#D4AF37" strokeWidth="0.3"/>
        {/* Barre horizontale du bas (plus courte) */}
        <rect x="8" y="25.5" width="12" height="2.5" fill="#0A0A0A" stroke="#D4AF37" strokeWidth="0.3"/>
        {/* Barre verticale */}
        <rect x="8" y="12" width="2.5" height="16" fill="#0A0A0A" stroke="#D4AF37" strokeWidth="0.3"/>
      </g>
      
      {/* Lettre C - Design élégant avec contours dorés */}
      <g>
        {/* Forme de C avec ouverture vers la droite */}
        <path d="M26 12c0-2.2 1.8-4 4-4s4 1.8 4 4v16c0 2.2-1.8 4-4 4s-4-1.8-4-4V12z" 
              fill="#0A0A0A" 
              stroke="#D4AF37" 
              strokeWidth="0.3"/>
        {/* Ouverture du C */}
        <rect x="32" y="18" width="2" height="4" fill="#FFFEF7"/>
      </g>
    </svg>
  );
}
