import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WISHES = [
  { id: 1, text: "May this year bring chaos in the best way.", sticker: "🌪️" },
  { id: 2, text: "Nalla saptu health ah iru 100 varusham.", sticker: "👑" },
  { id: 3, text: "Stay strong always", sticker: "😹" },
  { id: 4, text: "Elaa tha yum APT - Aarinchi Purinchi Therinchi koo.", sticker: "☁️" }
];

export default function WishCards({ onNext }) {
  const [cards, setCards] = useState(WISHES);
  const [flippedMap, setFlippedMap] = useState({});

  const handleDragEnd = (event, info, id) => {
    // If dragged far enough to the left or right, remove the card (swipe)
    if (Math.abs(info.offset.x) > 100) {
      setCards((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const toggleFlip = (id) => {
    setFlippedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="flex-1 flex flex-col items-center justify-center p-6 text-center w-full z-20"
    >
      <h2 className="text-2xl font-bold text-white mb-8 drop-shadow-md">Swipe to read your mini wishes ✨</h2>
      
      <div className="relative w-64 h-80 perspective-1000">
        <AnimatePresence>
          {cards.map((card, index) => {
            const isFlipped = flippedMap[card.id];
            
            return (
              <motion.div
                key={card.id}
                layout
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ 
                  scale: 1 - (cards.length - 1 - index) * 0.05, 
                  opacity: 1 - (cards.length - 1 - index) * 0.2,
                  y: (cards.length - 1 - index) * -15,
                  rotateZ: (cards.length - 1 - index) % 2 === 0 ? 2 : -2
                }}
                exit={{ x: index % 2 === 0 ? 300 : -300, opacity: 0, rotateZ: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(e, info) => handleDragEnd(e, info, card.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute inset-0 origin-bottom touch-none cursor-grab active:cursor-grabbing"
                style={{ zIndex: index }}
              >
                {/* The Card Itself - handles the 3D flip */}
                <motion.div 
                  className="w-full h-full relative preserve-3d"
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, type: "spring" }}
                  onClick={() => toggleFlip(card.id)}
                >
                  {/* Front of card */}
                  <div className="absolute inset-0 backface-hidden bg-(--color-cream) rounded-xl shadow-2xl border-4 border-white p-6 flex flex-col justify-center items-center">
                    {/* Tape Corner */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/50 backdrop-blur-sm -rotate-2"></div>
                    
                    <p className="text-gray-800 font-serif text-xl leading-relaxed mt-4">
                      {card.text}
                    </p>
                    <div className="absolute bottom-4 right-4 text-3xl opacity-80 filter drop-shadow-sm">
                      {card.sticker}
                    </div>
                  </div>

                  {/* Back of card */}
                  <div className="absolute inset-0 backface-hidden bg-(--color-pink) rounded-xl shadow-2xl border-4 border-white p-6 flex items-center justify-center [transform:rotateY(180deg)]">
                    <p className="text-white font-bold text-2xl drop-shadow-md">
                      ✨
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {cards.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <p className="text-white text-xl font-bold mb-6">All read! 💖</p>
            <button
              onClick={onNext}
              className="px-8 py-3 rounded-full bg-(--color-blue) hover:bg-blue-400 text-white font-bold shadow-lg shadow-blue-500/50 transition-all"
            >
              Next Surprise →
            </button>
          </motion.div>
        )}
      </div>

    </motion.div>
  );
}

