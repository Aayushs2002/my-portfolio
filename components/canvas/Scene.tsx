'use client';

import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { Suspense, useEffect } from 'react';

interface SceneProps {
  children: React.ReactNode;
  className?: string;
}

export default function Scene({ children, className, ...props }: SceneProps) {
  useEffect(() => {
    // Suppress Three.js NaN warnings
    const originalError = console.error;
    console.error = (...args: any[]) => {
      if (
        typeof args[0] === 'string' &&
        args[0].includes('THREE.BufferGeometry.computeBoundingSphere')
      ) {
        return; // Suppress this specific error
      }
      originalError.apply(console, args);
    };

    return () => {
      console.error = originalError;
    };
  }, []);

  return (
    <div className={`z-0 ${className || 'fixed inset-0'}`}>
      <Canvas {...props}>
        <Suspense fallback={null}>
          {children}
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
