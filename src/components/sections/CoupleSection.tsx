import { useEffect, useRef, useState } from 'react';
import { SundaneseOrnament } from '../decorative/SundaneseOrnament';

export const CoupleSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="couple"
      className="relative py-24 md:py-32 px-4 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-section" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="font-serif text-lg tracking-[0.2em] uppercase text-accent mb-4">
            The Happy Couple
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            Our Love Story
          </h2>
          <div className="flex justify-center">
            <SundaneseOrnament variant="divider" className="opacity-60" />
          </div>
        </div>

        {/* Couple cards */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Bride */}
          <div className={`text-center transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative inline-block mb-8">
              <div className="w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-beige shadow-elegant mx-auto flex items-center justify-center">
                <img
                  src="/images/wedding_woman.png" // path from public folder
                  alt="Ayu Lestari"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              {/* Decorative ring */}
              <div className="absolute -inset-4 border border-accent/20 rounded-full" />
            </div>
            <h3 className="font-display text-3xl md:text-4xl text-foreground mb-2">
              Ayu Lestari
            </h3>
            <p className="font-serif text-lg italic text-accent mb-4">
              The Bride
            </p>
            <p className="font-sans text-muted-foreground leading-relaxed max-w-sm mx-auto">
              Daughter of Mr. & Mrs. Sutisna. A lover of Sundanese art and culture, 
              she brings warmth and grace to every moment.
            </p>
          </div>

          {/* Groom */}
          <div className={`text-center transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative inline-block mb-8">
              <div className="w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-beige shadow-elegant mx-auto flex items-center justify-center">
                <img
                  src="/images/wedding_man.png" // path from public folder
                  alt="Ayu Lestari"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              {/* Decorative ring */}
              <div className="absolute -inset-4 border border-accent/20 rounded-full" />
            </div>
            <h3 className="font-display text-3xl md:text-4xl text-foreground mb-2">
              Raka Wijayakusuma
            </h3>
            <p className="font-serif text-lg italic text-accent mb-4">
              The Groom
            </p>
            <p className="font-sans text-muted-foreground leading-relaxed max-w-sm mx-auto">
              Son of Mr. & Mrs. Hermawan. An architect with deep appreciation for 
              traditional Sundanese values and modern innovation.
            </p>
          </div>
        </div>

        {/* Quote */}
        <div className={`mt-20 text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <blockquote className="font-serif text-xl md:text-2xl italic text-muted-foreground max-w-3xl mx-auto">
            "Silih Asah, Silih Asih, Silih Asuh"
          </blockquote>
          <p className="font-sans text-sm text-muted-foreground/70 mt-4 tracking-wide">
            — Sundanese Philosophy of Mutual Respect, Love, and Care
          </p>
        </div>
      </div>
    </section>
  );
};
