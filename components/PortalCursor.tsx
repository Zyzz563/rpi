'use client';

import React, { useState, useEffect, useRef } from 'react';

interface PortalCursorProps {
  enabled?: boolean;
}

const CHEMICAL_ELEMENTS = [
  'H', 'He', 'Li', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar'
];

const CHEMICAL_FORMULAS = [
  'C₂H₆O', 'H₂O', 'CO₂', 'CH₄', 'C₆H₁₂O₆', 'NaCl', 'H₂SO₄', 'HCl', 'NH₃'
];

interface ChemicalParticle {
  id: number;
  x: number;
  y: number;
  content: string;
  size: number;
  opacity: number;
  velocityX: number;
  velocityY: number;
  color: string;
  rotationSpeed: number;
  rotation: number;
}

export default function PortalCursor({ enabled = true }: PortalCursorProps) {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isClicking, setIsClicking] = useState(false);
  const [particles, setParticles] = useState<ChemicalParticle[]>([]);
  const [lastPosition, setLastPosition] = useState({ x: -100, y: -100 });
  const [moveSpeed, setMoveSpeed] = useState(0);
  const particleIdRef = useRef(0);
  const throttleRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Use requestAnimationFrame to avoid too many state updates
      requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
        
        // Calculate movement speed
        const dx = e.clientX - lastPosition.x;
        const dy = e.clientY - lastPosition.y;
        const newSpeed = Math.sqrt(dx * dx + dy * dy);
        setMoveSpeed(newSpeed);
        
        // Emit particles based on movement speed - threshold reduced for more particles
        if (!throttleRef.current && newSpeed > 2) {
          throttleRef.current = true;
          
          setTimeout(() => {
            throttleRef.current = false;
          }, Math.max(5, 30 - newSpeed)); // Shorter throttle time for more responsive particles
          
          createParticle(e.clientX, e.clientY, newSpeed);
        }
        
        setLastPosition({ x: e.clientX, y: e.clientY });
      });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Use capture for higher priority event handling
    window.addEventListener('mousemove', handleMouseMove, { passive: true, capture: true });
    window.addEventListener('mousedown', handleMouseDown, { capture: true });
    window.addEventListener('mouseup', handleMouseUp, { capture: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove, { capture: true });
      window.removeEventListener('mousedown', handleMouseDown, { capture: true });
      window.removeEventListener('mouseup', handleMouseUp, { capture: true });
    };
  }, [enabled, lastPosition]);

  // Update particles positions and lifetimes - Use requestAnimationFrame instead of setInterval
  useEffect(() => {
    if (!enabled || particles.length === 0) return;

    let animId: number;
    
    const updateParticles = () => {
      setParticles(prevParticles => 
        prevParticles
          .map(particle => ({
            ...particle,
            x: particle.x + particle.velocityX,
            y: particle.y + particle.velocityY,
            opacity: particle.opacity - 0.025, // Faster fade out
            rotation: particle.rotation + particle.rotationSpeed,
            velocityY: particle.velocityY + 0.08, // Stronger gravity effect
          }))
          .filter(particle => particle.opacity > 0)
      );
      
      animId = requestAnimationFrame(updateParticles);
    };

    animId = requestAnimationFrame(updateParticles);

    return () => cancelAnimationFrame(animId);
  }, [enabled, particles]);

  const createParticle = (x: number, y: number, speed: number) => {
    // Generate particles based on movement speed
    const particlesToCreate = Math.min(Math.floor(speed / 3), 4) + (Math.random() > 0.6 ? 1 : 0);
    
    const newParticles: ChemicalParticle[] = [];
    
    for (let i = 0; i < particlesToCreate; i++) {
      const isFormula = Math.random() > 0.7;
      const content = isFormula 
        ? CHEMICAL_FORMULAS[Math.floor(Math.random() * CHEMICAL_FORMULAS.length)]
        : CHEMICAL_ELEMENTS[Math.floor(Math.random() * CHEMICAL_ELEMENTS.length)];
      
      const angle = Math.random() * Math.PI * 2;
      const particleSpeed = 2 + Math.random() * 3; // Faster particle movement
      
      // Primary Rick and Morty colors
      const colors = ['#5cff32', '#ff36ab', '#36c5f4', '#c6ff00'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      newParticles.push({
        id: particleIdRef.current++,
        x: x + (Math.random() * 10 - 5), // Tighter initial spread
        y: y + (Math.random() * 10 - 5),
        content,
        size: 12 + Math.random() * 8,
        opacity: 0.8 + Math.random() * 0.2,
        velocityX: Math.cos(angle) * particleSpeed,
        velocityY: Math.sin(angle) * particleSpeed - 2, // Stronger initial upward drift
        color,
        rotationSpeed: (Math.random() - 0.5) * 10,
        rotation: Math.random() * 360,
      });
    }
    
    setParticles(prev => [...prev, ...newParticles]);
  };

  if (!enabled) return null;

  return (
    <>
      {/* Chemical particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="fixed pointer-events-none z-[9998] font-mono font-bold"
          style={{
            left: particle.x,
            top: particle.y,
            transform: `translate(-50%, -50%) rotate(${particle.rotation}deg)`,
            fontSize: `${particle.size}px`,
            color: particle.color,
            opacity: particle.opacity,
            textShadow: `0 0 5px ${particle.color}`,
            willChange: 'transform, left, top, opacity',
          }}
        >
          {particle.content}
        </div>
      ))}
      
      {/* Extra particle burst on click */}
      {isClicking && (
        <div className="fixed pointer-events-none z-[9997]" 
             style={{
               left: position.x,
               top: position.y,
               width: '60px',
               height: '60px',
             }}>
          <div className="absolute inset-0 rounded-full bg-[#5cff32] animate-ping opacity-40"></div>
          <div className="absolute inset-4 rounded-full bg-[#36c5f4] animate-ping opacity-60" 
               style={{animationDuration: '0.7s'}}></div>
        </div>
      )}
    </>
  );
} 