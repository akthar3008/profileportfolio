import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Grid } from '@react-three/drei';

const MovingGrid = () => {
  const gridRef = useRef();

  useFrame((state, delta) => {
    // Move grid towards the camera to simulate forward movement
    gridRef.current.position.z = (state.clock.getElapsedTime() * 2) % 1;
  });

  return (
    <group ref={gridRef}>
      <Grid 
        position={[0, -2, 0]} 
        args={[50, 50]} 
        cellSize={1} 
        cellThickness={1} 
        cellColor="#06b6d4" 
        sectionSize={5} 
        sectionThickness={1.5} 
        sectionColor="#4f46e5" 
        fadeDistance={25} 
        fadeStrength={1} 
      />
    </group>
  );
};

export default function CyberGrid() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, background: '#020617' }}>
      <Canvas camera={{ position: [0, 1, 5], fov: 60 }}>
        <fog attach="fog" args={['#020617', 5, 20]} />
        <MovingGrid />
      </Canvas>
    </div>
  );
}