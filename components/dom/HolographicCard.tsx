'use client';

import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

interface HolographicCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function HolographicCard({ children, className = '' }: HolographicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,255,255,0.1), transparent 50%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-0 hover:opacity-30 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `linear-gradient(${mousePosition.x}deg, #ff00ff, #00ffff, #ffff00, #ff00ff)`,
          backgroundSize: '200% 200%',
          mixBlendMode: 'overlay',
        }}
      />
      {children}
    </motion.div>
  );
}
