import { useEffect, useRef, useState } from 'react';
import { SundaneseOrnament } from '../decorative/SundaneseOrnament';

const galleryImages = [
  { id: 1, aspect: 'portrait', src: '/images/prewedding_1.png' },
  { id: 2, aspect: 'landscape', src: '/images/wedding_man.png' },
  { id: 3, aspect: 'square', src: '/images/prewedding_3.png' },
  { id: 4, aspect: 'landscape', src: '/images/wedding_woman.png' },
  { id: 5, aspect: 'portrait', src: '/images/prewedding_4.png' },
  { id: 6, aspect: 'square', src: '/images/prewedding_2.png' },
];

export const GallerySection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative py-24 md:py-32 px-4 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-section" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="font-serif text-lg tracking-[0.2em] uppercase text-accent mb-4">
            Precious Moments
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            Our Gallery
          </h2>
          <div className="flex justify-center">
            <SundaneseOrnament variant="divider" className="opacity-60" />
          </div>
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className={`group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              } ${
                image.aspect === 'portrait' ? 'row-span-2' : ''
              } ${
                image.aspect === 'landscape' ? 'col-span-2 md:col-span-1' : ''
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <img
                src={image.src}
                alt={`Gallery ${image.id}`}
                className={`w-full h-full object-cover ${
                  image.aspect === 'portrait' ? 'h-80 md:h-full' : 'h-48 md:h-64'
                } ${image.aspect === 'square' ? 'aspect-square' : ''}`}
              />
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-all duration-500" />
            </div>
          ))}
        </div>

        <p className={`text-center font-serif text-muted-foreground italic mt-12 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          More memories to be captured on our special day
        </p>
      </div>
    </section>
  );
};
