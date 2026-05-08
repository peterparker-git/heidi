import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

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

export default function CakeBuilder({ onNext, setCakeData }) {
  const [layers, setLayers] = useState(['Vanilla', 'Chocolate', 'Strawberry']);
  const [frosting, setFrosting] = useState('Pink');
  const [placedDecorations, setPlacedDecorations] = useState([]);
  
  const cakeRef = useRef(null);

  const handleDragEnd = (event, info, type) => {
    // If dragged over the cake area roughly (simple distance check)
    if (cakeRef.current) {
      const rect = cakeRef.current.getBoundingClientRect();
      const x = event.clientX || (event.changedTouches && event.changedTouches[0].clientX);
      const y = event.clientY || (event.changedTouches && event.changedTouches[0].clientY);
      
      if (x > rect.left && x < rect.right && y > rect.top && y < rect.bottom) {
        // Calculate relative position to the cake
        const relX = ((x - rect.left) / rect.width) * 100;
        const relY = ((y - rect.top) / rect.height) * 100;
        
        setPlacedDecorations(prev => [...prev, { id: Date.now(), type, x: relX, y: relY }]);
      }
    }
  };

  const handleDone = () => {
    setCakeData({ layers, frosting, decorations: placedDecorations });
    onNext();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="flex-1 flex flex-col p-6 w-full overflow-y-auto pb-24 z-20"
    >
      <h2 className="text-3xl font-bold text-center text-(--color-lavender) mb-6 drop-shadow-md">Build Your Cake 🎂</h2>

      {/* Visual Cake Preview */}
      <div className="relative w-64 h-48 mx-auto mb-8 flex flex-col items-center justify-end" ref={cakeRef}>
        
        {/* Top Frosting */}
        <div 
          className="w-48 h-12 rounded-t-xl z-10 transition-colors duration-500 relative shadow-[inset_0_-5px_10px_rgba(0,0,0,0.1)]"
          style={{ backgroundColor: FROSTINGS[frosting] }}
        >
          {/* Frosting Drips */}
          <div className="absolute top-full left-2 w-4 h-6 rounded-b-full transition-colors duration-500" style={{ backgroundColor: FROSTINGS[frosting] }}></div>
          <div className="absolute top-full left-8 w-5 h-8 rounded-b-full transition-colors duration-500" style={{ backgroundColor: FROSTINGS[frosting] }}></div>
          <div className="absolute top-full left-16 w-4 h-5 rounded-b-full transition-colors duration-500" style={{ backgroundColor: FROSTINGS[frosting] }}></div>
          <div className="absolute top-full left-24 w-6 h-10 rounded-b-full transition-colors duration-500" style={{ backgroundColor: FROSTINGS[frosting] }}></div>
          <div className="absolute top-full left-32 w-5 h-7 rounded-b-full transition-colors duration-500" style={{ backgroundColor: FROSTINGS[frosting] }}></div>
          <div className="absolute top-full right-4 w-4 h-9 rounded-b-full transition-colors duration-500" style={{ backgroundColor: FROSTINGS[frosting] }}></div>

          {placedDecorations.map((dec) => (
             <motion.div 
               key={dec.id} 
               initial={{ scale: 0, rotate: -45 }}
               animate={{ scale: 1, rotate: (dec.id % 360) }}
               className="absolute text-2xl pointer-events-none drop-shadow-sm" 
               style={{ left: `${dec.x}%`, top: `${dec.y}%`, transform: 'translate(-50%, -50%)' }}
             >
               {DECORATION_EMOJIS[dec.type]}
             </motion.div>
          ))}
        </div>
        
        {/* Base Layers */}
        <div className="w-48 h-24 rounded-b-xl border-t border-black/10 shadow-2xl relative flex flex-col overflow-hidden">
          {layers.map((layerFlavor, idx) => (
            <div 
              key={`layer-${idx}`} 
              className={`w-full flex-1 relative ${idx < 2 ? 'border-b-2 border-white/20' : ''}`}
              style={{ backgroundColor: BASES[layerFlavor], transition: 'background-color 0.5s' }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
            </div>
          ))}
        </div>

        {/* Plate */}
        <div className="w-56 h-4 bg-gray-200 rounded-full mt-2 shadow-[0_10px_20px_rgba(0,0,0,0.5)]"></div>
      </div>

      <div className="space-y-6">
        {/* Step 1: Layers */}
        <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/20">
          <h3 className="font-bold mb-3 text-(--color-cream)">1. Flavors</h3>
          <div className="flex flex-col gap-3">
            {['Top', 'Middle', 'Bottom'].map((label, index) => (
              <div key={label} className="flex items-center gap-2">
                <span className="text-xs text-white/70 w-12">{label}</span>
                <div className="flex flex-1 gap-1">
                  {Object.keys(BASES).map(b => (
                    <button 
                      key={b} 
                      onClick={() => {
                        const newLayers = [...layers];
                        newLayers[index] = b;
                        setLayers(newLayers);
                      }}
                      className={`flex-1 py-1.5 rounded-md text-[10px] sm:text-xs transition-all ${layers[index] === b ? 'bg-white text-black font-bold scale-105 shadow-md' : 'bg-black/40 text-white hover:bg-black/60'}`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step 2: Frosting */}
        <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/20">
          <h3 className="font-bold mb-3 text-(--color-cream)">2. Frosting</h3>
          <div className="flex gap-2">
            {Object.entries(FROSTINGS).map(([name, color]) => (
              <button 
                key={name} 
                onClick={() => setFrosting(name)}
                style={{ backgroundColor: color }}
                className={`flex-1 py-4 rounded-xl transition-all ${frosting === name ? 'ring-2 ring-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.5)]' : 'opacity-70'}`}
              />
            ))}
          </div>
        </div>

        {/* Step 3: Decorations (Drag and Drop) */}
        <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/20">
          <h3 className="font-bold mb-1 text-(--color-cream)">3. Toppings</h3>
          <p className="text-xs text-white/50 mb-4">Drag these onto your cake!</p>
          <div className="flex justify-around items-center h-16">
            {Object.keys(DECORATION_EMOJIS).map(dec => (
              <div key={dec} className="relative z-50">
                <motion.div 
                  drag
                  dragSnapToOrigin
                  onDragEnd={(e, info) => handleDragEnd(e, info, dec)}
                  whileHover={{ scale: 1.2 }}
                  whileDrag={{ scale: 1.5, zIndex: 100 }}
                  className="text-4xl cursor-grab active:cursor-grabbing"
                >
                  {DECORATION_EMOJIS[dec]}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={handleDone}
        className="mt-8 mb-4 w-full py-4 rounded-full bg-gradient-to-r from-(--color-orange) to-(--color-pink) text-white font-bold shadow-[0_0_20px_rgba(255,159,67,0.4)] transition-all text-lg"
      >
        Done Making Cake 🎂
      </button>

    </motion.div>
  );
}

