type IconProps = {
  size?: number;
  strokeWidth?: number;
  className?: string;
};

// Baterije — mešalica/slavina
export function FaucetIcon({ size = 24, strokeWidth = 1.5, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="8" y1="5" x2="16" y2="5" />
      <line x1="12" y1="5" x2="12" y2="8" />
      <rect x="8" y="8" width="8" height="5" rx="1" />
      <path d="M16 11 L20 11 Q22 11 22 14 L22 17" />
      <circle cx="22" cy="18.5" r="1.5" />
      <line x1="8" y1="13" x2="8" y2="17" />
      <line x1="16" y1="13" x2="16" y2="17" />
      <line x1="6" y1="17" x2="18" y2="17" />
    </svg>
  );
}

// Ormarići sa umivaonikom — radni sto sa ugradbenim sudoperom
export function VanityCabinetIcon({ size = 24, strokeWidth = 1.5, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="1" y1="11" x2="23" y2="11" />
      <ellipse cx="12" cy="11" rx="5" ry="2.5" />
      <rect x="2" y="11" width="20" height="10" rx="1" />
      <line x1="12" y1="11" x2="12" y2="21" />
      <line x1="9.5" y1="16.5" x2="10.5" y2="16.5" />
      <line x1="13.5" y1="16.5" x2="14.5" y2="16.5" />
    </svg>
  );
}

// Ormarići za lavaboe — podmetač/ormarić ispod lavaboa
export function SinkCabinetIcon({ size = 24, strokeWidth = 1.5, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="5" width="18" height="15" rx="1" />
      <line x1="12" y1="5" x2="12" y2="20" />
      <line x1="9.5" y1="12.5" x2="10.5" y2="12.5" />
      <line x1="13.5" y1="12.5" x2="14.5" y2="12.5" />
      <line x1="6" y1="20" x2="6" y2="22" />
      <line x1="18" y1="20" x2="18" y2="22" />
    </svg>
  );
}

// Ogledala sa ormarićem — ogledalo/ormarić sa dva vrata
export function MirrorCabinetIcon({ size = 24, strokeWidth = 1.5, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="2" width="18" height="20" rx="1" />
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="10" y1="11" x2="10" y2="13" />
      <line x1="14" y1="11" x2="14" y2="13" />
    </svg>
  );
}

// Klasična i LED Ogledala — ovalno ogledalo sa okvirom
export function OvalMirrorIcon({ size = 24, strokeWidth = 1.5, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <ellipse cx="12" cy="12" rx="8" ry="10" />
      <ellipse cx="12" cy="12" rx="5" ry="7" />
    </svg>
  );
}

// Vertikale — cevni/peškir radijator
export function TowelRadiatorIcon({ size = 24, strokeWidth = 1.5, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="4" y1="2" x2="4" y2="22" />
      <line x1="9" y1="2" x2="9" y2="22" />
      <line x1="15" y1="2" x2="15" y2="22" />
      <line x1="20" y1="2" x2="20" y2="22" />
      <line x1="4" y1="2" x2="20" y2="2" />
      <line x1="4" y1="9" x2="20" y2="9" />
      <line x1="4" y1="16" x2="20" y2="16" />
      <line x1="4" y1="22" x2="20" y2="22" />
    </svg>
  );
}

// Tuš kabine i tuš kade — tuševa glava sa cevi i kapima
export function ShowerIcon({ size = 24, strokeWidth = 1.5, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 22 L4 12 Q4 9 7 9 L16 9" />
      <rect x="14" y="6" width="8" height="5" rx="1.5" />
      <line x1="15.5" y1="13" x2="14.5" y2="16" />
      <line x1="18" y1="12.5" x2="18" y2="15.5" />
      <line x1="20.5" y1="13" x2="21.5" y2="16" />
      <line x1="14.5" y1="17.5" x2="13.5" y2="20.5" />
      <line x1="21.5" y1="17.5" x2="22.5" y2="20.5" />
    </svg>
  );
}

// Samostojeće kade — slobodnostojeća kada sa nogama
export function BathtubIcon({ size = 24, strokeWidth = 1.5, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2 12 Q2 8 12 8 Q22 8 22 12 L22 16 Q22 18 20 18 L4 18 Q2 18 2 16 Z" />
      <line x1="6" y1="18" x2="5" y2="22" />
      <line x1="18" y1="18" x2="19" y2="22" />
      <line x1="9" y1="8" x2="9" y2="5" />
      <line x1="7" y1="5" x2="11" y2="5" />
    </svg>
  );
}

// Sanitarije — WC šolja
export function ToiletIcon({ size = 24, strokeWidth = 1.5, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="7" y="2" width="10" height="6" rx="1" />
      <path d="M8 8 L16 8 Q20 8 20 14 Q20 20 12 20 Q4 20 4 14 Q4 8 8 8" />
    </svg>
  );
}

// Keramika — rešetka pločica
export function TileIcon({ size = 24, strokeWidth = 1.5, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="9" height="9" rx="0.5" />
      <rect x="13" y="2" width="9" height="9" rx="0.5" />
      <rect x="2" y="13" width="9" height="9" rx="0.5" />
      <rect x="13" y="13" width="9" height="9" rx="0.5" />
    </svg>
  );
}

// Slivnici — podna rešetka s otokom
export function DrainIcon({ size = 24, strokeWidth = 1.5, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="2" />
      <circle cx="12" cy="12" r="3.5" />
      <line x1="12" y1="2" x2="12" y2="8.5" />
      <line x1="12" y1="15.5" x2="12" y2="22" />
      <line x1="2" y1="12" x2="8.5" y2="12" />
      <line x1="15.5" y1="12" x2="22" y2="12" />
    </svg>
  );
}

// Galanterija — peškir šipka sa peškirom
export function AccessoriesIcon({ size = 24, strokeWidth = 1.5, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="3" y1="8" x2="21" y2="8" />
      <line x1="3" y1="6" x2="3" y2="10" />
      <line x1="21" y1="6" x2="21" y2="10" />
      <path d="M8 8 L8 17 Q8 20 12 20 Q16 20 16 17 L16 8" />
    </svg>
  );
}
