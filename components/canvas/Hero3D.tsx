'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

export default function Hero3D() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <Environment preset="city" />
      
      <Float
        speed={2} 
        rotationIntensity={1} 
        floatIntensity={2}
      >
        {/* Positioned to the right for split layout */}
        <mesh ref={meshRef} position={[2, 0, 0]} scale={1.8}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial 
            color="#8b5cf6" 
            roughness={0.1} 
            metalness={0.8}
            wireframe
          />
        </mesh>
      </Float>

      <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2.5} far={4} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
    </>
  );
}
