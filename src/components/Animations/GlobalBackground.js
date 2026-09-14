import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Grid, Float, MeshWobbleMaterial } from '@react-three/drei';

const ScrollReactiveScene = () => {
  const groupRef = useRef();

  useFrame(() => {
    // Parallax effect: The 3D world shifts upwards and rotates slightly as you scroll down
    const scrollY = window.scrollY;
    groupRef.current.position.y = scrollY * 0.003;
    groupRef.current.rotation.y = scrollY * 0.0002;
  });

  return (
    <group ref={groupRef}>
      {/* Floating Constellation Nodes */}
      {[...Array(25)].map((_, i) => (
        <Float key={i} speed={1.5} rotationIntensity={2} floatIntensity={2}>
          <mesh position={[(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 25 - 5, (Math.random() - 0.5) * 10 - 5]}>
            <octahedronGeometry args={[0.2, 0]} />
            <MeshWobbleMaterial color="#8b5cf6" emissive="#4f46e5" emissiveIntensity={0.8} wireframe />
          </mesh>
        </Float>
      ))}

      {/* Infinite Cyber Grid Floor */}
      <Grid 
        position={[0, -8, 0]} 
        args={[100, 100]} 
        cellSize={1} 
        cellThickness={1} 
        cellColor="#06b6d4" 
        sectionSize={5} 
        sectionThickness={1.5} 
        sectionColor="#4f46e5" 
        fadeDistance={40} 
        fadeStrength={1} 
      />
    </group>
  );
};

export default function GlobalBackground() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, background: '#020617' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <fog attach="fog" args={['#020617', 5, 30]} />
        <ambientLight intensity={0.2} />
        <Stars radius={100} depth={50} count={4000} factor={4} saturation={0} fade speed={1} />
        <ScrollReactiveScene />
      </Canvas>
    </div>
  );
}