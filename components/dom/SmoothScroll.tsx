'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

// Global Lenis instance
let lenisInstance: Lenis | null = null;

export const getLenis = () => lenisInstance;

export const stopLenis = () => {
  if (lenisInstance) {
    lenisInstance.stop();
  }
};

export const startLenis = () => {
  if (lenisInstance) {
    lenisInstance.start();
  }
};

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    lenisInstance = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return null;
}
