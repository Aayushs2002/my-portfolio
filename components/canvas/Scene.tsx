'use client';

import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { Suspense } from 'react';

interface SceneProps {
  children: React.ReactNode;
  className?: string;
}

export default function Scene({ children, className, ...props }: SceneProps) {
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
