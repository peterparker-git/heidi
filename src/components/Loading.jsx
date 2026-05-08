import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Loading({ onNext }) {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    // Simulate loading
    const interval = setInterval(() => {
      setPercentage((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onNext();
          }, 1500); // Wait a bit after 100% to let the cinematic zoom happen
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 1;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [onNext]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 2, filter: "blur(10px)" }} // Cinematic Zoom out transition
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="flex-1 flex flex-col items-center justify-center p-6 text-center z-20 relative w-full h-full"
    >
      {/* Heavy overlay to make city look blurred and distant initially */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md pointer-events-none rounded-3xl" />

      <motion.div 
        className="relative z-30 flex flex-col items-center"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        {/* Heartbeat pulse glow */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-32 h-32 bg-(--color-lavender) rounded-full blur-3xl"
        />

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 2 }}
          className="text-white font-medium text-lg tracking-widest uppercase mb-6 drop-shadow-md"
        >
          Preparing a special celebration...
        </motion.p>

        <div className="text-4xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-(--color-blue) to-(--color-pink)">
          {Math.min(percentage, 100)}%
        </div>

        {/* Loading Bar */}
        <div className="w-48 h-1 bg-white/20 rounded-full mt-4 overflow-hidden relative">
          <motion.div 
            className="h-full bg-gradient-to-r from-(--color-lavender) to-(--color-pink)"
            initial={{ width: "0%" }}
            animate={{ width: `${Math.min(percentage, 100)}%` }}
            transition={{ ease: "linear" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

