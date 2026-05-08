import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';

export default function Countdown({ onNext }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isBirthday, setIsBirthday] = useState(false);

  useEffect(() => {
    // The user previously set the target date to June 9 (09/05/2005) - Wait, 09/05 is May 9.
    // In Password.jsx the user changed CORRECT_PASSWORD to "09/05/2005".
    // I will use May 9th as the birthday.
    const targetDate = new Date();
    targetDate.setMonth(4); // May is 4 (0-indexed)
    targetDate.setDate(9);
    targetDate.setHours(0, 0, 0, 0);

    // If May 9 has passed this year, target next year
    if (new Date() > targetDate && new Date().getMonth() !== 4 && new Date().getDate() !== 9) {
      targetDate.setFullYear(targetDate.getFullYear() + 1);
    }

    const interval = setInterval(() => {
      const now = new Date();
      // If it's currently May 9th
      if (now.getMonth() === 4 && now.getDate() === 9) {
        setIsBirthday(true);
        clearInterval(interval);
        return;
      }

      const difference = targetDate - now;
      if (difference <= 0) {
        setIsBirthday(true);
        clearInterval(interval);
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 1 }}
      className="flex-1 flex flex-col items-center justify-center p-6 text-center w-full z-20"
    >
      <AnimatePresence mode="wait">
        {!isBirthday ? (
          <motion.div
            key="waiting"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="bg-black/30 p-8 rounded-3xl border border-white/10 backdrop-blur-md w-full max-w-sm"
          >
            <h2 className="text-(--color-lavender) text-xl font-medium mb-8">The city is waiting for your day... 🌙</h2>
            <div className="flex gap-4 justify-center text-white font-mono text-3xl font-bold">
              <div className="flex flex-col"><span className="text-4xl text-(--color-blue)">{timeLeft.days}</span><span className="text-xs text-white/50 font-sans font-normal mt-1 tracking-widest">DAYS</span></div>
              <span className="opacity-30">:</span>
              <div className="flex flex-col"><span className="text-4xl text-(--color-blue)">{timeLeft.hours}</span><span className="text-xs text-white/50 font-sans font-normal mt-1 tracking-widest">HRS</span></div>
              <span className="opacity-30">:</span>
              <div className="flex flex-col"><span className="text-4xl text-(--color-blue)">{timeLeft.minutes}</span><span className="text-xs text-white/50 font-sans font-normal mt-1 tracking-widest">MIN</span></div>
              <span className="opacity-30">:</span>
              <div className="flex flex-col"><span className="text-4xl text-(--color-blue)">{timeLeft.seconds}</span><span className="text-xs text-white/50 font-sans font-normal mt-1 tracking-widest">SEC</span></div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="birthday"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="w-full flex flex-col items-center"
          >
            <Confetti width={window.innerWidth} height={window.innerHeight} recycle={true} numberOfPieces={200} />
            
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="mb-8 relative"
            >
              {/* Fireworks/Glow behind text */}
              <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,159,67,0.5)_0%,transparent_70%)] blur-2xl z-[-1]"></div>
              
              <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-(--color-orange) to-(--color-pink) drop-shadow-2xl">
                IT'S YOUR DAYYYYY 🎉
              </h1>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={onNext}
        className="mt-16 px-8 py-4 rounded-full bg-(--color-pink) hover:bg-pink-400 text-white font-bold shadow-[0_0_20px_rgba(255,202,212,0.5)] transition-all"
      >
        See What's Next ✨
      </motion.button>
    </motion.div>
  );
}

