import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere } from '@react-three/drei';

const SkillLogos = [
  {
    name: 'React',
    color: '#00d8ff',
    bg: '#f0faff',
    svg: (
      <svg viewBox="-11.5 -10.23174 23 20.46348" width="28" height="28" fill="none">
        <circle cx="0" cy="0" r="2.05" fill="#00d8ff"/>
        <g stroke="#00d8ff" strokeWidth="1">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
      </svg>
    )
  },
  {
    name: 'Next.js',
    color: '#000000',
    bg: '#ffffff',
    svg: (
      <svg viewBox="0 0 180 180" width="26" height="26">
        <circle cx="90" cy="90" r="90" fill="#000"/>
        <path d="M149.508 157.438L69.147 54H54v71.97h12.895V69.754l72.213 92.748a90.04 90.04 0 0 0 10.4-5.064z" fill="#fff"/>
        <path d="M115.455 54H128v42.844l-12.545-16.142V54z" fill="#fff"/>
      </svg>
    )
  },
  {
    name: 'Node.js',
    color: '#539e43',
    bg: '#f0fdf4',
    svg: (
      <svg viewBox="0 0 256 289" width="26" height="26">
        <path fill="#539e43" d="M128 0L0 74.05v140.9L128 289l128-74.05V74.05L128 0zm97.77 197.8L128 254.34l-97.77-56.54V84.14L128 27.6l97.77 56.54v113.66z"/>
      </svg>
    )
  },
  {
    name: 'Tailwind',
    color: '#38bdf8',
    bg: '#f0f9ff',
    svg: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="#38bdf8">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.975 12 6.001 12z"/>
      </svg>
    )
  },
  {
    name: 'TypeScript',
    color: '#3178c6',
    bg: '#eff6ff',
    svg: (
      <svg viewBox="0 0 128 128" width="26" height="26">
        <path fill="#3178c6" d="M1.5 1.5h125v125H1.5z"/>
        <path fill="#fff" d="M68.8 81.3c0 9.8 6.4 15.6 17.2 15.6 7.2 0 12.6-3 15.6-7.8l-8.6-5.4c-1.4 2.4-3.6 4.2-7 4.2-3.8 0-6.2-2.2-6.2-6.4 0-4.8 3.8-6.6 9-8.8l4.4-1.8c9.6-4.2 13.8-9.4 13.8-17.4 0-10.8-8.4-16.8-18.4-16.8-8.2 0-15.2 3.6-18.6 9.8l8.6 5c1.6-3 4.6-4.8 8.8-4.8 4 0 6.6 2.2 6.6 5.8 0 4.2-3.2 5.8-8 7.8l-4.4 1.8c-8 3.4-12.8 8.6-12.8 17.4zm-42.6-33H51v-10H16.8v10h14.6v48.6h10.8V48.3z"/>
      </svg>
    )
  },
  {
    name: 'Git',
    color: '#f05032',
    bg: '#fff5f2',
    svg: (
      <svg viewBox="0 0 256 256" width="26" height="26">
        <path fill="#F05032" d="M250.7 119.5L136.5 5.3c-7-7-18.5-7-25.5 0L87.2 29.1l32.5 32.5c7.5-2.5 16.3-.9 22.3 5.1 6.1 6.1 7.7 14.9 5.2 22.4l31.3 31.3c7.5-2.5 16.3-.9 22.4 5.2 8.7 8.7 8.7 22.8 0 31.4-8.7 8.7-22.8 8.7-31.4 0-6.4-6.4-7.9-15.6-4.7-23.4l-29.2-29.2v58.2c2.1 1.2 4 2.8 5.6 4.4 8.7 8.7 8.7 22.8 0 31.4-8.7 8.7-22.8 8.7-31.4 0-8.7-8.7-8.7-22.8 0-31.4 2-2 4.2-3.6 6.7-4.6v-60c-2.5-1-4.7-2.6-6.7-4.6-6.3-6.3-7.8-15.4-4.8-23.1L74.8 77.2 5.3 146.7c-7 7-7 18.5 0 25.5l114.2 114.2c7 7 18.5 7 25.5 0l105.7-105.7c7.1-7.1 7.1-18.5 0-25.6v4.4z"/>
      </svg>
    )
  },
  {
    name: 'Figma',
    color: '#a259ff',
    bg: '#fbf7ff',
    svg: (
      <svg viewBox="0 0 38 57" width="20" height="26">
        <path fill="#1abcfe" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z"/>
        <path fill="#0acf83" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z"/>
        <path fill="#ff7262" d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z"/>
        <path fill="#f24e1e" d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z"/>
        <path fill="#a259ff" d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z"/>
      </svg>
    )
  },
  {
    name: 'MongoDB',
    color: '#13aa52',
    bg: '#f0fdf4',
    svg: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="#13aa52">
        <path d="M17.193 9.555c-1.264-5.028-4.25-7.306-4.57-7.525L12 1.635l-.623.395C11.057 2.25 8.07 4.527 6.807 9.555c-1.382 5.495.2 9.692 2.378 11.755l.08.077c1.39 1.325 2.502 1.343 2.735 1.343.233 0 1.345-.018 2.735-1.343l.08-.077c2.178-2.063 3.76-6.26 2.378-11.755zm-5.193 11.23v-9.35c.78.117 1.458.556 1.766 1.173.666 1.332.222 3.888-1.766 8.177z"/>
      </svg>
    )
  }
];

const CenterGlobe = () => {
  const globeRef = useRef();
  const ring1 = useRef();
  const ring2 = useRef();

  useFrame((_, delta) => {
    if (globeRef.current) globeRef.current.rotation.y += delta * 0.3;
    if (ring1.current) ring1.current.rotation.z += delta * 0.18;
    if (ring2.current) ring2.current.rotation.z -= delta * 0.15;
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
      <Sphere ref={globeRef} args={[0.9, 48, 48]}>
        <meshStandardMaterial
          color="#2563eb"
          metalness={0.7}
          roughness={0.2}
          emissive="#1d4ed8"
          emissiveIntensity={0.45}
        />
      </Sphere>

      <group ref={ring1} rotation={[Math.PI / 3, 0.2, 0]}>
        <mesh>
          <torusGeometry args={[1.75, 0.012, 16, 100]} />
          <meshBasicMaterial color="#94a3b8" transparent opacity={0.35} />
        </mesh>
      </group>

      <group ref={ring2} rotation={[-Math.PI / 3, -0.2, 0]}>
        <mesh>
          <torusGeometry args={[2.0, 0.01, 16, 100]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.3} />
        </mesh>
      </group>
    </Float>
  );
};

export default function SkillConstellation() {
  return (
    <div className="skills-interactive-hub">
      <div className="hub-canvas-wrap">
        <Canvas camera={{ position: [0, 0, 4.2], fov: 45 }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[4, 5, 5]} intensity={2.0} color="#ffffff" />
          <pointLight position={[-4, -2, -2]} intensity={1.5} color="#60a5fa" />
          <CenterGlobe />
        </Canvas>

        <div className="center-hub-badge">
          &lt;/&gt;
        </div>
      </div>

      <div className="surrounding-orbit-badges">
        {SkillLogos.map((skill, index) => {
          const total = SkillLogos.length;
          const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
          const radiusX = 180;
          const radiusY = 160;
          const left = Math.cos(angle) * radiusX;
          const top = Math.sin(angle) * radiusY;

          return (
            <div
              key={skill.name}
              className="orbit-skill-card"
              style={{
                transform: `translate(${left}px, ${top}px)`
              }}
              title={skill.name}
            >
              <div className="skill-icon-frame" style={{ backgroundColor: skill.bg }}>
                {skill.svg}
              </div>
              <span className="skill-name-label">{skill.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}