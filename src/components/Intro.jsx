import { motion } from 'framer-motion';

export default function Intro({ onNext }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="flex-1 flex flex-col items-center justify-center p-6 text-center z-20 w-full"
    >
      <div className="bg-black/30 backdrop-blur-sm p-8 rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(200,182,255,0.2)]">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.5 }}
          className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white via-(--color-pink) to-(--color-orange) mb-4 leading-tight"
        >
          Welcome to <br/>Abinaya G aka Heidi's <br/>Special Day 🐰✨
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1.5 }}
          className="text-lg text-(--color-blue) font-medium"
        >
          A little city made only for you.
        </motion.p>
      </div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 1 }}
        onClick={onNext}
        className="mt-16 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 shadow-lg transition-all"
      >
        Enter City ✨
      </motion.button>
    </motion.div>
  );
}

