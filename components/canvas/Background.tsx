'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Stars, Sparkles } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

export default function Background(props: any) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null);
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }));

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#8b5cf6"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
      
      <Stars 
        radius={100} 
        depth={50} 
        count={5000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={1} 
      />
      <Stars 
        radius={50} 
        depth={50} 
        count={2000} 
        factor={6} 
        saturation={0} 
        fade 
        speed={2} 
      />
      
      <Sparkles 
        count={50} 
        scale={10} 
        size={4} 
        speed={0.4} 
        opacity={0.5} 
        color="#8b5cf6" 
      />
    </group>
  );
}
