import { motion } from 'framer-motion';
import { useState } from 'react';

export default function CityBackground({ isDarkened }) {
  const [stars] = useState(() => {
    return Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 60}%`,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5
    }));
  });

  const [particles] = useState(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
      size: Math.random() * 6 + 2,
      color: Math.random() > 0.5 ? 'var(--color-orange)' : 'var(--color-pink)'
    }));
  });

  return (
    <div className="fixed inset-0 pointer-events-none z-[-10] overflow-hidden transition-colors duration-1000"
         style={{ backgroundColor: isDarkened ? '#0a0a14' : 'var(--bg-gradient)' }}>
      
      {/* Dynamic Background Gradient */}
      <motion.div 
        animate={{ opacity: isDarkened ? 0.2 : 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#4a235a] opacity-80"
      />

      {/* Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{ left: star.left, top: star.top, width: star.size, height: star.size }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 3, delay: star.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Clouds */}
      <motion.div 
        animate={{ x: ['-10%', '100%'] }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className="absolute top-[20%] w-[200%] h-32 opacity-10 blur-xl bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.5)_0%,transparent_50%)]"
      />
      
      {/* Blurred City Skyline (CSS Shapes) */}
      <motion.div 
        animate={{ opacity: isDarkened ? 0.3 : 0.8 }}
        transition={{ duration: 2 }}
        className="absolute bottom-0 w-full h-[40%] flex items-end justify-center opacity-80 blur-[2px]"
      >
        <div className="w-[15%] h-[60%] bg-[#0f0f20] mx-1 rounded-t-sm relative shadow-[0_0_20px_rgba(200,182,255,0.3)]">
           <div className="absolute top-4 left-4 w-2 h-2 bg-yellow-200/40 rounded-full"></div>
           <div className="absolute top-12 left-4 w-2 h-2 bg-yellow-200/40 rounded-full"></div>
        </div>
        <div className="w-[10%] h-[80%] bg-[#121226] mx-1 rounded-t-sm relative shadow-[0_0_30px_rgba(110,198,255,0.2)]">
           <div className="absolute top-10 right-4 w-2 h-2 bg-(--color-orange) opacity-60 rounded-full shadow-[0_0_10px_orange]"></div>
        </div>
        <div className="w-[20%] h-[50%] bg-[#0a0a16] mx-1 rounded-t-md relative shadow-[0_0_20px_rgba(255,202,212,0.2)]">
           <div className="absolute top-6 left-1/2 w-4 h-4 bg-(--color-pink) opacity-40 blur-sm rounded-full"></div>
        </div>
        <div className="w-[12%] h-[90%] bg-[#15152d] mx-1 rounded-t-sm relative shadow-[0_0_40px_rgba(200,182,255,0.4)]">
           <div className="absolute top-20 left-4 w-2 h-2 bg-white/40 rounded-full"></div>
           <div className="absolute top-20 right-4 w-2 h-2 bg-white/40 rounded-full"></div>
        </div>
        <div className="w-[15%] h-[65%] bg-[#0c0c1a] mx-1 rounded-t-sm relative"></div>
      </motion.div>

      {/* Tiny Background Train Movement */}
      <motion.div 
        animate={{ x: ['100vw', '-20vw'] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 5 }}
        className="absolute bottom-[20%] w-32 h-2 flex gap-1 blur-[1px] opacity-40"
      >
        <div className="w-8 h-full bg-yellow-300 rounded-sm shadow-[0_0_10px_yellow]"></div>
        <div className="w-8 h-full bg-yellow-200 rounded-sm shadow-[0_0_10px_yellow]"></div>
        <div className="w-8 h-full bg-yellow-200 rounded-sm shadow-[0_0_10px_yellow]"></div>
      </motion.div>

      {/* Floating Lanterns / Particles */}
      {particles.map((p) => (
        <motion.div
          key={`particle-${p.id}`}
          className="absolute rounded-full"
          style={{ 
            left: p.left, 
            width: p.size, 
            height: p.size, 
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 2}px var(--color-orange)`,
            opacity: 0.6
          }}
          initial={{ y: '110vh' }}
          animate={{ y: '-10vh', x: ['-20px', '20px', '-20px'] }}
          transition={{ 
            y: { duration: p.duration, repeat: Infinity, ease: 'linear', delay: p.delay },
            x: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
          }}
        />
      ))}
    </div>
  );
}

