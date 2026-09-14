import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere } from '@react-three/drei';

const EarthGlobe = () => {
  const globeRef = useRef();
  const ringRef = useRef();

  useFrame((state, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.22;
      globeRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.08;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.14;
      ringRef.current.rotation.x += delta * 0.07;
    }
  });

  return (
    // Perfectly centered on origin so it scales symmetrically across mobile and desktop
    <group position={[0, 0, 0]}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
        {/* Core Ocean Sphere */}
        <Sphere ref={globeRef} args={[1.2, 64, 64]}>
          <meshStandardMaterial
            color="#2563eb"
            roughness={0.25}
            metalness={0.6}
            emissive="#1d4ed8"
            emissiveIntensity={0.45}
          />
        </Sphere>

        {/* Latitude Wireframe Atmosphere */}
        <mesh>
          <sphereGeometry args={[1.22, 24, 24]} />
          <meshBasicMaterial color="#93c5fd" wireframe transparent opacity={0.25} />
        </mesh>

        {/* Orbiting Gyroscopic Rings scaled to fit mobile bounds */}
        <group ref={ringRef}>
          <mesh rotation={[Math.PI / 3, 0.2, 0]}>
            <torusGeometry args={[1.75, 0.014, 16, 100]} />
            <meshBasicMaterial color="#60a5fa" transparent opacity={0.65} />
          </mesh>
          <mesh rotation={[-Math.PI / 4, -0.3, 0]}>
            <torusGeometry args={[1.95, 0.01, 16, 100]} />
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.45} />
          </mesh>
        </group>
      </Float>
    </group>
  );
};

export default function ContactCompanion() {
  return (
    <div className="globe-3d-canvas">
      {/* Camera distance set to 4.6 to give the rings breathing room on mobile */}
      <Canvas camera={{ position: [0, 0, 4.6], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 4, 4]} intensity={2.2} color="#ffffff" />
        <pointLight position={[-4, -2, -2]} intensity={1.5} color="#60a5fa" />
        <EarthGlobe />
      </Canvas>
    </div>
  );
}