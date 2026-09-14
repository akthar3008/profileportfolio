import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const RobotCharacter = () => {
  const groupRef = useRef();
  const headRef = useRef();
  const leftHandRef = useRef();
  const rightHandRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Advanced mathematical hover effect for individual floating hands
    if (leftHandRef.current && rightHandRef.current) {
      leftHandRef.current.position.y = Math.sin(t * 2) * 0.1 - 0.3;
      rightHandRef.current.position.y = Math.sin(t * 2 + Math.PI) * 0.1 - 0.3;
    }

    // Make the entire character group track and look at the user's mouse cursor
    if (groupRef.current) {
      const target = new THREE.Vector3(state.mouse.x * 5, state.mouse.y * 5, 4);
      // Smooth interpolation for the lookAt rotation
      groupRef.current.position.lerp(new THREE.Vector3(state.mouse.x * 0.5, state.mouse.y * 0.5, 0), 0.1);
      groupRef.current.lookAt(target);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Main Head/Body */}
      <Float speed={2.5} rotationIntensity={0.2} floatIntensity={0.8}>
        <mesh ref={headRef} position={[0, 0.4, 0]}>
          <boxGeometry args={[1.4, 1.2, 1.4]} />
          <meshStandardMaterial color="#111827" roughness={0.2} metalness={0.8} />
          
          {/* Glowing Left Eye */}
          <mesh position={[-0.35, 0.2, 0.71]}>
            <sphereGeometry args={[0.15, 32, 32]} />
            <meshBasicMaterial color="#06b6d4" />
          </mesh>
          
          {/* Glowing Right Eye */}
          <mesh position={[0.35, 0.2, 0.71]}>
            <sphereGeometry args={[0.15, 32, 32]} />
            <meshBasicMaterial color="#06b6d4" />
          </mesh>
          
          {/* Animated Holographic Mouth */}
          <mesh position={[0, -0.2, 0.71]}>
            <planeGeometry args={[0.6, 0.15]} />
            <MeshDistortMaterial color="#4f46e5" distort={0.4} speed={4} />
          </mesh>

          {/* Antenna */}
          <mesh position={[0, 0.7, 0]}>
            <cylinderGeometry args={[0.02, 0.05, 0.4]} />
            <meshStandardMaterial color="#6b7280" />
          </mesh>
          <mesh position={[0, 0.9, 0]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshBasicMaterial color="#f59e0b" />
          </mesh>
        </mesh>
      </Float>

      {/* Floating Left Hand */}
      <mesh ref={leftHandRef} position={[-1.2, -0.3, 0.3]}>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshStandardMaterial color="#4f46e5" roughness={0.1} metalness={0.6} />
      </mesh>

      {/* Floating Right Hand */}
      <mesh ref={rightHandRef} position={[1.2, -0.3, 0.3]}>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshStandardMaterial color="#4f46e5" roughness={0.1} metalness={0.6} />
      </mesh>
    </group>
  );
};

export default function AnimatedCharacter() {
  return (
    <div style={{ width: '100%', height: '450px', position: 'relative', cursor: 'pointer' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <Environment preset="city" />
        <RobotCharacter />
        {/* Dynamic shadow that reacts to the floating character */}
        <ContactShadows position={[0, -1.2, 0]} opacity={0.6} scale={10} blur={2.5} far={4} />
      </Canvas>
    </div>
  );
}