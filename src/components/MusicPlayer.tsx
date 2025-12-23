import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Using a royalty-free instrumental track URL
  const musicUrl = '/audio/Gamelan Symphony.mp3';

  useEffect(() => {
    if (audioRef.current) {
        audioRef.current.volume = 0.3;
        audioRef.current.loop = true;
        // audioRef.current.muted = true; // mute dulu supaya autoplay tidak diblokir
        audioRef.current.play()
        .then(() => {
          audioRef.current.muted = false; // unmute setelah autoplay
          setIsPlaying(true);
        })
        .catch((e) => {
          console.log('Autoplay gagal:', e);
        });
    }
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={musicUrl} />
      <button
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-foreground text-primary-foreground shadow-elegant flex items-center justify-center hover:bg-maroon-light transition-all duration-300 hover:scale-110"
        aria-label={isPlaying ? 'Mute music' : 'Play music'}
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5" />
        ) : (
          <VolumeX className="w-5 h-5" />
        )}
      </button>
    </>
  );
};

export default MusicPlayer;