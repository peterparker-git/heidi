import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CursorSparkle() {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    let timeoutId;
    
    const handleMouseMove = (e) => {
      // Limit sparkle generation to not overwhelm the DOM
      if (Math.random() > 0.8) {
        const id = Date.now() + Math.random();
        const color = Math.random() > 0.5 ? 'var(--color-pink)' : 'var(--color-orange)';
        const targetScale = Math.random() * 1.5 + 0.5;
        const targetY = e.clientY + (Math.random() * 40 - 20);
        
        setSparkles(prev => [...prev.slice(-15), { id, x: e.clientX, y: e.clientY, color, targetScale, targetY }]);
        
        // Cleanup old sparkles automatically
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setSparkles([]);
        }, 1000);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {sparkles.map((s) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 1, scale: 0, x: s.x, y: s.y }}
            animate={{ 
              opacity: 0, 
              scale: s.targetScale, 
              y: s.targetY 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute w-2 h-2 rounded-full blur-[1px]"
            style={{ 
              backgroundColor: s.color,
              transform: 'translate(-50%, -50%)' 
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

