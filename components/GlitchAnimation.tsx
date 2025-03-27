'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface GlitchAnimationProps {
  text: string;
  className?: string;
  glitchIntensity?: 'low' | 'medium' | 'high';
  color?: string;
  highlightColor?: string;
  fontSize?: string;
  fontWeight?: string;
  duration?: number;
  randomizeInterval?: number;
}

export default function GlitchAnimation({
  text,
  className = '',
  glitchIntensity = 'medium',
  color = 'white',
  highlightColor = '#5cff32',
  fontSize = '1.5rem',
  fontWeight = 'bold',
  duration = 0.2,
  randomizeInterval = 5000
}: GlitchAnimationProps) {
  const [isGlitching, setIsGlitching] = useState(false);
  const [displayText, setDisplayText] = useState(text);
  
  // Определение интенсивности глитча
  const intensity = {
    low: { probability: 0.1, characters: "!@#$%^&*()_+-=[]{}|;':,./<>?\\\"" },
    medium: { probability: 0.2, characters: "!@#$%^&*()_+-=[]{}|;':,./<>?\\\"αβγδεζηθικλμνξοπρστυφχψω" },
    high: { probability: 0.3, characters: "!@#$%^&*()_+-=[]{}|;':,./<>?\\\"αβγδεζηθικλμνξοπρστυφχψωΓΔΘΛΞΠΣΦΨΩ₽¥€$¢£₩₱" }
  }[glitchIntensity];
  
  // Функция создания глитч-эффекта для текста
  const glitchText = (text: string) => {
    let result = '';
    for (let i = 0; i < text.length; i++) {
      // Случайное решение: оставить символ или заменить его глитч-символом
      if (Math.random() < intensity.probability) {
        const randomChar = intensity.characters.charAt(
          Math.floor(Math.random() * intensity.characters.length)
        );
        result += randomChar;
      } else {
        result += text[i];
      }
    }
    return result;
  };
  
  // Эффект для периодического запуска глитча
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    // Функция для запуска глитча
    const triggerGlitch = () => {
      setIsGlitching(true);
      
      // Серия быстрых изменений текста
      let counter = 0;
      const maxGlitches = 3 + Math.floor(Math.random() * 3); // 3-5 глитчей
      
      interval = setInterval(() => {
        if (counter < maxGlitches) {
          setDisplayText(glitchText(text));
          counter++;
        } else {
          clearInterval(interval);
          setDisplayText(text); // Вернуть оригинальный текст
          setIsGlitching(false);
        }
      }, duration * 1000 / maxGlitches);
    };
    
    // Первоначальный глитч
    triggerGlitch();
    
    // Настройка интервала для периодического глитча
    const randomizer = setInterval(() => {
      // Запуск глитча с определенной вероятностью
      if (Math.random() < 0.3 && !isGlitching) {
        triggerGlitch();
      }
    }, randomizeInterval);
    
    return () => {
      clearInterval(interval);
      clearInterval(randomizer);
    };
  }, [text, duration, randomizeInterval]);

  return (
    <motion.span
      className={`inline-block relative ${className}`}
      style={{ 
        color, 
        fontSize, 
        fontWeight,
        textShadow: isGlitching ? `0 0 5px ${highlightColor}, 0 0 10px ${highlightColor}` : 'none',
        transition: 'text-shadow 0.1s'
      }}
      animate={isGlitching ? {
        x: [0, -2, 2, -1, 0],
        y: [0, 1, -1, 1, 0],
      } : {}}
      transition={{ 
        duration: 0.2,
        ease: "easeInOut" 
      }}
    >
      {displayText}
      {isGlitching && (
        <>
          <motion.span
            className="absolute top-0 left-0 w-full h-full text-[#ff36ab] opacity-70"
            style={{ 
              clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 55%)',
              transform: 'translateX(-2px)'
            }}
            animate={{ x: [-1, 1, 0] }}
            transition={{ duration: 0.1, repeat: 3 }}
          >
            {displayText}
          </motion.span>
          <motion.span
            className="absolute top-0 left-0 w-full h-full text-[#36c5f4] opacity-70"
            style={{ 
              clipPath: 'polygon(0 60%, 100% 50%, 100% 100%, 0 100%)',
              transform: 'translateX(2px)'
            }}
            animate={{ x: [1, -1, 0] }}
            transition={{ duration: 0.1, repeat: 3 }}
          >
            {displayText}
          </motion.span>
        </>
      )}
    </motion.span>
  );
} 