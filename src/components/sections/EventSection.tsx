import { useEffect, useRef, useState } from 'react';
import { MapPin, Clock, Calendar } from 'lucide-react';
import { SundaneseOrnament } from '../decorative/SundaneseOrnament';

interface EventCardProps {
  title: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  delay: number;
  isVisible: boolean;
  link: string;
}

const EventCard = ({ title, date, time, venue, address, delay, isVisible, link }: EventCardProps) => (
  <div
    className={`bg-card/60 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-elegant border border-border/50 transition-all duration-1000 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    }`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    <h3 className="font-display text-2xl md:text-3xl text-foreground mb-6 text-center">
      {title}
    </h3>
    
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
          <Calendar className="w-5 h-5 text-accent" />
        </div>
        <div>
          <p className="font-sans text-sm text-muted-foreground uppercase tracking-wide">Date</p>
          <p className="font-serif text-lg text-foreground">{date}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
          <Clock className="w-5 h-5 text-accent" />
        </div>
        <div>
          <p className="font-sans text-sm text-muted-foreground uppercase tracking-wide">Time</p>
          <p className="font-serif text-lg text-foreground">{time}</p>
        </div>
      </div>
      
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
          <MapPin className="w-5 h-5 text-accent" />
        </div>
        <div>
          <p className="font-sans text-sm text-muted-foreground uppercase tracking-wide">Venue</p>
          <p className="font-serif text-lg text-foreground">{venue}</p>
          <p className="font-sans text-sm text-muted-foreground mt-1">{address}</p>
        </div>
      </div>
    </div>

    <div className="mt-8 text-center">
      <a
        href={link}
        className="inline-flex items-center gap-2 font-sans text-sm text-accent hover:text-accent/80 transition-colors tracking-wide"
      >
        <MapPin className="w-4 h-4" />
        View on Maps
      </a>
    </div>
  </div>
);

export const EventSection = () => {
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
      id="event"
      className="relative py-24 md:py-32 px-4 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-beige/30" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="font-serif text-lg tracking-[0.2em] uppercase text-accent mb-4">
            Save The Date
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            Wedding Events
          </h2>
          <div className="flex justify-center">
            <SundaneseOrnament variant="divider" className="opacity-60" />
          </div>
        </div>

        {/* Event cards */}
        <div className="grid md:grid-cols-2 gap-8">
          <EventCard
            title="Akad Nikah"
            date="Wednesday, 31 December 2025"
            time="08:00 - 10:00 WIB"
            venue="Islamic Center Tasikmalaya"
            address="Singasari, Kec. Singaparna, Kabupaten Tasikmalaya, Jawa Barat 46412"
            delay={200}
            isVisible={isVisible}
            link="https://maps.app.goo.gl/nk5NzbGMRhFXNNkWA"
          />
          <EventCard
            title="Wedding Reception"
            date="Wednesday, 31 December 2025"
            time="11:00 - 14:00 WIB"
            venue="Islamic Center Tasikmalaya"
            address="Singasari, Kec. Singaparna, Kabupaten Tasikmalaya, Jawa Barat 46412"
            delay={400}
            isVisible={isVisible}
            link="https://maps.app.goo.gl/nk5NzbGMRhFXNNkWA"
          />
        </div>

      </div>
    </section>
  );
};
