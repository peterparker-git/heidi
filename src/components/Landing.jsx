import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Howl } from 'howler';
import { FaPlay, FaPause } from 'react-icons/fa';

export default function Landing({ onNext }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isBirthday, setIsBirthday] = useState(false);
  const soundRef = useRef(null);

  // Set the target date (Next June 12th)
  useEffect(() => {
    const targetDate = new Date();
    targetDate.setMonth(5); // June is 5 (0-indexed)
    targetDate.setDate(9);
    targetDate.setHours(0, 0, 0, 0);

    // If June 12 has passed this year, target next year
    if (new Date() > targetDate && new Date().getMonth() !== 5 && new Date().getDate() !== 12) {
      targetDate.setFullYear(targetDate.getFullYear() + 1);
    }

    const interval = setInterval(() => {
      const now = new Date();
      // If it's currently June 12th
      if (now.getMonth() === 5 && now.getDate() === 12) {
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

  // Handle Music
  useEffect(() => {
    // We use a placeholder file. In a real app, the user needs to put the file in assets/songs/background.mp3
    soundRef.current = new Howl({
      src: ['/assets/songs/background.mp3'], // Vite path to src
      loop: true,
      volume: 0.5,
      onloaderror: () => {
        console.warn("Audio file not found or couldn't be loaded. Make sure you add background.mp3 to src/assets/songs/");
        // We set playing to false if it errors out just so the UI makes sense
        setIsPlaying(false);
      }
    });

    soundRef.current.play();

    return () => {
      if (soundRef.current) {
        soundRef.current.unload();
      }
    };
  }, []);

  const toggleMusic = () => {
    if (isPlaying) {
      soundRef.current.pause();
    } else {
      soundRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 flex flex-col items-center p-6 text-center w-full relative"
    >
      {/* Music Toggle */}
      <button 
        onClick={toggleMusic}
        className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/30 transition-colors z-10"
      >
        {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
      </button>

      <div className="mt-12 mb-8">
        {!isBirthday ? (
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white/10 p-6 rounded-3xl border border-white/20 backdrop-blur-sm"
          >
            <h2 className="text-(--color-lavender) text-lg font-medium mb-4">The city is waiting for your birthday ✨</h2>
            <div className="flex gap-4 justify-center text-white font-mono text-2xl font-bold">
              <div className="flex flex-col"><span className="text-3xl">{timeLeft.days}</span><span className="text-xs text-white/60 font-sans font-normal">DAYS</span></div>
              <span className="opacity-50">:</span>
              <div className="flex flex-col"><span className="text-3xl">{timeLeft.hours}</span><span className="text-xs text-white/60 font-sans font-normal">HRS</span></div>
              <span className="opacity-50">:</span>
              <div className="flex flex-col"><span className="text-3xl">{timeLeft.minutes}</span><span className="text-xs text-white/60 font-sans font-normal">MIN</span></div>
              <span className="opacity-50">:</span>
              <div className="flex flex-col"><span className="text-3xl">{timeLeft.seconds}</span><span className="text-xs text-white/60 font-sans font-normal">SEC</span></div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-8"
          >
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-(--color-orange) via-(--color-pink) to-(--color-lavender) mb-4">
              HAPPY BIRTHDAY 🎉
            </h1>
            <p className="text-(--color-blue) text-lg">May your year be soft, chaotic and beautiful.</p>
          </motion.div>
        )}
      </div>

      {/* Polaroid Photo */}
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="bg-white p-4 pb-12 rounded-sm shadow-2xl shadow-pink-500/20 rotate-[-2deg] max-w-[280px] w-full border border-gray-100 relative"
      >
        <div className="aspect-square bg-gray-200 w-full overflow-hidden flex items-center justify-center relative">
          <img 
            src="/assets/photos/photo.jpg" 
            alt="Birthday Girl" 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm text-center p-4 hidden">
            Add your photo to /photo.jpg
          </div>
        </div>
      </motion.div>

      {/* Spacer */}
      <div className="flex-1"></div>

      {/* Next Button */}
      <button
        onClick={onNext}
        className="mt-12 w-full py-4 rounded-full bg-(--color-blue) hover:bg-blue-400 text-white font-bold shadow-lg shadow-blue-500/30 transition-all text-lg"
      >
        Next Surprise →
      </button>

    </motion.div>
  );
}

