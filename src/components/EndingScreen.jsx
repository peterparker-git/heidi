import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause } from 'react-icons/fa';

export default function EndingScreen({ onNext }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const handleForceBg = () => {
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };
    window.addEventListener('bgm-force-play', handleForceBg);
    return () => window.removeEventListener('bgm-force-play', handleForceBg);
  }, []);

  const toggleVoice = async () => {
    try {
      if (!audioRef.current) {
        const audio = new Audio('/11-11wishes.mpeg');
        audio.onended = () => {
          setIsPlaying(false);
          window.dispatchEvent(new CustomEvent('media-ended'));
        };
        audio.onerror = () => {
          setIsPlaying(false);
          window.dispatchEvent(new CustomEvent('media-ended'));
        };
        audioRef.current = audio;
      }

      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        window.dispatchEvent(new CustomEvent('media-ended'));
      } else {
        window.dispatchEvent(new CustomEvent('media-started'));
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Audio playback failed:", error);
      setIsPlaying(false);
      window.dispatchEvent(new CustomEvent('media-ended'));
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="flex-1 flex flex-col items-center justify-center p-6 text-center relative w-full pb-20 z-20"
    >
      {/* Scrapbook Frame */}
      <motion.div 
        initial={{ y: 50, rotate: -2 }}
        animate={{ y: 0, rotate: -2 }}
        transition={{ delay: 1, type: "spring" }}
        className="bg-[#fdfbf7] p-6 pb-12 rounded-sm shadow-2xl w-full max-w-md relative border border-gray-200"
      >
        {/* Tape strips */}
        <div className="absolute -top-3 left-6 w-20 h-6 bg-yellow-500/20 backdrop-blur-md rotate-3 shadow-sm"></div>
        <div className="absolute -bottom-3 right-6 w-16 h-6 bg-yellow-500/20 backdrop-blur-md -rotate-6 shadow-sm"></div>
        
        {/* Stickers */}
        <motion.div whileHover={{ scale: 1.2, rotate: 10 }} className="absolute -top-6 -right-4 text-4xl drop-shadow-md cursor-pointer z-30">🌻</motion.div>
        <motion.div whileHover={{ scale: 1.2, rotate: -10 }} className="absolute top-1/2 -left-6 text-3xl drop-shadow-md cursor-pointer z-30">✨</motion.div>
        <motion.div whileHover={{ scale: 1.2, rotate: 15 }} className="absolute bottom-8 -right-2 text-3xl drop-shadow-md cursor-pointer z-30">🐰</motion.div>


        {/* Photo Container */}
        <div className="w-full aspect-square bg-gray-200 mb-6 p-2 bg-white shadow-inner relative overflow-hidden">
           <img 
              src="/foto.jpeg" 
              alt="Birthday Girl" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm hidden">
              Add /photo.jpg
            </div>
            
            {/* Soft overlay on photo */}
            <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 to-transparent mix-blend-overlay pointer-events-none"></div>
        </div>

        {/* Handwritten Message */}
        <div className="font-serif text-gray-800 text-left space-y-4 px-2">
          <p className="text-xl font-bold text-pink-600">Happppyyyyy Birthddaaaaaayyyyyyyy Ah Beee!</p>
          <p className="text-md leading-relaxed italic">
            Thanks for existing in my timeline. <br/>
            I hope this year gives you happiness, peace, memories <br/>
            and everything your heart secretly wishes for.<br/>
            The city feels brighter with you in it. <br/>
            You made this story special.
          </p>
        </div>

        {/* Voice Note Player */}
        <div 
          className="mt-8 bg-gray-100 p-3 rounded-xl border border-gray-200 flex items-center gap-4 cursor-pointer hover:bg-gray-200 transition-colors shadow-sm"
          onClick={toggleVoice}
        >
          <div className="w-10 h-10 rounded-full bg-pink-400 flex items-center justify-center text-white shadow-md">
            {isPlaying ? <FaPause size={12} /> : <FaPlay size={12} className="ml-1" />}
          </div>
          <span className="text-gray-700 font-sans text-sm font-medium">A little voice note... 🎵</span>
        </div>
      </motion.div>

      <div className="flex flex-col gap-4 mt-8 z-10 w-full max-w-xs mx-auto">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          onClick={onNext}
          className="px-8 py-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/30 shadow-lg transition-all"
        >
          One Last Thing... 💌
        </motion.button>
      </div>
    </motion.div>
  );
}

