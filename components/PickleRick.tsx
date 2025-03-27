'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface PickleRickProps {
  /**
   * Триггер для появления Pickle Rick
   * - click: появляется при клике на элемент, связанный с функцией
   * - hover: появляется при наведении на элемент
   * - auto: появляется автоматически на основе указанных параметров
   */
  trigger?: 'click' | 'hover' | 'auto';
  
  /**
   * Длительность показа в миллисекундах
   */
  duration?: number;
  
  /**
   * Позиция появления на экране
   */
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center' | 'random';
  
  /**
   * Возможные цитаты Pickle Rick
   */
  quotes?: string[];
}

export default function PickleRick({
  trigger = 'auto',
  duration = 3000,
  position = 'random',
  quotes = [
    "Я превратил себя в соленый огурец, Морти!",
    "Я Огурчик Рииииик!",
    "Вы просто не понимаете научный гений моего превращения!",
    "Самая умная форма жизни во вселенной - соленый огурец!",
    "Кто бы мог подумать, что банкинг может быть таким захватывающим!",
  ]
}: PickleRickProps) {
  const [showPickleRick, setShowPickleRick] = useState(trigger === 'auto');
  const [randomQuote, setRandomQuote] = useState('');
  const [position2D, setPosition2D] = useState({ x: 0, y: 0 });
  
  // Определение случайной позиции на экране
  useEffect(() => {
    let x = 50;
    let y = 50;
    
    if (position === 'random') {
      x = Math.random() * 80 + 10; // 10% - 90% по горизонтали
      y = Math.random() * 80 + 10; // 10% - 90% по вертикали
    } else if (position === 'top') {
      y = 10;
      x = Math.random() * 80 + 10;
    } else if (position === 'bottom') {
      y = 90;
      x = Math.random() * 80 + 10;
    } else if (position === 'left') {
      x = 10;
      y = Math.random() * 80 + 10;
    } else if (position === 'right') {
      x = 90;
      y = Math.random() * 80 + 10;
    }
    
    setPosition2D({ x, y });
    
    if (trigger === 'auto') {
      // Выбираем случайную цитату
      setRandomQuote(quotes[Math.floor(Math.random() * quotes.length)]);
      
      // Устанавливаем таймер для скрытия Pickle Rick
      const timer = setTimeout(() => {
        setShowPickleRick(false);
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [trigger, duration, position, quotes]);
  
  const handleClick = () => {
    if (trigger === 'click') {
      setShowPickleRick(!showPickleRick);
      setRandomQuote(quotes[Math.floor(Math.random() * quotes.length)]);
      
      if (!showPickleRick) {
        // Устанавливаем таймер для скрытия Pickle Rick
        setTimeout(() => {
          setShowPickleRick(false);
        }, duration);
      }
    }
  };
  
  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      setShowPickleRick(true);
      setRandomQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }
  };
  
  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      setShowPickleRick(false);
    }
  };
  
  return (
    <AnimatePresence>
      {showPickleRick && (
        <motion.div 
          className="fixed z-50"
          style={{ 
            left: `${position2D.x}%`, 
            top: `${position2D.y}%`, 
            transform: 'translate(-50%, -50%)' 
          }}
          initial={{ scale: 0, rotate: 0 }}
          animate={{ 
            scale: 1, 
            rotate: [0, -10, 10, -5, 5, 0],
            y: [0, -10, 0, -5, 0],
          }}
          exit={{ scale: 0, rotate: 360 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 15,
            y: { repeat: Infinity, duration: 2 }
          }}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="relative">
            <Image 
              src="/pickle-rick.svg" 
              alt="Pickle Rick" 
              width={100} 
              height={150} 
              className="pickle-shadow"
            />
            {randomQuote && (
              <motion.div 
                className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded-lg text-black text-sm max-w-xs"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.2 }}
              >
                <div className="relative z-10 font-medium">{randomQuote}</div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45"></div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 