'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface FAQHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function FAQHeader({ activeTab, onTabChange }: FAQHeaderProps) {
  // Случайные цитаты Рика о финансах
  const rickQuotes = [
    "Деньги – это всего лишь социальная конструкция, Морти! Но я сконструировал банк, чтобы забрать их все!",
    "Знаешь, что лучше денег, Морти? Правильно – еще больше денег!",
    "В мультивселенной есть только две константы: моя гениальность и человеческая глупость в вопросах финансов.",
    "Я создал банк не для того, чтобы помогать людям, а потому что доминировать над финансовой системой – весело!",
    "Инвестиции, кредиты, страхование – всё это изобрели, чтобы заставить вас, идиотов, добровольно отдавать деньги!"
  ];
  
  const randomQuote = rickQuotes[Math.floor(Math.random() * rickQuotes.length)];
  
  return (
    <div className="mb-8">
      <div className="relative bg-[#1a0c27] rounded-lg p-6 mb-6 rickified-panel overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold text-[#5cff32] portal-glow mb-2">
              Вопросы и Ответы
            </h1>
            <p className="text-white text-xl">Межгалактический банковский ликбез</p>
          </div>
          
          <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
            <Image
              src="/rick-scientist.svg"
              alt="Рик ученый"
              width={128}
              height={128}
              className="animate-float"
            />
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-[#220833] rounded-lg border border-[#361052]">
          <p className="text-white italic">
            <span className="text-[#5cff32] font-bold not-italic">Рик говорит:</span> "{randomQuote}"
          </p>
        </div>
        
        {/* Декоративные элементы фона */}
        <div className="absolute top-2 right-2 opacity-10 select-none pointer-events-none">
          <div className="text-xs font-mono text-white transform rotate-12">
            E=mc²<br/>
            ∇×E=−∂B/∂t<br/>
            ∇⋅E=ρ/ε₀
          </div>
        </div>
        
        <div className="absolute bottom-4 left-4 opacity-10 select-none pointer-events-none">
          <div className="w-16 h-16 rounded-full border border-[#5cff32]"></div>
        </div>
      </div>
      
      {/* Табы навигации */}
      <div className="flex flex-wrap justify-center mb-8 gap-2">
        <TabButton 
          label="Основное" 
          isActive={activeTab === 'basic'} 
          onClick={() => onTabChange('basic')}
          color="#5cff32"
        />
        <TabButton 
          label="Продвинутое" 
          isActive={activeTab === 'advanced'} 
          onClick={() => onTabChange('advanced')}
          color="#36c5f4"
        />
        <TabButton 
          label="Безумные вопросы" 
          isActive={activeTab === 'fun'} 
          onClick={() => onTabChange('fun')}
          color="#ff36ab"
        />
      </div>
      
      {/* Описание выбранного раздела */}
      <div className="mb-6 text-center">
        {activeTab === 'basic' && (
          <p className="text-white">Базовая информация о сервисах и услугах РПИ БАНКа. Идеально для новичков в мультивселенной финансов.</p>
        )}
        {activeTab === 'advanced' && (
          <p className="text-white">Продвинутые вопросы о наших услугах, инвестициях и правовых аспектах межгалактической банковской деятельности.</p>
        )}
        {activeTab === 'fun' && (
          <p className="text-white">Самые безумные вопросы, которые вы боялись задать. Ответы могут вызвать экзистенциальный кризис.</p>
        )}
      </div>
    </div>
  );
}

// Компонент кнопки таба
function TabButton({ 
  label, 
  isActive, 
  onClick, 
  color = "#5cff32" 
}: { 
  label: string; 
  isActive: boolean; 
  onClick: () => void; 
  color?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg transition-all duration-300 relative overflow-hidden ${
        isActive 
          ? 'bg-[#220833] text-white transform scale-105' 
          : 'bg-[#1a0c27] text-gray-400 hover:bg-[#1d1331] hover:text-gray-200'
      }`}
      style={{
        boxShadow: isActive ? `0 0 8px ${color}` : 'none',
        border: `1px solid ${isActive ? color : '#361052'}`
      }}
    >
      {label}
      {isActive && (
        <span 
          className="absolute bottom-0 left-0 h-1 animate-pulse-fast"
          style={{ 
            backgroundColor: color,
            width: '100%' 
          }}
        ></span>
      )}
    </button>
  );
} 