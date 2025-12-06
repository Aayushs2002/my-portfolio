'use client';

import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Only run on desktop
    if (window.innerWidth < 768) return;

    setIsMounted(true);

    // Hide default cursor
    document.body.style.cursor = 'none';

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const updateHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button');
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', updateHover);

    return () => {
      document.body.style.cursor = '';
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', updateHover);
    };
  }, []);

  // Don't render until mounted
  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* Main dot */}
      <div
        className="fixed pointer-events-none z-[99999] transition-transform duration-100"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
          width: '12px',
          height: '12px',
          backgroundColor: '#a855f7',
          borderRadius: '50%',
        }}
      />
      
      {/* Ring */}
      <div
        className="fixed pointer-events-none z-[99998] transition-transform duration-200"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
          width: '32px',
          height: '32px',
          border: '2px solid rgba(168, 85, 247, 0.5)',
          borderRadius: '50%',
        }}
      />
    </>
  );
}
