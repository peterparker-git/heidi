import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function FinalWishMoment({ onNext }) {
  const [lanterns] = useState(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      bottom: `${Math.random() * -20 - 10}%`,
      size: Math.random() * 15 + 10,
      duration: Math.random() * 15 + 15,
      delay: Math.random() * 5
    }));
  });

  useEffect(() => {

    const timer = setTimeout(() => {
      onNext();
    }, 8000);

    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
      className="flex-1 flex flex-col items-center justify-center p-6 text-center z-20 overflow-hidden w-full h-full"
    >
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 2 }}
        className="text-4xl font-serif italic text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] z-30 leading-snug"
      >
        Your wishes are officially <br/> in the universe 🌌
      </motion.h2>

      {/* Floating Lanterns specific to this scene */}
      <div className="absolute inset-0 pointer-events-none">
        {lanterns.map(l => (
          <motion.div
            key={l.id}
            initial={{ y: l.bottom, opacity: 0, scale: 0.5 }}
            animate={{ 
              y: '-120vh', 
              opacity: [0, 0.8, 0.8, 0],
              x: ['-20px', '20px', '-20px'] 
            }}
            transition={{ 
              y: { duration: l.duration, delay: l.delay, ease: 'linear' },
              opacity: { duration: l.duration, delay: l.delay, ease: 'linear' },
              x: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
            }}
            className="absolute rounded-t-xl rounded-b-md"
            style={{ 
              left: l.left, 
              width: l.size, 
              height: l.size * 1.4,
              backgroundColor: 'var(--color-orange)',
              boxShadow: `0 0 ${l.size * 2}px var(--color-orange)`
            }}
          >
            <div className="absolute inset-0 bg-yellow-200 rounded-full blur-[2px] opacity-70"></div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

