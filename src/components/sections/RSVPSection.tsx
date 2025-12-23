import { useEffect, useRef, useState } from 'react';
import { SundaneseOrnament } from '../decorative/SundaneseOrnament';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner';
import { Check, X, Send } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

export const RSVPSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [attendance, setAttendance] = useState<'yes' | 'no' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const name = (formData.get('name') as string)?.trim();
    const numberOfGuests = attendance === 'yes' ? parseInt(formData.get('guests') as string) || 1 : 1;
    const wishes = (formData.get('wishes') as string)?.trim() || null;

    if (!name) {
      toast.error('Please enter your name');
      setIsSubmitting(false);
      return;
    }

    const { error } = await supabase
      .from('rsvp_responses')
      .insert({
        name,
        attending: attendance === 'yes',
        number_of_guest: numberOfGuests,
        wishes,
      });

    if (error) {
      toast.error('Failed to submit RSVP', {
        description: 'Please try again later.',
      });
      setIsSubmitting(false);
      return;
    }
    
    toast.success('Thank you for your RSVP!', {
      description: attendance === 'yes' 
        ? 'We look forward to celebrating with you.' 
        : 'We will miss you on our special day.',
    });
    
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
    setAttendance(null);
  };

  return (
    <section
      ref={sectionRef}
      id="rsvp"
      className="relative py-24 md:py-32 px-4 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-beige/40" />

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Section header */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="font-serif text-lg tracking-[0.2em] uppercase text-accent mb-4">
            Be Our Guest
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            RSVP
          </h2>
          <div className="flex justify-center mb-8">
            <SundaneseOrnament variant="divider" className="opacity-60" />
          </div>
          <p className="font-serif text-lg text-muted-foreground">
            Please confirm your attendance by December 27, 2025
          </p>
        </div>

        {/* RSVP Form */}
        <form
          onSubmit={handleSubmit}
          className={`bg-card/80 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-elegant border border-border/50 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="space-y-6">
            {/* Name */}
            <div>
              <label className="block font-sans text-sm text-muted-foreground mb-2 uppercase tracking-wide">
                Full Name
              </label>
              <Input
                type="text"
                name="name"
                required
                placeholder="Enter your name"
                className="bg-background/50 border-border focus:border-accent focus:ring-accent"
              />
            </div>

            {/* Attendance */}
            <div>
              <label className="block font-sans text-sm text-muted-foreground mb-3 uppercase tracking-wide">
                Will you attend?
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setAttendance('yes')}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all duration-300 flex items-center justify-center gap-2 ${
                    attendance === 'yes'
                      ? 'border-sage bg-sage/10 text-foreground'
                      : 'border-border hover:border-sage/50 text-muted-foreground'
                  }`}
                >
                  <Check className="w-5 h-5" />
                  <span className="font-sans">Joyfully Accept</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAttendance('no')}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all duration-300 flex items-center justify-center gap-2 ${
                    attendance === 'no'
                      ? 'border-accent bg-accent/10 text-foreground'
                      : 'border-border hover:border-accent/50 text-muted-foreground'
                  }`}
                >
                  <X className="w-5 h-5" />
                  <span className="font-sans">Regretfully Decline</span>
                </button>
              </div>
            </div>

            {/* Number of guests */}
            {attendance === 'yes' && (
              <div className="animate-fade-up">
                <label className="block font-sans text-sm text-muted-foreground mb-2 uppercase tracking-wide">
                  Number of Guests
                </label>
              <Input
                type="number"
                name="guests"
                min="1"
                max="5"
                defaultValue="1"
                className="bg-background/50 border-border focus:border-accent focus:ring-accent"
              />
              </div>
            )}

            {/* Message */}
            <div>
              <label className="block font-sans text-sm text-muted-foreground mb-2 uppercase tracking-wide">
                Wishes for the Couple
              </label>
              <Textarea
                name="wishes"
                placeholder="Write your wishes..."
                rows={4}
                className="bg-background/50 border-border focus:border-accent focus:ring-accent resize-none"
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isSubmitting || !attendance}
              className="w-full py-6 bg-gradient-gold hover:opacity-90 text-primary-foreground font-sans tracking-wider transition-all duration-300"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Sending...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Send RSVP
                </span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};
