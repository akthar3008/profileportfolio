import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroProfile({ about }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. GSAP Advanced Stagger Reveal (Avatar, Badge, Name, Button)
      gsap.fromTo(textRef.current.children, 
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power3.out", delay: 0.2 }
      );

      // 2. GSAP ScrollTrigger Parallax (Fades out smoothly when scrolling down)
      gsap.to(containerRef.current, {
        y: 150,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 10%",
          end: "bottom top",
          scrub: true
        }
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    // We limit the layout to the left, leaving the right completely empty for the 3D Globe
    <div ref={containerRef} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', width: '100%', minHeight: '80vh' }}>
      
      {/* LEFT SIDE: Avatar, Name & Details */}
      <div ref={textRef} style={{ flex: '0 1 700px', zIndex: 10, position: 'relative' }}>
        
        {/* Premium Profile Avatar & System Badge */}
        <div style={{ marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          
          {/* Glassmorphism Avatar Ring */}
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 5 }}
            style={{
              width: '110px', height: '110px', borderRadius: '50%', overflow: 'hidden',
              border: '2px solid rgba(6, 182, 212, 0.4)', 
              boxShadow: '0 0 30px rgba(6, 182, 212, 0.2)',
              padding: '4px', background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(10px)'
            }}
          >
            <img 
              src={about.image} 
              alt={about.name} 
              onError={(e) => { e.target.src = '/profile.jpg'; }} 
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} 
            />
          </motion.div>
          
          {/* Glowing Status Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 20px', background: 'rgba(6, 182, 212, 0.05)', border: '1px solid rgba(6, 182, 212, 0.2)', borderRadius: '30px', color: '#06b6d4', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', backdropFilter: 'blur(10px)' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#06b6d4', boxShadow: '0 0 10px #06b6d4', display: 'inline-block' }}></span>
            System Ready
          </div>
        </div>

        {/* Typography */}
        <h1 style={{ fontSize: 'clamp(3.5rem, 6vw, 6.5rem)', fontWeight: '800', letterSpacing: '-0.04em', lineHeight: '1.1', color: '#fff', marginBottom: '1.5rem', background: 'linear-gradient(135deg, #ffffff 0%, #a1a1aa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          {about.name.replace(/\./g, ' ')}
        </h1>
        <h2 style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', fontWeight: '400', color: '#a1a1aa', marginBottom: '3.5rem' }}>
          {about.title}
        </h2>
        
        {/* Framer Motion Interactive Button */}
        <div style={{ display: 'flex' }}>
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: '#f4f4f5' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} 
            style={{ background: '#ffffff', color: '#000000', padding: '16px 40px', borderRadius: '30px', fontWeight: '600', fontSize: '1rem', border: 'none', cursor: 'pointer', boxShadow: '0 10px 25px rgba(255,255,255,0.15)' }}
          >
            Explore Architecture
          </motion.button>
        </div>
      </div>

    </div>
  );
}