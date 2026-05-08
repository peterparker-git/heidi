import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { FaPlay, FaPause } from 'react-icons/fa';

export default function FinalPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('celebrationCompleted', 'true');
  }, []);

  const toggleVoice = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex-1 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden w-full pb-20"
    >
      {/* Slow sparse confetti */}
      <Confetti 
        width={window.innerWidth} 
        height={window.innerHeight} 
        numberOfPieces={30} 
        gravity={0.05} 
        colors={['#FF9F43', '#6EC6FF', '#C8B6FF', '#FFF8E7', '#FFCAD4']}
      />

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="w-full max-w-sm"
      >
        {/* Photo */}
        <div className="bg-white p-3 pb-8 rounded-sm shadow-2xl shadow-purple-500/20 rotate-2 w-48 mx-auto mb-8 border border-gray-100">
          <div className="aspect-square bg-gray-200 w-full overflow-hidden flex items-center justify-center">
            <img 
              src="/foto.jpeg" 
              alt="Birthday Girl" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs text-center p-2 hidden">
              Add photo
            </div>
          </div>
        </div>

        {/* Final Message */}
        <div className="bg-black/20 backdrop-blur-md border border-white/10 p-6 rounded-3xl mb-8">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-(--color-orange) via-(--color-pink) to-(--color-lavender) mb-4">
            Happy Birthday ❤️
          </h2>
          <p className="text-white/90 leading-relaxed font-medium">
            Thank you for being one of the most beautiful parts of my life.<br/><br/>
            I hope this year gives you happiness, peace, memories and everything your heart secretly wishes for.
          </p>
        </div>

        {/* Voice Message Player */}
        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-full border border-white/20 flex items-center justify-center gap-4 cursor-pointer hover:bg-white/20 transition-colors" onClick={toggleVoice}>
          <div className="w-10 h-10 rounded-full bg-(--color-blue) flex items-center justify-center text-white shadow-lg">
            {isPlaying ? <FaPause size={14} /> : <FaPlay size={14} className="ml-1" />}
          </div>
          <span className="text-white font-medium">A little voice note for you 🎵</span>
          
          <audio 
            ref={audioRef} 
            src="/assets/voice/voice.mp3" 
            onEnded={() => setIsPlaying(false)}
            onError={() => {
              console.warn("Voice message not found. Add it to src/assets/voice/voice.mp3");
              setIsPlaying(false);
            }}
          />
        </div>
      </motion.div>

      {/* Floating particles background effect */}
      <div className="absolute inset-0 pointer-events-none z-[-1]">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-(--color-pink) rounded-full blur-[100px] opacity-30"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-(--color-lavender) rounded-full blur-[120px] opacity-30"></div>
      </div>

    </motion.div>
  );
}

