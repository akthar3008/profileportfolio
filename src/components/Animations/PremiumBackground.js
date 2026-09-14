import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';

// 1. The Advanced 3D Globe Component
const QuantumGlobe = () => {
  const masterGroupRef = useRef();
  const globeRef = useRef();
  const pointsRef = useRef();
  const ringsRef = useRef();

  // Mathematically generate random points on the surface of a sphere for the "Data Nodes"
  const particlesCount = 1000;
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos((Math.random() * 2) - 1);
      const radius = 2.02; // Slightly larger than the solid core sphere
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, []);

  // GSAP Cinematic Intro Animation
  useEffect(() => {
    if (masterGroupRef.current) {
      // Globe scales up and spins rapidly into place on load
      gsap.fromTo(masterGroupRef.current.scale, 
        { x: 0, y: 0, z: 0 }, 
        { x: 1, y: 1, z: 1, duration: 2.5, ease: "expo.out" }
      );
      gsap.fromTo(masterGroupRef.current.rotation,
        { y: -Math.PI },
        { y: 0, duration: 3, ease: "power3.out" }
      );
    }
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Continuous Autonomous Rotation
    if (globeRef.current) globeRef.current.rotation.y += delta * 0.1;
    if (pointsRef.current) pointsRef.current.rotation.y += delta * 0.15;
    
    // Complex Ring Gyroscopic Movement
    if (ringsRef.current) {
      ringsRef.current.rotation.x = Math.sin(t * 0.5) * 0.5;
      ringsRef.current.rotation.y += delta * 0.3;
      ringsRef.current.rotation.z = Math.cos(t * 0.3) * 0.2;
    }

    // Advanced Interactive Mouse Tracking & Scroll Parallax
    if (masterGroupRef.current) {
      // Smoothly tilt the globe based on cursor position
      const targetRotX = (state.mouse.y * 0.3);
      const targetRotY = (state.mouse.x * 0.5);
      masterGroupRef.current.rotation.x = THREE.MathUtils.lerp(masterGroupRef.current.rotation.x, targetRotX, 0.05);
      masterGroupRef.current.rotation.y = THREE.MathUtils.lerp(masterGroupRef.current.rotation.y, targetRotY, 0.05);

      // Sink the globe downwards smoothly as the user scrolls
      const scrollY = window.scrollY * 0.003;
      masterGroupRef.current.position.y = THREE.MathUtils.lerp(masterGroupRef.current.position.y, scrollY, 0.05);
    }
  });

  return (
    <group ref={masterGroupRef} position={[3, -0.5, -4]}>
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.5}>
        
        {/* Core Solid Globe - Dark, Glossy, Polished Metal */}
        <mesh ref={globeRef}>
          <sphereGeometry args={[2, 64, 64]} />
          <meshPhysicalMaterial 
            color="#020617" 
            metalness={0.9} 
            roughness={0.15} 
            clearcoat={1} 
            clearcoatRoughness={0.1} 
            envMapIntensity={2} 
          />
        </mesh>

        {/* Global Data Nodes - Points mapped to the sphere */}
        <points ref={pointsRef}>
          <bufferGeometry>
            <bufferAttribute 
              attach="attributes-position" 
              count={particlesCount} 
              array={particlePositions} 
              itemSize={3} 
            />
          </bufferGeometry>
          <pointsMaterial 
            size={0.015} 
            color="#06b6d4" 
            transparent 
            opacity={0.8} 
            sizeAttenuation={true} 
          />
        </points>

        {/* Outer Atmosphere Glow */}
        <mesh>
          <sphereGeometry args={[2.2, 32, 32]} />
          <meshBasicMaterial color="#4f46e5" transparent opacity={0.05} side={THREE.BackSide} />
        </mesh>

        {/* Orbital Network Rings */}
        <group ref={ringsRef}>
          {/* Ring 1 - Cyan */}
          <mesh rotation={[Math.PI / 3, 0, 0]}>
            <torusGeometry args={[2.8, 0.008, 16, 100]} />
            <meshBasicMaterial color="#06b6d4" transparent opacity={0.6} />
          </mesh>
          
          {/* Ring 2 - Indigo */}
          <mesh rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
            <torusGeometry args={[3.2, 0.005, 16, 100]} />
            <meshBasicMaterial color="#4f46e5" transparent opacity={0.4} />
          </mesh>
          
          {/* Orbiting Satellite Data Packet */}
          <mesh position={[2.8, 0, 0]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>

      </Float>
    </group>
  );
};

// 2. Main Master Scene Export
export default function PremiumBackground() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, background: '#02040a' }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        {/* Soft fog to blend the edges of the universe */}
        <fog attach="fog" args={['#02040a', 5, 20]} />
        <ambientLight intensity={0.2} />
        
        {/* High-Contrast Cinematic Lighting */}
        <directionalLight position={[10, 10, 10]} intensity={2.5} color="#ffffff" />
        <directionalLight position={[-10, -5, -10]} intensity={2} color="#06b6d4" />
        <spotLight position={[0, 10, 5]} intensity={4} color="#4f46e5" angle={0.4} penumbra={1} />
        
        {/* Photorealistic environmental reflections for the globe's metallic surface */}
        <Environment preset="city" />
        
        {/* Background Ambient Star/Data Dust */}
        <Sparkles count={300} scale={20} size={1.5} speed={0.2} opacity={0.2} color="#06b6d4" />
        
        {/* Mount the Master Globe */}
        <QuantumGlobe />
      </Canvas>
    </div>
  );
}