'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

const QUOTES = [
  'Я ОГУРЧИК РИИИИИИК!',
  'Wubba Lubba Dub Dub!',
  'Ты взломал мультивселенную, Морти!',
  'Это был секретный код, Морти, и ты его ввёл!',
  'Финансовая сингулярность активирована.',
];

export default function KonamiEasterEgg() {
  const [active, setActive] = useState(false);
  const [quote, setQuote] = useState('');

  useEffect(() => {
    let progress: string[] = [];

    const handleKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      progress = [...progress, key].slice(-KONAMI.length);
      if (progress.length === KONAMI.length && progress.every((k, i) => k === KONAMI[i])) {
        setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
        setActive(true);
        progress = [];
        setTimeout(() => setActive(false), 6000);
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* backdrop glitch */}
          <div className="absolute inset-0 bg-[#1d111f]/70 animate-portal-glitch" />

          {/* rainbow sweep */}
          <div className="absolute inset-0 opacity-30 bg-gradient-to-r from-[#5cff32] via-[#36c5f4] to-[#ff36ab] mix-blend-overlay" />

          {/* pickle rick */}
          <motion.div
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1.2, rotate: [0, -20, 20, -10, 10, 0] }}
            exit={{ scale: 0, rotate: 720 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="relative"
          >
            <Image
              src="/pickle-rick.svg"
              alt="Pickle Rick"
              width={240}
              height={320}
              className="pickle-shadow drop-shadow-[0_0_40px_rgba(92,255,50,0.9)]"
              priority
            />
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/80 border-2 border-[#5cff32] rounded-lg text-[#5cff32] font-mono text-lg md:text-2xl whitespace-nowrap portal-glow">
              {quote}
            </div>
          </motion.div>

          {/* floating portals */}
          {Array.from({ length: 24 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-12 h-12 rounded-full border-2 border-[#5cff32]"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                boxShadow: '0 0 30px rgba(92,255,50,0.7)',
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1.4, 0],
                opacity: [0, 0.8, 0],
                rotate: 360,
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 1.5,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
