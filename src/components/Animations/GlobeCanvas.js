import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const Globe = () => {
  const globeRef = useRef();
  const outerRingsRef = useRef();

  useFrame((state, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.25;
      globeRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.08;
    }
    if (outerRingsRef.current) {
      outerRingsRef.current.rotation.z += delta * 0.15;
      outerRingsRef.current.rotation.x += delta * 0.08;
    }
  });

  return (
    <group position={[0.4, 0, 0]}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        {/* Core Ocean Sphere */}
        <Sphere ref={globeRef} args={[1.35, 64, 64]}>
          <meshStandardMaterial
            color="#2563eb"
            roughness={0.25}
            metalness={0.6}
            emissive="#1d4ed8"
            emissiveIntensity={0.4}
          />
        </Sphere>

        {/* Atmospheric Latitude Wireframe Grid */}
        <mesh>
          <sphereGeometry args={[1.37, 24, 24]} />
          <meshBasicMaterial color="#93c5fd" wireframe transparent opacity={0.28} />
        </mesh>

        {/* Orbiting Equatorial Rings */}
        <group ref={outerRingsRef}>
          <mesh rotation={[Math.PI / 3, 0.2, 0]}>
            <torusGeometry args={[1.9, 0.015, 16, 100]} />
            <meshBasicMaterial color="#60a5fa" transparent opacity={0.6} />
          </mesh>
          <mesh rotation={[-Math.PI / 4, -0.3, 0]}>
            <torusGeometry args={[2.1, 0.01, 16, 100]} />
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.4} />
          </mesh>
        </group>
      </Float>
    </group>
  );
};

export default function GlobeCanvas() {
  return (
    <div className="globe-3d-canvas">
      <Canvas camera={{ position: [0, 0, 4.2], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 4, 4]} intensity={2.2} color="#ffffff" />
        <pointLight position={[-4, -2, -2]} intensity={1.5} color="#60a5fa" />
        <Globe />
      </Canvas>
    </div>
  );
}