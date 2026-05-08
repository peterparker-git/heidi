import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

export default function LightCandles({ onNext, cakeData }) {
  const [lit, setLit] = useState(false);

  const handleLight = () => {
    setLit(true);
    setTimeout(() => {
      onNext();
    }, 4000); // 4 seconds of warm glow animation before moving to wishes
  };

  if (!cakeData) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "brightness(0.5)" }}
      className="flex-1 flex flex-col items-center justify-center p-6 text-center w-full z-20 transition-all duration-1000"
    >
      {/* Background Dimming when lit */}
      <motion.div 
        animate={{ opacity: lit ? 0.7 : 0 }}
        transition={{ duration: 2 }}
        className="fixed inset-0 bg-black pointer-events-none z-[-1]"
      />

      {/* Warm Glow when lit */}
      <motion.div 
        animate={{ opacity: lit ? 0.5 : 0 }}
        transition={{ duration: 2 }}
        className="fixed inset-0 bg-[radial-gradient(circle,rgba(255,159,67,0.4)_0%,transparent_70%)] pointer-events-none z-[-1]"
      />

      <h2 className="text-3xl font-bold text-white mb-12 drop-shadow-md">
        {lit ? "Beautiful... ✨" : "Almost ready!"}
      </h2>

      {/* Visual Cake */}
      <div className="relative w-64 h-64 mx-auto mb-12 flex flex-col items-center justify-end z-10">
        
        {/* Candles */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2.0, type: "spring" }}
          className="flex gap-2 mb-[-10px] z-20"
        >
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-2 h-10 bg-white border border-gray-200 rounded-sm relative shadow-sm">
              <AnimatePresence>
                {lit && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: [1, 1.2, 1] }}
                    transition={{ opacity: { duration: 0.5, delay: i * 0.3 }, scale: { repeat: Infinity, duration: 0.5 + (i * 0.1) } }}
                    className="w-3 h-4 bg-(--color-orange) rounded-full absolute -top-4 -left-0.5 shadow-[0_0_20px_var(--color-orange)]"
                  >
                    <div className="absolute inset-0 bg-yellow-200 rounded-full blur-[1px] scale-50"></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>

        {/* Top Frosting */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5, type: "spring" }}
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

          {cakeData.decorations.map((dec, index) => (
             <motion.div 
               key={dec.id} 
               initial={{ scale: 0 }}
               animate={{ scale: 1 }}
               transition={{ delay: 2.5 + (index * 0.2), type: "spring" }}
               className="absolute text-2xl drop-shadow-sm" 
               style={{ left: `${dec.x}%`, top: `${dec.y}%`, transform: 'translate(-50%, -50%)' }}
             >
               {DECORATION_EMOJIS[dec.type]}
             </motion.div>
          ))}
        </motion.div>
        
        {/* Base Layers */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.0, type: "spring" }}
          className="w-48 h-24 rounded-b-xl border-t border-black/10 shadow-2xl relative z-10 flex flex-col overflow-hidden"
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
        </motion.div>

        {/* Plate */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="w-56 h-4 bg-gray-200 rounded-full mt-2 shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
        />
      </div>

      {!lit && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleLight}
          className="px-8 py-4 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/40 shadow-lg transition-all text-lg font-bold"
        >
          Light the candles 🔥
        </motion.button>
      )}

      {/* Spark particles when lighting */}
      {lit && (
        <motion.div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: '50vw', y: '50vh', opacity: 1, scale: 1 
              }}
              animate={{ 
                x: `${(i * 15) % 100}vw`, 
                y: `${(i * 25) % 100}vh`,
                opacity: 0,
                scale: 0
              }}
              transition={{ duration: 1 + (i * 0.1), ease: "easeOut" }}
              className="absolute w-1 h-1 bg-yellow-300 rounded-full shadow-[0_0_5px_yellow]"
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}

