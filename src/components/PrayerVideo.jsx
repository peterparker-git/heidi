import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

export default function PrayerVideo({ onCredits }) {
  const [step, setStep] = useState('question'); // 'question', 'forced', 'video'
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const startVideo = () => {
    setStep('video');
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  useEffect(() => {
    const handleForceBg = () => {
      if (videoRef.current && !videoRef.current.paused) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    };
    window.addEventListener('bgm-force-play', handleForceBg);

    if (step === 'video') {
      const timer = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().catch(e => console.error("Video delayed play failed", e));
        }
      }, 1000);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('bgm-force-play', handleForceBg);
      };
    }

    return () => window.removeEventListener('bgm-force-play', handleForceBg);
  }, [step]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 flex flex-col items-center justify-center p-6 text-center w-full z-20"
    >
      <AnimatePresence mode="wait">
        {step === 'question' && (
          <motion.div
            key="question"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-black/30 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-2xl"
          >
            <h2 className="text-2xl text-white mb-8 font-serif leading-relaxed">
              Do you want to hear <br /> my prayer for you? ✨
            </h2>
            <div className="flex justify-center gap-4">
              <button 
                onClick={startVideo} 
                className="px-8 py-3 rounded-full bg-(--color-pink) hover:bg-pink-400 text-white font-bold shadow-[0_0_15px_rgba(255,202,212,0.5)] transition-all"
              >
                Yes
              </button>
              <button 
                onClick={() => setStep('forced')} 
                className="px-8 py-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-bold transition-all"
              >
                No
              </button>
            </div>
          </motion.div>
        )}

        {step === 'forced' && (
          <motion.div
            key="forced"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-black/30 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-2xl"
          >
            <h2 className="text-2xl text-white mb-8 font-serif">Anyway I'm gonna tell! 😆</h2>
            <button 
              onClick={startVideo} 
              className="px-8 py-3 rounded-full bg-(--color-orange) hover:bg-orange-400 text-white font-bold shadow-[0_0_15px_rgba(255,159,67,0.5)] transition-all"
            >
              Continue
            </button>
          </motion.div>
        )}

        {step === 'video' && (
          <motion.div
            key="video"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full flex flex-col items-center gap-8 z-10"
          >
            <div className="w-full max-w-sm bg-black rounded-xl overflow-hidden shadow-2xl border border-white/20 relative">
              <video 
                ref={videoRef}
                src="/vdo.mp4" 
                poster="/thumbnail.jpg"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto cursor-pointer"
                onClick={togglePlay}
                onPlay={() => {
                  window.dispatchEvent(new CustomEvent('media-started'));
                  setIsPlaying(true);
                }}
                onPause={() => {
                  window.dispatchEvent(new CustomEvent('media-ended'));
                  setIsPlaying(false);
                }}
                onEnded={() => {
                  window.dispatchEvent(new CustomEvent('media-ended'));
                  setIsPlaying(false);
                }}
              >
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Separate Controls for Mobile Visibility */}
            <div className="flex flex-wrap justify-center gap-3">
              <button 
                onClick={() => { videoRef.current?.play(); setIsPlaying(true); }}
                className={`p-4 rounded-full backdrop-blur-md text-white transition-all shadow-xl border border-white/20 ${isPlaying ? 'bg-pink-500/80' : 'bg-black/60'}`}
                title="Play"
              >
                <FaPlay size={20} />
              </button>
              <button 
                onClick={() => { videoRef.current?.pause(); setIsPlaying(false); }}
                className={`p-4 rounded-full backdrop-blur-md text-white transition-all shadow-xl border border-white/20 ${!isPlaying ? 'bg-pink-500/80' : 'bg-black/60'}`}
                title="Pause"
              >
                <FaPause size={20} />
              </button>
              <button 
                onClick={() => { if(videoRef.current) videoRef.current.muted = true; setIsMuted(true); }}
                className={`p-4 rounded-full backdrop-blur-md text-white transition-all shadow-xl border border-white/20 ${isMuted ? 'bg-blue-500/80' : 'bg-black/60'}`}
                title="Mute"
              >
                <FaVolumeMute size={20} />
              </button>
              <button 
                onClick={() => { if(videoRef.current) videoRef.current.muted = false; setIsMuted(false); }}
                className={`p-4 rounded-full backdrop-blur-md text-white transition-all shadow-xl border border-white/20 ${!isMuted ? 'bg-blue-500/80' : 'bg-black/60'}`}
                title="Unmute"
              >
                <FaVolumeUp size={20} />
              </button>
            </div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3 }}
              onClick={() => {
                window.dispatchEvent(new CustomEvent('media-ended')); // Unmute bg music if user skips video early
                onCredits();
              }}
              className="px-8 py-3 rounded-full bg-(--color-blue) hover:bg-blue-400 text-white font-bold shadow-[0_0_15px_rgba(116,185,255,0.5)] transition-all"
            >
              See Credits 🎬
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

