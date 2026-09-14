import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const OrbitConstellation = () => {
  const ringRef1 = useRef();
  const ringRef2 = useRef();
  const satellites = useRef();

  useFrame((_, delta) => {
    if (ringRef1.current) ringRef1.current.rotation.z += delta * 0.2;
    if (ringRef2.current) ringRef2.current.rotation.z -= delta * 0.16;
    if (satellites.current) satellites.current.rotation.y += delta * 0.35;
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
      {/* Central Hub Core */}
      <mesh>
        <sphereGeometry args={[0.72, 32, 32]} />
        <meshStandardMaterial color="#2563eb" metalness={0.7} roughness={0.15} emissive="#1d4ed8" emissiveIntensity={0.5} />
      </mesh>

      {/* Orbit Track Rings */}
      <group ref={ringRef1} rotation={[Math.PI / 3, 0, 0]}>
        <mesh>
          <torusGeometry args={[1.5, 0.01, 16, 100]} />
          <meshBasicMaterial color="#94a3b8" transparent opacity={0.4} />
        </mesh>
      </group>

      <group ref={ringRef2} rotation={[-Math.PI / 3, 0.4, 0]}>
        <mesh>
          <torusGeometry args={[1.75, 0.01, 16, 100]} />
          <meshBasicMaterial color="#94a3b8" transparent opacity={0.3} />
        </mesh>
      </group>

      {/* Orbiting Tech Satellite Orbs */}
      <group ref={satellites}>
        <mesh position={[1.5, 0, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.8} />
        </mesh>
        <mesh position={[-1.2, 0.8, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#4ade80" emissive="#16a34a" emissiveIntensity={0.8} />
        </mesh>
        <mesh position={[0.3, -1.6, 0.4]}>
          <sphereGeometry args={[0.13, 16, 16]} />
          <meshStandardMaterial color="#f59e0b" emissive="#d97706" emissiveIntensity={0.8} />
        </mesh>
        <mesh position={[-0.8, -1.2, -0.6]}>
          <sphereGeometry args={[0.11, 16, 16]} />
          <meshStandardMaterial color="#a855f7" emissive="#7e22ce" emissiveIntensity={0.8} />
        </mesh>
      </group>
    </Float>
  );
};

export default function SkillOrbitCanvas() {
  return (
    <div className="orbit-canvas-container">
      <Canvas camera={{ position: [0, 0, 3.8], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 4, 4]} intensity={2.0} />
        <OrbitConstellation />
      </Canvas>
    </div>
  );
}