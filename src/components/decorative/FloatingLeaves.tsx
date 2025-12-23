import { useEffect, useState } from 'react';

interface Leaf {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
}

export const FloatingLeaves = () => {
  const [leaves, setLeaves] = useState<Leaf[]>([]);

  useEffect(() => {
    const newLeaves: Leaf[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 15 + Math.random() * 10,
      size: 12 + Math.random() * 12,
      rotation: Math.random() * 360,
    }));
    setLeaves(newLeaves);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="absolute animate-float opacity-20"
          style={{
            left: `${leaf.x}%`,
            top: '-50px',
            animationDelay: `${leaf.delay}s`,
            animationDuration: `${leaf.duration}s`,
          }}
        >
          <svg
            width={leaf.size}
            height={leaf.size * 1.5}
            viewBox="0 0 24 36"
            fill="none"
            style={{ transform: `rotate(${leaf.rotation}deg)` }}
          >
            <path
              d="M12 0 C6 8 2 16 4 24 C6 32 12 36 12 36 C12 36 18 32 20 24 C22 16 18 8 12 0"
              className="fill-sage"
            />
            <path
              d="M12 4 L12 32"
              className="stroke-sage-light"
              strokeWidth="0.5"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};
