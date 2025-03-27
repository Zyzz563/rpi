'use client';

import { useState, useEffect } from 'react';
import FAQHeader from '@/components/FAQ/FAQHeader';
import FAQList from '@/components/FAQ/FAQList';
import FAQListAdvanced from '@/components/FAQ/FAQListAdvanced';
import FAQListFun from '@/components/FAQ/FAQListFun';
import SocialMediaIcons from '@/components/SocialMediaIcons';
import PickleRick from '@/components/PickleRick';
import GlitchAnimation from '@/components/GlitchAnimation';

export default function FAQPage() {
  const [activeSection, setActiveSection] = useState('basic');
  const [showPickleRick, setShowPickleRick] = useState(false);
  
  useEffect(() => {
    // 10% шанс показать Pickle Rick при загрузке страницы
    if (Math.random() < 0.1) {
      setShowPickleRick(true);
      setTimeout(() => setShowPickleRick(false), 5000);
    }
  }, []);
  
  return (
    <div className="min-h-screen bg-[#1d111f] text-white py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-center">
          <GlitchAnimation 
            text="FAQ от Рика" 
            color="#5cff32"
            glitchIntensity="medium"
            fontSize="inherit"
            fontWeight="inherit"
          />
        </h1>
        <p className="text-center text-gray-400 mb-12">Все, *бурп* что вы хотели знать, но *бурп* боялись спросить</p>
        
        <FAQHeader 
          activeTab={activeSection} 
          onTabChange={setActiveSection} 
        />
        
        <div className="mt-8 bg-[#220833] rounded-lg p-6 rickified-panel">
          {activeSection === 'basic' && <FAQList />}
          {activeSection === 'advanced' && <FAQListAdvanced />}
          {activeSection === 'fun' && <FAQListFun />}
        </div>
        
        <div className="mt-12 bg-[rgba(34,8,51,0.6)] p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-[#ff36ab]">Остались вопросы?</h2>
          <p className="mb-6">
            Присоединяйтесь к нашему сообществу в социальных сетях и задавайте вопросы напрямую команде! 
            *бурп* Или не задавайте, мне всё равно.
          </p>
          
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
            <SocialMediaIcons 
              showLabels={true} 
              theme="neon" 
              iconSize={28} 
              className="w-full md:w-auto"
            />
            
            <div className="p-4 bg-[#361052] rounded-lg max-w-sm">
              <p className="text-sm italic">
                "Лучший способ получить ответ в интернете - это не задать вопрос, а 
                опубликовать неправильный ответ и ждать, пока кто-нибудь вас поправит."
              </p>
              <p className="text-right mt-2 text-[#5cff32]">- Закон Рика</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>© РПИ БАНК | Все права защищены и все такое... как будто это имеет значение в бесконечной мультивселенной</p>
        </div>
      </div>
      
      {showPickleRick && (
        <PickleRick 
          trigger="auto"
          duration={5000}
          position="random"
          quotes={[
            "Нашел пасхалку! Я Огурчик Рииииик!",
            "Эй! Прочитай весь FAQ, тупица!",
            "Тебе повезло, шанс увидеть меня здесь - всего 10%!",
            "Я знаю все ответы на твои вопросы, но не скажу!",
          ]}
        />
      )}
    </div>
  );
} 