'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [showContent, setShowContent] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const playSound = () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
  
        osc.connect(gain);
        gain.connect(ctx.destination);
  
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, ctx.currentTime); // A4
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.5); // A5
        
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.5);
  
        osc.start();
        osc.stop(ctx.currentTime + 1.5);
      } catch (e) {
        // Autoplay might be blocked, which is expected
        console.log("Audio play failed (autoplay policy)", e);
      }
    };

    const handleExit = () => {
      playSound();
      setIsExiting(true);
      setTimeout(() => {
        setShowContent(false);
        document.body.style.overflow = 'unset';
      }, 2000); // Wait for exit animation
    };

    // Simulate loading
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Auto trigger exit
          handleExit();
          return 100;
        }
        return prev + 1;
      });
    }, 10);

    return () => clearInterval(interval);
  }, []);

  if (!showContent) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-auto">
      <AnimatePresence>
        {!isExiting && (
          <motion.div
            className="absolute inset-0 bg-black flex flex-col items-center justify-center text-white overflow-hidden"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Animated Background Pattern */}
            <motion.div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '40px 40px',
              }}
              animate={{ 
                backgroundPosition: ["0px 0px", "40px 40px"] 
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            />

            <div className="w-64 relative z-10">
              <div className="flex justify-between mb-2 text-sm font-mono text-zinc-500">
                <span>INITIALIZING</span>
                <span>{progress}%</span>
              </div>
              <div className="h-[2px] bg-zinc-800 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-white"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Split Curtain Reveal */}
      <AnimatePresence>
        {isExiting && (
          <>
            <motion.div
              className="absolute top-0 left-0 right-0 h-[50vh] bg-black z-20"
              initial={{ y: 0 }}
              animate={{ y: "-100%" }}
              transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
            />
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-[50vh] bg-black z-20"
              initial={{ y: 0 }}
              animate={{ y: "100%" }}
              transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
            />
            
            {/* Center Text Sequence during reveal */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  className="text-6xl md:text-9xl font-bold text-white tracking-tighter"
                >
                  WELCOME
                </motion.h1>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
