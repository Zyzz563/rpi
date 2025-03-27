'use client';

import Link from 'next/link';
import { FaHome, FaExternalLinkAlt } from 'react-icons/fa';
import GlitchAnimation from '@/components/GlitchAnimation';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#1d111f] text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <GlitchAnimation 
          text="404" 
          color="#ff36ab"
          glitchIntensity="high"
          fontSize="8rem"
          fontWeight="bold"
          className="mb-4"
        />
        
        <h1 className="text-2xl font-bold mb-4 text-[#5cff32]">
          Портал в эту реальность не найден
        </h1>
        
        <p className="mb-8 text-gray-400">
          Похоже, кто-то уничтожил эту вселенную. Или вы просто ввели неправильный URL.
        </p>
        
        <div className="w-24 h-1 bg-[#ff36ab] mx-auto mb-8"></div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/" 
            className="flex items-center justify-center gap-2 bg-[#220833] border border-[#5cff32] px-6 py-3 rounded-lg hover:bg-[#2d0f46] transition-all"
          >
            <FaHome className="text-[#5cff32]" />
            <span>Главная страница</span>
          </Link>
          
          <Link 
            href="/faq" 
            className="flex items-center justify-center gap-2 bg-transparent border border-[#ff36ab] px-6 py-3 rounded-lg hover:bg-[rgba(255,54,171,0.1)] transition-all"
          >
            <FaExternalLinkAlt className="text-[#ff36ab]" />
            <span>Страница FAQ</span>
          </Link>
        </div>
      </div>
    </div>
  );
} 