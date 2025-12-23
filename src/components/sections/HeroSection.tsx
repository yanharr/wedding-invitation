import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SundaneseOrnament } from '../decorative/SundaneseOrnament';

export const HeroSection = () => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [searchParams] = useSearchParams();
  const to = searchParams.get('to') || ''; // Nama tamu undangan

  useEffect(() => {
    // Gunakan UTC agar countdown konsisten di semua timezone
    const weddingDateUTC = Date.UTC(2025, 11, 31, 10, 0, 0);
    // const weddingDate = new Date('2025-12-31T10:00:00');

    const timer = setInterval(() => {
      const now = Date.now();
      const distance = weddingDateUTC - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / (1000 * 60)) % 60);
      const seconds = Math.floor((distance / 1000) % 60);

      setCountdown({
        days: days >= 0 ? days : 0,
        hours: hours >= 0 ? hours : 0,
        minutes: minutes >= 0 ? minutes : 0,
        seconds: seconds >= 0 ? seconds : 0,
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-hero" />

      {/* Decorative corners */}
      <div className="absolute top-8 left-8 opacity-50">
        <SundaneseOrnament variant="corner" />
      </div>
      <div className="absolute top-8 right-8 opacity-50 -scale-x-100">
        <SundaneseOrnament variant="corner" />
      </div>
      <div className="absolute bottom-8 left-8 opacity-50 -scale-y-100">
        <SundaneseOrnament variant="corner" />
      </div>
      <div className="absolute bottom-8 right-8 opacity-50 -scale-100">
        <SundaneseOrnament variant="corner" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Top ornament */}
        <div className="flex justify-center mb-8 animate-fade-up">
          <SundaneseOrnament variant="top" className="opacity-70" />
        </div>

        {/* Invitation text */}
        <p className="font-serif text-lg md:text-xl tracking-[0.3em] uppercase text-muted-foreground mb-4 animate-fade-up delay-100">
          We Invite You To Celebrate
        </p>

        {/* Nama tamu undangan */}
        {to && (
          <div className="mb-6 animate-fade-up delay-150">
            <p className="font-serif text-lg md:text-xl tracking-wide text-muted-foreground">
              Untuk Tamu Istimewa
            </p>
            <p className="font-display text-3xl md:text-4xl text-accent italic mt-1">
              {to}
            </p>
          </div>
        )}

        {/* Nama pengantin (hardcode) */}
        <div className="mb-8 animate-fade-up delay-200">
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-medium text-foreground mb-4">
            Ayu
          </h1>
          <p className="font-serif text-3xl md:text-4xl italic text-accent my-4">&</p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-medium text-foreground">
            Raka
          </h1>
        </div>

        {/* Divider ornament */}
        <div className="flex justify-center my-8 animate-fade-up delay-300">
          <SundaneseOrnament variant="divider" />
        </div>

        {/* Date */}
        <p className="font-serif text-xl md:text-2xl text-muted-foreground tracking-wide animate-fade-up delay-400">
          Wednesday, 31st December 2025
        </p>
        <p className="font-sans text-sm md:text-base text-muted-foreground/80 mt-2 tracking-widest animate-fade-up delay-500">
          Tasikmalaya, West Java
        </p>

        {/* Countdown */}
        <div className="mt-12 animate-fade-up delay-700">
          <p className="font-serif text-lg text-muted-foreground mb-6 tracking-wide">
            Counting Down To Our Special Day
          </p>
          <div className="flex justify-center gap-4 md:gap-8">
            {[
              { value: countdown.days, label: 'Days' },
              { value: countdown.hours, label: 'Hours' },
              { value: countdown.minutes, label: 'Minutes' },
              { value: countdown.seconds, label: 'Seconds' },
            ].map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center bg-card/50 backdrop-blur-sm rounded-lg px-4 py-3 md:px-6 md:py-4 shadow-soft"
              >
                <span className="font-display text-2xl md:text-4xl text-foreground">
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="font-sans text-xs md:text-sm text-muted-foreground uppercase tracking-wider mt-1">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 border-2 border-accent/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-accent/70 rounded-full animate-shimmer" />
          </div>
        </div>
      </div>
    </section>
  );
};
