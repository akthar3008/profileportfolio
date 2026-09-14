import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

const SleekCompanion = () => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      // Smoothly track the mouse
      const target = new THREE.Vector3(state.mouse.x * 3, state.mouse.y * 3, 4);
      groupRef.current.position.lerp(new THREE.Vector3(state.mouse.x * 0.5, state.mouse.y * 0.5, 0), 0.05);
      groupRef.current.lookAt(target);
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2.5} rotationIntensity={0.2} floatIntensity={1}>
        {/* Main Sleek Body */}
        <mesh>
          <capsuleGeometry args={[0.9, 1.2, 32, 64]} />
          <meshPhysicalMaterial 
            color="#0f172a" 
            metalness={0.7} 
            roughness={0.1} 
            clearcoat={1} 
            clearcoatRoughness={0.1} 
          />
        </mesh>
        
        {/* Minimalist Visor */}
        <mesh position={[0, 0.4, 0.82]}>
          <boxGeometry args={[0.9, 0.15, 0.2]} />
          <meshBasicMaterial color="#06b6d4" />
        </mesh>

        {/* Floating Halo Ring */}
        <mesh position={[0, 1.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.6, 0.015, 32, 100]} />
          <meshBasicMaterial color="#4f46e5" />
        </mesh>
      </Float>
    </group>
  );
};

export default function PremiumCharacter() {
  return (
    <div style={{ width: '100%', height: '500px', position: 'relative' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
        <Environment preset="studio" />
        <SleekCompanion />
      </Canvas>
    </div>
  );
}