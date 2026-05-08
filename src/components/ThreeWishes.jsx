import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ThreeWishes({ onNext }) {
  const [wishes, setWishes] = useState(['', '', '']);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateWish = (index, value) => {
    const newWishes = [...wishes];
    newWishes[index] = value;
    setWishes(newWishes);
  };

  const handleSend = () => {
    setIsSubmitted(true);
    
    // Auto navigate after lanterns fly away
    setTimeout(() => {
      onNext();
    }, 4500);
  };

  const allFilled = wishes.every(w => w.trim() !== '');

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col p-6 text-center w-full justify-center z-20 overflow-hidden"
    >
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div 
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-sm mx-auto flex flex-col items-center"
          >
            <div className="bg-(--color-cream) text-black p-8 rounded-3xl shadow-2xl relative w-full transform -rotate-1 mb-8">
              {/* Notebook bindings */}
              <div className="absolute left-4 top-0 bottom-0 w-4 border-r-2 border-red-200 opacity-50 flex flex-col justify-evenly">
                 {[...Array(6)].map((_, i) => (
                   <div key={i} className="w-2 h-2 rounded-full bg-gray-400 -ml-1 shadow-inner"></div>
                 ))}
              </div>

              <h2 className="text-2xl font-bold mb-2 text-pink-600 font-serif ml-4">Make 3 Wishes ✨</h2>
              <p className="text-gray-500 text-sm mb-6 ml-4 font-serif italic">Yarru kitayum solla dhaa ! </p>

              <div className="space-y-6 ml-4">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="relative group">
                    <span className="absolute left-0 top-3 text-pink-300 font-bold font-serif">{i + 1}.</span>
                    <textarea
                      value={wishes[i]}
                      onChange={(e) => updateWish(i, e.target.value)}
                      placeholder={`Wish ${i + 1}...`}
                      className="w-full bg-transparent border-b-2 border-gray-300 focus:border-pink-400 outline-none pl-6 py-2 resize-none text-gray-800 placeholder:text-gray-300 transition-colors font-serif"
                      rows="2"
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleSend}
              disabled={!allFilled}
              className="w-full py-4 rounded-full bg-gradient-to-r from-(--color-lavender) to-purple-400 text-white font-bold shadow-[0_0_20px_rgba(200,182,255,0.4)] transition-all text-lg disabled:opacity-50 disabled:shadow-none hover:scale-105"
            >
              Release Wishes to the Sky 🌌
            </button>
          </motion.div>
        ) : (
          <motion.div key="lanterns" className="absolute inset-0 flex flex-col items-center justify-end pb-32 pointer-events-none">
            {wishes.map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: 0, opacity: 0, scale: 0.5, x: (i - 1) * 60 }}
                animate={{ 
                  y: -window.innerHeight, 
                  opacity: [0, 1, 1, 0],
                  scale: [0.5, 1, 1.2, 1],
                  x: [(i - 1) * 60, (i - 1) * 80, (i - 1) * 40]
                }}
                transition={{ 
                  duration: 4, 
                  delay: i * 0.4, 
                  ease: "easeInOut" 
                }}
                className="absolute flex items-center justify-center w-16 h-20 bg-(--color-orange) rounded-t-xl rounded-b-md shadow-[0_0_40px_var(--color-orange)]"
              >
                 <div className="absolute w-8 h-8 bg-yellow-200 rounded-full blur-md opacity-80 animate-pulse"></div>
                 {/* Sparkle Trail */}
                 <motion.div 
                   animate={{ opacity: [1, 0], y: [0, 20] }}
                   transition={{ repeat: Infinity, duration: 0.5 }}
                   className="absolute -bottom-4 w-1 h-1 bg-white rounded-full shadow-[0_0_5px_white]"
                 />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

