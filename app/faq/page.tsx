'use client';

import React, { useState } from 'react';
import FAQHeader from '../../components/FAQ/FAQHeader';
import FAQList from '../../components/FAQ/FAQList';
import FAQListAdvanced from '../../components/FAQ/FAQListAdvanced';
import FAQListFun from '../../components/FAQ/FAQListFun';
import SocialBanner from '../../components/SocialBanner';
import CollectFlurbos from '../../components/CollectFlurbos';

export default function FAQPage() {
  const [activeTab, setActiveTab] = useState<string>('basic');
  
  return (
    <main className="min-h-screen bg-[#0c0613]">
      <div className="container mx-auto px-4 py-12">
        {/* Заголовок и навигация по вкладкам FAQ */}
        <FAQHeader activeTab={activeTab} onTabChange={setActiveTab} />
        
        {/* Контейнер для списка FAQ */}
        <div className="mb-12">
          {activeTab === 'basic' && <FAQList />}
          {activeTab === 'advanced' && <FAQListAdvanced />}
          {activeTab === 'fun' && <FAQListFun />}
        </div>
        
        {/* Разделитель с порталом */}
        <div className="w-full flex justify-center my-16">
          <div className="w-16 h-16 rounded-full bg-gradient-radial from-[#5cff32] to-transparent animate-pulse"
               style={{ boxShadow: '0 0 20px #5cff32, 0 0 40px #5cff32' }}>
          </div>
        </div>
        
        {/* Бонусный контент - игра и социальные сети */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div>
            <h2 className="text-2xl font-bold text-[#5cff32] mb-4 portal-glow">Финансовая Игра от Рика</h2>
            <p className="text-white mb-4">
              Проверь свою ловкость и удачу в финансовом симуляторе РПИ БАНКа. Собирай Flurbos и учись управлять сумасшедшими инвестициями!
            </p>
            <CollectFlurbos difficulty="easy" duration={20} />
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-[#5cff32] mb-4 portal-glow">Распространи Хаос РПИ БАНКа</h2>
            <p className="text-white mb-4">
              Расскажи о нас своим друзьям и врагам. Поделись безумием в социальных сетях, чтобы другие тоже стали частью нашей финансовой империи хаоса.
            </p>
            <SocialBanner />
          </div>
        </div>
        
        {/* Дополнительная информация внизу страницы */}
        <div className="mt-12 p-6 bg-[#1a0c27] rounded-lg rickified-panel">
          <h3 className="text-xl font-bold text-[#5cff32] mb-4">Еще остались вопросы?</h3>
          <p className="text-white mb-4">
            Если вы не нашли ответа на свой вопрос, вы можете связаться с нами одним из следующих способов:
          </p>
          <ul className="list-disc text-white pl-5 mb-4">
            <li>Отправьте межпространственный сигнал на частоте 125.7 Hz</li>
            <li>Посетите ближайшее отделение РПИ БАНКа (проверьте координаты в своей мультивселенной)</li>
            <li>Нарисуйте портал на стене своей спальни и громко позовите "Рик!"</li>
            <li>Или просто позвоните по телефону: 8-800-РИК-МОРТИ</li>
          </ul>
          <p className="text-gray-400 mt-4 text-sm">
            Примечание: РПИ БАНК не несет ответственности за любые пространственно-временные искажения, которые могут возникнуть при попытке связаться с нами. Риск ментальных повреждений, трансформаций ДНК и случайных телепортаций также лежит на клиенте.
          </p>
        </div>
      </div>
    </main>
  );
} 