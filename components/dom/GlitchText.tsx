'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
}

export default function GlitchText({ text, className = '' }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative inline-block ${className}`}>
      <span className="relative z-10">{text}</span>
      {isGlitching && (
        <>
          <motion.span
            className="absolute top-0 left-0 text-red-500 opacity-70"
            initial={{ x: 0 }}
            animate={{ x: [-2, 2, -2, 0] }}
            transition={{ duration: 0.2 }}
            style={{ clipPath: 'inset(0 0 50% 0)' }}
          >
            {text}
          </motion.span>
          <motion.span
            className="absolute top-0 left-0 text-cyan-500 opacity-70"
            initial={{ x: 0 }}
            animate={{ x: [2, -2, 2, 0] }}
            transition={{ duration: 0.2 }}
            style={{ clipPath: 'inset(50% 0 0 0)' }}
          >
            {text}
          </motion.span>
        </>
      )}
    </div>
  );
}
