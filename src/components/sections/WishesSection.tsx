// import { useEffect, useRef, useState } from 'react';
// import { SundaneseOrnament } from '../decorative/SundaneseOrnament';
// import { supabase } from '@/integrations/supabase/client';
// import { Heart, MessageCircle } from 'lucide-react';

// interface Wish {
//   id: string;
//   name: string;
//   wishes: string | null;
//   created_at: string;
// }

// export const WishesSection = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const [wishes, setWishes] = useState<Wish[]>([]);
//   const [loading, setLoading] = useState(true);

//   const sectionRef = useRef<HTMLElement>(null);

//   /* ===============================
//      Intersection Observer
//   =============================== */
//   useEffect(() => {
//     if (!sectionRef.current) return;

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//           observer.disconnect();
//         }
//       },
//       { threshold: 0.1 }
//     );

//     observer.observe(sectionRef.current);

//     return () => observer.disconnect();
//   }, []);

//   /* ===============================
//      Fetch + Realtime
//   =============================== */
//   useEffect(() => {
//     let isMounted = true;

//     const fetchWishes = async () => {
//       const { data, error } = await supabase
//         .from('rsvp_responses')
//         .select('id, name, wishes, created_at')
//         .not('wishes', 'is', null)
//         .order('created_at', { ascending: false });

//       if (!error && data && isMounted) {
//         setWishes(data.filter(w => w.wishes?.trim()));
//       }

//       if (isMounted) {
//         setLoading(false);
//       }
//     };

//     fetchWishes();

//     const channel = supabase
//       .channel('wishes-updates')
//       .on(
//         'postgres_changes',
//         {
//           event: 'INSERT',
//           schema: 'public',
//           table: 'rsvp_responses'
//         },
//         payload => {
//           const newWish = payload.new as Wish;

//           if (newWish.wishes?.trim()) {
//             setWishes(prev => {
//               if (prev.some(w => w.id === newWish.id)) return prev;
//               return [newWish, ...prev];
//             });
//           }
//         }
//       )
//       .subscribe();

//     return () => {
//       isMounted = false;
//       supabase.removeChannel(channel);
//     };
//   }, []);

//   /* ===============================
//      Helpers
//   =============================== */
//   const formatDate = (dateString: string) =>
//     new Date(dateString).toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric'
//     });

//   /* ===============================
//      Render (SINGLE RETURN)
//   =============================== */
//   return (
//     <section
//       ref={sectionRef}
//       id="wishes"
//       className="relative py-24 md:py-32 px-4 overflow-hidden"
//     >
//       {/* Background */}
//       <div className="absolute inset-0 bg-gradient-section" />

//       <div className="relative z-10 max-w-4xl mx-auto">
//         {/* Header */}
//         <div
//           className={`text-center mb-16 transition-all duration-1000 ${
//             isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
//           }`}
//         >
//           <p className="font-serif text-lg tracking-[0.2em] uppercase text-accent mb-4">
//             <MessageCircle className="inline-block w-5 h-5 mr-2" />
//             Words of Love
//           </p>
//           <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
//             Guest Wishes
//           </h2>
//           <div className="flex justify-center">
//             <SundaneseOrnament variant="divider" className="opacity-60" />
//           </div>
//         </div>

//         {/* CONTENT STATES */}
//         {loading && (
//           <p className="text-center text-muted-foreground">
//             Loading wishes...
//           </p>
//         )}

//         {!loading && wishes.length === 0 && (
//           <p className="text-center text-muted-foreground">
//             No wishes yet
//           </p>
//         )}

//         {!loading && wishes.length > 0 && (
//           <div className="grid gap-6 md:gap-8">
//             {wishes.map((wish, index) => (
//               <div
//                 key={wish.id}
//                 className={`transition-all duration-700 ${
//                   isVisible
//                     ? 'opacity-100 translate-y-0'
//                     : 'opacity-0 translate-y-10'
//                 }`}
//                 style={{
//                   transitionDelay: `${Math.min(index * 100, 500)}ms`
//                 }}
//               >
//                 <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-lg p-6 md:p-8 shadow-soft">
//                   <div className="flex items-start gap-4">
//                     <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
//                       <Heart className="w-5 h-5 text-accent" />
//                     </div>
//                     <div>
//                       <div className="flex items-center gap-2 mb-2">
//                         <h3 className="font-display text-lg text-foreground">
//                           {wish.name}
//                         </h3>
//                         <span className="text-xs text-muted-foreground">
//                           • {formatDate(wish.created_at)}
//                         </span>
//                       </div>
//                       <p className="font-serif italic text-muted-foreground">
//                         "{wish.wishes}"
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Bottom Ornament */}
//         {!loading && wishes.length > 0 && (
//           <div
//             className={`mt-12 flex justify-center transition-opacity duration-1000 ${
//               isVisible ? 'opacity-100' : 'opacity-0'
//             }`}
//           >
//             <SundaneseOrnament
//               variant="corner"
//               className="opacity-40 rotate-180"
//             />
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };



import { useEffect, useRef, useState } from 'react';
import { SundaneseOrnament } from '../decorative/SundaneseOrnament';
import { supabase } from '@/integrations/supabase/client';
import { Heart, MessageCircle } from 'lucide-react';

interface Wish {
  id: string;
  name: string;
  wishes: string | null;
  created_at: string;
}

export const WishesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);

  const sectionRef = useRef<HTMLElement>(null);

  /* ===============================
     Intersection Observer
  =============================== */
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  /* ===============================
     Fetch + Realtime
  =============================== */
  useEffect(() => {
    let isMounted = true;

    // Fetch initial wishes
    const fetchWishes = async () => {
      const { data, error } = await supabase
        .from('rsvp_responses')
        .select('id, name, wishes, created_at')
        .not('wishes', 'is', null)
        .order('created_at', { ascending: true });

      if (!error && data && isMounted) {
        setWishes(data.filter(w => w.wishes?.trim()));
      }

      if (isMounted) setLoading(false);
    };

    fetchWishes();

    // Subscribe to real-time inserts
    const subscription = supabase
      .channel('wishes-updates')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'rsvp_responses'
        },
        payload => {
          const newWish = payload.new as Wish;
          if (newWish.wishes?.trim()) {
            setWishes(prev => {
              if (prev.some(w => w.id === newWish.id)) return prev;
              return [newWish, ...prev];
            });
          }
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(subscription);
    };
  }, []);

  /* ===============================
     Helpers
  =============================== */
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

  /* ===============================
     Render
  =============================== */
  return (
    <section
      ref={sectionRef}
      id="wishes"
      className="relative py-24 md:py-32 px-4 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-section" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="font-serif text-lg tracking-[0.2em] uppercase text-accent mb-4">
            <MessageCircle className="inline-block w-5 h-5 mr-2" />
            Words of Love
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            Guest Wishes
          </h2>
          <div className="flex justify-center">
            <SundaneseOrnament variant="divider" className="opacity-60" />
          </div>
        </div>

        {/* CONTENT STATES */}
        {loading && (
          <p className="text-center text-muted-foreground">
            Loading wishes...
          </p>
        )}

        {!loading && wishes.length === 0 && (
          <p className="text-center text-muted-foreground">
            No wishes yet
          </p>
        )}

        {!loading && wishes.length > 0 && (
          <div className="grid gap-6 md:gap-8">
            {wishes.map((wish, index) => (
              <div
                key={wish.id}
                className={`transition-all duration-700 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${Math.min(index * 100, 500)}ms` }}
              >
                <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-lg p-6 md:p-8 shadow-soft">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                      <Heart className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-display text-lg text-foreground">
                          {wish.name}
                        </h3>
                        <span className="text-xs text-muted-foreground">
                          • {formatDate(wish.created_at)}
                        </span>
                      </div>
                      <p className="font-serif italic text-muted-foreground">
                        "{wish.wishes}"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Ornament */}
        {!loading && wishes.length > 0 && (
          <div
            className={`mt-12 flex justify-center transition-opacity duration-1000 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <SundaneseOrnament
              variant="corner"
              className="opacity-40 rotate-180"
            />
          </div>
        )}
      </div>
    </section>
  );
};
