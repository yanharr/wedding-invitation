import { useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/sections/HeroSection';
import { CoupleSection } from '@/components/sections/CoupleSection';
import { EventSection } from '@/components/sections/EventSection';
import { GallerySection } from '@/components/sections/GallerySection';
import { RSVPSection } from '@/components/sections/RSVPSection';
import { WishesSection } from '@/components/sections/WishesSection';
import { FooterSection } from '@/components/sections/FooterSection';
import { FloatingLeaves } from '@/components/decorative/FloatingLeaves';
import MusicPlayer from '@/components/MusicPlayer';

const Index = () => {
  useEffect(() => {
    // Update CSS custom property for parallax on scroll
    const handleScroll = () => {
      document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* SEO Meta */}
      <title>Ayu & Raka Wedding | 21 June 2025</title>
      
      {/* Floating decorative elements */}
      <FloatingLeaves />

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main>
        <HeroSection />
        <CoupleSection />
        <EventSection />
        <GallerySection />
        <RSVPSection />
        <WishesSection />
      </main>
      <MusicPlayer />
      {/* Footer */}
      <FooterSection />
    </div>
  );
};

export default Index;
