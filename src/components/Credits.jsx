import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Credits() {
  const videoRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(e => console.error("Video delayed play failed", e));
      }
    }, 1000);

    const handleForceBg = () => {
      if (videoRef.current && !videoRef.current.paused) {
        videoRef.current.pause();
      }
    };
    window.addEventListener('bgm-force-play', handleForceBg);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('bgm-force-play', handleForceBg);
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 flex flex-col items-center justify-center p-6 text-center w-full z-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm bg-black rounded-xl overflow-hidden shadow-2xl border border-white/20 relative mb-8 group"
      >
        <video 
          ref={videoRef}
          src="/vdo2.mp4" 
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-auto cursor-pointer"
          onClick={() => {
            if (videoRef.current.paused) videoRef.current.play();
            else videoRef.current.pause();
          }}
          onPlay={() => window.dispatchEvent(new CustomEvent('media-started'))}
          onPause={() => window.dispatchEvent(new CustomEvent('media-ended'))}
          onEnded={() => window.dispatchEvent(new CustomEvent('media-ended'))}
        >
          Your browser does not support the video tag.
        </video>

        {/* Custom Controls Overlay */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={() => {
              if (videoRef.current.paused) videoRef.current.play();
              else videoRef.current.pause();
            }}
            className="p-3 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-black/70 transition-all shadow-lg text-xs font-bold"
          >
            Play / Pause
          </button>
          <button 
            onClick={() => {
              videoRef.current.muted = !videoRef.current.muted;
            }}
            className="p-3 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-black/70 transition-all shadow-lg text-xs font-bold"
          >
            Mute / Unmute
          </button>
        </div>
        
        {/* Fallback info in case video fails to load or isn't there */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none -z-10">
          <p className="text-white/50 text-sm">Add your video to <br/> src/vdo2.mp4</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
        className="bg-black/30 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-2xl w-full max-w-sm"
      >
        <h2 className="text-2xl font-serif text-white mb-2 tracking-wide">The End</h2>
        <p className="text-(--color-blue) text-sm font-medium">Thank you for being you. <br/> Once again many many<br/> happy Birthday Abiii 🤍🦥<br/> Aproo summa yosichitu iruka dhaa theva ella thadhala!!! </p>
      </motion.div>
    </motion.div>
  );
}

