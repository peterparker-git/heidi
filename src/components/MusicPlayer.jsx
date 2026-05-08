import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Howl } from 'howler';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false); // Start paused for mobile compatibility
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Initialize native Audio
    const audio = new Audio('/Kadhaippoma-Reprise.mp3');
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    const handleMediaStarted = () => {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };

    const handleMediaEnded = () => {
      // Logic for background music to potentially resume
      // But we strictly follow user interaction rules here
    };

    const handleForceBg = () => {
      if (audioRef.current) {
        audioRef.current.play().catch(e => console.warn("BGM play failed:", e));
        setIsPlaying(true);
      }
    };

    window.addEventListener('media-started', handleMediaStarted);
    window.addEventListener('media-ended', handleMediaEnded);
    window.addEventListener('bgm-force-play', handleForceBg);

    return () => {
      window.removeEventListener('media-started', handleMediaStarted);
      window.removeEventListener('media-ended', handleMediaEnded);
      window.removeEventListener('bgm-force-play', handleForceBg);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(error => {
        console.error("Audio playback failed:", error);
      });
      setIsPlaying(true);
      window.dispatchEvent(new CustomEvent('bgm-force-play'));
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const newMuted = !isMuted;
    audioRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  return (
    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1 }}
      className="fixed bottom-6 right-6 z-50 bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl shadow-xl flex items-center gap-4"
    >
      <div className="flex flex-col items-center justify-center gap-1 w-8 h-8 bg-black/20 rounded-full relative overflow-hidden">
        {/* Animated Equalizer */}
        <div className="flex items-end justify-center gap-0.5 w-full h-4 px-1">
          {[1, 2, 3].map((i) => (
            <motion.div 
              key={i}
              className="w-1 bg-(--color-pink) rounded-t-sm origin-bottom"
              animate={isPlaying && !isMuted ? { height: ['20%', '100%', '40%', '80%', '20%'] } : { height: '10%' }}
              transition={{ repeat: Infinity, duration: 0.5 + (i * 0.2), ease: 'easeInOut' }}
            />
          ))}
        </div>
      </div>

      <div className="flex gap-3 text-white">
        <button onClick={toggleMusic} className="hover:text-(--color-blue) transition-colors">
          {isPlaying ? <FaPause size={14} /> : <FaPlay size={14} />}
        </button>
        <button onClick={toggleMute} className="hover:text-(--color-orange) transition-colors">
          {isMuted ? <FaVolumeMute size={16} /> : <FaVolumeUp size={16} />}
        </button>
      </div>
    </motion.div>
  );
}

