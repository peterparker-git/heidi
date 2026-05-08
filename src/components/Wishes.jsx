import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Wishes({ onNext }) {
  const [wishes, setWishes] = useState(['', '', '']);

  const updateWish = (index, value) => {
    const newWishes = [...wishes];
    newWishes[index] = value;
    setWishes(newWishes);
  };

  const handleSend = () => {
    localStorage.setItem('wishes', JSON.stringify(wishes));
    onNext();
  };

  const allFilled = wishes.every(w => w.trim() !== '');

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex-1 flex flex-col p-6 text-center w-full justify-center"
    >
      <div className="bg-(--color-cream) text-black p-8 rounded-3xl shadow-2xl relative transform -rotate-1">
        {/* Notebook bindings */}
        <div className="absolute left-4 top-0 bottom-0 w-4 border-r-2 border-red-200 opacity-50 flex flex-col justify-evenly">
           {[...Array(6)].map((_, i) => (
             <div key={i} className="w-2 h-2 rounded-full bg-gray-400 -ml-1"></div>
           ))}
        </div>

        <h2 className="text-2xl font-bold mb-2 text-pink-600 font-serif ml-4">Make 3 Wishes ✨</h2>
        <p className="text-gray-500 text-sm mb-6 ml-4">Don't tell anyone what they are!</p>

        <div className="space-y-6 ml-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="relative">
              <span className="absolute left-0 top-3 text-pink-300 font-bold">{i + 1}.</span>
              <textarea
                value={wishes[i]}
                onChange={(e) => updateWish(i, e.target.value)}
                placeholder={`Wish ${i + 1}...`}
                className="w-full bg-transparent border-b-2 border-gray-300 focus:border-pink-400 outline-none pl-6 py-2 resize-none text-gray-800 placeholder:text-gray-300 transition-colors"
                rows="2"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleSend}
        disabled={!allFilled}
        className="mt-12 w-full py-4 rounded-full bg-(--color-lavender) hover:bg-purple-400 text-white font-bold shadow-lg shadow-purple-500/30 transition-all text-lg disabled:opacity-50 disabled:shadow-none"
      >
        Send Wishes ✨
      </button>

    </motion.div>
  );
}

