interface SundaneseOrnamentProps {
  className?: string;
  variant?: 'top' | 'bottom' | 'divider' | 'corner';
}

export const SundaneseOrnament = ({ className = '', variant = 'divider' }: SundaneseOrnamentProps) => {
  if (variant === 'divider') {
    return (
      <svg
        viewBox="0 0 400 60"
        className={`w-64 h-12 ${className}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Central kujang-inspired motif */}
        <path
          d="M200 10 C180 10 170 25 175 35 C180 45 195 50 200 50 C205 50 220 45 225 35 C230 25 220 10 200 10"
          className="fill-accent/30 stroke-accent"
          strokeWidth="1"
        />
        {/* Left flowing line with bamboo nodes */}
        <path
          d="M170 30 C150 30 140 25 120 28 C100 31 90 30 70 30 C50 30 30 28 10 30"
          className="stroke-accent/60"
          strokeWidth="1.5"
          fill="none"
        />
        <circle cx="120" cy="28" r="3" className="fill-accent/40" />
        <circle cx="70" cy="30" r="2" className="fill-accent/30" />
        {/* Right flowing line with bamboo nodes */}
        <path
          d="M230 30 C250 30 260 25 280 28 C300 31 310 30 330 30 C350 30 370 28 390 30"
          className="stroke-accent/60"
          strokeWidth="1.5"
          fill="none"
        />
        <circle cx="280" cy="28" r="3" className="fill-accent/40" />
        <circle cx="330" cy="30" r="2" className="fill-accent/30" />
        {/* Small leaf accents */}
        <path
          d="M155 25 C150 20 145 22 148 28 C151 22 155 25 155 25"
          className="fill-sage/40"
        />
        <path
          d="M245 25 C250 20 255 22 252 28 C249 22 245 25 245 25"
          className="fill-sage/40"
        />
      </svg>
    );
  }

  if (variant === 'top') {
    return (
      <svg
        viewBox="0 0 200 100"
        className={`w-48 h-24 ${className}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Megamendung-inspired cloud pattern adapted to Sundanese style */}
        <path
          d="M20 80 C30 60 50 50 70 55 C80 40 100 35 120 40 C140 35 160 45 170 60 C180 55 190 65 180 80"
          className="stroke-accent/40"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M30 75 C40 55 55 48 72 52 C82 38 100 32 118 38 C138 33 155 42 165 57"
          className="stroke-accent/30"
          strokeWidth="1"
          fill="none"
        />
        {/* Central decorative element */}
        <circle cx="100" cy="60" r="8" className="fill-accent/20 stroke-accent/50" strokeWidth="1" />
        <circle cx="100" cy="60" r="4" className="fill-accent/40" />
      </svg>
    );
  }

  if (variant === 'corner') {
    return (
      <svg
        viewBox="0 0 100 100"
        className={`w-24 h-24 ${className}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Kujang curve corner ornament */}
        <path
          d="M10 90 C10 50 30 20 70 10"
          className="stroke-accent/30"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M15 85 C15 50 35 25 65 15"
          className="stroke-accent/20"
          strokeWidth="1.5"
          fill="none"
        />
        {/* Small decorative circles */}
        <circle cx="20" cy="70" r="3" className="fill-sage/30" />
        <circle cx="40" cy="35" r="2" className="fill-accent/30" />
        <circle cx="60" cy="20" r="2" className="fill-sage/20" />
      </svg>
    );
  }

  return null;
};
