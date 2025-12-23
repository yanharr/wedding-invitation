import { SundaneseOrnament } from '../decorative/SundaneseOrnament';
import { Heart } from 'lucide-react';

export const FooterSection = () => {
  return (
    <footer className="relative py-16 px-4 bg-foreground text-primary-foreground">
      <div className="max-w-4xl mx-auto text-center">
        {/* Ornament */}
        <div className="flex justify-center mb-8 opacity-30">
          <SundaneseOrnament variant="divider" className="invert" />
        </div>

        {/* Names */}
        <h2 className="font-display text-3xl md:text-4xl mb-4">
          Ayu & Raka
        </h2>

        {/* Date */}
        <p className="font-serif text-lg text-primary-foreground/70 mb-8">
          31 December 2025
        </p>

        {/* Thank you */}
        <p className="font-serif text-xl italic text-primary-foreground/80 mb-8">
          "Hatur nuhun kana kahadiran sareng do'ana"
        </p>
        <p className="font-sans text-sm text-primary-foreground/50 mb-8">
          Thank you for your presence and prayers
        </p>

        {/* Divider */}
        <div className="w-16 h-px bg-primary-foreground/20 mx-auto mb-8" />

        {/* Credits */}
        <p className="font-sans text-xs text-primary-foreground/40 flex items-center justify-center gap-2">
          Made with <Heart className="w-3 h-3 text-accent fill-accent" /> for Ayu & Raka
        </p>
      </div>
    </footer>
  );
};
