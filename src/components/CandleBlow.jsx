import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';

const BASES = {
  Chocolate: '#5C4033',
  Strawberry: '#FFB6C1',
  Vanilla: '#F3E5AB'
};

const FROSTINGS = {
  Blue: '#6EC6FF',
  Pink: '#FFCAD4',
  Lavender: '#C8B6FF',
  Orange: '#FF9F43'
};

const DECORATION_EMOJIS = {
  Sprinkles: '🎊',
  Stars: '⭐',
  Hearts: '💖',
  Cherries: '🍒'
};

export default function CandleBlow({ onNext, cakeData }) {
  const [blown, setBlown] = useState(false);
  const [micError, setMicError] = useState(false);
  
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const microphoneRef = useRef(null);
  const animationFrameRef = useRef(null);

  const handleBlow = useCallback(() => {
    setBlown(true);
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    
    // Auto navigate after celebration
    setTimeout(() => {
      onNext();
    }, 5000);
  }, [onNext]);

  useEffect(() => {
    const initMic = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        analyserRef.current = audioContextRef.current.createAnalyser();
        microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream);
        
        microphoneRef.current.connect(analyserRef.current);
        analyserRef.current.fftSize = 256;
        
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        
        const detectBlow = () => {
          if (!analyserRef.current || blown) return;
          
          analyserRef.current.getByteFrequencyData(dataArray);
          
          let sum = 0;
          for(let i = 0; i < bufferLength; i++) {
            sum += dataArray[i];
          }
          const average = sum / bufferLength;
          
          if (average > 100 && !blown) {
            handleBlow();
          } else {
            animationFrameRef.current = requestAnimationFrame(detectBlow);
          }
        };
        
        detectBlow();
      } catch (err) {
        console.error("Microphone access denied or error", err);
        setMicError(true);
      }
    };

    initMic();

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, [blown, handleBlow]);

  if (!cakeData) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "brightness(0)" }}
      transition={{ duration: 1 }}
      className="flex-1 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden w-full z-20"
    >
      {blown && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={800} gravity={0.15} />}

      {/* Dimmed Room Effect when blown */}
      <motion.div 
        animate={{ opacity: blown ? 0.8 : 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 bg-black pointer-events-none z-[-1]"
      />

      <h2 className="text-2xl md:text-3xl font-bold text-white mb-12 z-10 drop-shadow-md px-4">
        {blown ? "Yayyyy! 🎉" : "Blow into your phone's mic to put them out! 🌬️"}
      </h2>

      {/* Visual Cake */}
      <div className="relative w-64 h-64 mx-auto mb-12 flex flex-col items-center justify-end z-10">
        
        {/* Candles */}
        <div className="flex gap-2 mb-[-10px] z-20">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-2 h-10 bg-white border border-gray-200 rounded-sm relative shadow-sm">
              <AnimatePresence>
                {!blown ? (
                  <motion.div 
                    key="flame"
                    animate={{ scale: [1, 1.2, 1], x: [0, 1, -1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.5 + (i * 0.1) }}
                    className="w-3 h-4 bg-(--color-orange) rounded-full absolute -top-4 -left-0.5 shadow-[0_0_20px_var(--color-orange)]"
                  >
                    <div className="absolute inset-0 bg-yellow-200 rounded-full blur-[1px] scale-50"></div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="smoke"
                    initial={{ opacity: 0.8, y: 0, scale: 1 }}
                    animate={{ opacity: 0, y: -40, scale: 3, x: i % 2 === 0 ? 20 : -20 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="w-4 h-4 bg-gray-400 rounded-full absolute -top-4 -left-1 blur-md"
                  />
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Top Frosting */}
        <div 
          className="w-48 h-12 rounded-t-xl z-10 relative shadow-[inset_0_-5px_10px_rgba(0,0,0,0.1)]"
          style={{ backgroundColor: FROSTINGS[cakeData.frosting] }}
        >
          {/* Frosting Drips */}
          <div className="absolute top-full left-2 w-4 h-6 rounded-b-full" style={{ backgroundColor: FROSTINGS[cakeData.frosting] }}></div>
          <div className="absolute top-full left-8 w-5 h-8 rounded-b-full" style={{ backgroundColor: FROSTINGS[cakeData.frosting] }}></div>
          <div className="absolute top-full left-16 w-4 h-5 rounded-b-full" style={{ backgroundColor: FROSTINGS[cakeData.frosting] }}></div>
          <div className="absolute top-full left-24 w-6 h-10 rounded-b-full" style={{ backgroundColor: FROSTINGS[cakeData.frosting] }}></div>
          <div className="absolute top-full left-32 w-5 h-7 rounded-b-full" style={{ backgroundColor: FROSTINGS[cakeData.frosting] }}></div>
          <div className="absolute top-full right-4 w-4 h-9 rounded-b-full" style={{ backgroundColor: FROSTINGS[cakeData.frosting] }}></div>

          {cakeData.decorations.map((dec) => (
             <div 
               key={dec.id} 
               className="absolute text-2xl drop-shadow-sm" 
               style={{ left: `${dec.x}%`, top: `${dec.y}%`, transform: 'translate(-50%, -50%)' }}
             >
               {DECORATION_EMOJIS[dec.type]}
             </div>
          ))}
        </div>
        
        {/* Base Layers */}
        <div 
          className="w-48 h-24 rounded-b-xl border-t border-black/10 shadow-2xl relative flex flex-col overflow-hidden"
        >
          {cakeData.layers.map((layerFlavor, idx) => (
            <div 
              key={`layer-${idx}`} 
              className={`w-full flex-1 relative ${idx < 2 ? 'border-b-2 border-white/20' : ''}`}
              style={{ backgroundColor: BASES[layerFlavor] }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
            </div>
          ))}
        </div>

        {/* Plate */}
        <div className="w-56 h-4 bg-gray-200 rounded-full mt-2 shadow-[0_10px_20px_rgba(0,0,0,0.5)]"></div>
      </div>

      <AnimatePresence>
        {(micError || blown) && !blown && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            onClick={handleBlow}
            className="px-8 py-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/30 transition-all z-10"
          >
            Blow Candles 🌬️
          </motion.button>
        )}
      </AnimatePresence>

    </motion.div>
  );
}

