import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLock, FaUnlock } from 'react-icons/fa';

const CORRECT_PASSWORD = "09/05/2005";

export default function Password({ onUnlock }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [unlocked, setUnlocked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setUnlocked(true);
      setError(false);
      setTimeout(() => {
        onUnlock();
      }, 1000);
    } else {
      setError(true);
      setAttempts((prev) => prev + 1);
      setPassword('');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 flex flex-col items-center justify-center p-6 text-center relative w-full"
    >
      {/* Background Sticker */}
      <motion.img 
        initial={{ opacity: 0, scale: 0.5, rotate: 20 }}
        animate={{ opacity: 0.4, scale: 1, rotate: 10 }}
        transition={{ delay: 0.3, duration: 1, type: "spring" }}
        src="/pic4.png"
        alt="Sticker"
        className="absolute top-12 right-6 w-32 md:w-48 z-0 pointer-events-none drop-shadow-2xl"
      />

      <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl shadow-2xl w-full max-w-sm relative z-10">
        <motion.div
          animate={unlocked ? { scale: 1.2, rotate: 360 } : {}}
          transition={{ duration: 0.5 }}
          className="bg-(--color-lavender) text-white p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-6 shadow-lg shadow-(--color-lavender)/50"
        >
          {unlocked ? <FaUnlock size={24} /> : <FaLock size={24} />}
        </motion.div>
        
        <h2 className="text-2xl font-bold mb-2 text-white">Secret Portal</h2>
        <p className="text-(--color-blue) mb-6 text-sm">Only birthday girl allowed 🐰✨</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password..."
            disabled={unlocked}
            className={`w-full px-4 py-3 rounded-xl bg-black/20 border outline-none text-white text-center transition-colors ${error ? 'border-red-400 focus:border-red-500' : 'border-white/30 focus:border-(--color-blue)'}`}
          />
          
          <button
            type="submit"
            disabled={unlocked || !password}
            className="w-full py-3 rounded-xl bg-(--color-orange) hover:bg-orange-500 text-white font-semibold shadow-lg shadow-orange-500/30 transition-all disabled:opacity-50"
          >
            {unlocked ? 'Unlocked!' : 'Enter'}
          </button>
        </form>

        {error && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-red-300 text-sm"
          >
            {attempts >= 2 ? (
              <p>Hint: format DD/MM/YYYY</p>
            ) : (
              <p>Hint: your birthday 👀</p>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

