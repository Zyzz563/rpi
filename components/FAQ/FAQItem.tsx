'use client';

import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

interface FAQItemProps {
  question: string;
  answer: React.ReactNode;
  rickComment?: string;
  isInitiallyOpen?: boolean;
  type?: 'normal' | 'special' | 'warning';
}

export default function FAQItem({
  question,
  answer,
  rickComment,
  isInitiallyOpen = false,
  type = 'normal'
}: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(isInitiallyOpen);
  
  // Определяем цвета в зависимости от типа вопроса
  const headerBgColor = 
    type === 'normal' ? 'bg-[#1a0c27]' : 
    type === 'special' ? 'bg-[#133b1c]' : 'bg-[#3b0c0c]';
  
  const textColor = 
    type === 'normal' ? 'text-[#5cff32]' : 
    type === 'special' ? 'text-[#36f492]' : 'text-[#ff4242]';
  
  const borderColor = 
    type === 'normal' ? 'border-[#361052]' : 
    type === 'special' ? 'border-[#1a8046]' : 'border-[#6b1c1c]';
  
  return (
    <div className={`mb-4 rounded-lg overflow-hidden rickified-panel border ${borderColor}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-4 flex justify-between items-center ${headerBgColor} hover:bg-opacity-90 transition-colors duration-200`}
        aria-expanded={isOpen}
      >
        <h3 className={`text-lg font-bold ${textColor} text-left`}>
          {question}
        </h3>
        <FaChevronDown 
          className={`${textColor} transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`}
        />
      </button>
      
      {isOpen && (
        <div className="bg-[#0c0613] p-5 relative">
          <div className="prose prose-invert max-w-none mb-4">
            {answer}
          </div>
          
          {rickComment && (
            <div className="mt-4 p-3 bg-[#1a0c27] rounded-lg border border-[#361052] rickified-panel">
              <p className="text-gray-300 italic text-sm">
                <span className="text-[#5cff32] font-bold not-italic">Рик:</span> {rickComment}
              </p>
            </div>
          )}
          
          {/* Декоративный элемент - формула */}
          <div className="absolute bottom-2 right-2 opacity-5 select-none pointer-events-none">
            <div className="text-xs font-mono text-white transform rotate-12">
              E=mc²<br/>
              ∇×E=−∂B/∂t<br/>
              ∇⋅E=ρ/ε₀
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 